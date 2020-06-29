// @flow

import AbstractQueuedCache from './AbstractQueuedCache';
import findByKeysInObjectStore from 'utils/findByKeysInObjectStore';
import lastRevisionCache from './lastRevisionCache';

/**
* To use this class each result entry MUST have pageid and lastrevid fields
* (otherwise it WILL be rerequested on each iteration)
*/
export default class AbstractQueuedCacheWithPostcheck extends AbstractQueuedCache {

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    super( type, useIndexedDb, maxBatch );
  }

  onCacheUpdateFromDatabase( cacheUpdate : any ) {
    if ( !this.dbConnection ) throw new Error( 'DB connection is not open' );

    const pageIdsToCheck : number[] = [];
    const cacheKeysToCheck : any[] = [];

    Object.keys( cacheUpdate ).forEach( cacheKey => {
      const entity = cacheUpdate[ cacheKey ];
      const { pageid } = entity;
      const dbLastRevisionId = entity.lastrevid;
      if ( !pageid || !Number.isInteger( pageid )
          || !dbLastRevisionId || !Number.isInteger( dbLastRevisionId ) ) {
        this.requestQueue.add( cacheKey );
        return;
      }

      pageIdsToCheck.push( pageid );
      cacheKeysToCheck.push( cacheKey );
    } );

    if ( this.useIndexedDb ) {
      lastRevisionCache.queueAll( pageIdsToCheck )
        .then( ( revisionIds : ( ?number )[] ) => {
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
    cacheKeys : any[],
    pageIds : number[],
    lastRevisionsFetched : ( ?number )[]
  ) {
    if ( !this.dbConnection ) return;

    const lastRevisionsMap : Map< number, number > = new Map();
    const cacheKeysToCheck : any[] = [];
    for ( let i = 0; i < pageIds.length; i++ ) {
      const cacheKey : any = cacheKeys[ i ];
      if ( cacheKey === null || cacheKey === undefined ) {
        continue;
      }
      const lastRevisionId : ?number = lastRevisionsFetched[ i ];
      if ( lastRevisionId === null || lastRevisionId === undefined ) {
        continue;
      }
      lastRevisionsMap.set( pageIds[ i ], lastRevisionId );
      cacheKeysToCheck.push( cacheKey );
    }

    const transaction = this.dbConnection.transaction( [ 'CACHE' ] );
    const objectStore = transaction.objectStore( 'CACHE' );

    findByKeysInObjectStore( objectStore, cacheKeysToCheck )
      .then( result => {
        Object.keys( result ).forEach( cacheKey => {
          const dbEntity = result[ cacheKey ];
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
