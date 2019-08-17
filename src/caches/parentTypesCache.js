import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';

const TYPE = 'PARENTTYPES';

class ParentTypesCache extends AbstractQueuedCacheWithPostcheck {
  SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
  ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';
  ENTITY_PREFIX = 'wd:';
  SUBCLASS_PROP = 'wdt:P279';

  constructor() {
    super( TYPE, true, 1 );
  }

  notifyMessage( [ typeId ] ) {
    return 'Selecting parent types of ' + typeId;
  }

  buildRequestPromice( [ typeId ] ) {
    const url = this.SPARQL_ENDPOINT + '?query='
      + encodeURIComponent( `SELECT DISTINCT ?type WHERE { ${this.ENTITY_PREFIX}${typeId} ${this.SUBCLASS_PROP}* ?type . }` );
    return fetch( url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    } )
      .then( body => body.json() );
  }

  convertResultToEntities( result, [ typeId ] ) {
    const [ columnName ] = result.head.vars;

    const typeIds = result.results.bindings.map( binding => {
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

    /* eslint no-undef: 0 */
    if ( process.env.NODE_ENV !== 'production' ) {
      if ( typeIds.length !== new Set( typeIds ).size ) {
        mw.log.warn( 'SPARQL result has non-distinct values' );
        mw.log.warn( sparql );
        mw.log.warn( typeIds );
      }
    }

    return {
      [ typeId ]: typeIds,
    };
  }

}

const instance = new ParentTypesCache();
export default instance;
