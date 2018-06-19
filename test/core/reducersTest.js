import buildReducers from '../../src/core/reducers';
import expect from 'expect';
import P345 from '../entities/P345';
import PropertyDescription from '../../src/core/PropertyDescription';
import Q2262932 from '../entities/Q2262932';

describe( 'reducers.js', () => {

  const reducers = buildReducers( Q2262932 );

  it( 'CLAIM_ADD for existing claims', () => {
    const propertyDescription = new PropertyDescription( P345 );

    const newState = reducers( undefined, { type: 'CLAIM_ADD', propertyDescription } );
    expect( newState.entity ).toBeAn( 'object', 'state.entity must be an object' );
    expect( newState.entity.claims ).toBeAn( 'object', 'newState.entity.claims must be an object' );
    expect( newState.entity.claims.P345 ).toBeAn( 'array', 'newState.entity.claims.P345 must be an array' );
    expect( newState.entity.claims.P345.length ).toEqual( 2 );
  } );

  it( 'DESCRIPTION_CHANGE for existing description', () => {
    const newState = reducers( undefined, { type: 'DESCRIPTION_CHANGE', language: 'en', newValue: { language: 'en', value: 'NewTestDescription' } } );

    expect( newState.entity ).toBeAn( 'object', 'state.entity must be an object' );
    expect( newState.entity.descriptions ).toBeAn( 'object', 'newState.entity.descriptions must be an object' );
    expect( newState.entity.descriptions.en ).toBeAn( 'object', 'newState.entity.descriptions.en must be an object' );
    expect( newState.entity.descriptions.en.value ).toEqual( 'NewTestDescription' );

    // other not touched!
    expect( newState.entity.descriptions.fr.value ).toEqual( 'film sorti en 1931' );
  } );

} );
