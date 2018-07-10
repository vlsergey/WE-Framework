import assert from 'assert';
import filterEmptyEntityStructures from 'core/filterEmptyEntityStructures';
import Q30 from '../entities/Q30';

describe( 'core', () => {

  describe( 'filterEmptyEntityStructures.js', () => {

    describe( 'filterEmptyEntityStructures()', () => {

      it( 'should correctly handre cleared datavalue/value in references', () => {

        const q30 = {
          ...Q30,
          claims: {
            ...Q30.claims,
            P227: Q30.claims.P227.map( claim => ( {
              ...claim,
              references: claim.references.map( ref => ( {
                ...ref,
                snaks: {
                  ...ref.snaks,
                  P143: ref.snaks.P143.map( snak => ( {
                    ...snak,
                    datavalue: {
                      ...snak.datavalue,
                      value: null,
                    },
                  } ) ),
                },
              } ) ),
            } ) ),
          },
        };

        const filteredEntity = filterEmptyEntityStructures( q30 );
        assert.equal( JSON.stringify( filteredEntity ).indexOf( '"value":null,' ), -1,
          'Filtered entity still have null values' );
      } );

    } );

  } );

} );
