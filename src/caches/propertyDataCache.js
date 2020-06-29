// @flow

import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import { getWikidataApi } from 'core/ApiUtils';
import PropertyData from 'core/PropertyData';

export const TYPE = 'PROPERTYDATA';

class PropertyDataCache extends AbstractQueuedCacheWithPostcheck {

  constructor() {
    super( TYPE, true, 50 );
  }

  enchanceIndexedDbResult( cachedValue : any ) {
    Object.setPrototypeOf( cachedValue, PropertyData.prototype );
    return cachedValue;
  }

  isKeyValid( cacheKey : string ) : boolean {
    return typeof cacheKey === 'string' && !!cacheKey.match( /^P(\d+)$/i );
  }

  notifyMessage( cacheKeys : string[] ) : string {
    return 'Fetching ' + cacheKeys.length + ' property descriptions from Wikidata';
  }

  buildRequestPromice( cacheKeys : string[] ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'claims|datatype|labels|descriptions|info',
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result : any ) {
    const cacheUpdate : {| [string] : PropertyData |} = ( {} : any );

    const propertyTypes : PropertyType[] = ( Object.values( result.entities ) : any );
    propertyTypes
      .filter( ( entity : PropertyType ) => typeof entity.missing === 'undefined' )
      .forEach( ( entity : PropertyType ) => {
        const propertyData : PropertyData = new PropertyData( entity );
        cacheUpdate[ propertyData.id ] = Object.freeze( propertyData );
      } );
    return cacheUpdate;
  }

}

const instance = new PropertyDataCache();
export default instance;
