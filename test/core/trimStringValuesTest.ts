import {assert} from 'chai';
import Q1367759 from '../entities/Q1367759';
import Q2262932 from '../entities/Q2262932';
import Q30 from '../entities/Q30';
import trimStringValues from '../../src/core/trimStringValues';

describe( 'core/trimStringValues', () => {

  describe( 'shall not change "normalized" entities returned by API', () => {

    it( 'does not change Q30', () => assert.equal( trimStringValues( Q30 ), Q30 ) );
    it( 'does not change Q1367759', () => assert.equal( trimStringValues( Q1367759 ), Q1367759 ) );
    it( 'does not change Q2262932', () => assert.equal( trimStringValues( Q2262932 ), Q2262932 ) );

  } );


  it( 'correctly trim spaces, carriage returns and tabs in external-id', () => {

    const newEntity : EntityType = {
      claims: {
        P1: [
          {
            mainsnak: {
              snaktype: 'value',
              property: 'P1',
              hash: 'somehash',
              datavalue: {
                value: '\tsome value  \r\n ',
                type: 'string',
              },
              datatype: 'external-id',
            },
            type: 'statement',
            id: 'someid',
            rank: 'normal',
          },
        ],
      },
    };
    const trimmed = trimStringValues( newEntity );

    // array is still array
    Object.values( trimmed.claims!! )
      .forEach( claims => assert( Array.isArray( claims ), 'Claims shall be an array: ' + JSON.stringify( claims ) ) );

    const expected : EntityType = {
      claims: {
        P1: [
          {
            mainsnak: {
              snaktype: 'value',
              property: 'P1',
              hash: 'somehash',
              datavalue: {
                value: 'some value',
                type: 'string',
              },
              datatype: 'external-id',
            },
            type: 'statement',
            id: 'someid',
            rank: 'normal',
          },
        ],
      },
    };

    assert.deepEqual( trimmed, expected );
  } );

} );
