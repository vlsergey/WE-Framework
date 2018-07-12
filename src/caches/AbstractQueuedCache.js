import expect from 'expect';
import findByKeysInObjectStore from 'utils/findByKeysInObjectStore';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const PAUSE_BEFORE_REQUEUE = 100;

export default class AbstractQueuedCache {

  constructor( type, useIndexedDb, maxBatch ) {
    this.type = type;
    this.maxBatch = maxBatch;

    this.notifyOptionsInProgress = { autoHide: false, tag: 'WE-F Cache: ' + type };
    this.notifyOptionsSuccess = { autoHide: true, tag: 'WE-F Cache: ' + type };
    this.notifyOptionsFailure = { autoHide: true, tag: 'WE-F Cache: ' + type };

    this.queue = new Set();
    this.queueState = 'WAITING';
    this.queueHasNewElements = false;

    this.dbConnection = null;
    if ( useIndexedDb && indexedDB ) {
      const dbOpenRequest = indexedDB.open( 'WEF_CACHE_' + type, 1 );
      dbOpenRequest.onerror = function( err ){
        mw.log.warn( 'Unable to open indexedDB' );
        mw.log.warn( err );
      };
      dbOpenRequest.onsuccess = () => {
        console.debug( 'Successfully open indexedDB connection for database ' + type );
        this.dbConnection = dbOpenRequest.result;
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

  buildRequestPromice( cacheKeys ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement buildRequestPromice( cacheKeys ) function' );
  }

  convertResultToEntities( result, cacheKeys ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement convertResultToEntities( result, cacheKeys ) function' );
  }

  actionQueue( cacheKey ) {
    return ( dispatch, getState ) => {
      expect( dispatch ).toBeA( 'function' );
      expect( getState ).toBeA( 'function' );

      const data = getState()[ this.type ];
      expect( data ).toBeAn( 'object', 'Cache not found: ' + this.type );

      const cache = data.cache;
      expect( cache ).toBeAn( 'object', 'Cache not found: ' + this.type );

      const test = this.isKeyValid( cacheKey );
      if ( !test ) throw new Error( 'Provided cacheKey is not valid: ' + cacheKey );

      const cachedValue = cache[ cacheKey ];
      if ( cachedValue )
        return;

      if ( !this.queue.has( cacheKey ) ) {
        this.queue.add( cacheKey );
        this.queueHasNewElements = true;
        if ( this.queueState === 'WAITING' ) {
          this.changeState( 'WAITING', 'SCHEDULED' );
          setTimeout( () => dispatch( this.actionDbScan( ) ), PAUSE_BEFORE_REQUEUE );
        }
      }
    };
  }

  actionDbScan() {
    return ( dispatch, getState ) => {
      expect( this.queueState ).toEqual( 'SCHEDULED' );

      const data = getState()[ this.type ];
      expect( data ).toBeAn( 'object', 'Cache not found: ' + this.type );

      if ( this.dbConnection && this.queue.size > 0 ) {
        this.changeState( 'SCHEDULED', 'SCAN' );
        this.scanDatabase( dispatch );
        return;
      }

      if ( this.queue.size > 0 ) {
        this.changeState( 'SCHEDULED', 'REQUEST' );
        this.queueNextBatch( dispatch );
        return;
      }

      this.queueState = 'WAITING';
    };
  }

  scanDatabase( dispatch ) {
    expect( this.queueState ).toEqual( 'SCAN' );

    const cacheKeys = [ ...this.queue ];
    const setCopy = new Set( cacheKeys );
    this.scanDatabaseImpl( dispatch, cacheKeys )
      .finally( () => {
        expect( this.queueState ).toEqual( 'SCAN' );

        if ( [ ...this.queue ].some( cacheKey => !setCopy.has( cacheKey ) ) ) {
          // TODO: possible optimization: scan only new keys
          this.scanDatabase( dispatch );
        } else {
          this.changeState( 'SCAN', 'REQUEST' );
          this.queueNextBatch( dispatch );
        }
      } );
  }

  scanDatabaseImpl( dispatch, cacheKeys ) {
    expect( dispatch ).toBeA( 'function' );
    expect( cacheKeys ).toBeAn( 'array' );
    expect( this.queueState ).toEqual( 'SCAN' );

    const transaction = this.dbConnection.transaction( [ 'CACHE' ], 'readonly' );
    const objectStore = transaction.objectStore( 'CACHE' );

    return findByKeysInObjectStore( objectStore, cacheKeys )
      .then( result => {
        const keys = Object.keys( result );
        if ( keys.length > 0 ) {
          const cacheUpdate = {};
          keys.forEach( cacheKey => {
            cacheUpdate[ cacheKey ] = this.enchanceIndexedDbResult( result[ cacheKey ] );
            this.queue.delete( cacheKey );
          } );
          dispatch( {
            type: 'CACHE_' + this.type + '_PUT',
            cacheUpdate,
          } );
        }
      } )
      .catch( exc => {
        mw.log.warn( 'Unable to get values from indexedDB' );
        mw.log.warn( exc );
      } );
  }

  queueNextBatch( dispatch ) {
    expect( dispatch ).toBeA( 'function' );
    expect( this.queueState ).toEqual( 'REQUEST' );

    if ( this.queue.size === 0 ) {
      this.changeState( 'REQUEST', 'WAITING' );
      return;
    }

    const nextBatch = [ ...this.queue ].slice( 0, Math.min( this.maxBatch, this.queue.size ) );
    if ( this.queue.size >= this.maxBatch ) {
      nextBatch.forEach( item => this.queue.delete( item ) );
    } else {
      this.queue.clear();
    }

    const notifyMessage = this.notifyMessage( nextBatch );
    mw.notify( notifyMessage + '…', this.notifyOptionsInProgress );

    return this.buildRequestPromice( nextBatch ).then( result => {
      mw.notify( notifyMessage + '… Success.', this.notifyOptionsSuccess );
      mw.log( 'Successfully received ' + nextBatch.length + ' cache ' + this.type + ' items: ' + nextBatch );

      const cacheUpdate = this.convertResultToEntities( result, nextBatch );
      expect( cacheUpdate ).toBeAn( 'object' );
      dispatch( {
        type: 'CACHE_' + this.type + '_PUT',
        cacheUpdate,
      } );
      this.storeInIndexDb( cacheUpdate );

      this.decideNextAction( dispatch );

    } ).catch( error => {
      mw.notify( notifyMessage + '… Failure. See console log output for details.',
        this.notifyOptionsFailure );
      mw.log.error( 'Unable to batch request following items: ' + nextBatch );
      mw.log.error( error );

      this.decideNextAction( dispatch );
    } );
  }

  decideNextAction( dispatch ) {
    expect( this.queueState ).toEqual( 'REQUEST' );

    if ( this.queueHasNewElements ) {
      this.queueHasNewElements = false;
      this.changeState( 'REQUEST', 'SCHEDULED' );
      setTimeout( () => dispatch( this.actionDbScan() ), PAUSE_BEFORE_REQUEUE );
    } else {
      this.queueNextBatch( dispatch );
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

}
