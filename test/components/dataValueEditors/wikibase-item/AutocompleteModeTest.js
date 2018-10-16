import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import AutocompleteMode from 'components/entityField/AutocompleteMode';
import buildReducers from 'core/reducers';
import LabelDescription from 'caches/LabelDescription';
import P21 from '../../../entities/P21';
import PropertyDescription from 'core/PropertyDescription';
import { Provider } from 'react-redux';
import Q1367759 from '../../../entities/Q1367759';
import Q752285 from '../../../entities/Q752285';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Suggestion from 'components/entityField/Suggestion';
import thunk from 'redux-thunk';
import WikibaseItemDataValueEditor from 'components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';
import WikibaseItemInput from 'components/entityField/WikibaseItemInput';

describe( 'components/dataValueEditors/wikibase-item', () => {

  const p21Description = new PropertyDescription( P21 );

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  describe( 'AutocompleteMode', () => {

    it ( 'Correctly handles click on item after copy-paste', () => {
      const datavalue = {};
      const onDataValueChange = newDataValue => {
        Object.keys( datavalue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
        Object.keys( newDataValue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
      };
      const onSelect = entityId => {
        onDataValueChange( {
          ...datavalue,
          value: {
            'entity-type': 'item',
            'numeric-id': entityId.substr( 1 ),
            'id': entityId,
          },
          type: WikibaseItemDataValueEditor.DATAVALUE_TYPE,
        } );
      };

      function testSuggestionsProvider( value ) {
        if ( value == 'Q752285' ) {
          return [ 'Q752285' ];
        }
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <AutocompleteMode
            datavalue={datavalue}
            onSelect={onSelect}
            oneOf={[]}
            propertyDescription={p21Description}
            testSuggestionsProvider={testSuggestionsProvider} />
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );

      input.focus();
      ReactTestUtils.Simulate.focus( input );

      input.value = 'Q752285';
      ReactTestUtils.Simulate.change( input );
      assert.equal( datavalue.value.id, 'Q752285' );

      const suggestion = ReactTestUtils.findRenderedComponentWithType( rendered, Suggestion );
      assert.equal( suggestion.props.entityId, 'Q752285' );

      const suggestionTable = ReactTestUtils.findRenderedDOMComponentWithTag( suggestion, 'table' );
      ReactTestUtils.Simulate.click( suggestionTable );
      assert.equal( datavalue.value.id, 'Q752285' );

      const wikibaseItemInput = ReactTestUtils.findRenderedComponentWithType( rendered, WikibaseItemInput );

      store.dispatch( {
        type: 'CACHE_LABELDESCRIPTIONS_PUT',
        cacheUpdate: {
          Q752285: new LabelDescription( Q752285 ),
        },
      } );

      // dirty value without label
      assert.equal( input.value, 'Q752285' );
      assert.equal( wikibaseItemInput.state.focused, true );


      // must be with label
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
