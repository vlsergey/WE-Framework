import { defaultMemoize } from 'reselect';

const ok = x => x !== undefined && x !== null;
const EMPTY_ARRAY = [];

const MAX_COLUMNS = 2;

export const claimColumnsF = () => defaultMemoize( claims => {
  if ( claims.length < 5 ) {
    return EMPTY_ARRAY;
  }

  const qualifierStats = {};
  claims
    .map( claim => claim.qualifiers ).filter( ok )
    .forEach( qualifiers => Object.keys( qualifiers )
      .forEach( propertyId => {
        const plus = ( qualifiers[ propertyId ] || EMPTY_ARRAY ).length > 0 ? 1 : 0;
        qualifierStats[ propertyId ] = ( qualifierStats[ propertyId ] || 0 ) + plus;
      } )
    );

  const columns = [];
  while ( columns.length < MAX_COLUMNS && Object.keys( qualifierStats ).length !== 0 ) {
    const allValues = [ ...Object.values( qualifierStats ) ].sort( ( a, b ) => b - a );
    const max = allValues[ 0 ];
    if ( max < claims.length / 5.0 ) break;

    const countOfMax = allValues.filter( item => item === max ).length;
    if ( columns.length + countOfMax > MAX_COLUMNS ) break;

    Object.keys( qualifierStats )
      .filter( propertyId => qualifierStats[ propertyId ] === max )
      .forEach( propertyId => {
        columns.push( propertyId );
        delete qualifierStats[ propertyId ];
      } );
  }

  // const sorted = columns = columns.map( c => Number(c.substr(1)) ).sort().map( c=> 'P' + c);
  return columns;
} );
