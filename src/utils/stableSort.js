export default function stableSort<T>( arr : T[], cmp : ( T, T ) => number ) : T[] {
  const stabilizedThis : [T, number][] = arr.map( ( el, index ) => [ el, index ] );
  const stableCmp = ( a, b ) => {
    const order = cmp( a[ 0 ], b[ 0 ] );
    if ( order !== 0 ) return order;
    return a[ 1 ] - b[ 1 ];
  };
  stabilizedThis.sort( stableCmp );
  for ( let i = 0; i < arr.length; i++ ) {
    arr[ i ] = stabilizedThis[ i ][ 0 ];
  }
  return arr;
}
