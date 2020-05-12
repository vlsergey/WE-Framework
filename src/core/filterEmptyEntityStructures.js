// @flow

import { entries } from 'utils/ObjectUtils';

const ok = x => typeof x !== 'undefined' && x !== null;

function filterEmptyAliases( aliases : AliasesType ) {
  const result : AliasesType = ( {} : any );
  entries( aliases ).forEach( ( [ langCode, langCodeAliases ] ) => {
    if ( ! Array.isArray( langCodeAliases ) )
      return;

    const langAliases = langCodeAliases
      .filter( alias => typeof alias.value === 'string' )
      .filter( alias => alias.value.trim() !== '' );
    if ( langAliases.length > 0 ) {
      result[ langCode ] = langAliases;
    }
  } );
  return result;
}

function filterEmptyClaims( claims : ClaimsType ) {
  const result = {};
  entries( claims ).forEach( ( [ propertyId, claimsArray ] ) => {
    if ( !Array.isArray( claimsArray ) )
      return;

    const propertyClaims = claimsArray
      .filter( claim => !isSnakEmtpy( claim.mainsnak ) )
      .map( claim => {
        const oldQualifiers = claim.qualifiers;
        if ( typeof oldQualifiers !== 'object' )
          return claim;

        const newQualifiers : ?QualifiersType = filterSnaksMap( claim.qualifiers );
        if ( !newQualifiers || Object.keys( newQualifiers ).length === 0 ) {
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
        if ( !oldReferences ) return claim;

        const newReferences = oldReferences.filter( ok )
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

function filterEmptyLabelalikes( labelalikes : DescriptionsType | LabelsType ) {
  const result = {};
  Object.keys( labelalikes ).forEach( langCode => {
    if ( typeof labelalikes[ langCode ].value === 'string'
        && labelalikes[ langCode ].value.trim() !== '' ) {
      result[ langCode ] = labelalikes[ langCode ];
    }
  } );
  return result;
}

type FilterSnaksMapArg = SnaksType | QualifiersType;
function filterSnaksMap( snaksMap : ?FilterSnaksMapArg ) : ?FilterSnaksMapArg {
  if ( !snaksMap ) return undefined;

  const result = {};
  let resultIsEmpty = true;
  entries( snaksMap ).forEach( ( [ propertyId, snaksArray ] ) => {
    if ( !Array.isArray( snaksArray ) ) return;

    const propertySnaks = snaksArray
      .filter( snak => !isSnakEmtpy( snak ) );

    if ( propertySnaks.length > 0 ) {
      result[ propertyId ] = propertySnaks;
      resultIsEmpty = false;
    }
  } );

  if ( resultIsEmpty ) return; // undefined
  return result;
}

export default function filterEmptyEntityStructures( entity : EntityType ) {
  return {
    ...entity,
    labels: entity.labels ? filterEmptyLabelalikes( entity.labels ) : undefined,
    descriptions: entity.descriptions ? filterEmptyLabelalikes( entity.descriptions ) : undefined,
    aliases: entity.aliases ? filterEmptyAliases( entity.aliases ) : undefined,
    claims: entity.claims ? filterEmptyClaims( entity.claims ) : undefined,
  };
}

function isStringBlank( str : ?string ) {
  if ( !str ) return true;
  return str.trim() === '';
}

function isNumberDefined( number : ?number ) {
  return typeof number !== 'undefined' && number !== null;
}

function isSnakEmtpy( snak : ?SnakType ) {
  if ( !snak ) return true;
  if ( snak.snaktype !== 'value' )
    return false;

  const { datavalue } = snak;
  if ( !datavalue ) return true;

  const value = datavalue.value;
  if ( !datavalue || !value ) return true;

  switch ( datavalue.type ) {
  case 'monolingualtext':
    return isStringBlank( value.text ) || isStringBlank( value.language );
  case 'string':
    return isStringBlank( value );
  case 'time':
    return isStringBlank( value.time ) || isStringBlank( value.calendarmodel );
  case 'wikibase-entityid':
    return !isNumberDefined( value[ 'numeric-id' ] ) || isStringBlank( value[ 'entity-type' ] );
  default:
    return false;
  }
}
