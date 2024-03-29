import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import ExactValueEditor from '../../../../src/components/dataValueEditors/quantity/ExactValueEditor';
import ModeSelect from '../../../../src/components/dataValueEditors/quantity/ModeSelect';
import PlusMinusValueEditor from '../../../../src/components/dataValueEditors/quantity/PlusMinusValueEditor';
import QuantityDataValueEditor, {MODES} from '../../../../src/components/dataValueEditors/quantity/QuantityDataValueEditor';
import PropertyData from '../../../../src/core/PropertyData';
import PropertyDescription from '../../../../src/core/PropertyDescription';
import buildReducers from '../../../../src/core/reducers';
import P1971 from '../../../entities/P1971';
import Q1367759 from '../../../entities/Q30';
import Provider from '../../../testUtils/ProviderWrapper';
import ValueHolder from '../../../testUtils/ValueHolder';
import TableTBodyTr from '../TableTBodyTr';

const NOOP = () => {};

describe('components/dataValueEditors/quantity', () => {

  const reducers = buildReducers(Q1367759);
  const store = createStore(reducers, applyMiddleware(thunk));

  describe('QuantityDataValueEditor', () => {

    const p1971Description = new PropertyDescription(new PropertyData(P1971));

    it('can be rendered with null datavalue', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <QuantityDataValueEditor
              datavalue={null}
              onDataValueChange={NOOP}
              propertyDescription={p1971Description} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok(rendered);
    });

    it('can be rendered with null datavalue', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <QuantityDataValueEditor
              datavalue={null}
              onDataValueChange={NOOP}
              propertyDescription={p1971Description} />
          </TableTBodyTr>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      const selects = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'select') as HTMLSelectElement[];
      assert.equal(selects.length, 1);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);
      assert.equal(input.value, '');

      // all models shall be enabled
      const modeSelect = ReactTestUtils.findRenderedComponentWithType(rendered, ModeSelect);
      const modeOptions = ReactTestUtils.scryRenderedDOMComponentsWithTag(modeSelect, 'option') as HTMLOptionElement[];
      assert.equal(modeOptions.length, Object.keys(MODES).length, 'Incorrect number of rendered MODE options');
      assert.equal(modeOptions.filter(modeOptions => !modeOptions.disabled).length, Object.keys(MODES).length, 'Incorrect number of rendered non-disabled MODE options');
    });


    it('can be rendered with plus-minus value provided', () => {
      const datavalue: QuantityDataValue = {
        value: {
          amount: '+311582600',
          unit: '1',
          upperBound: '+311582700',
          lowerBound: '+311582500',
        },
        type: 'quantity',
      };

      assert.equal(ExactValueEditor.canBeUsedForValue(datavalue.value), false);
      assert.equal(PlusMinusValueEditor.canBeUsedForValue(datavalue.value), true);

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <QuantityDataValueEditor
              datavalue={datavalue}
              onDataValueChange={NOOP}
              propertyDescription={p1971Description} />
          </TableTBodyTr>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      // plus-minus shall be, not other value dataValueEditors
      ReactTestUtils.findRenderedComponentWithType(rendered, PlusMinusValueEditor);

      const selects = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'select');
      assert.equal(selects.length, 1);

      // const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' ) as HTMLInputElement;
      // assert.ok( input );
      // assert.equal( input.value, '' );

      // exact mode shall be disabled
      const modeSelect = ReactTestUtils.findRenderedComponentWithType(rendered, ModeSelect);
      const modeOptions = ReactTestUtils.scryRenderedDOMComponentsWithTag(modeSelect, 'option') as HTMLOptionElement[];
      assert.equal(modeOptions.length, Object.keys(MODES).length);
      assert.equal(modeOptions.filter(option => !option.disabled).length, Object.keys(MODES).length - 1);
    });

    it('with empty value can change to any mode and back', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <QuantityDataValueEditor
              datavalue={null}
              onDataValueChange={NOOP}
              propertyDescription={p1971Description} />
          </TableTBodyTr>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      const modes = Object.keys(MODES);
      for (let i = 0; i < 2; i++) {
        for (const mode of modes) {
          const modeSelect = ReactTestUtils.findRenderedComponentWithType(rendered, ModeSelect);
          const select = ReactTestUtils.findRenderedDOMComponentWithTag(modeSelect, 'select') as HTMLSelectElement;
          select.value = mode;
          ReactTestUtils.Simulate.change(select);
        }
      }
    });

    it('with compatible values can be changed between plusMinus and boundaries', () => {
      const rendered = ReactTestUtils.renderIntoDocument(<Provider store={store}>
        <ValueHolder initialValue={{type: 'quantity', value: {}} as any}>{ (value, onChange) =>
          <TableTBodyTr>
            <QuantityDataValueEditor
              datavalue={value}
              onDataValueChange={onChange}
              propertyDescription={p1971Description} />
          </TableTBodyTr>
        }</ValueHolder>
      </Provider>) as unknown as Provider;
      assert.ok(rendered);
      const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      // switch to plus-minus
      const modeSelect: HTMLSelectElement = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'select') as HTMLSelectElement;
      modeSelect.value = 'plusMinus'; ReactTestUtils.Simulate.change(modeSelect);

      {
        // enter values
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input') as HTMLInputElement[];
        assert.equal(inputs.length, 2);
        inputs[0]!.value = '1'; ReactTestUtils.Simulate.change(inputs[0]!);
        assert.deepEqual(valueHolder.getValue(),
          {type: 'quantity', value: {amount: '1', unit: '1'}});

        inputs[1]!.value = '2'; ReactTestUtils.Simulate.change(inputs[1]!);
        assert.deepEqual(valueHolder.getValue(),
          {type: 'quantity', value: {lowerBound: '-1', amount: '1', upperBound: '3', unit: '1'}});
      }

      // change to boundaries
      modeSelect.value = 'boundaries'; ReactTestUtils.Simulate.change(modeSelect);

      {
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'input') as HTMLInputElement[];
        assert.equal(inputs.length, 3);
        inputs.forEach(input => { ReactTestUtils.Simulate.change(input); });
        assert.deepEqual(valueHolder.getValue(),
          {type: 'quantity', value: {lowerBound: '-1', amount: '1', upperBound: '3', unit: '1'}});

        // increase boundaries, thus allowing to switch back
        inputs[0]!.value = '-2'; ReactTestUtils.Simulate.change(inputs[0]!);
        assert.deepEqual(valueHolder.getValue(),
          {type: 'quantity', value: {lowerBound: '-2', amount: '1', upperBound: '3', unit: '1'}});
        inputs[2]!.value = '+4'; ReactTestUtils.Simulate.change(inputs[2]!);
        assert.deepEqual(valueHolder.getValue(),
          {type: 'quantity', value: {lowerBound: '-2', amount: '1', upperBound: '+4', unit: '1'}});
      }

    });

  });

});
