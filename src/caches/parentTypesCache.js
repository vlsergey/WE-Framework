import AbstractQueuedCacheWithPostcheck from './AbstractQueuedCacheWithPostcheck';

const TYPE = 'PARENTTYPES';

class ParentTypesCache extends AbstractQueuedCacheWithPostcheck {

  constructor() {
    super( TYPE, true, 1 );
  }

  notifyMessage( [ typeId ] ) {
    return 'Selecting parent types of ' + typeId;
  }

  buildRequestPromice( [ typeId ] ) {
    const url = 'https://query.wikidata.org/sparql?query='
      + encodeURIComponent( 'SELECT DISTINCT ?type WHERE { wd:' + typeId + ' wdt:P279* ?type . }' );
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
      if ( !value.startsWith( 'http://www.wikidata.org/entity/Q' ) ) {
        throw new Error( 'SPARQL result column value must start \'http://www.wikidata.org/entity/Q\'' );
      }
      return value.substr( 'http://www.wikidata.org/entity/'.length );
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
