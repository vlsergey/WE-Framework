// @flow

import { filterClaimsByRank, findClaimQualifiers, findEntityIdsFromClaims,
  findEntityIdsFromQualifiers, findStringsFromClaims,
  findStringsFromQualifiers, getStringFromSnak } from 'model/ModelUtils';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';

const claimHasMainsnakValue = statement => statement.mainsnak
    && statement.mainsnak.datavalue
    && statement.mainsnak.datavalue.value;

function findSingleStatementByEntityIdValue( entity, property, entityId ) {
  if ( !entity.claims || !entity.claims[ property ] ) {
    return null;
  }
  const claims = entity.claims[ property ];

  // TODO: make use of rank
  const candidates = claims
    .filter( statement =>
      statement.mainsnak
        && statement.mainsnak.datavalue
        && statement.mainsnak.datavalue.value
        && statement.mainsnak.datavalue.value.id === entityId );

  if ( candidates.length === 1 ) {
    return candidates[ 0 ];
  }

  return null;
}

function getWikibaseItemRestrictions(
    propertyEntity : PropertyType,
    restrictionId : string,
    valuePropertyId : string
) : string[] {
  const statement = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', restrictionId );
  if ( !statement ) return [];
  return findEntityIdsFromQualifiers( statement, valuePropertyId );
}

function getStringRestriction( propertyEntity, restrictionId, valuePropertyId ) {
  const statement = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', restrictionId );
  if ( !statement )
    return null;

  if ( !statement.qualifiers
      || !statement.qualifiers[ valuePropertyId ]
      || statement.qualifiers[ valuePropertyId ].length !== 1
      || !statement.qualifiers[ valuePropertyId ][ 0 ].datavalue
      || !statement.qualifiers[ valuePropertyId ][ 0 ].datavalue.value )
    return null;

  return statement.qualifiers[ valuePropertyId ][ 0 ].datavalue.value;
}

export type FormatterUrlData = {
  regexp : ?string,
  urlTemplate : string,
};

/**
 * Little data extraction from PropertyType that small enought
   and can be serialized to IndexDb as JSON
 */
export default class PropertyData {

  datatype : string;
  id : string;
  lastrevid : ?number;
  pageid : ?number;

  labels : {| [string] : string |};
  descriptions : {| [string] : string |};

  allowedQualifiers : string[];
  countries : string[];
  formatterUrls : FormatterUrlData[];
  oneOf : ?( string[] );
  quantityUnitEnabled : ?boolean;
  quantityUnits : ?( string[] );
  regexp : ?string;
  sourceWebsites : string[];
  sourceWebsitesLanguages : ?string[];
  valueTypeConstraint : ?( {
    instanceOf? : ?( string[] ),
  } );

  constructor( propertyEntity : PropertyType ) {
    if ( !propertyEntity.id ) throw new Error( 'Missing property id in PropertyType: ' + JSON.stringify( propertyEntity ) );

    this.id = propertyEntity.id;
    this.datatype = propertyEntity.datatype;
    this.pageid = propertyEntity.pageid;
    this.lastrevid = propertyEntity.lastrevid;

    this.labels = ( {} : any );
    const entityLabels = propertyEntity.labels;
    if ( entityLabels ) {
      DEFAULT_LANGUAGES.forEach( code => {
        const labelObject : ?LabelalikeType = entityLabels[ code ];
        if ( labelObject && labelObject.value ) {
          this.labels[ code ] = labelObject.value;
        }
      } );
    }

    this.descriptions = ( {} : any );
    const entityDescriptions = propertyEntity.descriptions;
    if ( entityDescriptions ) {
      DEFAULT_LANGUAGES.forEach( code => {
        const labelObject : ?LabelalikeType = entityDescriptions[ code ];
        if ( labelObject && labelObject.value ) {
          this.descriptions[ code ] = labelObject.value;
        }
      } );
    }

    this.allowedQualifiers = getWikibaseItemRestrictions( propertyEntity, 'Q21510851', 'P2306' );
    this.countries = findEntityIdsFromClaims( propertyEntity, 'P17' );

    this.formatterUrls = [];
    filterClaimsByRank( ( propertyEntity.claims || {} ).P1630 ).forEach( statement => {
      const urlTemplate = getStringFromSnak( statement.mainsnak ) || null;
      const regexp = findStringsFromQualifiers( statement, 'P1793' )[ 0 ] || null;

      if ( urlTemplate ) {
        const data : FormatterUrlData = { urlTemplate, regexp };
        this.formatterUrls.push( data );
      }
    } );

    findStringsFromClaims( propertyEntity, 'P1630' );

    const oneOfConstrains = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21510859' );
    if ( oneOfConstrains ) {
      this.oneOf = findEntityIdsFromQualifiers( oneOfConstrains, 'P2305' );
    } else {
      this.oneOf = null;
    }

    this.quantityUnitEnabled = false;
    this.quantityUnits = undefined;
    const unitRestriction = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21514353' );
    if ( unitRestriction ) {
      const qualifiers : QualifierType[] = findClaimQualifiers( unitRestriction, 'P2305' );
      this.quantityUnitEnabled = !( qualifiers.length === 1 && qualifiers[ 0 ].snaktype === 'novalue' );
      this.quantityUnits = findEntityIdsFromQualifiers( unitRestriction, 'P2305' );
    } else {
      this.quantityUnitEnabled = false;
      this.quantityUnits = null;
    }

    this.regexp = getStringRestriction( propertyEntity, 'Q21502404', 'P1793' );

    this.sourceWebsites = findStringsFromClaims( propertyEntity, 'P1896' );
    this.sourceWebsitesLanguages = filterClaimsByRank( ( propertyEntity.claims || {} ).P1896 )
      .filter( claimHasMainsnakValue )
      .flatMap( claim => findEntityIdsFromQualifiers( claim, 'P407' ) );

    this.valueTypeConstraint = null;
    const valueTypeConstraint = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21510865' );
    if ( valueTypeConstraint ) {
      const classes : string[] = findEntityIdsFromQualifiers( valueTypeConstraint, 'P2308' );
      const relations : string[] = findEntityIdsFromQualifiers( valueTypeConstraint, 'P2309' );

      // instance of
      if ( relations.length === 1 && relations[ 0 ] === 'Q21503252' && classes.length !== 0 ) {
        this.valueTypeConstraint = {
          instanceOf: classes,
        };
      }
    }
  }

}
