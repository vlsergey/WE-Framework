import AbstractQueuedCache from './AbstractQueuedCache';
import expect from 'expect';
import findByKeysInObjectStore from 'utils/findByKeysInObjectStore';
import lastRevisionCache from './lastRevisionCache';

/**
* To use this class each result entry MUST have pageid and lastrevid fields
* (otherwise it WILL be rerequested on each iteration)
*/
export default class AbstractQueuedCacheWithPostcheck extends AbstractQueuedCache {

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    super( type, useIndexedDb, maxBatch );

    if ( this.useIndexedDb ) {
      lastRevisionCache.addCacheUpdateCallback( this.onLastRevisionsFetched.bind( this ) );
    }

    this.pageid2cacheKey = {};
  }

  onCacheUpdateFromDatabase( cacheUpdate ) {
    expect( this.dbConnection ).toBeTruthy();

    const lastRevisionsCacheData = lastRevisionCache.cache;

    const pageidsToQueue = [];
    Object.keys( cacheUpdate ).forEach( cacheKey => {
      const entity = cacheUpdate[ cacheKey ];
      const { pageid } = entity;
      const dbLastRevisionId = entity.lastrevid;
      if ( !pageid || !Number.isInteger( pageid )
          || !dbLastRevisionId || !Number.isInteger( dbLastRevisionId ) ) {
        this.requestQueue.add( cacheKey );
        return;
      }

      const realLastRevisionId = lastRevisionsCacheData[ pageid ];
      if ( realLastRevisionId === undefined ) {
        pageidsToQueue.push( pageid );
        this.pageid2cacheKey[ pageid ] = cacheKey;
      } else if ( realLastRevisionId !== dbLastRevisionId ) {
        this.requestQueue.add( cacheKey );
      }
    } );

    if ( this.requestQueue.size !== 0 && this.queueState === 'WAITING' ) {
      this.queueState = 'REQUEST';
      this.queueNextBatch( );
    }

    lastRevisionCache.doQueue( pageidsToQueue );
  }

  onLastRevisionsFetched( lastRevisionsFetched ) {
    if ( !this.dbConnection ) return;

    const transaction = this.dbConnection.transaction( [ 'CACHE' ] );
    const objectStore = transaction.objectStore( 'CACHE' );

    const cacheKeysToCheck = Object.keys( lastRevisionsFetched )
      .map( pageid => this.pageid2cacheKey[ pageid ] )
      .filter( x => x !== undefined );

    findByKeysInObjectStore( objectStore, cacheKeysToCheck )
      .then( result => {
        Object.keys( result ).forEach( cacheKey => {
          const dbEntity = result[ cacheKey ];
          const dbpageid = dbEntity.pageid;
          const dblastrevid = dbEntity.lastrevid;
          if ( !dbpageid || dblastrevid !== lastRevisionsFetched[ dbpageid ] ) {
            this.requestQueue.add( cacheKey );
          }
        } );

        if ( this.requestQueue.size !== 0 && this.queueState === 'WAITING' ) {
          this.queueState = 'REQUEST';
          this.queueNextBatch( );
        }
      } );

    Object.keys( lastRevisionsFetched )
      .forEach( pageid => delete this.pageid2cacheKey[ pageid ] );
  }

}
