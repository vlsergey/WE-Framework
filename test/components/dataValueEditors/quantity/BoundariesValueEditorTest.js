import assert from 'assert';
import BoundariesValueEditor from 'components/dataValueEditors/quantity/BoundariesValueEditor';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from '../TableTBodyTr';
import ValueHolder from "../../../ValueHolder";

const NOOP = () => {};

describe( 'components/dataValueEditors/quantity', () => {
  describe( 'BoundariesValueEditor', () => {

    it( 'can be rendered read-only with undefined value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <BoundariesValueEditor onValueChange={NOOP} readOnly value={undefined} />
        </TableTBodyTr>
      );
      assert.ok( rendered );
    } );

    it( 'can be rendered read-only with null value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <BoundariesValueEditor onValueChange={NOOP} readOnly value={null} />
      );
      assert.ok( rendered );
    } );

    it( 'can be changed', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder initialValue={{}}>{ (value, onChange) =>
          <TableTBodyTr>
            <BoundariesValueEditor onValueChange={onChange} value={value} />
          </TableTBodyTr>
        }</ValueHolder>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.equal( inputs.length, 3 );

      inputs[ 0 ].value = '1';
      ReactTestUtils.Simulate.change( inputs[ 0 ] );
      inputs[ 1 ].value = '2';
      ReactTestUtils.Simulate.change( inputs[ 1 ] );
      inputs[ 2 ].value = '3';
      ReactTestUtils.Simulate.change( inputs[ 2 ] );

      assert.deepEqual( valueHolder.getValue(), { lowerBound: '1', amount: '2', upperBound: '3' } );
    } );

  } );
} );
