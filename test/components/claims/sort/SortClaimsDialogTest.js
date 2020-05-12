import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import Provider from 'testUtils/ProviderWrapper';
import Q30 from '../../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import SortClaimsDialog from 'components/claims/sort/SortClaimsDialog';
import thunk from 'redux-thunk';
import TimeComparator from 'components/claims/sort/TimeComparator';

const NOOP = () => {};

describe( 'components/claims/sort/SortClaimsDialog', () => {

  it( 'renders', () => {
    const reducers = buildReducers( Q30 );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    const comparators = new Map();
    comparators.set( 'P580', [ new TimeComparator() ] );

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <SortClaimsDialog
          claims={[]}
          onClaimsReorder={NOOP}
          onCloseClick={NOOP}
          propertyIdToComparators={comparators} />
      </Provider>
    );
    assert.ok( rendered );
  } );

} );
