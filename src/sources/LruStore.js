// @flow

const isBlank = str => str === undefined || str === null || str.trim() === '';

const EMPTY_ARRAY = [];

const ENABLED = window.localStorage !== undefined && window.localStorage !== null;

const MAX_ENTRIES = 10;

export function add( entityId : string ) : void {
  if ( !ENABLED ) return;

  const existing = get();
  const newSources = [ entityId, ...existing.filter( item => item !== entityId ) ]
    .slice( 0, MAX_ENTRIES );

  window.localStorage.setItem( 'WEF_LatestUsedSources', newSources.join( ',' ) );
}

export function get() : string[] {
  if ( !ENABLED ) return EMPTY_ARRAY;

  const serialized = window.localStorage.getItem( 'WEF_LatestUsedSources' );
  if ( isBlank( serialized ) ) return EMPTY_ARRAY;

  const already = new Set();

  return serialized.split( ',', 10 )
    .filter( item => /^Q\d+$/.test( item ) )
    .filter( item => {
      if ( already.has( item ) ) return false;
      already.add( item );
      return true;
    } );
}
