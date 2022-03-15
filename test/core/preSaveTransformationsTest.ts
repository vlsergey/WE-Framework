import {assert} from 'chai';
import preSaveTransformations from '../../src/core/preSaveTransformations';
import Q1367759 from '../entities/Q1367759';
import Q2262932 from '../entities/Q2262932';
import Q30 from '../entities/Q30';

describe( 'core/preSaveTransformations', () => {

  describe( 'shall not change "normalized" entities returned by API', () => {

    it( 'does not change Q30', () => assert.deepEqual( preSaveTransformations( Q30 ), Q30 ) );
    it( 'does not change Q1367759', () => assert.deepEqual( preSaveTransformations( Q1367759 ), Q1367759 ) );
    it( 'does not change Q2262932', () => assert.deepEqual( preSaveTransformations( Q2262932 ), Q2262932 ) );

  } );

} );
