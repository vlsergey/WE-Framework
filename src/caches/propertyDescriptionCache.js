import AbstractQueuedCache from './AbstractQueuedCache';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import { getWikidataApi } from 'core/ApiUtils';
import PropertyDescription from 'core/PropertyDescription';

const TYPE = 'PROPERTYDESCRIPTIONS';

class PropertyDescriptionCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, true, 50 );
  }

  isKeyValid( cacheKey ) {
    return cacheKey.match( /^P(\d+)$/i );
  }

  enchanceIndexedDbResult( cachedValue ) {
    Object.setPrototypeOf( cachedValue, PropertyDescription.prototype );
    return cachedValue;
  }

  notifyMessage( cacheKeys ) {
    return 'Fetching ' + cacheKeys.length + ' property descriptions from Wikidata';
  }

  buildRequestPromice( cacheKeys ) {
    return getWikidataApi()
      .getPromise( {
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'claims|datatype|labels|descriptions|info',
        ids: cacheKeys.join( '|' ),
      } );
  }

  convertResultToEntities( result ) {
    const cacheUpdate = {};
    Object.values( result.entities )
      .filter( entity => typeof entity.missing === 'undefined' )
      .forEach( entity => {
        const propertyDescription = new PropertyDescription( entity );
        cacheUpdate[ entity.id ] = Object.freeze( propertyDescription );
      } );
    return cacheUpdate;
  }

}

const instance = new PropertyDescriptionCache();
export default instance;
