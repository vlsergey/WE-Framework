import {getWikidataApi} from '../core/ApiUtils';
import {API_PARAMETER_LANGUAGES} from '../utils/I18nUtils';
import AbstractQueuedCache from './AbstractQueuedCache';
import LabelDescription from './LabelDescription';

const TYPE = 'LABELDESCRIPTIONS';

export type CacheType = Record<string, LabelDescription>;

class LabelDescriptionCache
  extends AbstractQueuedCache<LabelDescription, any, LabelDescription> {

  constructor () {
    super(TYPE, false, 50);
  }

  override isKeyValid (cacheKey: string): boolean {
    return typeof cacheKey === 'string' && !!/^[PQ](\d+)$/i.exec(cacheKey);
  }

  override notifyMessage (cacheKeys: string[]) {
    return 'Fetching ' + cacheKeys.length + ' item(s) labels and descriptions from Wikidata';
  }

  override buildRequestPromice (cacheKeys: string[]): Promise<WbGetEntitiesActionResult> {
    return getWikidataApi()
      .getPromise({
        action: 'wbgetentities',
        languages: API_PARAMETER_LANGUAGES,
        languagefallback: true,
        props: 'labels|descriptions',
        ids: cacheKeys.join('|'),
      });
  }

  override convertResultToEntities (result: WbGetEntitiesActionResult) {
    const cacheUpdate: CacheType = {};
    for (const [entityId, entity] of Object.entries(result.entities)) {
      const labelDescription = new LabelDescription(entity);
      cacheUpdate[entityId] = labelDescription;
    }
    return cacheUpdate;
  }

}

export default new LabelDescriptionCache();
