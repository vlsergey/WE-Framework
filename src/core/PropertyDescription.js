// @flow

import * as I18nUtils from 'utils/I18nUtils';
import { filterClaimsByRank, findClaimQualifiers, findEntityIdsFromClaims,
  findEntityIdsFromQualifiers, findStringsFromClaims,
  findStringsFromQualifiers, getStringFromSnak } from 'model/ModelUtils';
import { values } from 'utils/ObjectUtils';

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

class UrlFormatter {

  _format : ?string;
  _regexp : ?string;

  constructor( statement : ClaimType ) {
    this._format = getStringFromSnak( statement.mainsnak ) || null;
    this._regexp = findStringsFromQualifiers( statement, 'P1793' )[ 0 ] || null;
  }

  hasRegexp() {
    return !!this._regexp;
  }

  isCompliant( value : string ) {
    return !this._regexp || new RegExp( '^' + this._regexp + '$' ).test( value );
  }

  format( value : string ) : ?string {
    return this._format ? this._format.replace( /\$1/g, value ) : null;
  }

}

const claimHasMainsnakValue = statement => statement.mainsnak
    && statement.mainsnak.datavalue
    && statement.mainsnak.datavalue.value;

export default class PropertyDescription {

  static VERSION = 2;

  static deserialize( json : any ) {
    if ( json === undefined || json === null ) return json;

    Object.setPrototypeOf( json, PropertyDescription.prototype );
    if ( json.urlFormatters )
      json.urlFormatters.forEach( obj => Object.setPrototypeOf( obj, UrlFormatter.prototype ) );
  }

  allowedQualifiers : string[];
  countries : string[];
  countryFlags : ?string[];
  datatype : string;
  description : ?string;
  id : string;
  label : ?string;
  languageCodes : string[];
  languageIds : string[];
  lastrevid : ?number;
  oneOf : ?( string[] );
  pageid : ?number;
  quantityUnitEnabled : ?boolean = false;
  quantityUnits : ?( string[] );
  regexp : ?string;
  sourceWebsites : string[];
  sourceWebsitesLanguages : ?string[];
  valueTypeConstraint : ?( {
    instanceOf? : ?( string[] ),
  } );

  version : number;
  urlFormatters : UrlFormatter[];

  constructor( propertyEntity : PropertyType ) {
    if ( !propertyEntity.id ) throw new Error( 'Missing property id in PropertyType: ' + JSON.stringify( propertyEntity ) );

    this.id = propertyEntity.id;
    this.version = PropertyDescription.VERSION;
    this.datatype = propertyEntity.datatype;
    this.pageid = propertyEntity.pageid;
    this.lastrevid = propertyEntity.lastrevid;

    const translations = {};

    if ( propertyEntity.labels ) {
      values( propertyEntity.labels ).forEach( ( label : LabelalikeType ) => {
        translations[ label.language ] = {
          ...translations[ label.language ],
          label: label.value,
        };
      } );
    }

    if ( propertyEntity.descriptions ) {
      values( propertyEntity.descriptions ).forEach( ( description : LabelalikeType ) => {
        translations[ description.language ] = {
          ...translations[ description.language ],
          description: description.value,
        };
      } );
    }

    const translated = I18nUtils.localize( {}, translations );
    if ( translated.label ) this.label = translated.label;
    if ( translated.description ) this.description = translated.description;

    this.allowedQualifiers = getWikibaseItemRestrictions( propertyEntity, 'Q21510851', 'P2306' );
    this.countries = findEntityIdsFromClaims( propertyEntity, 'P17' );

    this.languageIds = [];
    this.languageCodes = [];

    if ( propertyEntity.claims && propertyEntity.claims.P1630 ) {
      this.urlFormatters = filterClaimsByRank( propertyEntity.claims.P1630 )
        .filter( claimHasMainsnakValue )
        .map( statement => new UrlFormatter( statement ) );
    } else {
      this.urlFormatters = [];
    }

    const oneOfConstrains = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21510859' );
    if ( oneOfConstrains ) {
      this.oneOf = findEntityIdsFromQualifiers( oneOfConstrains, 'P2305' );
    }

    const unitRestriction = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21514353' );
    if ( unitRestriction ) {
      const qualifiers : QualifierType[] = findClaimQualifiers( unitRestriction, 'P2305' );
      this.quantityUnitEnabled = !( qualifiers.length === 1 && qualifiers[ 0 ].snaktype === 'novalue' );
      this.quantityUnits = findEntityIdsFromQualifiers( unitRestriction, 'P2305' );
    }

    this.regexp = getStringRestriction( propertyEntity, 'Q21502404', 'P1793' );

    this.sourceWebsites = findStringsFromClaims( propertyEntity, 'P1896' );
    this.sourceWebsitesLanguages = filterClaimsByRank( ( propertyEntity.claims || {} ).P1896 )
      .filter( claimHasMainsnakValue )
      .flatMap( claim => findEntityIdsFromQualifiers( claim, 'P407' ) );

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

  formatUrl( value : ?string ) {
    if ( value === null || value === '' )
      return '';

    if ( typeof value !== 'string' )
      return;

    const formatter = this.urlFormatters.find( formatter => formatter.isCompliant( value ) );
    if ( formatter )
      return formatter.format( value );
  }

}
