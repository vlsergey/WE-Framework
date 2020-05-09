// @flow

export function filterClaimsByRank( claims : ?ClaimType[] ) : ClaimType[] {
  if ( !claims ) return [];

  const preferred = claims.filter( claim => claim.rank === 'preferred' );
  if ( preferred.length > 0 ) return preferred;

  return claims.filter( claim => claim.rank === 'normal' );
}

export function getEntityIdFromClaim( claim ) : ?string {
  if ( typeof claim == 'undefined' )
    return;

  return getEntityIdFromSnak( claim.mainsnak );
}

export function getEntityIdFromDatavalue( datavalue ) : ?string {
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
