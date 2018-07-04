
function filterEmptyAliases( aliases ) {
  const result = {};
  Object.keys( aliases ).forEach( langCode => {
    if ( ! Array.isArray( aliases[ langCode ] ) )
      return;

    const langAliases = aliases[ langCode ]
      .filter( alias => typeof alias.value === 'string' )
      .filter( alias => alias.value.trim() !== '' );
    if ( langAliases.length > 0 ) {
      result[ langCode ] = langAliases;
    }
  } );
  return result;
}

function filterEmptyClaims( claims ) {
  const result = {};
  Object.keys( claims ).forEach( propertyId => {
    if ( !Array.isArray( claims[ propertyId ] ) )
      return;

    const propertyClaims = claims[ propertyId ]
      .filter( claim => !isSnakEmtpy( claim.mainsnak ) )
      .map( claim => {
        const oldQualifiers = claim.qualifiers;
        if ( typeof oldQualifiers !== 'object' )
          return claim;

        const newQualifiers = filterEmptyQualifiers( claim.qualifiers );
        if ( typeof oldQualifiers !== 'object' || Object.keys( newQualifiers ) === 0 ) {
          const newClaim = { ...claim };
          delete newClaim.qualifiers;
          return newClaim;
        }
        return {
          ...claim,
          qualifiers: newQualifiers,
        };
      } );

    if ( propertyClaims.length > 0 ) {
      result[ propertyId ] = propertyClaims;
    }
  } );
  return result;
}

function filterEmptyLabelalikes( labelalikes ) {
  const result = {};
  Object.keys( labelalikes ).forEach( langCode => {
    if ( typeof labelalikes[ langCode ].value === 'string'
        && labelalikes[ langCode ].value.trim() !== '' ) {
      result[ langCode ] = labelalikes[ langCode ];
    }
  } );
  return result;
}

function filterEmptyQualifiers( qualifiers ) {
  if ( typeof qualifiers === 'undefined' )
    return undefined;

  const result = {};
  Object.keys( qualifiers ).forEach( propertyId => {
    if ( !Array.isArray( qualifiers[ propertyId ] ) )
      return;

    const propertyQualifiers = qualifiers[ propertyId ]
      .filter( qualifier => !isSnakEmtpy( qualifier ) );

    if ( propertyQualifiers.length > 0 ) {
      result[ propertyId ] = propertyQualifiers;
    }
  } );
  return result;
}

export default function filterEmptyEntityStructures( entity ) {
  return {
    ...entity,
    labels: entity.labels ? filterEmptyLabelalikes( entity.labels ) : undefined,
    descriptions: entity.descriptions ? filterEmptyLabelalikes( entity.descriptions ) : undefined,
    aliases: entity.aliases ? filterEmptyAliases( entity.aliases ) : undefined,
    claims: entity.claims ? filterEmptyClaims( entity.claims ) : undefined,
  };
}

function isStringBlank( str ) {
  if ( typeof str === 'undefined' || str === null )
    return true;
  if ( typeof str !== 'string' )
    throw new Error( 'provided argument is not string: ' + JSON.stringify( str ) );
  return str.trim() === '';
}

function isNumberDefined( number ) {
  if ( typeof number === 'undefined' || number === null )
    return false;
  return true;
}

function isSnakEmtpy( snak ) {
  if ( snak.snaktype !== 'value' )
    return false;

  const datavalue = snak.datavalue;
  if ( typeof datavalue === 'undefined' || datavalue === null
      || typeof datavalue.value === 'undefined' || datavalue.value === null )
    return true;

  switch ( datavalue.type ) {
  case 'monolingualtext':
    return isStringBlank( datavalue.value.text ) || isStringBlank( datavalue.value.language );
  case 'string':
    return isStringBlank( datavalue.value );
  case 'time':
    return isStringBlank( datavalue.value.time ) || isStringBlank( datavalue.value.calendarmodel );
  case 'wikibase-entityid':
    return !isNumberDefined( datavalue.value[ 'numeric-id' ] ) || isStringBlank( datavalue.value[ 'entity-type' ] );
  default:
    return false;
  }
}
