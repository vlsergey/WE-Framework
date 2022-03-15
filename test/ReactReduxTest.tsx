import { createStore } from 'redux';
import Provider from './testUtils/ProviderWrapper';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

describe( 'react-redux', () => {

  it( 'can render Provider with ReactTestUtils', () => {
    const fakeReducers = ( state = {} ) => state;
    const fakeStore = createStore( fakeReducers );

    const rendered = ReactTestUtils.renderIntoDocument( <Provider store={fakeStore}>
      <div>Hello, World!</div>
    </Provider> ) as unknown as Provider;
    if ( !rendered ) throw new Error( 'Unable to render, ' +
      'result of renderIntoDocument() is ' + rendered );
  } );

} );
