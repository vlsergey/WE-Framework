import assert from 'assert';
import ExactValueEditor from 'components/dataValueEditors/quantity/ExactValueEditor';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from '../TableTBodyTr';
import ValueHolder from '../../../ValueHolder';

describe( 'components/dataValueEditors/quantity', () => {
  describe( 'ExactValueEditor', () => {

    it( 'can be used for values with equal boundaries', () => {
      const value = {
        lowerBound: '1.0',
        amount: '1.00',
        upperBound: '1.000',
      };
      assert.equal( ExactValueEditor.canBeUsedForValue( value ), true );
    } );

    it( 'correctly updates equal boundaries', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder initialValue={{ lowerBound: '1.0', amount: '1.00', upperBound: '1.000' }}>{ ( value, onChange ) =>
          <TableTBodyTr>
            <ExactValueEditor onValueChange={onChange} value={value} />
          </TableTBodyTr>
        }</ValueHolder>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );

      input.value = '2'; ReactTestUtils.Simulate.change( input );
      assert.deepEqual( valueHolder.getValue(), { amount: '2' } );
    } );

  } );
} );
