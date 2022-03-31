import Batcher from '@vlsergey/batcher';
import {cacheValueHookFactory, cacheValueProviderFactory, cacheValuesHookFactory, cacheValuesProviderFactory,
  CacheWithIndexedDb} from '@vlsergey/react-indexdb-cache';

const SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
const ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';
const ENTITY_PREFIX = 'wd:';
const SUBCLASS_PROP = 'wdt:P279';

const batchLoader = async ([typeId]: string[]): Promise<string[][]> => {
  console.debug('Selecting parent types of', typeId);

  const sparql = `SELECT DISTINCT ?type WHERE { ${ENTITY_PREFIX}${typeId} ${SUBCLASS_PROP}* ?type . }`;
  const url = SPARQL_ENDPOINT + '?query=' + encodeURIComponent(sparql);
  const body = await fetch(url, {
    headers: {
      Accept: 'application/sparql-results+json',
    },
  });
  const apiResult: any = body.json();

  const [columnName] = apiResult.head.vars;

  const typeIds: string[] = apiResult.results.bindings.map((binding: any) => {
    const {type} = binding[columnName];
    if (type != 'uri') {
      throw new Error('SPARQL result column type must be \'uri\'');
    }
    const {value} = binding[columnName];
    if (!value.startsWith(`${ENTITY_URL_PREFIX}Q`)) {
      throw new Error(`SPARQL result column value must start '${ENTITY_URL_PREFIX}Q'`);
    }
    return value.substr(ENTITY_URL_PREFIX.length);
  });

  if (process.env.NODE_ENV !== 'production') {
    if (typeIds.length !== new Set(typeIds).size) {
      mw.log.warn('DISTINCT-SPARQL query has non-distinct values: ');
      mw.log.warn(typeIds);
    }
  }

  return [typeIds];
};

// we use batcher to limit number of concurrent queries
const batcher = new Batcher<string, string[]>(batchLoader, {
  maxBatchSize: 1
});

export const typeParentTypesCache = new CacheWithIndexedDb<string, string[], string[]>({
  databaseName: 'WEF_CACHE_PARENTTYPES',
  loader: (typeId: string) => batcher.queue(typeId),
  onError: (typeId: string, err: unknown) =>
  { console.warn('Unable to load parent types for', typeId, 'due to', err); },
});

export const TypeParentTypeProvider = cacheValueProviderFactory(typeParentTypesCache);
export const TypeParentTypesProvider = cacheValuesProviderFactory(typeParentTypesCache);
export const useTypeParentTypes = cacheValueHookFactory(typeParentTypesCache);
export const useTypesParentTypes = cacheValuesHookFactory(typeParentTypesCache);
