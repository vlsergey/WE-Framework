import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import BoundariesValueEditor from '../../../../src/components/dataValueEditors/quantity/BoundariesValueEditor';
import ValueHolder from '../../../testUtils/ValueHolder';
import TableTBodyTr from '../TableTBodyTr';

const NOOP = () => {};

describe('components/dataValueEditors/quantity', () => {
  describe('BoundariesValueEditor', () => {

    it('can be rendered read-only with null value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <BoundariesValueEditor onValueChange={NOOP} readOnly value={null} />
      );
      assert.ok(rendered);
    });

    it('can be changed', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<null | QuantityValue> initialValue={{}}>{ (value, onChange) =>
          <TableTBodyTr>
            <BoundariesValueEditor onValueChange={onChange} value={value} />
          </TableTBodyTr>
        }</ValueHolder>
      ) as unknown as ValueHolder<null | QuantityValue>;
      assert.ok(rendered);

      const inputs: HTMLInputElement[] = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input') as HTMLInputElement[];
      assert.equal(inputs.length, 3);

      inputs[0]!.value = '1';
      ReactTestUtils.Simulate.change(inputs[0]!);
      inputs[1]!.value = '2';
      ReactTestUtils.Simulate.change(inputs[1]!);
      inputs[2]!.value = '3';
      ReactTestUtils.Simulate.change(inputs[2]!);

      assert.deepEqual(rendered.getValue(), {lowerBound: '1', amount: '2', upperBound: '3'});
    });

  });
});
