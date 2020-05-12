// @flow

export function filterClaimsByRank( claims : ?ClaimType[] ) : ClaimType[] {
  if ( !claims ) return [];

  const preferred = claims.filter( claim => claim.rank === 'preferred' );
  if ( preferred.length > 0 ) return preferred;

  return claims.filter( claim => claim.rank === 'normal' );
}

export function findEntityIdsFromClaims( entity : EntityType, claimId : string ) : string[] {
  return findSafeValuesFromClaims( entity, claimId, getEntityIdFromSnak );
}

export function findStringsFromClaims( entity : EntityType, claimId : string ) : string[] {
  return findSafeValuesFromClaims( entity, claimId, getStringFromSnak );
}

export function findEntityIdsFromQualifiers( claim : ClaimType, qualifierId : string ) : string[] {
  return findSafeValuesFromQualifiers( claim, qualifierId, getEntityIdFromSnak );
}

export function findStringsFromQualifiers( claim : ClaimType, qualifierId : string ) : string[] {
  return findSafeValuesFromQualifiers( claim, qualifierId, getStringFromSnak );
}

function findSafeValuesFromClaims<T>(
    entity : EntityType,
    claimId : string,
    snak2value : ( SnakType => ?T )
) : T[] {
  const allClaims = entity.claims;
  if ( !allClaims ) return [];

  const claims : ?( ClaimType[] ) = allClaims[ claimId ];
  if ( !claims ) return [];

  const selectedClaims : ClaimType[] = filterClaimsByRank( claims );
  const result : T[] = [];
  for ( const claim of selectedClaims ) {
    const mainSnak : ?SnakType = claim.mainsnak;
    if ( !mainSnak ) continue;
    const value : ?T = snak2value( mainSnak );
    if ( value === undefined || value === null ) continue;
    result.push( value );
  }
  return result;
}

export function findClaimQualifiers( claim : ClaimType, qualifierId : string ) : QualifierType[] {
  const allQualifiers : ?QualifiersType = claim.qualifiers;
  if ( !allQualifiers ) return [];

  const qualifiers : ?( QualifierType[] ) = allQualifiers[ qualifierId ];
  if ( !qualifiers ) return [];

  return qualifiers;
}

function findSafeValuesFromQualifiers<T>(
    claim : ClaimType,
    qualifierId : string,
    snak2value : ( SnakType => ?T )
) : T[] {
  const qualifiers : QualifierType[] = findClaimQualifiers( claim, qualifierId );

  const result : T[] = [];
  const snaksWithValue : QualifierType[] = qualifiers.filter( qualifier => qualifier.snaktype === 'value' );
  for ( const qSnak of snaksWithValue ) {
    if ( qSnak.property !== qualifierId ) continue;
    const value : ?T = snak2value( qSnak );
    if ( value === undefined || value === null ) continue;
    result.push( value );
  }
  return result;
}

export function getEntityIdFromClaim( claim : ?ClaimType ) : ?string {
  if ( !claim ) return null;
  return getEntityIdFromSnak( claim.mainsnak );
}

export function getEntityIdFromDatavalue( datavalue : ?DataValueType ) : ?string {
  if ( !datavalue || !datavalue.value ) return null;
  if ( datavalue.type !== 'wikibase-entityid' ) return null;

  const value : WikibaseEntityIdValueType = datavalue.value;
  if ( value.id ) return value.id;

  if ( !datavalue.value[ 'entity-type' ] || !datavalue.value[ 'numeric-id' ] )
    return null;

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

export function getEntityIdFromSnak( snak : ?SnakType ) : ?string {
  return getValueFromSnak( snak, getEntityIdFromDatavalue );
}

export function getStringFromSnak( snak : ?SnakType ) : ?string {
  return getValueFromSnak( snak, x => x.value );
}

function getValueFromSnak<T>(
    snak : ?SnakType,
    dataValue2Value : DataValueType => ?T
) : ?T {
  if ( !snak ) return null;
  if ( snak.snaktype !== 'value' ) return null;
  if ( !snak.datavalue ) return null;

  return dataValue2Value( snak.datavalue );
}

const ENTITY_TYPES = Object.freeze( {
  Q: 'item',
  P: 'property',
} );

export function toWikibaseEntityIdValue(
    entityId : string
) : WikibaseEntityIdValueType {
  const entityType : ?EntityTypeEnum = ENTITY_TYPES[ entityId[ 0 ] ];
  if ( !entityType ) throw new Error( 'Unknown entity type: ' + entityId );

  return {
    'entity-type': entityType,
    'numeric-id': Number( entityId.substr( 1 ) ),
    'id': entityId,
  };
}
