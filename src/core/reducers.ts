import {combineReducers} from 'redux';

import {newStatementClaim} from '../model/Shapes';
import deepEqual from '../utils/deepEqual';
import generateRandomString from '../utils/generateRandomString';
import {AnyAction} from './storeActions';

type LabelalikeKey = 'labels' | 'descriptions' | 'draftAliases' | 'aliases';

const LABELALIKE_ACTION_KEY_TO_ENTITY_KEY: Record<string, LabelalikeKey> = {
  LABELS_CHANGE: 'labels',
  DESCRIPTION_CHANGE: 'descriptions',
  DRAFT_ALIAS_CHANGE: 'draftAliases',
  ALIASES_CHANGE: 'aliases',
};

const entityReducerF = (unsavedEntity: EntityType) => (entity: EntityType = unsavedEntity, action: AnyAction) => {
  switch (action.type) {

  case 'LABELS_CHANGE':
  case 'DESCRIPTION_CHANGE':
  case 'DRAFT_ALIAS_CHANGE':
  case 'ALIASES_CHANGE':
  {
    const {language, newValue} = action;

    const elementToChange: LabelalikeKey =
      LABELALIKE_ACTION_KEY_TO_ENTITY_KEY[action.type] as LabelalikeKey;

    return {
      ...entity,
      [elementToChange]: {
        ...entity[elementToChange],
        [language]: newValue,
      },
    };
  }

  case 'CLAIM_ADD': {
    const {claimData, propertyId, datatype} = action;

    const claims = entity.claims;
    const existingClaims = claims?.[propertyId];
    let newClaim: ClaimType = newStatementClaim(propertyId, datatype);
    newClaim = claimData ? {...newClaim, ...claimData} : newClaim;

    if (existingClaims) {
      return {
        ...entity,
        claims: {
          ...claims,
          [propertyId]: [...existingClaims, newClaim],
        },
      };
    }
    return {
      ...entity,
      claims: {
        ...claims,
        [propertyId]: [newClaim],
      },
    };

  }

  case 'CLAIM_DELETE': {
    const {claim} = action;
    const propertyId = claim?.mainsnak?.property;
    if (!propertyId) {
      throw new Error('Provided claim to delete doesn\'t have propertyId in mainsnak');
    }

    const claims = entity.claims;
    const existingClaims = claims?.[propertyId];
    const claimsToSave = existingClaims?.filter(original => original.id !== claim.id);
    if (!Array.isArray(claimsToSave)) {
      throw new Error('Assertion failed: provided entity doesn\'t have an aray of deleting claim property');
    }

    return {
      ...entity,
      claims: {
        ...claims,
        [propertyId]: claimsToSave,
      },
    };
  }

  case 'CLAIM_UPDATE': {
    const {claim} = action;
    const propertyId = claim.mainsnak.property;

    const claims = entity.claims;
    const existingClaims = claims?.[propertyId];

    const claimsToSave = !!existingClaims && existingClaims.length > 0
      ? existingClaims.map(original => original.id === claim.id ? claim : original)
      : [claim];

    return {
      ...entity,
      claims: {
        ...claims,
        [propertyId]: claimsToSave,
      },
    };
  }

  // action used by enchanced datavalue editors (like ISBN or VIAF)
  // used to fill OTHER („sister“) properties with values canclulated from current claim
  // (or obtained from external source using current claim, like BNF from VIAF record)
  // also can be used by importers
  // normalization prevents duplication of values
  case 'CLAIMS_FILL': {
    const {property, datatype, datavalue, normalizeF} = action;

    const claims = entity?.claims;
    const existingClaims = claims?.[property] || [];

    // let's try to find existing claims that already have this new value
    let foundAndReplaced = false;
    const newClaims = existingClaims
      .map(claim => {
        const mainsnak = claim.mainsnak;
        if (!mainsnak
            || !mainsnak.datavalue
            || !mainsnak.datavalue.value
            || mainsnak.datatype !== datatype
            || mainsnak.datavalue.type !== datavalue.type)
          return claim;
        const oldValue = mainsnak.datavalue.value;
        const normalized = normalizeF(oldValue);
        if (!deepEqual(normalized, datavalue.value)) return claim;

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
      });

    // need to create new claim with provided value
    if (!foundAndReplaced) {
      newClaims.push({
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
      });
    }

    return {
      ...entity,
      claims: {
        ...entity.claims,
        [property]: newClaims,
      },
    };
  }

  case 'CLAIMS_REORDER': {
    const {propertyId, claimIds} = action;

    const oldClaims = entity?.claims?.[propertyId];
    if (!oldClaims || claimIds.length !== oldClaims.length) {
      throw new Error('Supplied ordered claimIds must have the same length as entity claims array for ' + propertyId);
    }

    let toReorderStartsFrom = null;
    for (let i = 0; i < claimIds.length; i++) {
      if (claimIds[i] !== oldClaims[i]?.id) {
        toReorderStartsFrom = i;
        break;
      }
    }

    if (toReorderStartsFrom === null) {
      // no changes
      return entity;
    }

    let newClaims: ClaimType[] | null = null;
    if (toReorderStartsFrom !== 0) {
      newClaims = oldClaims.slice(0, toReorderStartsFrom);
    } else {
      newClaims = [];
    }
    for (let i = toReorderStartsFrom; i < claimIds.length; i++) {
      const claim = oldClaims.find(({id}) => id === claimIds[i]);
      if (!claim) {
        throw new Error('Missing expected claim with ID ' + claimIds[i]);
      }
      newClaims.push({
        ...claim,
        id: generateRandomString(),
      });
    }

    return {
      ...entity,
      claims: {
        ...entity.claims,
        [propertyId]: newClaims,
      },
    };
  }

  }

  return entity;
};

export default function buildReducers (originalEntity: EntityType, unsavedEntity?: EntityType) {
  return combineReducers({
    originalEntity: () => originalEntity,
    entity: entityReducerF(unsavedEntity || originalEntity),
  });
}
