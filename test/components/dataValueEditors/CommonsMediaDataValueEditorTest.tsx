import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import CommonsMediaDataValueEditor from '../../../src/components/dataValueEditors/CommonsMediaDataValueEditor';
import PropertyData from '../../../src/core/PropertyData';
import PropertyDescription from '../../../src/core/PropertyDescription';
import P18 from '../../entities/P18';
import ValueHolder from '../../testUtils/ValueHolder';
import TableTBodyTr from './TableTBodyTr';

const NOOP = () => {};

describe('components/dataValueEditors', () => {

  describe('CommonsMediaDataValueEditor', () => {

    const p18Description = new PropertyDescription(new PropertyData(P18));

    it('can be rendered', () => {
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
      assert.ok(rendered);
    });

    it('can be changed via keyboard', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<StringDataValue | null> initialValue={{value: 'Image.jpg', type: 'string'}}>{ (value, onChange) =>
          <TableTBodyTr>
            <CommonsMediaDataValueEditor
              datavalue={value}
              onDataValueChange={onChange}
              propertyDescription={p18Description} />
          </TableTBodyTr>
        }</ValueHolder>
      ) as unknown as ValueHolder<StringDataValue>;
      assert.ok(rendered);
      const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);

      input.value = 'NewImage.gif';
      ReactTestUtils.Simulate.change(input);

      assert.equal(valueHolder.getValue().value, 'NewImage.gif');
    });

  });

});
