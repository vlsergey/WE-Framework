// @flow


export function isEmpty( str ) {
  if ( typeof str === 'undefined' )
    return true;
  if ( typeof str === 'string' || str instanceof String ) {
    return !str || str.trim() === '';
  }
  // $FlowFixMe
  throw new Error( 'Passed argument is not a string: ' + str );
}
