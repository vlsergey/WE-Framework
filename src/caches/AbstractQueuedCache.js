// @flow

import deepEqual from 'utils/deepEqual';
import findByKeysInObjectStore from 'utils/findByKeysInObjectStore';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const EMPTY_SET : Set< string > = Object.freeze( new Set() );
const PAUSE_BEFORE_REQUEUE = 100;

type KeyType = any;
type KeyArrayType = any[];

function flatten( obj : any ) : any {
  if ( Array.isArray( obj ) ) {
    return obj;
  }

  const result : any = {};
  for ( const key in obj ) {
    result[ key ] = obj[ key ];
  }
  return result;
}

export default class AbstractQueuedCache {

  dispatch : DispatchType;
  getState : GetStateType;

  type : string;
  maxBatch : number;
  dbQueue : Set< string > = new Set();
  requestQueue : Set< string > = new Set();
  queueState : string = 'WAITING';
  queueHasNewElements : boolean = false;
  nextBatch : Set< string > = EMPTY_SET;
  useIndexedDb : boolean;
  dbConnection : ?IDBDatabase;

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    this.type = type;
    this.maxBatch = maxBatch;

    this.useIndexedDb = useIndexedDb;
    this.dbConnection = null;
    if ( useIndexedDb && indexedDB ) {
      const dbOpenRequest : IDBOpenDBRequest = indexedDB.open( 'WEF_CACHE_' + type, 1 );
      dbOpenRequest.onerror = err => {
        mw.log.warn( 'Unable to open indexedDB' );
        mw.log.warn( err );
      };
      dbOpenRequest.onsuccess = () => {
        console.debug( 'Successfully open indexedDB connection for database ' + type );
        this.dbConnection = ( ( dbOpenRequest.result : any ) : IDBDatabase );
      };
      dbOpenRequest.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore( 'CACHE' );
      };
    }
  }

  assertState( expectedState : KeyType ) : void {
    if ( this.queueState !== expectedState ) throw new Error( 'Unexpected state: ' + this.queueState );
  }

  changeState( expectedState : string, newState : string ) {
    this.assertState( expectedState );
    this.queueState = newState;
  }

  isKeyValid( cacheKey : KeyType ) : boolean {
    /* eslint no-unused-vars: 0 */
    return true;
  }

  enchanceIndexedDbResult( cachedValue : any ) {
    /* eslint no-unused-vars: 0 */
    return cachedValue;
  }

  notifyMessage( cacheKeys : KeyArrayType ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement notifyMessage( cacheKeys ) function' );
  }

  buildRequestPromice( cacheKeys : KeyArrayType ) : Promise< any > {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement buildRequestPromice( cacheKeys ) function' );
  }

  convertResultToEntities( result : any, cacheKeys : KeyArrayType ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement convertResultToEntities( result, cacheKeys ) function' );
  }

  getCache( ) {
    const data = this.getState()[ this.type ];
    const { cache } = data;
    if ( !cache ) throw new Error( 'Cache not found: ' + this.type );
    return cache;
  }

  putToCache( cacheUpdate : any ) {
    this.dispatch( {
      type: 'CACHE_' + this.type + '_PUT',
      cacheUpdate,
    } );
  }

  actionQueue( cacheKeys : KeyArrayType ) {
    return ( dispatch : DispatchType, getState : GetStateType ) => {
      this.dispatch = dispatch;
      this.getState = getState;

      const cache = this.getCache( );
      this.validateCacheKeys( cacheKeys );

      let queued = false;
      cacheKeys.forEach( cacheKey => {
        if ( !this.dbQueue.has( cacheKey )
            && !this.requestQueue.has( cacheKey )
            && !this.nextBatch.has( cacheKey ) ) {
          this.dbQueue.add( cacheKey );
          queued = true;
        }
      } );

      if ( queued && this.queueState === 'WAITING' ) {
        this.changeState( 'WAITING', 'SCHEDULED' );
        setTimeout( () => this.checkIfDatabaseScanRequired( ),
          PAUSE_BEFORE_REQUEUE );
      }
    };
  }

  validateCacheKeys( cacheKeys : KeyArrayType ) {
    /* eslint no-undef: 0 */
    if ( process.env.NODE_ENV !== 'production' ) {
      cacheKeys.forEach( cacheKey => {
        const test = this.isKeyValid( cacheKey );
        if ( !test ) throw new Error( 'Provided cacheKey is not valid: ' + cacheKey );
      } );
    }
  }

  checkIfDatabaseScanRequired( ) {
    this.assertState( 'SCHEDULED' );

    const data = this.getState()[ this.type ];
    if ( !data ) throw new Error( 'Cache not found: ' + this.type );

    if ( this.dbQueue.size !== 0 ) {
      if ( this.dbConnection ) {
        this.changeState( 'SCHEDULED', 'SCAN' );
        this.scanDatabase( );
        return;
      }
      this.dbQueue.forEach( cacheKey => this.requestQueue.add( cacheKey ) );
      this.dbQueue.clear();

    }

    if ( this.requestQueue.size > 0 ) {
      this.changeState( 'SCHEDULED', 'REQUEST' );
      this.queueNextBatch( );
      return;
    }

    this.changeState( 'SCHEDULED', 'WAITING' );
  }

  scanDatabase( ) {
    this.assertState( 'SCAN' );

    const cacheKeys = [ ...this.dbQueue ];
    const setCopy = new Set( cacheKeys );
    this.scanDatabaseImpl( cacheKeys )
      .finally( () => {
        if ( this.queueState !== 'SCAN' ) throw new Error( 'Unexpected state: ' + this.queueState );

        if ( [ ...this.dbQueue ].some( cacheKey => !setCopy.has( cacheKey ) ) ) {
          // TODO: possible optimization: scan only new keys
          this.scanDatabase( );
        } else {
          this.dbQueue.forEach( cacheKey => this.requestQueue.add( cacheKey ) );
          this.dbQueue.clear();

          this.changeState( 'SCAN', 'REQUEST' );
          this.queueNextBatch( );
        }
      } );
  }

  scanDatabaseImpl( cacheKeys : string[] ) {
    this.assertState( 'SCAN' );
    if ( !this.dbConnection ) throw new Error( 'DB not open' );

    const transaction : IDBTransaction = this.dbConnection.transaction( [ 'CACHE' ], 'readonly' );
    const objectStore : IDBObjectStore = transaction.objectStore( 'CACHE' );

    return findByKeysInObjectStore( objectStore, cacheKeys )
      .then( result => {
        const cache = this.getCache();
        const cacheUpdate = {};
        let hasUpdates = false;

        Object.keys( result ).forEach( cacheKey => {
          const actual = this.enchanceIndexedDbResult( result[ cacheKey ] );
          const existing = cache[ cacheKey ];
          if ( !deepEqual( actual, existing ) ) {
            cacheUpdate[ cacheKey ] = actual;
            hasUpdates = true;
          }
          this.dbQueue.delete( cacheKey );
        } );

        if ( hasUpdates ) {
          this.putToCache( cacheUpdate );
          this.onCacheUpdateFromDatabase( cacheUpdate );
        }
      } )
      .catch( exc => {
        mw.log.warn( 'Unable to get values from indexedDB' );
        mw.log.warn( exc );
      } );
  }

  async queueNextBatch() {
    this.assertState( 'REQUEST' );

    if ( this.requestQueue.size === 0 ) {
      this.changeState( 'REQUEST', 'SCHEDULED' );
      this.checkIfDatabaseScanRequired();
      return;
    }

    const nextBatch = [ ...this.requestQueue ].slice( 0, Math.min( this.maxBatch, this.requestQueue.size ) );
    // remember so we can check on queue if element in progress of request
    this.nextBatch = new Set( nextBatch );
    if ( this.requestQueue.size >= this.maxBatch ) {
      nextBatch.forEach( item => this.requestQueue.delete( item ) );
    } else {
      this.requestQueue.clear();
    }

    const notifyMessage = this.notifyMessage( nextBatch );
    console.debug( notifyMessage + '…' );

    try {
      const result : any = await this.buildRequestPromice( nextBatch );
      console.info( notifyMessage + '… Success.' );
      console.debug( `Successfully received ${String( nextBatch.length )} cache ${this.type} items: ${String( nextBatch )}` );

      const cacheUpdateReady = this.convertResultToEntities( result, nextBatch );
      const cache = this.getCache();
      const cacheUpdate = {};
      let hasUpdates = false;

      Object.keys( cacheUpdateReady ).forEach( cacheKey => {
        const actual = cacheUpdateReady[ cacheKey ];
        const existing = cache[ cacheKey ];
        if ( !deepEqual( actual, existing ) ) {
          cacheUpdate[ cacheKey ] = actual;
          hasUpdates = true;
        }
      } );

      if ( hasUpdates ) {
        this.putToCache( cacheUpdate );
        this.storeInIndexDb( cacheUpdate );
        this.onCacheUpdateFromRequest( cacheUpdate );
      }

      this.nextBatch = EMPTY_SET;
      this.decideNextAction( );
    } catch ( error ) {
      mw.notify( notifyMessage + '… Failure. See console log output for details.',
        { autoHide: true, tag: 'WE-F Cache: ' + this.type } );
      mw.log.error( `Unable to batch request following items: ${String( nextBatch )}` );
      mw.log.error( error );

      this.nextBatch = EMPTY_SET;
      this.decideNextAction( );
    }
  }

  decideNextAction() {
    this.assertState( 'REQUEST' );

    if ( this.queueHasNewElements ) {
      this.queueHasNewElements = false;
      this.changeState( 'REQUEST', 'SCHEDULED' );
      setTimeout( () => this.dispatch( this.checkIfDatabaseScanRequired() ), PAUSE_BEFORE_REQUEUE );
    } else {
      this.queueNextBatch( );
    }
  }

  storeInIndexDb( cacheResult : any ) {
    if ( !this.dbConnection ) return;
    const objectStore = this.dbConnection
      .transaction( [ 'CACHE' ], 'readwrite' )
      .objectStore( 'CACHE' );

    Object.keys( cacheResult ).forEach( cacheKey => {
      objectStore.put( flatten( cacheResult[ cacheKey ] ), cacheKey );
    } );
  }

  onCacheUpdateFromDatabase( cacheUpdate : any ) {
    /* eslint no-unused-vars: 0 */
  }

  onCacheUpdateFromRequest( cacheUpdate : any ) {
    /* eslint no-unused-vars: 0 */
  }
}
