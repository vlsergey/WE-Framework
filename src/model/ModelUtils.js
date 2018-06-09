
export function getEntityIdFromClaim( claim ) {
  if ( typeof claim == 'undefined' )
    return;

  return getEntityIdFromSnak( claim.mainsnak );
}

/** @returns {String} */
export function getEntityIdFromDatavalue( datavalue ) {
  if ( typeof datavalue === 'undefined' //
      || typeof datavalue.value === 'undefined'//
      || typeof datavalue.value[ 'entity-type' ] === 'undefined'//
      || typeof datavalue.value[ 'numeric-id' ] === 'undefined'//
  )
    return;

  const entityType = datavalue.value[ 'entity-type' ];
  const numericId = datavalue.value[ 'numeric-id' ];

  switch ( entityType ) {
  case 'property':
    return 'P' + numericId;
  case 'item':
    return 'Q' + numericId;
  default:
    throw new Error( 'Unknown entity type: ' + entityType );
  }
}

function getEntityIdFromSnak( snak ) {
  if ( typeof snak === 'undefined' )
    return;

  return getEntityIdFromDatavalue( snak.datavalue );
}
