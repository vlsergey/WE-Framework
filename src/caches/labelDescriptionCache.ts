import Batcher from '@vlsergey/batcher';
import {cacheValueHookFactory, cacheValueProviderFactory, cacheValuesHookFactory, cacheValuesProviderFactory,
  MemoryOnlyCache} from '@vlsergey/react-indexdb-cache';

import {getWikidataApi} from '../core/ApiUtils';
import {API_PARAMETER_LANGUAGES} from '../utils/I18nUtils';
import LabelDescription from './LabelDescription';

const batchLoader = async (entityIds: string[]): Promise<LabelDescription[]> => {
  console.debug('Load', entityIds.length, ' labels and descriptions from Wikidata', entityIds);

  const apiResult = await getWikidataApi().getPromise<WbGetEntitiesActionResult>({
    action: 'wbgetentities',
    languages: API_PARAMETER_LANGUAGES,
    languagefallback: true,
    props: 'labels|descriptions',
    ids: entityIds.join('|'),
  });

  const result: LabelDescription[] = [];
  entityIds.forEach((entityId, index) => {
    const entity = apiResult.entities[entityId];
    if (!entity) return;
    result[index] = new LabelDescription(entity);
  });
  return result;
};

const batcher = new Batcher<string, LabelDescription>(batchLoader);

export const labelDescriptionCache = new MemoryOnlyCache({
  loader: (entityId: string) => batcher.queue(entityId),
  onError: (entityId: string, err: unknown) =>
  { console.warn('Unable to load LabelDescription for', entityId, 'due to', err); },
});

export const LabelDescriptionProvider = cacheValueProviderFactory(labelDescriptionCache);
export const LabelDescriptionsProvider = cacheValuesProviderFactory(labelDescriptionCache);
export const useLabelDescription = cacheValueHookFactory(labelDescriptionCache);
export const useLabelDescriptions = cacheValuesHookFactory(labelDescriptionCache);
