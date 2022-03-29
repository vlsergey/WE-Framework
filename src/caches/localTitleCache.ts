import Batcher from '@vlsergey/batcher';
import {cacheValueHookFactory, cacheValueProviderFactory, cacheValuesHookFactory, cacheValuesProviderFactory,
  MemoryOnlyCache} from '@vlsergey/react-indexdb-cache';

import {getWikidataApi} from '../core/ApiUtils';

const wgDBname = mw.config.get('wgDBname');

const batchLoader = async (entityIds: string[]): Promise<(string | undefined)[]> => {
  console.debug('Fetching', entityIds.length, ' item(s) local titles from Wikidata', entityIds);

  const apiResult = await getWikidataApi()
    .getPromise<WbGetEntitiesActionResult>({
      action: 'wbgetentities',
      props: 'sitelinks',
      sitefilter: wgDBname,
      ids: entityIds.join('|'),
    });

  return entityIds.map(entityId =>
    apiResult.entities[entityId]?.sitelinks?.[wgDBname]?.title);
};

const batcher = new Batcher<string, string | undefined>(batchLoader, {
  maxBatchSize: 50
});

export const localTitleCache = new MemoryOnlyCache({
  loader: (entityId: string) => batcher.queue(entityId),
  onError: (entityId: string, err: unknown) =>
  { console.warn('Unable to load local title for', entityId, 'due to', err); },
});

export const LocalTitleProvider = cacheValueProviderFactory(localTitleCache);
export const LocalTitlesProvider = cacheValuesProviderFactory(localTitleCache);
export const useLocalTitle = cacheValueHookFactory(localTitleCache);
export const useLocalTitles = cacheValuesHookFactory(localTitleCache);
