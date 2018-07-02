import assert from 'assert';
import ExactValueEditor from 'components/dataValueEditors/quantity/ExactValueEditor';

describe( 'components/dataValueEditors/quantity', () => {
  describe( 'ExactValueEditor', () => {

    it( 'can edit values with equal boundaries', () => {
      const value = {
        lowerBound: '1.0',
        amount: '1.00',
        upperBound: '1.000',
      };
      assert.equal( ExactValueEditor.canBeUsedForValue( value ), true );
    } );

  } );
} );
