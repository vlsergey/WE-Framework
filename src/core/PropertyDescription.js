import * as I18nUtils from '../utils/I18nUtils';


// TODO: test this method
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
  
  if ( candidates.length == 1 ) {
    return candidates[ 0 ];
  }
  
  return null;
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

export default class PropertyDescription {

  constructor( propertyEntity ) {
    this.datatype = propertyEntity.datatype;

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

    this.regexp = getStringRestriction( propertyEntity, 'Q21502404', 'P1793' );
  }
  
}