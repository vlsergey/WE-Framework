import assert from 'assert';
import CommonsMediaDataValueEditor from 'components/dataValueEditors/CommonsMediaDataValueEditor';
import P18 from '../../entities/P18';
import PropertyDescription from 'core/PropertyDescription';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from './TableTBodyTr';
import ValueHolder from '../../ValueHolder';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  describe( 'CommonsMediaDataValueEditor', () => {

    const p18Description = new PropertyDescription( P18 );

    it ( 'can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <TableTBodyTr>
          <CommonsMediaDataValueEditor
            datavalue={{
              value: 'Image.jpg',
              type: 'string',
            }}
            onDataValueChange={NOOP}
            propertyDescription={p18Description} />
        </TableTBodyTr>
      );
      assert.ok( rendered );
    } );

    it ( 'can be changed via keyboard', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder initialValue={{ value: 'Image.jpg', type: 'string' }}>{ ( value, onChange ) =>
          <TableTBodyTr>
            <CommonsMediaDataValueEditor
              datavalue={value}
              onDataValueChange={onChange}
              propertyDescription={p18Description} />
          </TableTBodyTr>
        }</ValueHolder>
      );
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder );

      const input = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'input' );
      assert.ok( input );

      input.value = 'NewImage.gif';
      ReactTestUtils.Simulate.change( input );

      assert.equal( valueHolder.getValue().value, 'NewImage.gif' );
    } );

  } );

} );
