import Batcher from '@vlsergey/batcher';
import {cacheValueHookFactory, cacheValueProviderFactory, cacheValuesHookFactory, CacheWithIndexedDb} from '@vlsergey/react-indexdb-cache';

const SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
const ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';

const batchLoader = async ([sparql]: string[]): Promise<string[][]> => {
  console.debug('Executing SPARQL query:', sparql);

  const url = SPARQL_ENDPOINT + '?query=' + encodeURIComponent(sparql!);
  const body = await fetch(url, {
    headers: {
      Accept: 'application/sparql-results+json',
    },
  });
  const apiResult = await body.json();

  const [columnName] = apiResult.head.vars;

  const propertyIds: string[] = apiResult.results.bindings.map((binding: any) => {
    const {type} = binding[columnName];
    if (type != 'uri') {
      throw new Error('SPARQL result column type must be \'uri\'');
    }
    const {value} = binding[columnName];
    if (!value.startsWith(`${ENTITY_URL_PREFIX}P`)) {
      throw new Error(`SPARQL result column value must start '${ENTITY_URL_PREFIX}P'`);
    }
    return value.substr(ENTITY_URL_PREFIX.length);
  });

  /* eslint no-undef: 0 */
  if (process.env.NODE_ENV !== 'production') {
    if (propertyIds.length !== new Set(propertyIds).size) {
      mw.log.warn('SPARQL result has non-distinct values');
      mw.log.warn(sparql);
      mw.log.warn(propertyIds);
    }
  }

  return [propertyIds];
};

// we use batcher to limit number of concurrent queries
const batcher = new Batcher<string, string[]>(batchLoader, {
  maxBatchSize: 1
});

export const propertiesBySparqlCache = new CacheWithIndexedDb<string, string[], string[]>({
  databaseName: 'WEF_CACHE_PROPERTIESBYSPARQL',
  loader: (typeId: string) => batcher.queue(typeId),
  onError: (typeId: string, err: unknown) =>
  { console.warn('Unable to load parent types for', typeId, 'due to', err); },
});

export const PropertiesBySparqlProvider = cacheValueProviderFactory(propertiesBySparqlCache);
export const usePropertiesBySparql = cacheValueHookFactory(propertiesBySparqlCache);
export const usePropertiesBySparqls = cacheValuesHookFactory(propertiesBySparqlCache);
