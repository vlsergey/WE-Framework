import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import PlusMinusValueEditor from '../../../../src/components/dataValueEditors/quantity/PlusMinusValueEditor';
import ValueHolder from '../../../testUtils/ValueHolder';
import TableTBodyTr from '../TableTBodyTr';

const NOOP = () => {};

describe('components/dataValueEditors/quantity', () => {
  describe('PlusMinusValueEditor', () => {

    it('can be rendered read-only with null value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <PlusMinusValueEditor onValueChange={NOOP} readOnly value={null} />
        </TableTBodyTr>
      );
      assert.ok(rendered);
    });

    it('can be rendered read-only with null value', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <PlusMinusValueEditor onValueChange={NOOP} readOnly value={null} />
      );
      assert.ok(rendered);
    });

    it('can be changed', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<any> initialValue={{}}>{ (value, onChange) =>
          <TableTBodyTr>
            <PlusMinusValueEditor onValueChange={onChange} value={value} />
          </TableTBodyTr>
        }</ValueHolder>
      ) as unknown as ValueHolder<any>;
      assert.ok(rendered);
      const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input') as HTMLInputElement[];
      assert.equal(inputs.length, 2);

      inputs[0]!.value = '1'; ReactTestUtils.Simulate.change(inputs[0]!);
      assert.deepEqual(valueHolder.getValue(), {amount: '1'});
      inputs[1]!.value = '2'; ReactTestUtils.Simulate.change(inputs[1]!);
      assert.deepEqual(valueHolder.getValue(), {lowerBound: '-1', amount: '1', upperBound: '3'});

      inputs[0]!.value = '1'; ReactTestUtils.Simulate.change(inputs[0]!);
      inputs[1]!.value = ''; ReactTestUtils.Simulate.change(inputs[1]!);
      assert.deepEqual(valueHolder.getValue(), {amount: '1'});

      inputs[0]!.value = ''; ReactTestUtils.Simulate.change(inputs[0]!);
      inputs[1]!.value = '1'; ReactTestUtils.Simulate.change(inputs[1]!);
      assert.deepEqual(valueHolder.getValue(), {lowerBound: '-1', amount: '', upperBound: '1'});

      inputs[1]!.value = ''; ReactTestUtils.Simulate.change(inputs[1]!);
      inputs[0]!.value = ''; ReactTestUtils.Simulate.change(inputs[0]!);
      assert.deepEqual(valueHolder.getValue(), {amount: ''});
    });

  });
});
