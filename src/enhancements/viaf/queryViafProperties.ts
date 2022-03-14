const SPARQL_ENDPOINT : string = 'https://query.wikidata.org/sparql';
const ENTITY_URL_PREFIX : string = 'http://www.wikidata.org/entity/';

export default async function queryViafProperties() : Promise< Map< string, string > > {
  const sparql : string = 'SELECT ?code ?property WHERE { ?property p:P1552 ?statement. ?statement ps:P1552 wd:Q26921380. ?statement pq:P3295 ?code. } ORDER BY ?code';
  const url : string = SPARQL_ENDPOINT + '?query=' + encodeURIComponent( sparql );
  const response = await fetch( url, {
    headers: {
      Accept: 'application/sparql-results+json',
    },
  } );
  if ( !response.ok ) throw new Error( 'Unable to fetch VIAF properties list from Wikidata Query Service: ' + response.statusText );

  const json = await response.json();
  return parseResponse( json );
}

export function parseResponse( json : any ) : Map< string, string > {
  const [ codeColumn, propertyColumn ] = json.head.vars;
  const entries : [string, string][] = json.results.bindings.map( (binding : any) => {
    const code : string = binding[ codeColumn ].value;

    const propertyValue : string = binding[ propertyColumn ].value;
    if ( !propertyValue.startsWith( `${ENTITY_URL_PREFIX}P` ) ) {
      throw new Error( `SPARQL result property column value must start '${ENTITY_URL_PREFIX}P'` );
    }
    const propertyId = propertyValue.substr( ENTITY_URL_PREFIX.length );

    return [ code, propertyId ];
  } );
  const result : Map< string, string > = new Map( entries );
  return result;
}
