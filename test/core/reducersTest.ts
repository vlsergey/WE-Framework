import buildReducers from '../../src/core/reducers';
import Q2262932 from '../entities/Q2262932';
import {assert} from 'chai';
import generateRandomString from '../../src/utils/generateRandomString';

describe( 'core/reducers.js', () => {

  const entitiesToTest = [ { id: 'EMPTY' }, Q2262932 ] as ItemType[];

  entitiesToTest.forEach( (entity : ItemType) => describe( 'Test with entity: ' + entity.id, () => {
    const reducers = buildReducers( entity );

    it( 'CLAIM_ADD for existing claims', () => {
      const newState = reducers( undefined, { type: 'CLAIM_ADD', propertyId: 'P345', datatype: 'external-id', claimData: {
        id: generateRandomString(),
        mainsnak: {
          property: 'P345',
          snaktype: 'novalue',
        }
      } } );
      assert.typeOf( newState.entity, 'object', 'state.entity must be an object' );
      assert.typeOf( newState.entity.claims , 'object', 'newState.entity.claims must be an object' );
      assert.typeOf( newState.entity.claims?.P345 ,'array', 'newState.entity.claims.P345 must be an array' );
      assert.equal( newState.entity.claims?.P345?.length || 0 , (entity.claims?.P345?.length || 0) + 1 );
    } );

    it( 'DESCRIPTION_CHANGE for existing description', () => {
      const newState = reducers( undefined, { type: 'DESCRIPTION_CHANGE', language: 'en', newValue: { language: 'en', value: 'NewTestDescription' } } );

      assert.typeOf( newState.entity , 'object', 'state.entity must be an object' );
      assert.typeOf( newState.entity.descriptions ,'object', 'newState.entity.descriptions must be an object' );
      assert.typeOf( newState.entity.descriptions?.en, 'object', 'newState.entity.descriptions.en must be an object' );
      assert.equal( newState.entity.descriptions?.en?.value , 'NewTestDescription' );

      // other not touched!
      assert.equal( newState.entity.descriptions?.fr?.value , entity?.descriptions?.fr?.value );
    } );

  } ) );

} );
