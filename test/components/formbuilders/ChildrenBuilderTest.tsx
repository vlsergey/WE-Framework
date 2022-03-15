import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import ChildrenBuilder from '../../../src/components/formbuilders/ChildrenBuilder';
import buildReducers from '../../../src/core/reducers';
import Q1367759 from '../../entities/Q1367759';
import Provider from '../../testUtils/ProviderWrapper';

describe('ChildrenBuilder', () => {

  const reducers = buildReducers(Q1367759);
  const store = createStore(reducers, applyMiddleware(thunk));

  it('renders fields', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <ChildrenBuilder fields={[
          {property: 'P31'},
        ]} />
      </Provider>
    ) as unknown as Provider;
    assert.ok(rendered);

    const childrenBuilders = ReactTestUtils.scryRenderedComponentsWithType(rendered, ChildrenBuilder);
    assert.ok(childrenBuilders);
    assert.equal(childrenBuilders.length, 1);

    const tbodies = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'tbody');
    assert.ok(tbodies);
    assert.equal(tbodies.length, 1);
  });

  it('renders fieldsets', () => {
    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <ChildrenBuilder fieldsets={[
          {fields: [
          /* instance of */
            {property: 'P31'},
          ]},
          {label: 'TestLabel',
            fields: [
            /* director */
              {property: 'P57'},
            ]},
        ]} />
      </Provider>
    ) as unknown as Provider;
    assert.ok(rendered);

    const fieldsets = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'fieldset');
    assert.ok(fieldsets);
    assert.equal(fieldsets.length, 2);

    const legend = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'legend');
    assert.ok(legend);

    const childrenBuilders = ReactTestUtils.scryRenderedComponentsWithType(rendered, ChildrenBuilder);
    assert.ok(childrenBuilders);
    assert.equal(childrenBuilders.length, 3);

    const tbodies = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'tbody');
    assert.ok(tbodies);
    assert.equal(tbodies.length, 2);
  });

});
