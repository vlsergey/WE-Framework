import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import CommonsMediaDataValueEditor from 'components/dataValueEditors/CommonsMediaDataValueEditor';
import P51 from '../../entities/P51';
import P85 from '../../entities/P85';
import PropertyDescription from 'core/PropertyDescription';
import { Provider } from 'react-redux';
import Q30 from '../../entities/Q30';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';

describe( 'components/qualifiers/ClaimQualifiersTable', () => {

  it( 'correctly calls onClaimUpdate() on qualifier changes', () => {
    const reducers = buildReducers( Q30 );
    const store = createStore( reducers, applyMiddleware( thunk ) );

    const claim = Q30.claims.P85[ 0 ];
    const onClaimUpdate = newClaim => {
      Object.keys( claim ).forEach( key => claim[ key ] = newClaim[ key ] );
      Object.keys( newClaim ).forEach( key => claim[ key ] = newClaim[ key ] );
    };

    const rendered = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <ClaimQualifiersTable
          claim={claim}
          claimPropertyDescription={claim}
          onClaimUpdate={onClaimUpdate} />
      </Provider>
    );
    assert.ok( rendered );

    // we need to click on table to enable editing
    const table = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'table' );
    ReactTestUtils.Simulate.click( table );

    // populate cache to see snak editors
    store.dispatch( {
      type: 'CACHE_PROPERTYDESCRIPTIONS_PUT',
      cacheUpdate: {
        P51: new PropertyDescription( P51 ),
      },
    } );

    const dataValueEditor = ReactTestUtils.findRenderedComponentWithType( rendered, CommonsMediaDataValueEditor );
    const input = ReactTestUtils.findRenderedDOMComponentWithTag( dataValueEditor, 'input' );

    input.value = 'NewImage.gif';
    ReactTestUtils.Simulate.change( input );

    assert.equal( claim.qualifiers.P51[ 0 ].datavalue.value, 'NewImage.gif' );
  } );
} );
