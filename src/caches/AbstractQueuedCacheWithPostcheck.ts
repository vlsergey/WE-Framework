import AbstractQueuedCache from './AbstractQueuedCache';
import findByKeysInObjectStore from '../utils/findByKeysInObjectStore';
import lastRevisionCache from './lastRevisionCache';

interface WithIds {
  pageid? : number,
  lastrevid? : number,
}
type CacheType<V> = {[key: string] : V};

/**
* To use this class each result entry MUST have pageid and lastrevid fields
* (otherwise it WILL be rerequested on each iteration)
*/
export default abstract class AbstractQueuedCacheWithPostcheck<DatabaseValue extends WithIds, RequestResult, Value extends WithIds>
  extends AbstractQueuedCache<DatabaseValue, RequestResult, Value> {

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    super( type, useIndexedDb, maxBatch );
  }

  override onCacheUpdateFromDatabase( cacheUpdate : CacheType<Value> ) {
    if ( !this.dbConnection ) throw new Error( 'DB connection is not open' );

    const pageIdsToCheck : number[] = [];
    const cacheKeysToCheck : any[] = [];

    Object.entries( cacheUpdate ).forEach( ([cacheKey, {pageid, lastrevid}]) => {
      if ( !pageid || !Number.isInteger( pageid )
          || !lastrevid || !Number.isInteger( lastrevid ) ) {
        this.requestQueue.add( cacheKey );
        return;
      }

      pageIdsToCheck.push( pageid );
      cacheKeysToCheck.push( cacheKey );
    } );

    if ( this.useIndexedDb ) {
      lastRevisionCache.queueAll( pageIdsToCheck )
        .then( ( revisionIds : (number | null)[] ) => {
          this.onLastRevisionsFetched( cacheKeysToCheck, pageIdsToCheck, revisionIds );
        } );
    }

    if ( this.requestQueue.size !== 0 && this.queueState === 'WAITING' ) {
      this.queueState = 'REQUEST';
      this.queueNextBatch( );
    }

    lastRevisionCache.queueAll( pageIdsToCheck );
  }

  onLastRevisionsFetched(
    cacheKeys : string[],
    pageIds : number[],
    lastRevisionsFetched : (number | null)[]
  ) {
    if ( !this.dbConnection ) return;

    const lastRevisionsMap : Map< number, number > = new Map();
    const cacheKeysToCheck : any[] = [];
    for ( let i = 0; i < pageIds.length; i++ ) {
      const cacheKey = cacheKeys[ i ];
      if ( cacheKey === null || cacheKey === undefined ) {
        continue;
      }
      const lastRevisionId = lastRevisionsFetched[ i ];
      if ( lastRevisionId === null || lastRevisionId === undefined ) {
        continue;
      }
      lastRevisionsMap.set( pageIds[ i ] as number, lastRevisionId );
      cacheKeysToCheck.push( cacheKey );
    }

    const transaction = this.dbConnection.transaction( [ 'CACHE' ] );
    const objectStore = transaction.objectStore( 'CACHE' );

    findByKeysInObjectStore( objectStore, cacheKeysToCheck )
      .then( result => {
        Object.entries( result ).forEach( ([cacheKey, dbEntity]) => {
          const dbpageid = dbEntity.pageid;
          const dblastrevid = dbEntity.lastrevid;
          if ( !dbpageid || dblastrevid !== lastRevisionsMap.get( dbpageid ) ) {
            this.requestQueue.add( cacheKey );
          }
        } );

        if ( this.requestQueue.size !== 0 && this.queueState === 'WAITING' ) {
          this.queueState = 'REQUEST';
          this.queueNextBatch( );
        }
      } );
  }

}
