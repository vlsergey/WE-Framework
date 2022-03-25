import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import SortClaimsDialog from '../../../../src/components/claims/sort/SortClaimsDialog';
import buildReducers from '../../../../src/core/reducers';
import Q30 from '../../../entities/Q30';
import Provider from '../../../testUtils/ProviderWrapper';

const NOOP = () => {};

describe('components/claims/sort/SortClaimsDialog', () => {

  it('renders', () => {
    const reducers = buildReducers(Q30);
    const store = createStore(reducers, applyMiddleware(thunk));

    const comparators : React.ComponentProps<typeof SortClaimsDialog>['propertyIdToComparators']= new Map();
    comparators.set('P580', ['time']);

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <SortClaimsDialog
          claims={[]}
          onClaimsReorder={NOOP}
          onCloseClick={NOOP}
          propertyIdToComparators={comparators} />
      </Provider>
    );
    assert.ok(rendered);
  });

});
