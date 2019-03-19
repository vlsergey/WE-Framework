import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import AutocompleteMode from 'components/entityField/AutocompleteMode';
import buildReducers from 'core/reducers';
import LabelDescription from 'caches/LabelDescription';
import { Provider } from 'react-redux';
import Q1367759 from '../../entities/Q1367759';
import Q752285 from '../../entities/Q752285';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Suggestion from 'components/entityField/Suggestion';
import thunk from 'redux-thunk';
import ValueHolder from '../../ValueHolder';
import WikibaseItemInput from 'components/entityField/WikibaseItemInput';

describe( 'components/dataValueEditors/wikibase-item', () => {

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  describe( 'AutocompleteMode', () => {

    it ( 'Correctly handles click on item after copy-paste', () => {
      function testSuggestionsProvider( value ) {
        if ( value == 'Q752285' ) {
          return [ 'Q752285' ];
        }
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <ValueHolder>{ ( value, onChange ) =>
            <AutocompleteMode
              onSelect={onChange}
              testSuggestionsProvider={testSuggestionsProvider}
              value={value} />
          }</ValueHolder>
        </Provider>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );

      input.focus();
      ReactTestUtils.Simulate.focus( input );

      // manual enter
      input.value = 'Q752285';
      ReactTestUtils.Simulate.change( input );
      assert.equal( valueHolder.getValue(), 'Q752285' );

      const suggestion = ReactTestUtils.findRenderedComponentWithType( rendered, Suggestion );
      assert.equal( suggestion.props.entityId, 'Q752285' );

      const suggestionTable = ReactTestUtils.findRenderedDOMComponentWithTag( suggestion, 'table' );
      ReactTestUtils.Simulate.click( suggestionTable );
      assert.equal( valueHolder.getValue(), 'Q752285' );

      const wikibaseItemInput = ReactTestUtils.findRenderedComponentWithType( rendered, WikibaseItemInput );

      store.dispatch( {
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
  } );

} );
