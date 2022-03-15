import {assert} from 'chai';
import MonolingualTextDataValueEditor from '../../../src/components/dataValueEditors/MonolingualTextDataValueEditor';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TableTBodyTr from './TableTBodyTr';
import ValueHolder from '../../testUtils/ValueHolder';

const NOOP = () => {};

describe( 'components/dataValueEditors', () => {

  describe( 'MonolingualTextDataValueEditor', () => {

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
            onDataValueChange={NOOP} />
        </TableTBodyTr>
      )as unknown as TableTBodyTr;
      assert.ok( rendered );

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' ) as HTMLInputElement[];
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );
      assert.equal( inputs[ 0 ]!.value, 'en' );
      assert.equal( inputs[ 1 ]!.value, 'TestText' );
    } );

    it( 'non-existing can be changed via keyboard', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<MonolingualTextDataValue|null> initialValue={null}>{ ( value, onChange ) =>
          <TableTBodyTr>
            <MonolingualTextDataValueEditor
              datavalue={value}
              onDataValueChange={onChange} />
          </TableTBodyTr>
        }</ValueHolder>
      )as unknown as ValueHolder<MonolingualTextDataValue>;
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder ) as ValueHolder<any>;

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' ) as HTMLInputElement[];
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ]!.value = 'ru';
      ReactTestUtils.Simulate.change( inputs[ 0 ]! );
      assert.equal( valueHolder.getValue().value.language, 'ru' );

      inputs[ 1 ]!.value = 'NewTestText';
      ReactTestUtils.Simulate.change( inputs[ 1 ]! );
      assert.equal( valueHolder.getValue().value.text, 'NewTestText' );
    } );

    it( 'existing value can be changed via keyboard', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<MonolingualTextDataValue|null> initialValue={{
          value: {
            language: 'en',
            text: 'TestText',
          },
          type: 'monolingualtext',
        }}>{ ( value, onChange ) =>
            <TableTBodyTr>
              <MonolingualTextDataValueEditor
                datavalue={value}
                onDataValueChange={onChange} />
            </TableTBodyTr>
          }</ValueHolder>
      )as unknown as ValueHolder<MonolingualTextDataValue>;
      assert.ok( rendered );
      const valueHolder = ReactTestUtils.findRenderedComponentWithType( rendered, ValueHolder ) as ValueHolder<any>;

      const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag( rendered, 'input' ) as HTMLInputElement[];
      assert.ok( inputs );
      assert.equal( inputs.length, 2 );

      inputs[ 0 ]!.value = 'ru';
      ReactTestUtils.Simulate.change( inputs[ 0 ]! );
      assert.equal( valueHolder.getValue().value.language, 'ru' );

      inputs[ 1 ]!.value = 'NewTestText';
      ReactTestUtils.Simulate.change( inputs[ 1 ]! );
      assert.equal( valueHolder.getValue().value.text, 'NewTestText' );
    } );

  } );

} );
