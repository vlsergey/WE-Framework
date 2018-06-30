import assert from 'assert';
import { buildStringCacheValuesFromEntity } from 'caches/actions';
import Q30 from '../entities/Q30';

describe( 'caches/actions', () => {

  describe( 'buildStringCacheValuesFromEntity', () => {

    it( 'can extact required data from entity', () => {

      const result = buildStringCacheValuesFromEntity( Q30 );
      console.log( result );

      assert.deepEqual( result.P17, [ 'Q30' ] );
      assert.deepEqual( result.P37, [ 'Q1860', 'Q7976' ] );
      assert.deepEqual( result.P41, [ 'Flag of the United States.svg' ] );
      assert.deepEqual( result.P424, [] );
    } );

  } );

} );
