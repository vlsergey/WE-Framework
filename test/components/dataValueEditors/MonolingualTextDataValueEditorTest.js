import assert from 'assert';
import MonolingualTextDataValueEditor from 'components/dataValueEditors/MonolingualTextDataValueEditor';
import P18 from '../../entities/P18';
import PropertyData from 'core/PropertyData';
import PropertyDescription from 'core/PropertyDescription';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from './TableTBodyTr';
import ValueHolder from 'testUtils/ValueHolder';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  describe( 'MonolingualTextDataValueEditor', () => {

    const p18Description = new PropertyDescription( new PropertyData( P18 ) );

    it( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <MonolingualTextDataValueEditor
            datavalue={{
              value: {
                language: 'en',
                text: 'TestText',
              },
              type: 'monolingualtext',
            }}
            onDataValueChange={NOOP}
            propertyDescription={p18Description} />
        </TableTBodyTr>
      );
      assert.ok( rendered );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );
      assert.equal( inputs[ 0 ].value, 'en' );
      assert.equal( inputs[ 1 ].value, 'TestText' );
    } );

    it( 'non-existing can be changed via keyboard', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder>{ ( value, onChange ) =>
          <TableTBodyTr>
            <MonolingualTextDataValueEditor
              datavalue={value}
              onDataValueChange={onChange}
              propertyDescription={p18Description} />
          </TableTBodyTr>
        }</ValueHolder>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ].value = 'ru';
      ReactTestUtils.Simulate.change( inputs[ 0 ] );
      assert.equal( valueHolder.getValue().value.language, 'ru' );

      inputs[ 1 ].value = 'NewTestText';
      ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.equal( valueHolder.getValue().value.text, 'NewTestText' );
    } );

    it( 'existing value can be changed via keyboard', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder initialValue={{
          value: {
            language: 'en',
            text: 'TestText',
          },
          type: 'monolingualtext',
        }}>{ ( value, onChange ) =>
            <TableTBodyTr>
              <MonolingualTextDataValueEditor
                datavalue={value}
                onDataValueChange={onChange}
                propertyDescription={p18Description} />
            </TableTBodyTr>
          }</ValueHolder>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ].value = 'ru';
      ReactTestUtils.Simulate.change( inputs[ 0 ] );
      assert.equal( valueHolder.getValue().value.language, 'ru' );

      inputs[ 1 ].value = 'NewTestText';
      ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.equal( valueHolder.getValue().value.text, 'NewTestText' );
    } );

  } );

} );
