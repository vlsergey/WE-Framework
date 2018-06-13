import { Component } from 'react';
import expect from 'expect';
import SingleThreadBatchRequestQueue from './SingleThreadBatchRequestQueue';

export default class AbstractCacheContainer extends Component {

  constructor() {
    super( ...arguments );
    this.queue = new SingleThreadBatchRequestQueue( ( batch ) => this.buildRequestPromice( batch ) );

    const getOrQueue = this.getOrQueue = this.getOrQueue.bind( this );
    this.onReceive = this.onReceive.bind( this );

    this.state = {
      cache: {
        _cache: {},
        getOrQueue: getOrQueue,
      },
    };
  }

  getOrQueue( key ) {
    expect( key ).toBeAn( 'string' );

    const test = this.isKeyValid( key );
    if ( !test ) throw new Error( 'Provided cache key is not valid: ' + key );

    const cachedValue = this.state.cache._cache[ key ];
    if ( cachedValue )
      return cachedValue;

    console.log( 'Queueing for cache population: ' + key );
    this.queue.queue( key );
  }

  isKeyValid( ) {
    return true;
  }

  buildRequestPromice( entityIds ) {
    expect( entityIds ).toBeAn( 'array' );

    mw.log( 'Request entities ' + entityIds + ' from Wikidata' );
    mw.notify( 'Request ' + entityIds.length + ' entries from Wikidata' );

    const convertResultToEntities = this.convertResultToEntities;
    const onReceive = this.onReceive;

    return this.buildApiRequest( entityIds )
      .then( ( result ) => {
        if ( typeof result.error !== 'undefined' ) {
          mw.log.warn( result.error );
          throw new Error( result.error );
        }

        const cacheUpdate = convertResultToEntities( result );
        expect( cacheUpdate ).toBeAn( 'object' );

        onReceive( cacheUpdate );
      } );
  }

  buildApiRequest( ) {
    throw new Error( 'Need to be implemented by ' + this );
  }

  convertResultToEntities( ) {
    throw new Error( 'Need to be implemented by ' + this );
  }

  onReceive( cacheUpdate ) {
    mw.notify( 'Received ' + Object.keys( cacheUpdate ).length + ' entries from Wikidata' );
    this.setState( {
      cache: {
        ...this.state.cache,
        _cache: { ...this.state.cache._cache, ...cacheUpdate },
      }
    } );
  }

}
