import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import LanguageAutocomplete from '../../../src/components/languages/LanguageAutocomplete';

const NOOP = () => {};

describe('components/languages', () => {

  describe('LanguageAutocomplete', () => {

    it('can be rendered', () => {
      const rendered = ReactTestUtils.renderIntoDocument(
        <LanguageAutocomplete
          onChange={NOOP}
          provided={[]}
          value="en" />
      ) as unknown as LanguageAutocomplete;
      assert.ok(rendered);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);
      assert.equal(input.value, 'en');
    });

    it('can be changed via keyboard', () => {
      let value = 'en';
      const onChange = (newValue: string) => { value = newValue; };

      const rendered = ReactTestUtils.renderIntoDocument(
        <LanguageAutocomplete
          onChange={onChange}
          provided={[]}
          value="en" />
      ) as unknown as LanguageAutocomplete;
      assert.ok(rendered);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);

      input.value = 'ru';
      ReactTestUtils.Simulate.change(input);
      assert.equal(value, 'ru');
    });

  });

});
