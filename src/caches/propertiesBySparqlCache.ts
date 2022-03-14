import AbstractQueuedCache from './AbstractQueuedCache';

const TYPE = 'PROPERTIESBYSPARQL';

class PropertiesBySparqlCache extends AbstractQueuedCache<string[], any, string[]> {

  SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
  ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';

  constructor () {
    super(TYPE, true, 1);
  }

  override notifyMessage (cacheKeys: string[]): string {
    return 'Executing SPARQL query: ' + cacheKeys[0];
  }

  override async buildRequestPromice (cacheKeys: string[]): Promise< any > {
    const url = this.SPARQL_ENDPOINT + '?query='
      + encodeURIComponent(cacheKeys[0] as string);
    const body = await fetch(url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    });
    return await body.json();
  }

  override convertResultToEntities (result: any, [sparql]: string[]): Record<string, string[]> {
    const [columnName] = result.head.vars;

    const propertyIds: string[] = result.results.bindings.map((binding: any) => {
      const {type} = binding[columnName];
      if (type != 'uri') {
        throw new Error('SPARQL result column type must be \'uri\'');
      }
      const {value} = binding[columnName];
      if (!value.startsWith(`${this.ENTITY_URL_PREFIX}P`)) {
        throw new Error(`SPARQL result column value must start '${this.ENTITY_URL_PREFIX}P'`);
      }
      return value.substr(this.ENTITY_URL_PREFIX.length);
    });

    /* eslint no-undef: 0 */
    if (process.env.NODE_ENV !== 'production') {
      if (propertyIds.length !== new Set(propertyIds).size) {
        mw.log.warn('SPARQL result has non-distinct values');
        mw.log.warn(sparql);
        mw.log.warn(propertyIds);
      }
    }

    return {
      [sparql as string]: propertyIds,
    };
  }

}

const instance = new PropertiesBySparqlCache();
export default instance;
