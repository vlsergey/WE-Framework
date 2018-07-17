import assert from 'assert';
import Q1367759 from '../entities/Q1367759';
import Q2262932 from '../entities/Q2262932';
import Q30 from '../entities/Q30';
import trimStringValues from 'core/trimStringValues';

describe( 'core/trimStringValues', () => {

  describe( 'shall not change "normalized" entities returned by API', () => {

    it( 'does not change Q30', () => assert.equal( trimStringValues( Q30 ), Q30 ) );
    it( 'does not change Q1367759', () => assert.equal( trimStringValues( Q1367759 ), Q1367759 ) );
    it( 'does not change Q2262932', () => assert.equal( trimStringValues( Q2262932 ), Q2262932 ) );

  } );

} );
