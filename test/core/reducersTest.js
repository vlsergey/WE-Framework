import buildReducers from "../../src/core/reducers";
import expect from 'expect';
import Q2262932 from "../entities/Q2262932";

describe('reducers.js', () => {
  
  const reducers = buildReducers( Q2262932 );
  
  it('CLAIM_ADD for new claims', () => {

    const newState = reducers( undefined, { type: 'CLAIM_ADD', propertyId: 'P1237' } );
    expect(newState.entity).toBeAn("object", "state.entity must be an object");
    expect(newState.entity.claims).toBeAn("object", "newState.entity.claims must be an object");
    expect(newState.entity.claims.P1237).toBeAn("array", "newState.entity.claims.P1237 must be an array");
    expect(newState.entity.claims.P1237.length).toEqual(1);
    
  });
  

  it('CLAIM_ADD for existing claims', () => {

    const newState = reducers( undefined, { type: 'CLAIM_ADD', propertyId: 'P345' } );
    expect(newState.entity).toBeAn("object", "state.entity must be an object");
    expect(newState.entity.claims).toBeAn("object", "newState.entity.claims must be an object");
    expect(newState.entity.claims.P345).toBeAn("array", "newState.entity.claims.P1237 must be an array");
    expect(newState.entity.claims.P345.length).toEqual(2);
    
  });
});
