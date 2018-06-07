import * as ApiUtils from './ApiUtils';
import React, { Component } from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import SingleThreadBatchRequestQueue from './SingleThreadBatchRequestQueue';
import propertiesCacheContext from './propertiesCacheContext';

export default class PropertiesCacheContainer extends Component {

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

  getOrQueue( code ) {
    expect( code ).toBeAn( 'string' );

    const test = code.match( /^P(\d+)$/i );
    if ( !test ) throw new Error( 'Passed code value is not a property code' );

    const cachedValue = this.state.cache._cache[ code ];
    if ( cachedValue )
      return cachedValue;

    console.log( 'Queueing property type: ' + code );
    this.queue.queue( code );
  }

  buildRequestPromice( propertyIds ) {
    expect( propertyIds ).toBeAn( 'array' );

    mw.notify( 'Request property type of ' + propertyIds + ' from Wikidata' );

    const onReceive = this.onReceive;
    return ApiUtils.getWikidataApi()
      .get( {
        action: 'wbgetentities',
        languages: 'ru|en',
        languagefallback: true,
        props: 'claims|datatype|labels',
        ids: propertyIds.join( '|' ),
      } )
      .then( ( result ) => {
        if ( typeof result.error !== 'undefined' ) {
          mw.log.warn( result.error );
          throw new Error( result.error );
        }

        const cacheUpdate = {};
        $.each( result.entities, ( entityIndex, entity ) => {
          cacheUpdate[ entity.id ] = entity;
        } );

        onReceive( cacheUpdate );
      } );
  }

  onReceive( cacheUpdate ) {
    mw.notify( 'Received ' + Object.keys( cacheUpdate ).length + ' property types from Wikidata' );
    this.setState( {
      cache: {
        ...this.state.cache,
        _cache: { ...this.state.cache._cache, ...cacheUpdate },
      }
    } );
  }

  render() {
    return <propertiesCacheContext.Provider value={this.state.cache}>
      {this.props.children}
    </propertiesCacheContext.Provider>;
  }
}

PropertiesCacheContainer.propTypes = {
  children: PropTypes.node,
};
