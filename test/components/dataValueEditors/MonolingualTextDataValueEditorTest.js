import assert from 'assert';
import MonolingualTextDataValueEditor from 'components/dataValueEditors/MonolingualTextDataValueEditor';
import P18 from '../../entities/P18';
import PropertyDescription from 'core/PropertyDescription';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  describe( 'MonolingualTextDataValueEditor', () => {

    const p18Description = new PropertyDescription( P18 );

    it ( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
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
      );
      assert.ok( rendered );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' );
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );
      assert.equal( inputs[ 0 ].value, 'en' );
      assert.equal( inputs[ 1 ].value, 'TestText' );
    } );

    it ( 'can be changed via keyboard', () => {
      let datavalue = {
        value: {
          language: 'en',
          text: 'TestText',
        },
        type: 'monolingualtext',
      };
      const onDataValueChange = newDataValue => { datavalue = newDataValue; };

      const rendered = ReactTestUtils.renderIntoDocument(
        <MonolingualTextDataValueEditor
          datavalue={datavalue}
          onDataValueChange={onDataValueChange}
          propertyDescription={p18Description} />
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
