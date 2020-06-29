import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import CommonsMediaDataValueEditor from 'components/dataValueEditors/CommonsMediaDataValueEditor';
import P51 from '../../entities/P51';
import P85 from '../../entities/P85';
import PropertyData from 'core/PropertyData';
import PropertyDescription from 'core/PropertyDescription';
import Provider from 'testUtils/ProviderWrapper';
import Q30 from '../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import { TYPE } from 'caches/propertyDataCache';
import ValueHolder from 'testUtils/ValueHolder';

describe( 'components/qualifiers/ClaimQualifiersTable', () => {

  it( 'correctly calls onClaimUpdate() on qualifier changes', () => {
    const reducers = buildReducers( Q30 );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <ValueHolder initialValue={Q30.claims.P85[ 0 ]}>{ ( value, onChange ) =>
          <ClaimQualifiersTable
            claim={value}
            claimPropertyDescription={new PropertyDescription( new PropertyData( P85 ) )}
            onClaimUpdate={onChange} />
        }</ValueHolder>
      </Provider>
    );
    assert.ok( rendered );
    const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

    // we need to click on table to enable editing
    const table = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'table' );
    ReactTestUtils.Simulate.click( table );

    // populate cache to see snak editors
    store.dispatch( {
      type: 'CACHE_' + TYPE + '_PUT',
      cacheUpdate: {
        P51: new PropertyData( P51 ),
      },
    } );

    const dataValueEditor = ReactTestUtils.findRenderedComponentWithType( rendered, CommonsMediaDataValueEditor );
    const input = ReactTestUtils.findRenderedDOMComponentWithTag( dataValueEditor, 'input' );

    input.value = 'NewImage.gif';
    ReactTestUtils.Simulate.change( input );

    assert.equal( valueHolder.getValue().qualifiers.P51[ 0 ].datavalue.value, 'NewImage.gif' );
  } );
} );
