import { LABELDESCRIPTIONS, PROPERTYDESCRIPTIONS, STRINGPROPERTYVALUES } from 'caches/reducers';
import { combineReducers } from 'redux';
import expect from 'expect';
import { newStatementClaim } from 'model/Shapes';
import PropertyDescription from './PropertyDescription';

const entityReducerF = originalEntity => ( entity = originalEntity, action ) => {
  expect( entity ).toBeAn( 'object' );

  switch ( action.type ) {

  case 'LABELS_CHANGE':
  case 'DESCRIPTION_CHANGE':
  case 'ALIASES_CHANGE':
  {
    const { language, newValue } = action;
    expect ( language ).toBeA( 'string' );

    const elementToChange = {
      LABELS_CHANGE: 'labels',
      DESCRIPTION_CHANGE: 'descriptions',
      ALIASES_CHANGE: 'aliases',
    }[ action.type ];

    return {
      ...entity,
      [ elementToChange ]: {
        ...entity[ elementToChange ],
        [ language ]: newValue,
      },
    };
  }

  case 'CLAIM_ADD': {
    const { propertyDescription } = action;
    expect( propertyDescription ).toBeA( PropertyDescription );
    const propertyId = propertyDescription.id;

    const existingClaims = entity.claims[ propertyDescription.id ];
    const newClaim = newStatementClaim( propertyDescription );

    if ( existingClaims ) {
      return {
        ...entity,
        claims: {
          ...entity.claims,
          [ propertyId ]: [ ...existingClaims, newClaim ],
        },
      };
    } else {
      return {
        ...entity,
        claims: {
          ...entity.claims,
          [ propertyId ]: [ newClaim ],
        },
      };
    }
  }

  case 'CLAIM_UPDATE': {
    const { claim } = action;
    const propertyId = claim.mainsnak.property;

    const existingClaims = entity.claims[ propertyId ];
    const claimsToSave = existingClaims
      ? existingClaims.map( original => original.id === claim.id ? claim : original )
      : [ claim ];

    return {
      ...entity,
      claims: {
        ...entity.claims,
        [ propertyId ]: claimsToSave,
      },
    };
  }
  }

  return entity;
};

export default function buildReducers( originalEntity ) {
  expect( originalEntity ).toBeAn( 'object' );

  return combineReducers( {
    originalEntity: () => originalEntity,
    entity: entityReducerF( originalEntity ),
    LABELDESCRIPTIONS,
    PROPERTYDESCRIPTIONS,
    STRINGPROPERTYVALUES,
  } );
}
