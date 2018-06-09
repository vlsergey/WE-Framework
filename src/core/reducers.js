import expect from 'expect';
import { newStatementClaim } from '../model/Shapes';

export default function buildReducers( originalEntity ) {
  expect( originalEntity ).toBeAn( 'object' );
  
  const initialState = {
    originalEntity: originalEntity,
    entity: originalEntity,
  };
  
  return ( state = initialState, action ) => {
    
    switch ( action.type ) {

    case 'CLAIM_ADD': {
      const { propertyId } = action;
      expect( propertyId ).toBeA( 'string' );

      const existingClaims = state.entity.claims[ propertyId ];
      
      if ( existingClaims ) {
        return {
          ...state,
          entity: {
            ...state.entity,
            claims: {
              ...state.entity.claims,
              [ propertyId ]: [ ...existingClaims, newStatementClaim( propertyId ) ],
            }
          }
        };
      } else {
        return {
          ...state,
          entity: {
            ...state.entity,
            claims: {
              ...state.entity.claims,
              [ propertyId ]: [ newStatementClaim( propertyId ) ],
            }
          }
        };
      }
    }

    case 'CLAIM_UPDATE': {
      const { claim } = action;
      const propertyId = claim.mainsnak.property;
      
      let claimToSave = claim;
      if ( !claim.dirty ) 
        claimToSave = { ...claimToSave, dirty: true };
      
      const existingClaims = state.entity.claims[ propertyId ];
      const claimsToSave = existingClaims
        ? existingClaims.map( original => original.id === claim.id ? claimToSave : original )
        : [ claimToSave ];
      
      return {
        ...state,
        entity: {
          ...state.entity,
          claims: {
            ...state.entity.claims,
            [ propertyId ]: claimsToSave,
          }
        }
      };
    }
    
    }
    
    return state;
  };
}