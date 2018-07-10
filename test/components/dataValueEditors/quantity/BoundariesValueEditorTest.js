import assert from 'assert';
import BoundariesValueEditor from 'components/dataValueEditors/quantity/BoundariesValueEditor';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from '../TableTBodyTr';

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
      const value = {};
      const onValueChange = newValue => {
        Object.keys( value ).forEach( key => delete value[ key ] );
        Object.keys( newValue ).forEach( key => value[ key ] = newValue[ key ] );
      };
      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <BoundariesValueEditor onValueChange={onValueChange} value={value} />
        </TableTBodyTr>
      );
      assert.ok( rendered );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.equal( inputs.length, 3 );

      inputs[ 0 ].value = '1';
      ReactTestUtils.Simulate.change( inputs[ 0 ] );
      inputs[ 1 ].value = '2';
      ReactTestUtils.Simulate.change( inputs[ 1 ] );
      inputs[ 2 ].value = '3';
      ReactTestUtils.Simulate.change( inputs[ 2 ] );

      assert.deepEqual( value, { lowerBound: '1', amount: '2', upperBound: '3' } );
    } );

  } );
} );
