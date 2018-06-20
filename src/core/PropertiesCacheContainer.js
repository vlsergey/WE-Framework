import * as ApiUtils from './ApiUtils';
import AbstractCacheContainer from './AbstractCacheContainer';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import propertiesCacheContext from './propertiesCacheContext';
import PropertyDescription from './PropertyDescription';
import PropTypes from 'prop-types';
import React from 'react';

export default class PropertiesCacheContainer extends AbstractCacheContainer {

  constructor() {
    super( ...arguments );
  }

  isKeyValid( key ) {
    return key.match( /^P(\d+)$/i );
  }

  buildApiRequest( propertyIds ) {
    return ApiUtils.getWikidataApi()
      .get( {
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'claims|datatype|labels',
        ids: propertyIds.join( '|' ),
      } );
  }

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    $.each( result.entities, ( entityIndex, entity ) => {
      const propertyDescription = new PropertyDescription( entity );
      cacheUpdate[ entity.id ] = Object.freeze( propertyDescription );
    } );
    return cacheUpdate;
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
