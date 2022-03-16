import {assert} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import WikibaseItemDataValueEditor from '../../../../src/components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';
import {className as SuggestionClassName} from '../../../../src/components/entityField/Suggestion';
import PropertyData from '../../../../src/core/PropertyData';
import PropertyDescription from '../../../../src/core/PropertyDescription';
import buildReducers from '../../../../src/core/reducers';
import P21 from '../../../entities/P21';
import P31 from '../../../entities/P31';
import Q1367759 from '../../../entities/Q1367759';
import Provider from '../../../testUtils/ProviderWrapper';
import ValueHolder from '../../../testUtils/ValueHolder';
import TableTBodyTr from '../TableTBodyTr';

const NOOP = () => {};

describe('components/dataValueEditors', () => {

  const reducers = buildReducers(Q1367759);
  const store = createStore(reducers, applyMiddleware(thunk));

  describe('WikibaseItemDataValueEditor', () => {

    const p21Description = new PropertyDescription(new PropertyData(P21));
    const p31Description = new PropertyDescription(new PropertyData(P31));

    it('can be rendered with empty datavalue for property with limited options and can be changed', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <ValueHolder<any> initialValue={{}}>{(value, onChange) =>
            <TableTBodyTr>
              <WikibaseItemDataValueEditor
                datavalue={value}
                onDataValueChange={onChange}
                propertyDescription={p21Description} />
            </TableTBodyTr>
          }</ValueHolder>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);
      const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      const select = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'select') as HTMLSelectElement;
      assert.ok(select);
      assert.equal(select.value, '');

      select.value = 'Q6581072';
      ReactTestUtils.Simulate.change(select);
      assert(valueHolder.getValue().value.id, 'Q6581072');
    });

    it('can be rendered with non-empty datavalue for property with limited options and can be changed', () => {
      const initialDataValue: WikibaseEntityIdDataValue = {
        value: {
          'entity-type': 'item',
          'numeric-id': 6581072,
          'id': 'Q6581072',
        },
        type: 'wikibase-entityid',
      };

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <ValueHolder<any> initialValue={initialDataValue}>{(value, onChange) =>
            <TableTBodyTr>
              <WikibaseItemDataValueEditor
                datavalue={value}
                onDataValueChange={onChange}
                propertyDescription={p21Description} />
            </TableTBodyTr>
          }</ValueHolder>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);
      const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      const select = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'select') as HTMLSelectElement;
      assert.ok(select);
      assert.equal(select.value, 'Q6581072');

      select.value = 'Q6581097';
      ReactTestUtils.Simulate.change(select);
      assert(valueHolder.getValue()?.value?.id, 'Q6581097');
    });

    it('can be rendered with empty datavalue for generic property', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={null}
              onDataValueChange={NOOP}
              propertyDescription={p31Description} />
          </TableTBodyTr>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);
      assert.equal(input.value, '');
    });

    it('can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={{
                value: {
                  'entity-type': 'item',
                  'numeric-id': 35120,
                  'id': 'Q35120',
                },
                type: 'wikibase-entityid',
              }}
              onDataValueChange={NOOP}
              propertyDescription={p31Description} />
          </TableTBodyTr>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);
      assert.equal(input.value, 'Q35120');
    });

    it('click; type; select; clear', () => {
      const datavalue: WikibaseEntityIdDataValue = {
        value: {
          'entity-type': 'item',
          'numeric-id': 35120,
          'id': 'Q35120',
        },
        type: 'wikibase-entityid',
      };
      const onDataValueChange = (newDataValue: null | WikibaseEntityIdDataValue) => {
        datavalue.value = newDataValue?.value || null;
      };

      function testSuggestionsProvider (value: string) {
        if (value == '222') {
          return ['Q222111', 'Q222222'];
        }
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={datavalue}
              onDataValueChange={onDataValueChange}
              propertyDescription={p31Description}
              testSuggestionsProvider={testSuggestionsProvider} />
          </TableTBodyTr>
        </Provider>
      ) as unknown as Provider;
      assert.ok(rendered);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);
      assert.equal(input.value, 'Q35120');

      input.focus();
      ReactTestUtils.Simulate.focus(input);

      input.value = '222';
      ReactTestUtils.Simulate.change(input);

      // we don't have API, so suggestions are same
      const suggestionComponents = ReactTestUtils.scryRenderedDOMComponentsWithClass(rendered, SuggestionClassName);
      assert.ok(suggestionComponents);
      assert.equal(suggestionComponents.length, 2);

      // after click we need to see item label
      ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(suggestionComponents[0]) as Element);
      assert.equal(input.value, 'Q222111');

      // last check -- that we can DELETE value
      input.value = '';
      ReactTestUtils.Simulate.change(input);

      assert.equal(input.value, '');
      assert.equal(datavalue.value, null);
    });
  });
});
