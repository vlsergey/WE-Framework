import expect from 'expect';

const localStorage = window.localStorage || {
  _cache: {},
  getItem( key ) { return this._cache[ key ];},
  setItem( key, value ) { this._cache[ key ] = value; },
};
const LSKEY = 'WEF_LRU_REFERENCES';
const MAX_ITEMS = 10;

function get() {
  const json = localStorage.getItem( LSKEY );
  if ( !json ) return [];
  try {
    const result = JSON.parse( json );
    expect( result ).toBeAn( 'array' );
    return result;
  } catch ( err ) {
    mw.log.warn( 'Unable to parse local storage copy of LRU cache' );
    mw.log.warn( err );
    return [];
  }
}

function set( obj ) {
  localStorage.setItem( LSKEY, JSON.stringify( obj ) );
}

const ok = x => x !== undefined && x !== null;

export function onReferenceUpdate( reference ) {
  if ( !reference ) return;

  const entityIds = ( ( reference.snaks || {} ).P248 || [] ).filter( ok )
    .map( snak => snak.datavalue ).filter( ok )
    .map( datavalue => datavalue.value ).filter( ok )
    .map( value => value.id ).filter( ok );
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
