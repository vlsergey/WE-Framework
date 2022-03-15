import * as selectors from '../../../src/components/claims/selectors';
import {assert} from 'chai';
import Q30 from '../../entities/Q30';

describe( 'components/claims', () => {

  describe( 'selectors', () => {

    describe( 'claimColumnsF', () => {

      describe( 'correctly calculates columns for USA entity', () => {
        const claimColumns = selectors.claimColumnsF();

        const check = ( propertyId : string, expectedColumns : string[] ) =>
          it( 'correctly calculates columns for property ' + propertyId + ' of USA entity', () => {
            assert.deepEqual( claimColumns( Q30.claims[ propertyId ] ), expectedColumns );
          } );

        check( 'P6', [ 'P580', 'P582' ] );
        check( 'P31', [ ] );
        check( 'P37', [ ] );
        check( 'P41', [ 'P580', 'P582' ] );
        check( 'P47', [ 'P805' ] );
        check( 'P150', [ 'P580' ] );
        check( 'P1082', [ 'P585' ] );

      } );

    } );

  } );

} );
