import expect from 'expect';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const compare = indexedDB ? indexedDB.cmp.bind( indexedDB ) : undefined;

export default function findByKeysInObjectStore( objectStore, unsortedKeys ) {
  expect( objectStore ).toBeA( IDBObjectStore );
  expect( unsortedKeys ).toBeAn( 'array' );

  return new Promise( ( resolve, reject ) => {
    const sortedKeys = [ ...unsortedKeys ].sort( compare );
    let index = 0;

    const result = {};
    const keyRange = IDBKeyRange.bound( sortedKeys[ 0 ], sortedKeys[ sortedKeys.length - 1 ] );

    const request = objectStore.openCursor( keyRange );

    request.onsuccess = event => {
      const cursor = event.target.result;

      if ( cursor ) {
        if ( cursor.key === sortedKeys[ index ] && cursor.value ) {
          result[ sortedKeys[ index ] ] = cursor.value;
        }
        while ( index < sortedKeys.length
            && compare( sortedKeys[ index ], cursor.key ) <= 0 ) {
          index++;
        }
      }

      if ( cursor && index < sortedKeys.length ) {
        cursor.continue( sortedKeys[ index ] );
        return;
      }

      resolve( result );
    };

    request.onerror = reject;
  } );
}
