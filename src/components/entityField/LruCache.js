import expect from 'expect';

const MAX_ITEMS_TO_REMEMBER = 10;

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let dbConnection = null;

if ( indexedDB ) {
  const dbOpenRequest = indexedDB.open( 'WEF_WIKIBASE_ITEM_LRU', 1 );
  dbOpenRequest.onerror = function( err ){
    mw.log.warn( 'Unable to open indexedDB' );
    mw.log.warn( err );
  };
  dbOpenRequest.onsuccess = () => {
    console.debug( 'Successfully open indexedDB connection for database WEF_EXTERNAL_ID_LRU' );
    dbConnection = dbOpenRequest.result;
  };
  dbOpenRequest.onupgradeneeded = event => {
    const db = event.target.result;
    db.createObjectStore( 'LRU' );
  };
}

export function findLastRecentlyUsed( propertyId ) {
  if ( !indexedDB || !dbConnection ) return Promise.resolve( [] );

  return new Promise( ( resolve, reject ) => {
    const transaction = dbConnection.transaction( [ 'LRU' ], 'readonly' );
    const objectStore = transaction.objectStore( 'LRU' );
    const request = objectStore.get( propertyId );
    request.onsuccess = () => resolve( Array.isArray( request.result )
      ? request.result.filter( item => item.match( /^Q\d+$/ ) )
      : null );
    request.onerror = () => reject( request.error );
  } );
}

export function addLastRecentlyUsed( propertyId, value ) {
  expect( value ).toBeA( 'string' );
  expect( value ).toMatch( /^Q\d+$/ );
  if ( !indexedDB || !dbConnection ) return;

  const transaction = dbConnection.transaction( [ 'LRU' ], 'readwrite' );
  const objectStore = transaction.objectStore( 'LRU' );

  return new Promise( ( resolve, reject ) => {
    const readRequest = objectStore.get( propertyId );
    readRequest.onerror = () => reject( readRequest.error );
    readRequest.onsuccess = () => {
      const previous = readRequest.result;
      let newValue;
      if ( typeof previous === 'object' && Array.isArray( previous ) ) {
        if ( previous.indexOf( value ) === -1 ) {
          newValue = [ value, ...previous ].slice( 0, MAX_ITEMS_TO_REMEMBER );
        } else {
          newValue = [ value, ...previous.filter( item => item !== value ) ];
        }
      } else {
        newValue = [ value ];
      }
      const writeRequest = objectStore.put( newValue, propertyId );
      writeRequest.onerror = () => reject( writeRequest.error );
      writeRequest.onsuccess = () => {
        resolve();
      };
    };
  } );
}
