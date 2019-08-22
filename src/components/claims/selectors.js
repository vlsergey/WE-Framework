import { defaultMemoize } from 'reselect';
import stableSort from 'utils/stableSort';

const ok = x => x !== undefined && x !== null;
const EMPTY_ARRAY = [];

const MAX_COLUMNS = 2;

const PREDEFINED_SORT = [
  'P580', // start time
  'P585', // point in time
  'P582', // end time
];

export const claimColumnsF = () => {

  const sortColumns = defaultMemoize( columns => stableSort( columns, ( c1, c2 ) => {
    let o1 = PREDEFINED_SORT.indexOf( c1 );
    o1 = o1 === -1 ? PREDEFINED_SORT.length : o1;
    let o2 = PREDEFINED_SORT.indexOf( c2 );
    o2 = o2 === -1 ? PREDEFINED_SORT.length : o2;
    return o1 === o2 ? 0 : o1 > o2 ? +1 : -1;
  } ) );

  return defaultMemoize( claims => {
    if ( claims.length < 5 ) {
      return EMPTY_ARRAY;
    }

    const qualifierStats : Map< string, number > = new Map();
    claims
      .map( claim => claim.qualifiers ).filter( ok )
      .forEach( qualifiers => Object.keys( qualifiers )
        .forEach( ( propertyId : string ) => {
          const plus = ( qualifiers[ propertyId ] || EMPTY_ARRAY ).length > 0 ? 1 : 0;
          qualifierStats.set( propertyId, ( qualifierStats.get( propertyId ) || 0 ) + plus );
        } )
      );

    const columns = [];
    while ( columns.length < MAX_COLUMNS && qualifierStats.size !== 0 ) {
      const qualifierCounts : number[] = [ ...qualifierStats.values() ];
      const allValues = qualifierCounts.sort( ( a : number, b : number ) => b - a );
      const [ max ] = allValues;
      if ( max < claims.length / 5.0 ) break;

      const countOfMax = allValues.filter( item => item === max ).length;
      if ( columns.length + countOfMax > MAX_COLUMNS ) break;

      [ ...qualifierStats.keys() ]
        .filter( propertyId => qualifierStats.get( propertyId ) === max )
        .forEach( propertyId => {
          columns.push( propertyId );
          qualifierStats.delete( propertyId );
        } );
    }

    return sortColumns( columns );
  } ); };
