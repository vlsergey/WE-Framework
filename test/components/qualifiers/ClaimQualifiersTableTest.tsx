import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {TYPE} from '../../../src/caches/propertyDataCache';
import CommonsMediaDataValueEditor from '../../../src/components/dataValueEditors/CommonsMediaDataValueEditor';
import ClaimQualifiersTable from '../../../src/components/qualifiers/ClaimQualifiersTable';
import PropertyData from '../../../src/core/PropertyData';
import PropertyDescription from '../../../src/core/PropertyDescription';
import buildReducers from '../../../src/core/reducers';
import P51 from '../../entities/P51';
import P85 from '../../entities/P85';
import Q30 from '../../entities/Q30';
import Provider from '../../testUtils/ProviderWrapper';
import ValueHolder from '../../testUtils/ValueHolder';

describe('components/qualifiers/ClaimQualifiersTable', () => {

  it('correctly calls onClaimUpdate() on qualifier changes', () => {
    const reducers = buildReducers(Q30);
    const store = createStore(reducers, applyMiddleware(thunk));

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <ValueHolder<ClaimType> initialValue={Q30.claims.P85[0] as ClaimType}>{ (value, onChange) =>
          <ClaimQualifiersTable
            claim={value}
            claimPropertyDescription={new PropertyDescription(new PropertyData(P85))}
            onClaimUpdate={onChange} />
        }</ValueHolder>
      </Provider>
    ) as unknown as Provider;
    assert.ok(rendered);
    const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<ClaimType>;

    // we need to click on table to enable editing
    const table = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'table');
    ReactTestUtils.Simulate.click(table);

    // populate cache to see snak editors
    store.dispatch({
      // @ts-expect-error
      type: 'CACHE_' + TYPE + '_PUT',
      cacheUpdate: {
        P51: new PropertyData(P51),
      },
    });

    const dataValueEditor = ReactTestUtils.findRenderedComponentWithType(rendered, CommonsMediaDataValueEditor);
    const input = ReactTestUtils.findRenderedDOMComponentWithTag(dataValueEditor, 'input') as HTMLInputElement;

    input.value = 'NewImage.gif';
    ReactTestUtils.Simulate.change(input);

    assert.equal(valueHolder.getValue().qualifiers?.P51?.[0]?.datavalue?.value, 'NewImage.gif');
  });
});
