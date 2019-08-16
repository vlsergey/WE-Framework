import expect from 'expect';

const ok = x => typeof x !== 'undefined' && x !== null;

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

        const newQualifiers = filterSnaksMap( claim.qualifiers );
        if ( typeof newQualifiers !== 'object' || Object.keys( newQualifiers ).length === 0 ) {
          const newClaim = { ...claim };
          delete newClaim.qualifiers;
          return newClaim;
        }
        return {
          ...claim,
          qualifiers: newQualifiers,
        };
      } )
      .map( claim => {
        const oldReferences = claim.references;
        if ( typeof oldReferences !== 'object' )
          return claim;

        const newReferences = claim.references.filter( ok )
          .map( ref => {
            const snaks = filterSnaksMap( ref.snaks );
            if ( !snaks ) return;
            return { ...ref, snaks };
          } ).filter( ok );
        if ( newReferences.length === 0 ) {
          const newClaim = { ...claim };
          delete newClaim.references;
          return newClaim;
        }
        return {
          ...claim,
          references: newReferences,
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

function filterSnaksMap( snaksMap ) {
  if ( typeof snaksMap === 'undefined' )
    return undefined;
  expect( snaksMap ).toBeAn( 'object' );

  const result = {};
  let resultIsEmpty = true;
  Object.keys( snaksMap )
    .forEach( propertyId => {
      if ( !Array.isArray( snaksMap[ propertyId ] ) )
        return;

      const propertySnaks = snaksMap[ propertyId ]
        .filter( snak => !isSnakEmtpy( snak ) );

      if ( propertySnaks.length > 0 ) {
        result[ propertyId ] = propertySnaks;
        resultIsEmpty = false;
      }
    } );

  if ( resultIsEmpty ) return; // undefined
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
  return typeof number !== 'undefined' && number !== null;
}

function isSnakEmtpy( snak ) {
  if ( snak.snaktype !== 'value' )
    return false;

  const { datavalue } = snak;
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
