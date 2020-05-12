// @flow

import cacheReducers from 'caches/reducers';
import { combineReducers } from 'redux';
import deepEqual from 'utils/deepEqual';
import generateRandomString from 'utils/generateRandomString';
import { newStatementClaim } from 'model/Shapes';

const entityReducerF = unsavedEntity => ( entity : EntityType = unsavedEntity, action ) => {
  switch ( action.type ) {

  case 'LABELS_CHANGE':
  case 'DESCRIPTION_CHANGE':
  case 'DRAFT_ALIAS_CHANGE':
  case 'ALIASES_CHANGE':
  {
    const { language, newValue } : {language : string, newValue : any} = action;

    const elementToChange : string = {
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
    const { claimData, propertyId, datatype } : {
      claimData? : ?any,
      datatype : string,
      propertyId : string } = action;

    const claims : ClaimsType = entity.claims || ( {} : ClaimsType );
    const existingClaims : ?ClaimType[] = claims[ propertyId ];
    let newClaim : ClaimType = newStatementClaim( propertyId, datatype );
    newClaim = claimData ? { ...newClaim, ...claimData } : newClaim;

    if ( existingClaims ) {
      return {
        ...entity,
        claims: {
          ...claims,
          [ propertyId ]: [ ...existingClaims, newClaim ],
        },
      };
    }
    return {
      ...entity,
      claims: {
        ...claims,
        [ propertyId ]: [ newClaim ],
      },
    };

  }

  case 'CLAIM_DELETE': {
    const { claim } : {claim : ClaimType} = action;
    const propertyId : ?string = ( claim.mainsnak || {} ).property;
    if ( !propertyId ) {
      throw new Error( 'Provided claim to delete doesn\'t have propertyId in mainsnak' );
    }

    const claims : ClaimsType = entity.claims || ( {} : ClaimsType );
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

    const claims : ClaimsType = entity.claims || ( {} : ClaimsType );
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
    const { property, datatype, datavalue, normalizeF } : {
      datatype : string,
      datavalue : DataValueType,
      normalizeF : any => any,
      property : string
    } = action;

    const claims : ClaimsType = entity.claims || {};
    const existingClaims = claims[ property ] || [];

    // let's try to find existing claims that already have this new value
    let foundAndReplaced = false;
    const newClaims = existingClaims
      .map( claim => {
        const mainsnak = claim.mainsnak;
        if ( !mainsnak
            || !mainsnak.datavalue
            || !mainsnak.datavalue.value
            || mainsnak.datatype !== datatype
            || mainsnak.datavalue.type !== datavalue.type )
          return claim;
        const oldValue = mainsnak.datavalue.value;
        const normalized = normalizeF( oldValue );
        if ( !deepEqual( normalized, datavalue.value ) ) return claim;

        foundAndReplaced = true;
        return {
          ...claim,
          mainsnak: {
            ...mainsnak,
            datavalue: {
              ...mainsnak.datavalue,
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
    const { propertyId, claimIds } : {claimIds : string[], propertyId : string} = action;

    const oldClaims : ?( ClaimType[] ) = ( entity.claims || ( {} : ClaimsType ) )[ propertyId ];
    if ( !oldClaims || claimIds.length !== oldClaims.length ) {
      throw new Error( 'Supplied ordered claimIds must have the same length as entity claims array for ' + propertyId );
    }

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

    let newClaims : ?ClaimType[] = null;
    if ( toReorderStartsFrom !== 0 ) {
      newClaims = oldClaims.slice( 0, toReorderStartsFrom );
    } else {
      newClaims = [];
    }
    for ( let i = toReorderStartsFrom; i < claimIds.length; i++ ) {
      const claim : ?ClaimType = oldClaims.find( ( { id } ) => id === claimIds[ i ] );
      if ( !claim ) {
        throw new Error( 'Missing expected claim with ID ' + claimIds[ i ] );
      }
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

export default function buildReducers( originalEntity : EntityType, unsavedEntity : EntityType ) {
  // $FlowFixMe
  return combineReducers( {
    originalEntity: () => originalEntity,
    entity: entityReducerF( unsavedEntity || originalEntity ),
    ...cacheReducers,
  } );
}
