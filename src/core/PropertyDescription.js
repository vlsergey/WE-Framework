import * as I18nUtils from 'utils/I18nUtils';
import expect from 'expect';
import { filterClaimsByRank } from 'model/ModelUtils';

const ok = x => typeof x !== 'undefined' && x != null;

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

function getWikibaseItemRestrictions( propertyEntity, restrictionId, valuePropertyId ) {
  const statement = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', restrictionId );
  if ( !statement )
    return [];

  if ( !statement.qualifiers || !statement.qualifiers[ valuePropertyId ] )
    return [];

  const ok = x => typeof x !== 'undefined' && x !== null;
  return statement.qualifiers[ valuePropertyId ]
    .map( qualifier => qualifier.datavalue ).filter( ok )
    .map( datavalue => datavalue.value ).filter( ok )
    .map( value => value.id ).filter( ok );
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

  constructor( statement ) {
    this._format = statement.mainsnak.datavalue.value;

    if ( statement.qualifiers
        && statement.qualifiers.P1793
        && statement.qualifiers.P1793.length === 0
        && statement.qualifiers.P1793[ 0 ].datavalue
        && statement.qualifiers.P1793[ 0 ].datavalue.value ) {
      this._regexp = statement.qualifiers.P1793[ 0 ].datavalue.value;
    } else {
      this._regexp = null;
    }
  }

  hasRegexp() {
    return !!this._regexp;
  }

  isCompliant( value ) {
    return !this._regexp || new RegExp( '^' + this._regexp + '$' ).test( value );
  }

  format( value ) {
    return this._format.replace( /\$1/g, value );
  }

}

const claimHasMainsnakValue = statement => statement.mainsnak
    && statement.mainsnak.datavalue
    && statement.mainsnak.datavalue.value;


export default class PropertyDescription {

  static VERSION = 2;

  static deserialize( json ) {
    if ( json === undefined || json === null ) return json;

    Object.setPrototypeOf( json, PropertyDescription.prototype );
    if ( json.urlFormatters )
      json.urlFormatters.forEach( obj => Object.setPrototypeOf( obj, UrlFormatter.prototype ) );
  }

  constructor( propertyEntity ) {
    expect( propertyEntity ).toBeAn( 'object' );
    expect( propertyEntity.id ).toBeA( 'string', 'Missing ID in property entity object' );
    expect( propertyEntity.datatype ).toBeA( 'string', 'Missing datatype in property entity object' );

    this.id = propertyEntity.id;
    this.version = PropertyDescription.VERSION;
    this.datatype = propertyEntity.datatype;
    this.pageid = propertyEntity.pageid;
    this.lastrevid = propertyEntity.lastrevid;

    const translations = {};

    if ( propertyEntity.labels ) {
      Object.values( propertyEntity.labels ).forEach( label => {
        translations[ label.language ] = {
          ...translations[ label.language ],
          label: label.value,
        };
      } );
    }

    if ( propertyEntity.descriptions ) {
      Object.values( propertyEntity.descriptions ).forEach( description => {
        translations[ description.language ] = {
          ...translations[ description.language ],
          description: description.value,
        };
      } );
    }

    const translated = I18nUtils.localize( {}, translations );
    for ( const k in translated )
      this[ k ] = translated[ k ];

    this.allowedQualifiers = getWikibaseItemRestrictions( propertyEntity, 'Q21510851', 'P2306' );

    this.countries = filterClaimsByRank( propertyEntity.claims.P17 )
      .filter( claimHasMainsnakValue )
      .map( claim => claim.mainsnak.datavalue.value.id );

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
      const oneOfSnaks =
        [ oneOfConstrains.qualifiers ].filter( ok )
          .flatMap( qualifiers => qualifiers.P2305 ).filter( ok );

      this.oneOf = oneOfSnaks
        .filter( qualifier => qualifier.snaktype === 'value' )
        .map( qualifier => qualifier.datavalue ).filter( ok )
        .map( datavalue => datavalue.value ).filter( ok )
        .map( value => value.id ).filter( ok );
    }

    const unitRestriction = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21514353' );
    if ( unitRestriction ) {
      const quantityUnitsSnaks =
        [ unitRestriction.qualifiers ].filter( ok )
          .flatMap( qualifiers => qualifiers.P2305 ).filter( ok );

      this.quantityUnitEnabled = !( quantityUnitsSnaks.length === 1 && quantityUnitsSnaks[ 0 ].snaktype === 'novalue' );
      this.quantityUnits = quantityUnitsSnaks
        .filter( qualifier => qualifier.snaktype === 'value' )
        .map( qualifier => qualifier.datavalue ).filter( ok )
        .map( datavalue => datavalue.value ).filter( ok )
        .map( value => value.id ).filter( ok );
    }

    this.regexp = getStringRestriction( propertyEntity, 'Q21502404', 'P1793' );

    this.sourceWebsites = filterClaimsByRank( ( propertyEntity.claims || {} ).P1896 )
      .filter( claimHasMainsnakValue )
      .map( statement => statement.mainsnak.datavalue.value );

    this.sourceWebsitesLanguages = filterClaimsByRank( ( propertyEntity.claims || {} ).P1896 )
      .filter( claimHasMainsnakValue )
      .filter( claim => claim.qualifiers && claim.qualifiers.P407 )
      .map( claim => claim.qualifiers.P407 )
      .flatMap( qualifiers => qualifiers
        .filter( qualifier => qualifier && qualifier.datavalue && qualifier.datavalue.value && qualifier.datavalue.value.id )
        .map( qualifier => qualifier.datavalue.value.id ) );


    const valueTypeConstraint = findSingleStatementByEntityIdValue( propertyEntity, 'P2302', 'Q21510865' );
    if ( valueTypeConstraint ) {
      const classes =
        [ valueTypeConstraint.qualifiers ].filter( ok )
          .flatMap( qualifiers => qualifiers.P2308 ).filter( ok )
          .filter( qualifier => qualifier && qualifier.datavalue && qualifier.datavalue.value && qualifier.datavalue.value.id )
          .map( qualifier => qualifier.datavalue.value.id );
      const relations =
        [ valueTypeConstraint.qualifiers ].filter( ok )
          .flatMap( qualifiers => qualifiers.P2309 ).filter( ok )
          .filter( qualifier => qualifier && qualifier.datavalue && qualifier.datavalue.value && qualifier.datavalue.value.id )
          .map( qualifier => qualifier.datavalue.value.id );

      // instance of
      if ( relations.length === 1 && relations[ 0 ] === 'Q21503252' && classes.length !== 0 ) {
        this.valueTypeConstraint = {
          instanceOf: classes,
        };
      }
    }
  }

  formatUrl( value ) {
    if ( value === null || value === '' )
      return '';

    if ( typeof value !== 'string' )
      return;

    const formatter = this.urlFormatters.find( formatter => formatter.isCompliant( value ) );
    if ( formatter )
      return formatter.format( value );
  }

  hasLookupUrl( entity ) {
    return I18nUtils.DEFAULT_LANGUAGES.findFirst( code => !!entity.labels[ code ] ) != null && this.sourceWebsites.length > 0;
  }

  getLookupUrl( entity ) {
    const langCode = I18nUtils.DEFAULT_LANGUAGES.findFirst( code => entity.labels && entity.labels[ code ] );
    const label = entity.labels[ langCode ].value;

    return 'https://www.google.ru/search?q=site%3A' + this.sourceWebsites[ 0 ] + ' ' + label;
  }

}
