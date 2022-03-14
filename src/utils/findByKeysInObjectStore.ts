// @ts-ignore
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

export default function findByKeysInObjectStore( objectStore : IDBObjectStore, unsortedKeys : string[] ) : Promise< { [key : string] : any } > {
  const compare = indexedDB.cmp.bind( indexedDB );

  if ( unsortedKeys.length === 0 ) {
    return Promise.resolve( {} );
  }

  return new Promise( ( resolve, reject ) => {
    const sortedKeys = [ ...unsortedKeys ].sort( compare );
    let index = 0;

    const result = {} as { [key : string] : any };
    const keyRange = IDBKeyRange.bound( sortedKeys[ 0 ], sortedKeys[ sortedKeys.length - 1 ] );

    const request = objectStore.openCursor( keyRange );

    request.onsuccess = (event : any) => {
      const cursor = event.target.result;

      if ( cursor ) {
        if ( cursor.key === sortedKeys[ index ] && cursor.value ) {
          result[ sortedKeys[ index ] as string ] = cursor.value;
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
