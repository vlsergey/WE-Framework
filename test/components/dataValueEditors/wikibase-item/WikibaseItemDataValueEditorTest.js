import { applyMiddleware, createStore } from 'redux';
import assert from 'assert';
import buildReducers from 'core/reducers';
import P21 from '../../../entities/P21';
import P31 from '../../../entities/P31';
import PropertyDescription from 'core/PropertyDescription';
import { Provider } from 'react-redux';
import Q1367759 from '../../../entities/Q1367759';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Suggestion from 'components/entityField/Suggestion';
import TableTBodyTr from '../TableTBodyTr';
import thunk from 'redux-thunk';
import WikibaseItemDataValueEditor from 'components/dataValueEditors/wikibase-item/WikibaseItemDataValueEditor';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  const reducers = buildReducers( Q1367759 );
  const store = createStore( reducers, applyMiddleware( thunk ) );

  describe( 'WikibaseItemDataValueEditor', () => {

    const p21Description = new PropertyDescription( P21 );
    const p31Description = new PropertyDescription( P31 );

    it ( 'can be rendered with empty datavalue for property with limited options and can be changed', () => {
      const datavalue = {};
      const onDataValueChange = newDataValue => {
        Object.keys( datavalue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
        Object.keys( newDataValue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
      };

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={datavalue}
              onDataValueChange={onDataValueChange}
              propertyDescription={p21Description} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok( rendered );

      const select = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'select' );
      assert.ok( select );
      assert.equal( select.value, '' );

      select.value = 'Q6581072';
      ReactTestUtils.Simulate.change( select );
      assert( datavalue.value.id, 'Q6581072' );
    } );

    it ( 'can be rendered with non-empty datavalue for property with limited options and can be changed', () => {
      const datavalue = {
        value: {
          'entity-type': 'item',
          'numeric-id': 6581072,
          'id': 'Q6581072',
        },
        type: 'wikibase-entityid',
      };
      const onDataValueChange = newDataValue => {
        Object.keys( datavalue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
        Object.keys( newDataValue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
      };

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={datavalue}
              onDataValueChange={onDataValueChange}
              propertyDescription={p21Description} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok( rendered );

      const select = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'select' );
      assert.ok( select );
      assert.equal( select.value, 'Q6581072' );

      select.value = 'Q6581097';
      ReactTestUtils.Simulate.change( select );
      assert( datavalue.value.id, 'Q6581097' );
    } );

    it ( 'can be rendered with empty datavalue for generic property', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={null}
              onDataValueChange={NOOP}
              propertyDescription={p31Description} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, '' );
    } );

    it ( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={{
                value: {
                  'entity-type': 'item',
                  'numeric-id': 35120,
                  'id': 'Q35120',
                },
                type: 'wikibase-entityid',
              }}
              onDataValueChange={NOOP}
              propertyDescription={p31Description} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, 'Q35120' );
    } );

    it ( 'click; type; select; clear', () => {
      const datavalue = {
        value: {
          'entity-type': 'item',
          'numeric-id': 35120,
          'id': 'Q35120',
        },
        type: 'wikibase-entityid',
      };
      const onDataValueChange = newDataValue => {
        Object.keys( datavalue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
        Object.keys( newDataValue ).forEach( key => datavalue[ key ] = newDataValue[ key ] );
      };

      function testSuggestionsProvider( value ) {
        if ( value == '222' ) {
          return [ 'Q222111', 'Q222222' ];
        }
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <Provider store={store}>
          <TableTBodyTr>
            <WikibaseItemDataValueEditor
              datavalue={datavalue}
              onDataValueChange={onDataValueChange}
              propertyDescription={p31Description}
              testSuggestionsProvider={testSuggestionsProvider} />
          </TableTBodyTr>
        </Provider>
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );
      assert.equal( input.value, 'Q35120' );

      input.focus();
      ReactTestUtils.Simulate.focus( input );

      input.value = '222';
      ReactTestUtils.Simulate.change( input );

      // we don't have API, so suggestions are same
      const suggestionComponents = ReactTestUtils.scryRenderedComponentsWithType( rendered, Suggestion );
      assert.ok( suggestionComponents );
      assert.equal( suggestionComponents.length, 2 );

      // after click we need to see item label
      ReactTestUtils.Simulate.click( ReactDOM.findDOMNode( suggestionComponents[ 0 ] ) );
      assert.equal( input.value, 'Q222111' );

      // last check -- that we can DELETE value
      input.value = '';
      ReactTestUtils.Simulate.change( input );

      assert.equal( input.value, '' );
      assert.equal( datavalue.value, null );
    } );
  } );
} );
