import Batcher from '@vlsergey/batcher';
import {cacheValuesHookFactory, cacheValuesProviderFactory,
  CacheWithIndexedDb} from '@vlsergey/react-indexdb-cache';

import {getWikidataApi} from '../core/ApiUtils';
import {filterClaimsByRank} from '../model/ModelUtils';
import isNotNull from '../utils/isNotNull';
import isOkay from '../utils/isOkay';
import lastRevisionCache from "./LastRevisionCache";

const PROPERTIES_TO_CACHE = [
  'P17', // country
  'P37', // official language
  'P41', // flag image
  'P424', // Wikimedia language code
] as const;
type SUPORTED_PROPERTY_ID = typeof PROPERTIES_TO_CACHE[number];

const EMPTY_ARRAY = [] as const;

export type Item = Partial<Record<SUPORTED_PROPERTY_ID, readonly string[]>> & {
  lastrevid?: number;
  pageid?: number;
};

export const buildStringCacheValuesFromEntity = (entity: EntityType): Item => {

  const entityResult: Item = {
    lastrevid: entity.lastrevid,
    pageid: entity.pageid,
  };

  PROPERTIES_TO_CACHE.forEach(propertyId => {
    if (!entity.claims) {
      entityResult[propertyId] = EMPTY_ARRAY;
      return;
    }

    const values: string[] = filterClaimsByRank(entity?.claims?.[propertyId])
      .map(claim => claim.mainsnak).filter(isOkay)
      .map(mainsnak => mainsnak.datavalue).filter(isOkay)
      .map(datavalue => {
        switch (datavalue.type) {
        case 'string':
          return datavalue.value;
        case 'wikibase-entityid':
          return datavalue.value?.id as string;
        default:
          return null;
        }
      })
      .filter(isNotNull);

    entityResult[propertyId] = values;
  });
  return entityResult;
};

const batchLoader = async (entityIds: string[]): Promise<(Item | undefined)[]> => {
  console.debug('Fetching', entityIds.length, 'item(s) major properties from Wikidata');

  const apiResult = await getWikidataApi()
    .getPromise<WbGetEntitiesActionResult>({
      action: 'wbgetentities',
      props: 'claims|info',
      ids: entityIds.join('|'),
    });

  return entityIds
    .map(entityId => apiResult.entities[entityId])
    .map(entity => entity === undefined ? undefined : buildStringCacheValuesFromEntity(entity));
};

const batcher = new Batcher<string, Item | undefined>(batchLoader, {
  maxBatchSize: 10
});

async function postCheck(entityId: string, value : Item | undefined) {
  if (!value?.pageid) return;

  if (await lastRevisionCache.queue(value.pageid) != value.lastrevid)
    void stringPropertyValuesCache.requeue(entityId);
}

export const stringPropertyValuesCache = new CacheWithIndexedDb<string, Item, Item>({
  databaseName: 'WEF_CACHE_STRINGPROPERTYVALUES',
  onDbLoad: postCheck,
  loader: (entityId: string) => batcher.queue(entityId),
  onError: (entityId: string, err: unknown) =>
  { console.warn('Unable to load string values for', entityId, 'due to', err); },
});

export type CacheData = Readonly<Record<string, Item>>;
export const StringPropertyValuesProvider = cacheValuesProviderFactory(stringPropertyValuesCache);
export const useStringPropertyValues = cacheValuesHookFactory(stringPropertyValuesCache);
