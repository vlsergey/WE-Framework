// @flow

import expect from 'expect';

const EMPTY_SET : Set< string > = Object.freeze( new Set() );
const PAUSE_BEFORE_REQUEUE = 100;

export default class AbstractSelfStoredQueuedCache {

  type : string;
  maxBatch : number;
  queue : Set< string >;
  queueHasNewElements : boolean;
  queueState : 'WAITING' | 'REQUEST';
  nextBatch : Set< string >;
  cache : { [string] : any };
  cacheUpdateCallbacks : ( { [string] : any } => any )[];

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    this.type = type;
    this.maxBatch = maxBatch;

    this.queue = new Set();
    this.queueState = 'WAITING';
    this.queueHasNewElements = false;
    this.nextBatch = EMPTY_SET;

    this.cache = {};
    this.cacheUpdateCallbacks = [];
  }

  changeState( expectedState, newState ) {
    expect( this.queueState ).toEqual( expectedState );
    this.queueState = newState;
  }

  isKeyValid( cacheKey ) {
    /* eslint no-unused-vars: 0 */
    return true;
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

  doQueue( cacheKeys : any[] ) {
    this.validateCacheKeys( cacheKeys );

    let queued = false;
    cacheKeys.forEach( cacheKey => {
      if ( !this.queue.has( cacheKey ) && !this.nextBatch.has( cacheKey ) ) {
        this.queue.add( cacheKey );
        queued = true;
      }
    } );

    if ( queued && this.queueState === 'WAITING' ) {
      this.changeState( 'WAITING', 'REQUEST' );
      setTimeout( () => this.queueNextBatch(), PAUSE_BEFORE_REQUEUE );
    }
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

  queueNextBatch( ) {
    expect( this.queueState ).toEqual( 'REQUEST' );

    if ( this.queue.size === 0 ) {
      this.changeState( 'REQUEST', 'WAITING' );
      return;
    }

    const nextBatch = [ ...this.queue ].slice( 0, Math.min( this.maxBatch, this.queue.size ) );
    // remember so we can check on queue if element in progress of request
    this.nextBatch = new Set( nextBatch );
    if ( this.queue.size >= this.maxBatch ) {
      nextBatch.forEach( item => this.queue.delete( item ) );
    } else {
      this.queue.clear();
    }

    const notifyMessage = this.notifyMessage( nextBatch );
    console.debug( notifyMessage + '…', this.notifyOptionsInProgress );

    return this.buildRequestPromice( nextBatch ).then( result => {
      console.info( notifyMessage + '… Success.', this.notifyOptionsSuccess );
      console.debug( 'Successfully received ' + nextBatch.length + ' cache ' + this.type + ' items: ' + nextBatch );

      const cacheUpdate = this.convertResultToEntities( result, nextBatch );
      expect( cacheUpdate ).toBeAn( 'object' );
      this.cache = {
        ...this.cache,
        ...cacheUpdate,
      };
      this.onCacheUpdateFromRequest( cacheUpdate );

      this.nextBatch = EMPTY_SET;
      this.queueNextBatch( );

    } ).catch( error => {
      mw.notify( notifyMessage + '… Failure. See console log output for details.',
        { autoHide: true, tag: 'WE-F Cache: ' + this.type } );
      mw.log.error( 'Unable to batch request following items: ' + nextBatch );
      mw.log.error( error );

      this.nextBatch = EMPTY_SET;
      this.queueNextBatch( );
    } );
  }

  addCacheUpdateCallback( callback ) {
    this.cacheUpdateCallbacks.push( callback );
  }

  onCacheUpdateFromRequest( cacheUpdate ) {
    this.cacheUpdateCallbacks.forEach( callback => {
      try {
        callback( cacheUpdate );
      } catch ( err ) {
        mw.log.warn( 'Unable to call cache update callback' );
        mw.log.warn( err );
      }
    } );
  }

}
