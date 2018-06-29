import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import { Provider } from 'react-redux';
import P345 from '../entities/P345';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import Q1367759 from '../entities/Q1367759';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';

describe( 'PropertyDescriptionsProviderTest', () => {

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  it( 'provides country flags', () => {
    const rendered = ReactTestUtils.renderIntoDocument( <Provider store={store}>
      <PropertyDescriptionsProvider propertyIds={[ 'P345' ]}>
        {cache => <div>
          <h1>{cache.P345 && cache.P345.label }</h1>
          <h2>{cache.P345 && cache.P345.description}</h2>
          <h3>{cache.P345 && cache.P345.countries.join( ' ' )}</h3>
          <h4>{cache.P345 && cache.P345.countryFlags.join( ' ' )}</h4>
          <h5>{cache.P345 && cache.P345.languageCodes.join( ' ' )}</h5>
        </div>}
      </PropertyDescriptionsProvider>
    </Provider> );
    assert.ok( rendered );

    const h1 = () => ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h1' ).textContent;
    const h2 = () => ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h2' ).textContent;
    const h3 = () => ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h3' ).textContent;
    const h4 = () => ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h4' ).textContent;
    const h5 = () => ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'h5' ).textContent;

    assert.equal( h1(), '' );
    assert.equal( h2(), '' );
    assert.equal( h3(), '' );
    assert.equal( h4(), '' );
    assert.equal( h5(), '' );

    store.dispatch( {
      type: 'CACHE_PROPERTYDESCRIPTIONS_PUT',
      cacheUpdate: {
        P345: new PropertyDescription( P345 ),
      },
    } );

    assert.equal( h1(), 'IMDb ID' );
    assert.equal( h2(),
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']' );
    assert.equal( h3(), 'Q30' );
    assert.equal( h4(), '' );
    assert.equal( h5(), '' );

    store.dispatch( {
      type: 'CACHE_STRINGPROPERTYVALUES_PUT',
      cacheUpdate: {
        Q30: {
          P41: [ 'Flag of the United States.svg' ],
        },
      },
    } );

    assert.equal( h1(), 'IMDb ID' );
    assert.equal( h2(),
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']' );
    assert.equal( h3(), 'Q30' );
    assert.equal( h4(), 'Flag of the United States.svg' );
    assert.equal( h5(), '' );

    store.dispatch( {
      type: 'CACHE_STRINGPROPERTYVALUES_PUT',
      cacheUpdate: {
        Q1860: {
          P424: [ 'en' ],
        },
      },
    } );

    assert.equal( h1(), 'IMDb ID' );
    assert.equal( h2(),
      'identifier for the Internet Movie Database  [with prefix \'tt\', \'nm\', \'ch\', \'co\', \'ev\', or \'ni\']' );
    assert.equal( h3(), 'Q30' );
    assert.equal( h4(), 'Flag of the United States.svg' );
    assert.equal( h5(), 'en' );

  } );

} );
