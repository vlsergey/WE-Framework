// @flow

import { getEntityIdFromSnak } from 'model/ModelUtils';

const localStorage = window.localStorage || {
  _cache: {},
  getItem( key ) { return this._cache[ key ]; },
  setItem( key, value ) { this._cache[ key ] = value; },
};
const LSKEY = 'WEF_LRU_REFERENCES';
const MAX_ITEMS = 10;

function get() : any[] {
  const json = localStorage.getItem( LSKEY );
  if ( !json ) return [];
  try {
    const result : any[] = JSON.parse( json );
    return result;
  } catch ( err ) {
    mw.log.warn( 'Unable to parse local storage copy of LRU cache' );
    mw.log.warn( err );
    return [];
  }
}

function set( obj : any ) {
  localStorage.setItem( LSKEY, JSON.stringify( obj ) );
}

const ok = x => x !== undefined && x !== null;

export function onReferenceUpdate( reference : ?ReferenceType ) {
  if ( !reference ) return;

  const entityIds = ( ( reference.snaks || {} ).P248 || [] )
    .map( snak => getEntityIdFromSnak( snak ) )
    .filter( ok );
  if ( entityIds.length !== 1 ) return;

  const [ entityId ] = entityIds;

  const oldStorage = get();
  set( [
    {
      key: entityId,
      value: reference,
    },
    ...oldStorage
      .filter( item => item.key !== entityId )
      .slice( 0, MAX_ITEMS - 1 ),
  ] );
}

export function getLastRecentlyUsedReferences() {
  return Object.freeze( get() );
}
