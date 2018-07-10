import assert from 'assert';
import MonolingualTextDataValueEditor from 'components/dataValueEditors/MonolingualTextDataValueEditor';
import P18 from '../../entities/P18';
import PropertyDescription from 'core/PropertyDescription';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from './TableTBodyTr';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  describe( 'MonolingualTextDataValueEditor', () => {

    const p18Description = new PropertyDescription( P18 );

    it ( 'can be rendered', () => {
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

    it ( 'non-existing can be changed via keyboard', () => {
      let datavalue = undefined;
      const onDataValueChange = newDataValue => { datavalue = newDataValue; };

      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <MonolingualTextDataValueEditor
            datavalue={datavalue}
            onDataValueChange={onDataValueChange}
            propertyDescription={p18Description} />
        </TableTBodyTr>
      );
      assert.ok( rendered );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ].value = 'ru';
      ReactTestUtils.Simulate.change( inputs[ 0 ] );
      assert.equal( datavalue.value.language, 'ru' );

      inputs[ 1 ].value = 'NewTestText';
      ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.equal( datavalue.value.text, 'NewTestText' );
    } );

    it ( 'existing value can be changed via keyboard', () => {
      let datavalue = {
        value: {
          language: 'en',
          text: 'TestText',
        },
        type: 'monolingualtext',
      };
      const onDataValueChange = newDataValue => { datavalue = newDataValue; };

      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <MonolingualTextDataValueEditor
            datavalue={datavalue}
            onDataValueChange={onDataValueChange}
            propertyDescription={p18Description} />
        </TableTBodyTr>
      );
      assert.ok( rendered );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ].value = 'ru';
      ReactTestUtils.Simulate.change( inputs[ 0 ] );
      assert.equal( datavalue.value.language, 'ru' );

      inputs[ 1 ].value = 'NewTestText';
      ReactTestUtils.Simulate.change( inputs[ 1 ] );
      assert.equal( datavalue.value.text, 'NewTestText' );
    } );

  } );

} );
