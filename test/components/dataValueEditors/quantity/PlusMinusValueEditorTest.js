import assert from 'assert';
import PlusMinusValueEditor from 'components/dataValueEditors/quantity/PlusMinusValueEditor';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from '../TableTBodyTr';
import ValueHolder from 'testUtils/ValueHolder';

const NOOP = () => {};

describe( 'components/dataValueEditors/quantity', () => {
  describe( 'PlusMinusValueEditor', () => {

    it( 'can be rendered read-only with undefined value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <PlusMinusValueEditor onValueChange={NOOP} readOnly value={undefined} />
        </TableTBodyTr>
      );
      assert.ok( rendered );
    } );

    it( 'can be rendered read-only with null value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <PlusMinusValueEditor onValueChange={NOOP} readOnly value={null} />
      );
      assert.ok( rendered );
    } );

    it( 'can be changed', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder initialValue={{}}>{ ( value, onChange ) =>
          <TableTBodyTr>
            <PlusMinusValueEditor onValueChange={onChange} value={value} />
          </TableTBodyTr>
        }</ValueHolder>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ].value = '1'; ReactTestUtils.Simulate.change( inputs[ 0 ] );
      assert.deepEqual( valueHolder.getValue(), { amount: '1' } );
      inputs[ 1 ].value = '2'; ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.deepEqual( valueHolder.getValue(), { lowerBound: '-1', amount: '1', upperBound: '3' } );

      inputs[ 0 ].value = '1'; ReactTestUtils.Simulate.change( inputs[ 0 ] );
      inputs[ 1 ].value = ''; ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.deepEqual( valueHolder.getValue(), { amount: '1' } );

      inputs[ 0 ].value = ''; ReactTestUtils.Simulate.change( inputs[ 0 ] );
      inputs[ 1 ].value = '1'; ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.deepEqual( valueHolder.getValue(), { lowerBound: '-1', amount: '', upperBound: '1' } );

      inputs[ 1 ].value = ''; ReactTestUtils.Simulate.change( inputs[ 1 ] );
      inputs[ 0 ].value = ''; ReactTestUtils.Simulate.change( inputs[ 0 ] );
      assert.deepEqual( valueHolder.getValue(), { amount: '' } );
    } );

  } );
} );
