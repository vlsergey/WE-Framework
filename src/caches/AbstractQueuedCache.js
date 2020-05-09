// @flow

import deepEqual from 'deep-equal';
import expect from 'expect';
import findByKeysInObjectStore from 'utils/findByKeysInObjectStore';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const EMPTY_SET : Set< string > = Object.freeze( new Set() );
const PAUSE_BEFORE_REQUEUE = 100;

export default class AbstractQueuedCache {

  type : string;
  maxBatch : number;
  dbQueue : Set< string >;
  requestQueue : Set< string >;
  queueState : string;
  queueHasNewElements : boolean;
  nextBatch : Set< string >;
  useIndexedDb : boolean;
  dbConnection : ?IDBDatabase;

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    this.type = type;
    this.maxBatch = maxBatch;

    this.dbQueue = new Set();
    this.requestQueue = new Set();
    this.queueState = 'WAITING';
    this.queueHasNewElements = false;
    this.nextBatch = EMPTY_SET;

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

  changeState( expectedState, newState ) {
    expect( this.queueState ).toEqual( expectedState );
    this.queueState = newState;
  }

  isKeyValid( cacheKey ) {
    /* eslint no-unused-vars: 0 */
    return true;
  }

  enchanceIndexedDbResult( cachedValue ) {
    /* eslint no-unused-vars: 0 */
    return cachedValue;
  }

  notifyMessage( cacheKeys ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement notifyMessage( cacheKeys ) function' );
  }

  buildRequestPromice( cacheKeys ) : Promise< any > {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement buildRequestPromice( cacheKeys ) function' );
  }

  convertResultToEntities( result, cacheKeys ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement convertResultToEntities( result, cacheKeys ) function' );
  }

  getCache( ) {
    expect( this.getState ).toBeA( 'function', 'Provided getState argument value is not a function' );

    const data = this.getState()[ this.type ];
    expect( data ).toBeAn( 'object', 'Cache not found: ' + this.type );

    const { cache } = data;
    expect( cache ).toBeAn( 'object', 'Cache not found: ' + this.type );

    return cache;
  }

  putToCache( cacheUpdate ) {
    expect( this.dispatch ).toBeA( 'function', 'Provided dispatch argument value is not a function' );
    expect( cacheUpdate ).toBeAn( 'object', 'Provided cacheUpdate argument value is not a function' );

    this.dispatch( {
      type: 'CACHE_' + this.type + '_PUT',
      cacheUpdate,
    } );
  }

  actionQueue( cacheKeys ) {
    expect( cacheKeys ).toBeAn( 'array' );

    return ( dispatch, getState ) => {
      expect( dispatch ).toBeA( 'function' );
      expect( getState ).toBeA( 'function' );
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

  validateCacheKeys( cacheKeys ) {
    /* eslint no-undef: 0 */
    if ( process.env.NODE_ENV !== 'production' ) {
      cacheKeys.forEach( cacheKey => {
        const test = this.isKeyValid( cacheKey );
        if ( !test ) throw new Error( 'Provided cacheKey is not valid: ' + cacheKey );
      } );
    }
  }

  checkIfDatabaseScanRequired( ) {
    expect( this.queueState ).toEqual( 'SCHEDULED' );

    const data = this.getState()[ this.type ];
    expect( data ).toBeAn( 'object', 'Cache not found: ' + this.type );

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
    expect( this.queueState ).toEqual( 'SCAN' );

    const cacheKeys = [ ...this.dbQueue ];
    const setCopy = new Set( cacheKeys );
    this.scanDatabaseImpl( cacheKeys )
      .finally( () => {
        expect( this.queueState ).toEqual( 'SCAN' );

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

  scanDatabaseImpl( cacheKeys ) {
    expect( cacheKeys ).toBeAn( 'array' );
    expect( this.queueState ).toEqual( 'SCAN' );

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
    expect( this.queueState ).toEqual( 'REQUEST' );

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
      console.debug( 'Successfully received ' + nextBatch.length + ' cache ' + this.type + ' items: ' + nextBatch );

      const cacheUpdateReady = this.convertResultToEntities( result, nextBatch );
      expect( cacheUpdateReady ).toBeAn( 'object' );

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
      mw.log.error( 'Unable to batch request following items: ' + nextBatch );
      mw.log.error( error );

      this.nextBatch = EMPTY_SET;
      this.decideNextAction( );
    }
  }

  decideNextAction( ) {
    expect( this.queueState ).toEqual( 'REQUEST' );

    if ( this.queueHasNewElements ) {
      this.queueHasNewElements = false;
      this.changeState( 'REQUEST', 'SCHEDULED' );
      setTimeout( () => this.dispatch( this.actionDbScan() ), PAUSE_BEFORE_REQUEUE );
    } else {
      this.queueNextBatch( );
    }
  }

  storeInIndexDb( cacheResult ) {
    if ( !this.dbConnection ) return;
    const objectStore = this.dbConnection
      .transaction( [ 'CACHE' ], 'readwrite' )
      .objectStore( 'CACHE' );

    Object.keys( cacheResult ).forEach( cacheKey => {
      objectStore.put( cacheResult[ cacheKey ], cacheKey );
    } );
  }

  onCacheUpdateFromDatabase( cacheUpdate ) {
    /* eslint no-unused-vars: 0 */
  }

  onCacheUpdateFromRequest( cacheUpdate ) {
    /* eslint no-unused-vars: 0 */
  }
}
