import cacheReducers from 'caches/reducers';
import { combineReducers } from 'redux';
import deepEqual from 'deep-equal';
import expect from 'expect';
import generateRandomString from 'utils/generateRandomString';
import { newStatementClaim } from 'model/Shapes';

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
    const { claim, propertyId, datatype } = action;
    expect( propertyId ).toBeA( 'string' );
    expect( datatype ).toBeA( 'string' );

    const claims = entity.claims || EMPTY_OBJECT;
    const existingClaims = claims[ propertyId ];
    let newClaim = newStatementClaim( propertyId, datatype );
    newClaim = claim ? { ...newClaim, ...claim } : newClaim;

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
  // also can be used by importers
  // normalization prevents duplication of values
  case 'CLAIMS_FILL': {
    const { property, datatype, datavalue, normalizeF } = action;
    expect( property ).toBeA( 'string' );
    expect( datatype ).toBeA( 'string' );
    expect( datavalue ).toBeA( 'object' );
    expect( datavalue.type ).toBeA( 'string' );
    expect( normalizeF ).toBeA( 'function' );

    if ( datavalue.type === 'string' ) {
      expect( datavalue.value ).toBeA( 'string' );
    } else if ( datavalue.type === 'monolingualtext' ) {
      expect( datavalue.value ).toBeA( 'object' );
      expect( datavalue.value.language ).toBeA( 'string' );
      expect( datavalue.value.text ).toBeA( 'string' );
    }

    const claims = entity.claims || EMPTY_OBJECT;
    const existingClaims = claims[ property ] || [];

    // let's try to find existing claims that already have this new value
    let foundAndReplaced = false;
    const newClaims = existingClaims
      .map( claim => {
        if ( !claim.mainsnak
            || !claim.mainsnak.datavalue
            || !claim.mainsnak.datavalue.value
            || claim.mainsnak.datatype !== datatype
            || claim.mainsnak.datavalue.type !== datavalue.type )
          return claim;
        const oldValue = claim.mainsnak.datavalue.value;
        const normalized = normalizeF( oldValue );
        if ( !deepEqual( normalized, datavalue.value ) ) return claim;

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
          property,
          hash: generateRandomString(),
          datavalue,
          datatype,
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
        [ property ]: newClaims,
      },
    };
  }

  case 'CLAIMS_REORDER': {
    const { propertyId, claimIds } = action;
    expect( propertyId ).toBeA( 'string', 'Action argument \'propertyId\' is not a string but ' + typeof propertyId );
    expect( claimIds ).toBeAn( 'array', 'Action argument \'propertyId\' is not a string but ' + typeof claimIds );

    const oldClaims = entity.claims[ propertyId ];
    expect( oldClaims ).toBeAn( 'array' );
    expect( claimIds.length ).toBe( oldClaims.length,
      'Supplied ordered claimIds must have the same length as entity claims array for ' + propertyId );

    let toReorderStartsFrom = null;
    for ( let i = 0; i < claimIds.length; i++ ) {
      if ( claimIds[ i ] !== oldClaims[ i ].id ) {
        toReorderStartsFrom = i;
        break;
      }
    }

    if ( toReorderStartsFrom === null ) {
      // no changes
      return entity;
    }

    let newClaims = null;
    if ( toReorderStartsFrom !== 0 ) {
      newClaims = oldClaims.slice( 0, toReorderStartsFrom );
    } else {
      newClaims = [];
    }
    for ( let i = toReorderStartsFrom; i < claimIds.length; i++ ) {
      const claim = oldClaims.find( claim => claim.id === claimIds[ i ] );
      expect( claim ).toBeAn( 'object' );
      newClaims.push( {
        ...claim,
        id: generateRandomString(),
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
