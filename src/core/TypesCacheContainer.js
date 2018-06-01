import * as ApiUtils from './ApiUtils';
import React, { Component } from 'react';
import expect from 'expect';
import PropTypes from 'prop-types';
import SingleThreadBatchRequestQueue from './SingleThreadBatchRequestQueue';
import typesCacheContext from './typesCacheContext';

export default class TypesCacheContainer extends Component {

  constructor() {
    super( ...arguments );
    this.queue = new SingleThreadBatchRequestQueue( ( batch ) => this.buildRequestPromice( batch ) );

    this.state = {
      cache: {
        _cache: {},
        getOrQueue: this.getOrQueue,
      },
    };
    this.getOrQueue = this.getOrQueue.bind( this );
  }

  getOrQueue( code ) {
    expect( code ).toBeAn( 'string' );

    const test = code.match( /^P(\d+)$/i );
    if ( !test ) throw new Error( 'Passed code value is not a property code' );

    const cachedValue = this.cache._cache[ code ];
    if ( cachedValue )
      return cachedValue;

    this.queue.queue( code );
  }

  buildRequestPromice( propertyIds ) {
    expect( propertyIds ).toBeAn( 'array' );

    mw.notify( 'Request property type of ' + propertyIds + ' from Wikidata' );
    return ApiUtils.getWikidataApi()
      .get( {
        action: 'wbgetentities',
        props: 'datatype',
        ids: propertyIds.join( '|' ),
      } )
      .then( ( result ) => {
        if ( typeof result.error !== 'undefined' ) {
          mw.log.warn( result.error );
          throw new Error( result.error );
        }

        const cacheUpdate = {};

        $.each( result.entities, ( entityIndex, entity ) => {
          const dataType = entity.datatype;
          if ( typeof dataType !== 'undefined' && dataType !== null ) {
            cacheUpdate[ entity.id ] = dataType;
          }
        } );

        mw.notify( 'Received ' + Object.keys( cacheUpdate ).length + ' property types from Wikidata' );

        this.setState( {
          cache: {
            ...this.state.cache,
            _cache: { ...this.state.cache._cache, cacheUpdate },
          }
        } );
      } );
  }

  render() {
    return <typesCacheContext.Provider value={this.state.cache}>
      {this.props.children}
    </typesCacheContext.Provider>;
  }
}

TypesCacheContainer.propTypes = {
  children: PropTypes.node,
};
