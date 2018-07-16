import cacheReducers from 'caches/reducers';
import { combineReducers } from 'redux';
import expect from 'expect';
import { newStatementClaim } from 'model/Shapes';
import PropertyDescription from './PropertyDescription';

const EMPTY_OBJECT = {};

const entityReducerF = unsavedEntity => ( entity = unsavedEntity, action ) => {
  expect( entity ).toBeAn( 'object' );

  switch ( action.type ) {

  case 'LABELS_CHANGE':
  case 'DESCRIPTION_CHANGE':
  case 'DRAFT_ALIAS_CHANGE':
  case 'ALIASES_CHANGE':
  {
    const { language, newValue } = action;
    expect ( language ).toBeA( 'string' );

    const elementToChange = {
      LABELS_CHANGE: 'labels',
      DESCRIPTION_CHANGE: 'descriptions',
      DRAFT_ALIAS_CHANGE: 'draftAliases',
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

    const claims = entity.claims || EMPTY_OBJECT;
    const existingClaims = claims[ propertyDescription.id ];
    const newClaim = newStatementClaim( propertyDescription );

    if ( existingClaims ) {
      return {
        ...entity,
        claims: {
          ...claims,
          [ propertyId ]: [ ...existingClaims, newClaim ],
        },
      };
    } else {
      return {
        ...entity,
        claims: {
          ...claims,
          [ propertyId ]: [ newClaim ],
        },
      };
    }
  }

  case 'CLAIM_DELETE': {
    const { claim } = action;
    const propertyId = claim.mainsnak.property;

    const claims = entity.claims || EMPTY_OBJECT;
    const existingClaims = claims[ propertyId ];
    const claimsToSave = existingClaims.filter( original => original.id !== claim.id );

    return {
      ...entity,
      claims: {
        ...claims,
        [ propertyId ]: claimsToSave,
      },
    };
  }

  case 'CLAIM_UPDATE': {
    const { claim } = action;
    const propertyId = claim.mainsnak.property;

    const claims = entity.claims || EMPTY_OBJECT;
    const existingClaims = claims[ propertyId ];
    const claimsToSave = !!existingClaims && existingClaims.length > 0
      ? existingClaims.map( original => original.id === claim.id ? claim : original )
      : [ claim ];

    return {
      ...entity,
      claims: {
        ...claims,
        [ propertyId ]: claimsToSave,
      },
    };
  }
  }

  return entity;
};

export default function buildReducers( originalEntity, unsavedEntity ) {
  expect( originalEntity ).toBeAn( 'object' );

  return combineReducers( {
    originalEntity: () => originalEntity,
    entity: entityReducerF( unsavedEntity || originalEntity ),
    ...cacheReducers,
  } );
}
