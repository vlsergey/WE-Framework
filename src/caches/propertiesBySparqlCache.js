import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';

const TYPE = 'PROPERTIESBYSPARQL';

class PropertiesBySparqlCache extends AbstractQueuedCacheWithPostcheck {

  constructor() {
    super( TYPE, true, 1 );
  }

  notifyMessage( cacheKeys ) {
    return 'Executing SPARQL query: ' + cacheKeys[ 0 ];
  }

  buildRequestPromice( cacheKeys ) {
    const url = 'https://query.wikidata.org/sparql?query='
      + encodeURIComponent( cacheKeys[ 0 ] );
    return fetch( url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    } )
      .then( body => body.json() );
  }

  convertResultToEntities( result, [ sparql ] ) {
    const [ columnName ] = result.head.vars;

    const propertyIds = result.results.bindings.map( binding => {
      const { type } = binding[ columnName ];
      if ( type != 'uri' ) {
        throw new Error( 'SPARQL result column type must be \'uri\'' );
      }
      const { value } = binding[ columnName ];
      if ( !value.startsWith( 'http://www.wikidata.org/entity/P' ) ) {
        throw new Error( 'SPARQL result column value must start \'http://www.wikidata.org/entity/P\'' );
      }
      return value.substr( 'http://www.wikidata.org/entity/'.length );
    } );

    /* eslint no-undef: 0 */
    if ( process.env.NODE_ENV !== 'production' ) {
      if ( propertyIds.length !== new Set( propertyIds ).size ) {
        mw.log.warn( 'SPARQL result has non-distinct values' );
        mw.log.warn( sparql );
        mw.log.warn( propertyIds );
      }
    }

    return {
      [ sparql ]: propertyIds,
    };
  }

}

const instance = new PropertiesBySparqlCache();
export default instance;
