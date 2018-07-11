import AbstractQueuedCache from './AbstractQueuedCache';

const TYPE = 'PROPERTIESBYSPARQL';

class PropertiesBySparqlCache extends AbstractQueuedCache {

  constructor() {
    super( TYPE, true, 50 );
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
    const columnName = result.head.vars[ 0 ];

    const propertyIds = result.results.bindings.map( binding => {
      const type = binding[ columnName ].type;
      if ( type != 'uri' ) {
        throw new Error( 'SPARQL result column type must be \'uri\'' );
      }
      const value = binding[ columnName ].value;
      if ( !value.startsWith( 'http://www.wikidata.org/entity/P' ) ) {
        throw new Error( 'SPARQL result column value must start \'http://www.wikidata.org/entity/P\'' );
      }
      return value.substr( 'http://www.wikidata.org/entity/'.length );
    } );

    return {
      [ sparql ]: propertyIds,
    };
  }

}

const instance = new PropertiesBySparqlCache();
export default instance;
