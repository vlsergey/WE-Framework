import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import { Provider } from 'react-redux';
import Q1367759 from '../entities/Q1367759';
import P345 from '../entities/P345';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionProvider from 'core/PropertyDescriptionProvider';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';

describe( 'PropertyDescriptionProvider', () => {

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  it( 'provides country flags', () => {
    const rendered = ReactTestUtils.renderIntoDocument( <Provider store={store}>
      <PropertyDescriptionProvider propertyId={'P345'}>
        {propertyDescription => <div>
          <h1>{propertyDescription && propertyDescription.label }</h1>
          <h2>{propertyDescription && propertyDescription.description}</h2>
          <h3>{propertyDescription && propertyDescription.countries.join( ' ' )}</h3>
          <h4>{propertyDescription && propertyDescription.countryFlags.join( ' ' )}</h4>
        </div>}
      </PropertyDescriptionProvider>
    </Provider> );
    assert.ok( rendered );

    assert.equal( ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h1' ).textContent, '' );
    assert.equal( ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h2' ).textContent, '' );
    assert.equal( ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h3' ).textContent, '' );
    assert.equal( ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h4' ).textContent, '' );

    store.dispatch( {
      type: 'CACHE_PROPERTYDESCRIPTIONS_PUT',
      cacheUpdate: {
        P345: new PropertyDescription( P345 ),
      },
    } );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h1' ).textContent,
      'IMDb ID' );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h2' ).textContent,
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']' );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h3' ).textContent,
      'Q30' );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h4' ).textContent,
      '' );

    store.dispatch( {
      type: 'CACHE_STRINGPROPERTYVALUES_PUT',
      cacheUpdate: {
        Q30: {
          P41: [ 'Flag of the United States.svg' ],
        },
      },
    } );

    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h1' ).textContent,
      'IMDb ID' );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h2' ).textContent,
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']' );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h3' ).textContent,
      'Q30' );
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h4' ).textContent,
      'Flag of the United States.svg' );

  } );

} );
