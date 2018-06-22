import assert from 'assert';
import CommonsMediaDataValueEditor from 'components/dataValueEditors/CommonsMediaDataValueEditor';
import P18 from '../../entities/P18';
import PropertyDescription from 'core/PropertyDescription';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  describe( 'CommonsMediaDataValueEditor', () => {

    const p18Description = new PropertyDescription( P18 );

    it ( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <CommonsMediaDataValueEditor
          datavalue={{
            value: 'Image.jpg',
            type: 'string',
          }}
          onDataValueChange={NOOP}
          propertyDescription={p18Description} />
      );
      assert.ok( rendered );
    } );

    it ( 'can be changed via keyboard', () => {
      let datavalue = {
        value: 'Image.jpg',
        type: 'string',
      };
      const onDataValueChange = newDataValue => { datavalue = newDataValue; };

      const rendered = ReactTestUtils.renderIntoDocument(
        <CommonsMediaDataValueEditor
          datavalue={datavalue}
          onDataValueChange={onDataValueChange}
          propertyDescription={p18Description} />
      );
      assert.ok( rendered );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );

      input.value = 'NewImage.gif';
      ReactTestUtils.Simulate.change( input );

      assert.equal( datavalue.value, 'NewImage.gif' );
    } );

  } );

} );