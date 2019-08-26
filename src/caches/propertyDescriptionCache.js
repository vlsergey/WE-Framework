import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';
import { API_PARAMETER_LANGUAGES } from 'utils/I18nUtils';
import { getWikidataApi } from 'core/ApiUtils';
import PropertyDescription from 'core/PropertyDescription';

const TYPE = 'PROPERTYDESCRIPTIONS';

class PropertyDescriptionCache extends AbstractQueuedCacheWithPostcheck {

  constructor() {
    super( TYPE, true, 50 );
    this.currentVersion = PropertyDescription.VERSION;
  }

  isKeyValid( cacheKey ) {
    return typeof cacheKey === 'string' && cacheKey.match( /^P(\d+)$/i );
  }

  enchanceIndexedDbResult( cachedValue ) {
    PropertyDescription.deserialize( cachedValue );
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
    const entities : {| [string] : PropertyType |} = result.entities;
    const propertyTypes : PropertyType[] = ( Object.values( entities ) : any );

    const cacheUpdate : {[string] : PropertyDescription} = {};
    propertyTypes
      .filter( ( entity : PropertyType ) => typeof entity.missing === 'undefined' )
      .forEach( ( entity : PropertyType ) => {
        const propertyDescription = new PropertyDescription( entity );
        cacheUpdate[ entity.id ] = Object.freeze( propertyDescription );
      } );
    return cacheUpdate;
  }

}

const instance = new PropertyDescriptionCache();
export default instance;
