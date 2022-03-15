import {getWikidataApi} from '../core/ApiUtils';
import {filterClaimsByRank} from '../model/ModelUtils';
import isNotNull from '../utils/isNotNull';
import isOkay from '../utils/isOkay';
import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';

const TYPE = 'STRINGPROPERTYVALUES';

type SUPORTED_PROPERTY_ID = 'P17' | 'P37' | 'P41' | 'P424';

const PROPERTIES_TO_CACHE: SUPORTED_PROPERTY_ID[] = [
  'P17', // country
  'P37', // official language
  'P41', // flag image
  'P424', // Wikimedia language code
];

const EMPTY_ARRAY = Object.freeze([]);

export type Item = Partial<Record<SUPORTED_PROPERTY_ID, string[]>> & {
  lastrevid?: number;
  pageid?: number;
};

export const buildStringCacheValuesFromEntity = (entity: EntityType) => {

  const entityResult: Item = {
    lastrevid: entity.lastrevid,
    pageid: entity.pageid,
  };

  PROPERTIES_TO_CACHE.forEach(propertyId => {
    if (!entity.claims) {
      // @ts-expect-error
      entityResult[propertyId] = EMPTY_ARRAY;
      return;
    }

    const values: string[] = filterClaimsByRank(entity?.claims?.[propertyId])
      .map(claim => claim.mainsnak).filter(isOkay)
      .map(mainsnak => mainsnak.datavalue).filter(isOkay)
      .map(datavalue => {
        switch (datavalue.type) {
        case 'string':
          return datavalue.value as string;
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

class StringPropertyValuesCache
  extends AbstractQueuedCacheWithPostcheck<Item, any, Item> {

  constructor () {
    super(TYPE, true, 10);
  }

  override isKeyValid (cacheKey: string): boolean {
    return typeof cacheKey === 'string' && !!/^[PQ](\d+)$/i.exec(cacheKey);
  }

  override notifyMessage (cacheKeys: string[]): string {
    return 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata';
  }

  override buildRequestPromice (cacheKeys: string[]) {
    return getWikidataApi()
      .getPromise({
        action: 'wbgetentities',
        props: 'claims|info',
        ids: cacheKeys.join('|'),
      });
  }

  override convertResultToEntities (result: {entities: Record<string, EntityType>}) {
    const cacheUpdate: Record<string, Item> = {};
    Object.entries(result.entities).forEach(([entityId, entity]) => {
      cacheUpdate[entityId] = buildStringCacheValuesFromEntity(entity);
    });
    return cacheUpdate;
  }

}

const instance = new StringPropertyValuesCache();
export default instance;
