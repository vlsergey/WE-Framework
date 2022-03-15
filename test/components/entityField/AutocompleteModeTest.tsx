import { applyMiddleware, createStore } from 'redux';
import {assert} from 'chai';
import buildReducers from '../../../src/core/reducers';
import LabelDescription from '../../../src/caches/LabelDescription';
import Provider from '../../testUtils/ProviderWrapper';
import Q1367759 from '../../entities/Q1367759';
import Q752285 from '../../entities/Q752285';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import ValueHolder from '../../testUtils/ValueHolder';
import WikibaseItemInput from '../../../src/components/entityField/WikibaseItemInput';
import AutocompleteMode from '../../../src/components/entityField/AutocompleteMode';

describe( 'components/dataValueEditors/wikibase-item', () => {

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  describe( 'AutocompleteMode', () => {

    it( 'Correctly handles click on item after copy-paste', () => {
      function testSuggestionsProvider( value : string ) {
        if ( value == 'Q752285' ) {
          return [ 'Q752285' ];
        }
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <ValueHolder<string|null> initialValue={null}>{ ( value, onChange ) =>
            <AutocompleteMode
              onSelect={onChange}
              testSuggestionsProvider={testSuggestionsProvider}
              value={value} />
          }</ValueHolder>
        </Provider>
      ) as unknown as Provider;
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder ) as ValueHolder<any>;

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' ) as HTMLInputElement;
      assert.ok( input );

      input.focus();
      ReactTestUtils.Simulate.focus( input );

      // manual enter
      input.value = 'Q752285';
      ReactTestUtils.Simulate.change( input );
      assert.equal( valueHolder.getValue(), 'Q752285' );

      const suggestionTable = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'table' ) as HTMLTableElement;
      ReactTestUtils.Simulate.click( suggestionTable );
      assert.equal( valueHolder.getValue(), 'Q752285' );

      const wikibaseItemInput : WikibaseItemInput = ReactTestUtils.findRenderedComponentWithType( rendered, WikibaseItemInput );

      store.dispatch( {
        // @ts-ignore
        type: 'CACHE_LABELDESCRIPTIONS_PUT',
        cacheUpdate: {
          Q752285: new LabelDescription( Q752285 ),
        },
      } );

      // cursor inside input: dirty value without label
      assert.equal( input.value, 'Q752285' );
      assert.equal( wikibaseItemInput.state.focused, true );

      // leaving input: must be with label
      console.log( 'TEST: leaving input: must be with label' );
      input.blur();
      ReactTestUtils.Simulate.blur( input );
      assert.equal( wikibaseItemInput.state.focused, false );
      assert.equal( input.value, 'Laws (Q752285)' );

      // must be the previously entered text, i.e. Q752285
      input.focus();
      ReactTestUtils.Simulate.focus( input );
      assert.equal( wikibaseItemInput.state.focused, true );
      assert.equal( input.value, 'Q752285' );

    } );

    it( 'Correctly handles copypaste of Wikidata URL', () => {
      function testSuggestionsProvider() {
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <ValueHolder<string|null> initialValue="">{ ( value, onChange ) =>
            <AutocompleteMode
              onSelect={onChange}
              testSuggestionsProvider={testSuggestionsProvider}
              value={value} />
          }</ValueHolder>
        </Provider>
      ) as unknown as Provider;
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder ) as ValueHolder<string|null>;

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' ) as HTMLInputElement;
      assert.ok( input );

      input.focus();
      ReactTestUtils.Simulate.focus( input );

      // copypaste
      input.value = 'http://www.wikidata.org/wiki/Q752285';
      ReactTestUtils.Simulate.change( input );
      assert.equal( valueHolder.getValue(), '' );
    } );
  } );
} );
