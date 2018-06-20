import * as ApiUtils from './ApiUtils';
import AbstractCacheContainer from './AbstractCacheContainer';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import LabelDescription from './LabelDescription';
import labelDescriptionCacheContext from './labelDescriptionCacheContext';
import PropTypes from 'prop-types';
import React from 'react';

export default class LabelDescriptionCacheContainer extends AbstractCacheContainer {

  constructor() {
    super( ...arguments );
  }

  isKeyValid( key ) {
    return key.match( /^Q(\d+)$/i );
  }

  buildApiRequest( keys ) {
    return ApiUtils.getWikidataApi()
      .get( {
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'labels|descriptions',
        ids: keys.join( '|' ),
      } );
  }

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    $.each( result.entities, ( entityIndex, entity ) => {
      const labelDescription = new LabelDescription( entity );
      cacheUpdate[ entity.id ] = Object.freeze( labelDescription );
    } );
    return cacheUpdate;
  }

  render() {
    return <labelDescriptionCacheContext.Provider value={this.state.cache}>
      {this.props.children}
    </labelDescriptionCacheContext.Provider>;
  }
}

LabelDescriptionCacheContainer.propTypes = {
  children: PropTypes.node,
};
