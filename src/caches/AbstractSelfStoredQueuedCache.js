// @flow

const EMPTY_SET : Set< string > = Object.freeze( new Set() );
const PAUSE_BEFORE_REQUEUE = 100;

type QueueStateType = 'WAITING' | 'REQUEST';
type KeyType = any;
type ValueType = any;
type CacheUpdateType = Map< KeyType, ValueType >;
type CacheUpdateCallbackType = CacheUpdateType => any;

export default class AbstractSelfStoredQueuedCache {

  type : string;
  maxBatch : number ;

  queue : Set< KeyType >;
  queueHasNewElements : boolean = false;
  queueState : QueueStateType = 'WAITING';
  nextBatch : Set< KeyType > = EMPTY_SET;
  cache : Map< KeyType, ValueType > = new Map();
  cacheUpdateCallbacks : CacheUpdateCallbackType[] = [];

  constructor( type : string, useIndexedDb : boolean, maxBatch : number ) {
    this.type = type;
    this.maxBatch = maxBatch;
  }

  changeState( expectedState : QueueStateType, newState : QueueStateType ) {
    if ( this.queueState !== expectedState ) throw new Error( 'Unexpected state: ' + this.queueState );
    this.queueState = newState;
  }

  isKeyValid( cacheKey : KeyType ) {
    /* eslint no-unused-vars: 0 */
    return true;
  }

  notifyMessage( cacheKeys : KeyType[] ) : string {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement notifyMessage( cacheKeys ) function' );
  }

  buildRequestPromice( cacheKeys : KeyType[] ) {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement buildRequestPromice( cacheKeys ) function' );
  }

  convertResultToEntities( result : any, requestKeys : KeyType[] ) : Map< KeyType, ValueType > {
    /* eslint no-unused-vars: 0 */
    throw new Error( 'Child class need to implement convertResultToEntities( result, requestKeys ) function' );
  }

  doQueue( cacheKeys : string[] ) {
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

  validateCacheKeys( cacheKeys : KeyType[] ) {
    /* eslint no-undef: 0 */
    if ( process.env.NODE_ENV !== 'production' ) {
      cacheKeys.forEach( cacheKey => {
        const test = this.isKeyValid( cacheKey );
        if ( !test ) throw new Error( 'Provided cacheKey is not valid: ' + cacheKey );
      } );
    }
  }

  queueNextBatch( ) {
    if ( this.queueState !== 'REQUEST' ) throw new Error( 'Unexpected state: ' + this.queueState );

    if ( this.queue.size === 0 ) {
      this.changeState( 'REQUEST', 'WAITING' );
      return;
    }

    const nextBatch : KeyType[] = [ ...this.queue ].slice( 0, Math.min( this.maxBatch, this.queue.size ) );
    // remember so we can check on queue if element in progress of request
    this.nextBatch = new Set( nextBatch );
    if ( this.queue.size >= this.maxBatch ) {
      nextBatch.forEach( item => this.queue.delete( item ) );
    } else {
      this.queue.clear();
    }

    const notifyMessage : string = this.notifyMessage( nextBatch );
    console.debug( notifyMessage + '…' );

    return this.buildRequestPromice( nextBatch ).then( result => {
      console.info( notifyMessage + '… Success.' );
      console.debug( `Successfully received ${String( nextBatch.length )} cache ${this.type} items: ${String( nextBatch )}` );

      const cacheUpdate : Map< KeyType, ValueType > = this.convertResultToEntities( result, nextBatch );
      for ( const [ key, value ] of cacheUpdate ) {
        this.cache.set( key, value );
      }
      this.onCacheUpdateFromRequest( cacheUpdate );

      this.nextBatch = EMPTY_SET;
      this.queueNextBatch( );

    } ).catch( error => {
      mw.notify( notifyMessage + '… Failure. See console log output for details.',
        { autoHide: true, tag: 'WE-F Cache: ' + this.type } );
      mw.log.error( `Unable to batch request following items: ${String( nextBatch )}` );
      mw.log.error( error );

      this.nextBatch = EMPTY_SET;
      this.queueNextBatch( );
    } );
  }

  addCacheUpdateCallback( callback : CacheUpdateCallbackType ) {
    this.cacheUpdateCallbacks.push( callback );
  }

  onCacheUpdateFromRequest( cacheUpdate : CacheUpdateType ) {
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
