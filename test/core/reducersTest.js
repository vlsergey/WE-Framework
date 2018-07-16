import buildReducers from '../../src/core/reducers';
import expect from 'expect';
import P345 from '../entities/P345';
import PropertyDescription from '../../src/core/PropertyDescription';
import Q2262932 from '../entities/Q2262932';

describe( 'core/reducers.js', () => {

  const entitiesToTest = [ { id: 'EMPTY' }, Q2262932 ];

  entitiesToTest.forEach( entity => describe( 'Test with entity: ' + entity.id, () => {
    const reducers = buildReducers( entity );

    it( 'CLAIM_ADD for existing claims', () => {
      const propertyDescription = new PropertyDescription( P345 );

      const newState = reducers( undefined, { type: 'CLAIM_ADD', propertyDescription } );
      expect( newState.entity ).toBeAn( 'object', 'state.entity must be an object' );
      expect( newState.entity.claims ).toBeAn( 'object', 'newState.entity.claims must be an object' );
      expect( newState.entity.claims.P345 ).toBeAn( 'array', 'newState.entity.claims.P345 must be an array' );
      expect( newState.entity.claims.P345.length ).toEqual( ( ( entity.claims || {} ).P345 || [] ).length + 1 );
    } );

    it( 'DESCRIPTION_CHANGE for existing description', () => {
      const newState = reducers( undefined, { type: 'DESCRIPTION_CHANGE', language: 'en', newValue: { language: 'en', value: 'NewTestDescription' } } );

      expect( newState.entity ).toBeAn( 'object', 'state.entity must be an object' );
      expect( newState.entity.descriptions ).toBeAn( 'object', 'newState.entity.descriptions must be an object' );
      expect( newState.entity.descriptions.en ).toBeAn( 'object', 'newState.entity.descriptions.en must be an object' );
      expect( newState.entity.descriptions.en.value ).toEqual( 'NewTestDescription' );

      // other not touched!
      if ( entity.descriptions && entity.descriptions.fr ) {
        expect( newState.entity.descriptions.fr.value ).toEqual( entity.descriptions.fr.value );
      }
    } );

  } ) );

} );
