import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import ExactValueEditor from '../../../../src/components/dataValueEditors/quantity/ExactValueEditor';
import ValueHolder from '../../../testUtils/ValueHolder';
import TableTBodyTr from '../TableTBodyTr';

describe('components/dataValueEditors/quantity', () => {
  describe('ExactValueEditor', () => {

    it('can be used for values with equal boundaries', () => {
      const value = {
        lowerBound: '1.0',
        amount: '1.00',
        upperBound: '1.000',
      };
      assert.equal(ExactValueEditor.canBeUsedForValue(value), true);
    });

    it('correctly updates equal boundaries', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<null | QuantityValue> initialValue={{lowerBound: '1.0', amount: '1.00', upperBound: '1.000'}}>{ (value, onChange) =>
          <TableTBodyTr>
            <ExactValueEditor onValueChange={onChange} value={value} />
          </TableTBodyTr>
        }</ValueHolder>
      ) as unknown as ValueHolder<QuantityValue>;
      assert.ok(rendered);
      const valueHolder: ValueHolder<any> = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      const input: HTMLInputElement = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);

      input.value = '2'; ReactTestUtils.Simulate.change(input);
      assert.deepEqual(valueHolder.getValue(), {amount: '2'});
    });

  });
});
