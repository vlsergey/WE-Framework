// @flow

export function isEmpty( str : ?string ) {
  if ( !str ) return true;
  return !str || str.trim() === '';
}
