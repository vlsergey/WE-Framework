import Batcher from '@vlsergey/batcher';
import {cacheValueHookFactory, cacheValuesHookFactory, cacheValuesProviderFactory, CacheWithIndexedDb} from '@vlsergey/react-indexdb-cache';

import {getWikidataApi} from '../core/ApiUtils';
import PropertyData from '../core/PropertyData';
import {API_PARAMETER_LANGUAGES} from '../utils/I18nUtils';
import lastRevisionCache from './LastRevisionCache';

export type CacheType = Record<string, PropertyData>;

const batchLoader = async (cacheKeys: string[]): Promise<(Readonly<PropertyData> | undefined)[]> => {
  console.debug('Fetching', cacheKeys.length, 'property descriptions from Wikidata');

  const apiResult = await getWikidataApi()
    .getPromise<WbGetEntitiesActionResult>({
      action: 'wbgetentities',
      languages: API_PARAMETER_LANGUAGES,
      languagefallback: true,
      props: 'claims|datatype|labels|descriptions|info',
      ids: cacheKeys.join('|'),
    });

  return cacheKeys
    .map(propertyId => apiResult?.entities?.[propertyId])
    .map(entity => !entity ? undefined : Object.freeze(new PropertyData(entity as PropertyType)));
};

const batcher = new Batcher<string, Readonly<PropertyData> | undefined>(batchLoader, {
  maxBatchSize: 50
});

async function postCheck (propertyId: string, value: Readonly<PropertyData> | undefined) {
  if (!value?.pageid) return;

  if (await lastRevisionCache.queue(value.pageid) != value.lastrevid)
    void propertiesDataCache.requeue(propertyId);
}

export const propertiesDataCache = new CacheWithIndexedDb<string, PropertyData, Readonly<PropertyData>>({
  databaseName: 'WEF_CACHE_PROPERTYDATA',
  restoreAfterDb: dbValue => {
    Object.setPrototypeOf(dbValue, PropertyData.prototype);
    return dbValue;
  },
  onDbLoad: postCheck,
  loader: (entityId: string) => batcher.queue(entityId),
  onError: (entityId: string, err: unknown) =>
  { console.warn('Unable to load string values for', entityId, 'due to', err); },
});

export type CacheData = Readonly<Record<string, Readonly<PropertyData>>>;
export const PropertiesDataProvider = cacheValuesProviderFactory(propertiesDataCache);
export const usePropertyData = cacheValueHookFactory(propertiesDataCache);
export const usePropertiesData = cacheValuesHookFactory(propertiesDataCache);

export default propertiesDataCache;
