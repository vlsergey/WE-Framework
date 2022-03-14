import AbstractQueuedCache from './AbstractQueuedCache';

const TYPE = 'PARENTTYPES';

class ParentTypesCache extends AbstractQueuedCache<string[], any, string[]> {
  SPARQL_ENDPOINT : string = 'https://query.wikidata.org/sparql';
  ENTITY_URL_PREFIX : string = 'http://www.wikidata.org/entity/';
  ENTITY_PREFIX : string = 'wd:';
  SUBCLASS_PROP : string = 'wdt:P279';

  constructor() {
    super( TYPE, true, 1 );
  }

  override notifyMessage( [ typeId ] : string[] ) {
    return 'Selecting parent types of ' + typeId;
  }

  override async buildRequestPromice( [ typeId ] : string[] ) {
    const sparql = `SELECT DISTINCT ?type WHERE { ${this.ENTITY_PREFIX}${typeId} ${this.SUBCLASS_PROP}* ?type . }`;
    const url = this.SPARQL_ENDPOINT + '?query=' + encodeURIComponent( sparql );
    const body = await fetch(url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    });
    return body.json();
  }

  override convertResultToEntities( result : any, [ typeId ] : string[] ) {
    const [ columnName ] = result.head.vars;

    const typeIds : string[] = result.results.bindings.map( (binding : any) => {
      const { type } = binding[ columnName ];
      if ( type != 'uri' ) {
        throw new Error( 'SPARQL result column type must be \'uri\'' );
      }
      const { value } = binding[ columnName ];
      if ( !value.startsWith( `${this.ENTITY_URL_PREFIX}Q` ) ) {
        throw new Error( `SPARQL result column value must start '${this.ENTITY_URL_PREFIX}Q'` );
      }
      return value.substr( this.ENTITY_URL_PREFIX.length );
    } );

    if ( process.env.NODE_ENV !== 'production' ) {
      if ( typeIds.length !== new Set( typeIds ).size ) {
        mw.log.warn( 'DISTINCT-SPARQL query has non-distinct values: ' );
        mw.log.warn( typeIds );
      }
    }

    return {
      [ typeId as string ]: typeIds,
    };
  }

}

const instance = new ParentTypesCache();
export default instance;
