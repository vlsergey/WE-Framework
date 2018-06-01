
export function filterClaims( entity, code ) {
  const isPropertyEditor = /^P\d+$/i.test( code );
  const isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( code );

  /* Main property ID */
  /** @type {string} */
  let propertyId;
  let requiredPropertyValue;
  let requiredQualifier;

  if ( isPropertyEditor ) {
    const test = code.match( /^P(\d+)$/i );
    propertyId = 'P' + test[ 1 ];
    requiredPropertyValue = undefined;
    requiredQualifier = undefined;
  } else if ( isQualifierEditor ) {
    const test = code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
    propertyId = 'P' + test[ 1 ];
    requiredPropertyValue = 'Q' + test[ 2 ];
    requiredQualifier = 'P' + test[ 3 ];
  } else {
    throw new Error( 'Unsupported code: ' + code );
  }

  if ( typeof claims === 'undefined' || typeof entity.claims[ propertyId ] === 'undefined' ) {
    return [];
  }

  /** @type {WEF_Claim[]} */
  const byPropertyId = entity.claims[ propertyId ];

  if ( isPropertyEditor ) {
    return byPropertyId;
  }

  if ( isQualifierEditor ) {
    const result = [];
    byPropertyId.forEach( ( claim ) => {
      const entityId = getEntityIdFromClaim( claim );
      if ( typeof entityId !== 'undefined' && entityId === requiredPropertyValue && //
              typeof claim.qualifiers[ requiredQualifier ] !== 'undefined' && claim.qualifiers[ requiredQualifier ].length == 1 ) {
        result.push( claim );
      }
    } );
    return result;
  }

  throw new Error( 'Illegal state' );
}

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
