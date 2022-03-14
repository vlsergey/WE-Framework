import {getWikidataApi} from '../core/ApiUtils';
import PropertyData from '../core/PropertyData';
import {API_PARAMETER_LANGUAGES} from '../utils/I18nUtils';
import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';

export const TYPE = 'PROPERTYDATA';

class PropertyDataCache extends AbstractQueuedCacheWithPostcheck<PropertyData, any, PropertyData> {

  constructor () {
    super(TYPE, true, 50);
  }

  override enchanceIndexedDbResult (cachedValue: any) {
    Object.setPrototypeOf(cachedValue, PropertyData.prototype);
    return cachedValue;
  }

  override isKeyValid (cacheKey: string): boolean {
    return typeof cacheKey === 'string' && !!/^P(\d+)$/i.exec(cacheKey);
  }

  override notifyMessage (cacheKeys: string[]): string {
    return 'Fetching ' + cacheKeys.length + ' property descriptions from Wikidata';
  }

  override buildRequestPromice (cacheKeys: string[]) {
    return getWikidataApi()
      .getPromise({
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'claims|datatype|labels|descriptions|info',
        ids: cacheKeys.join('|'),
      });
  }

  override convertResultToEntities (result: any) {
    const cacheUpdate: Record<string, PropertyData> = {};

    const propertyTypes: PropertyType[] = Object.values(result.entities);
    propertyTypes
      .filter((entity: PropertyType) => typeof entity.missing === 'undefined')
      .forEach((entity: PropertyType) => {
        const propertyData = new PropertyData(entity);
        cacheUpdate[propertyData.id] = Object.freeze(propertyData);
      });
    return cacheUpdate;
  }

}

const instance = new PropertyDataCache();
export default instance;
