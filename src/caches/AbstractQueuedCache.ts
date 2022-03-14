import deepEqual from '../utils/deepEqual';
import findByKeysInObjectStore from '../utils/findByKeysInObjectStore';

// @ts-ignore
const indexedDB : IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const EMPTY_SET = Object.freeze( new Set() as Set< string > );
const PAUSE_BEFORE_REQUEUE = 100;

type CacheType<V> = {[key: string] : V};

export default abstract class AbstractQueuedCache<DatabaseValue, RequestResult, Value> {

  dispatch : any;
  getState : any;

  type : string;
  maxBatch : number;
  dbQueue : Set< string > = new Set();
  requestQueue : Set< string > = new Set();
  queueState : string = 'WAITING';
  queueHasNewElements : boolean = false;
  nextBatch : Set< string > = EMPTY_SET;
  useIndexedDb : boolean;
  dbConnection : IDBDatabase | null;

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
        this.dbConnection = dbOpenRequest.result;
      };
      dbOpenRequest.onupgradeneeded = () => {
        const db = dbOpenRequest.result;
        db.createObjectStore( 'CACHE' );
      };
    }
  }

  assertState( expectedState : string ) : void {
    if ( this.queueState !== expectedState ) throw new Error( 'Unexpected state: ' + this.queueState );
  }

  changeState( expectedState : string, newState : string ) {
    this.assertState( expectedState );
    this.queueState = newState;
  }

  flatten( obj : Value ) : DatabaseValue {
    if ( Array.isArray( obj ) ) {
      return obj as unknown as DatabaseValue;
    }

    const result = {} as DatabaseValue;
    for ( const key in obj ) {
      // @ts-ignore
      result[ key ] = obj[ key ];
    }
    return result;
  }

  isKeyValid( _cacheKey : string ) : boolean {
    /* eslint no-unused-vars: 0 */
    return true;
  }

  enchanceIndexedDbResult( cachedValue : DatabaseValue ) : Value {
    /* eslint no-unused-vars: 0 */
    return cachedValue as unknown as Value;
  }

  abstract notifyMessage( cacheKeys : string[] ) : void

  abstract buildRequestPromice( cacheKeys : string[] ) : Promise< RequestResult >

  abstract convertResultToEntities( result : RequestResult, cacheKeys : string[] ) : CacheType<Value>

  getCache( ) : CacheType<Value> {
    const data = this.getState()[ this.type ];
    const { cache } = data;
    if ( !cache ) throw new Error( 'Cache not found: ' + this.type );
    return cache;
  }

  putToCache( cacheUpdate : CacheType<Value> ) {
    this.dispatch( {
      type: 'CACHE_' + this.type + '_PUT',
      cacheUpdate,
    } );
  }

  actionQueue( cacheKeys : string[] ) {
    return ( dispatch : any, getState : any ) => {
      this.dispatch = dispatch;
      this.getState = getState;

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

  validateCacheKeys( cacheKeys : string[] ) {
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

  async scanDatabaseImpl( cacheKeys : string[] ) {
    this.assertState( 'SCAN' );
    if ( !this.dbConnection ) throw new Error( 'DB not open' );

    const transaction : IDBTransaction = this.dbConnection.transaction( [ 'CACHE' ], 'readonly' );
    const objectStore : IDBObjectStore = transaction.objectStore( 'CACHE' );

    try {
      const result = await findByKeysInObjectStore(objectStore, cacheKeys);
      const cache = this.getCache();
      const cacheUpdate: { [key: string]: any; } = {};
      let hasUpdates = false;

      Object.entries(result).forEach(([cacheKey, resultItem]) => {
        const actual = this.enchanceIndexedDbResult(resultItem);
        const existing = cache[cacheKey];
        if (!deepEqual(actual, existing)) {
          cacheUpdate[cacheKey] = actual;
          hasUpdates = true;
        }
        this.dbQueue.delete(cacheKey);
      });

      if (hasUpdates) {
        this.putToCache(cacheUpdate);
        this.onCacheUpdateFromDatabase(cacheUpdate);
      }
    } catch (exc) {
      mw.log.warn('Unable to get values from indexedDB');
      mw.log.warn(exc);
    }
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
      const cacheUpdate : CacheType<Value> = {};
      let hasUpdates = false;

      Object.entries( cacheUpdateReady ).forEach( ([cacheKey, actual]) => {
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

  storeInIndexDb( cacheResult : CacheType<Value> ) {
    if ( !this.dbConnection ) return;
    const objectStore = this.dbConnection
      .transaction( [ 'CACHE' ], 'readwrite' )
      .objectStore( 'CACHE' );

    Object.entries( cacheResult ).forEach( ([cacheKey, cacheValue]) => {
      objectStore.put( this.flatten( cacheValue ), cacheKey );
    } );
  }

  onCacheUpdateFromDatabase( _cacheUpdate : CacheType<Value> ) {
    /* eslint no-unused-vars: 0 */
  }

  onCacheUpdateFromRequest( _cacheUpdate : CacheType<Value> ) {
    /* eslint no-unused-vars: 0 */
  }
}
