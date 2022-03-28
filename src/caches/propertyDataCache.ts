import {getWikidataApi} from '../core/ApiUtils';
import PropertyData from '../core/PropertyData';
import {API_PARAMETER_LANGUAGES} from '../utils/I18nUtils';
import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';

export const TYPE = 'PROPERTYDATA';

export type CacheType = Record<string, PropertyData>;

class PropertyDataCache extends AbstractQueuedCacheWithPostcheck<PropertyData, any, PropertyData> {

  constructor () {
    super(TYPE, true, 50);
  }

  override enchanceIndexedDbResult (cachedValue: unknown): PropertyData {
    Object.setPrototypeOf(cachedValue, PropertyData.prototype);
    return cachedValue as PropertyData;
  }

  override isKeyValid (cacheKey: string): boolean {
    return typeof cacheKey === 'string' && !!/^P(\d+)$/i.exec(cacheKey);
  }

  override notifyMessage (cacheKeys: string[]): string {
    return 'Fetching ' + cacheKeys.length + ' property descriptions from Wikidata';
  }

  override buildRequestPromice (cacheKeys: string[]) {
    return getWikidataApi()
      .getPromise<WbGetEntitiesActionResult>({
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'claims|datatype|labels|descriptions|info',
        ids: cacheKeys.join('|'),
      });
  }

  override convertResultToEntities (result: WbGetEntitiesActionResult): CacheType {
    const cacheUpdate: CacheType = {};

    for (const [propertyId, property] of Object.entries(result.entities)) {
      if (property.missing) continue;
      const propertyData = new PropertyData(property as PropertyType);
      cacheUpdate[propertyId] = Object.freeze(propertyData);
    }
    return cacheUpdate;
  }
}

export default new PropertyDataCache();
