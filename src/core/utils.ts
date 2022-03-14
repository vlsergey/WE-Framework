export function isEmpty( str : null | string | undefined ) {
  if ( !str ) return true;
  return !str || str.trim() === '';
}
