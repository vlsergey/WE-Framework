import cacheReducers from 'caches/reducers';
import { combineReducers } from 'redux';
import expect from 'expect';
import generateRandomString from 'utils/generateRandomString';
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

  // action used by enchanced datavalue editors (like ISBN or VIAF)
  // used to fill OTHER („sister“) properties with values canclulated from current claim
  // (or obtained from external source using current claim, like BNF from VIAF record)
  case 'CLAIMS_FILL': {
    const { propertyId, normalizeF, newValue } = action;
    expect( propertyId ).toBeA( 'string' );
    expect( normalizeF ).toBeA( 'function' );
    expect( newValue ).toBeA( 'string' ); // only external-id values are supported so far

    const claims = entity.claims || EMPTY_OBJECT;
    const existingClaims = claims[ propertyId ] || [];

    // let's try to find existing claims that already have this new value
    let foundAndReplaced = false;
    const newClaims = existingClaims
      .map( claim => {
        if ( !claim.mainsnak
            || !claim.mainsnak.datavalue
            || !claim.mainsnak.datavalue.value
            || claim.mainsnak.datatype !== 'external-id'
            || claim.mainsnak.datavalue.type !== 'string' )
          return claim;
        const oldValue = claim.mainsnak.datavalue.value;
        const normalized = normalizeF( oldValue );
        if ( normalized !== newValue ) return claim;

        foundAndReplaced = true;
        return {
          ...claim,
          mainsnak: {
            ...claim.mainsnak,
            datavalue: {
              ...claim.mainsnak.datavalue,
              value: normalized,
            },
          },
        };
      } );

    // need to create new claim with provided value
    if ( !foundAndReplaced ) {
      newClaims.push( {
        mainsnak: {
          snaktype: 'value',
          property: propertyId,
          hash: generateRandomString(),
          datavalue: {
            value: newValue,
            type: 'string',
          },
          datatype: 'external-id',
        },
        type: 'statement',
        id: generateRandomString(),
        rank: 'normal',
      } );
    }

    return {
      ...entity,
      claims: {
        ...entity.claims,
        [ propertyId ]: newClaims,
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
