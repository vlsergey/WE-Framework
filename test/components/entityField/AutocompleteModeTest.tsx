import {assert} from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import LabelDescription from '../../../src/caches/LabelDescription';
import {labelDescriptionCache} from '../../../src/caches/labelDescriptionCache';
import AutocompleteMode from '../../../src/components/entityField/AutocompleteMode';
import WikibaseItemInput from '../../../src/components/entityField/WikibaseItemInput';
import Q752285 from '../../entities/Q752285';
import Provider from '../../testUtils/ProviderWrapper';
import ValueHolder from '../../testUtils/ValueHolder';

describe('components/dataValueEditors/wikibase-item', () => {

  describe('AutocompleteMode', () => {

    it('Correctly handles click on item after copy-paste', () => {
      function testSuggestionsProvider (value: string) {
        if (value == 'Q752285') {
          return ['Q752285'];
        }
        return [];
      }

      console.debug('TEST: populate cache', labelDescriptionCache);
      labelDescriptionCache.putToMemoryCache('Q752285', new LabelDescription(Q752285));
      console.debug('TEST: populate cache... Done', labelDescriptionCache);

      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<string | null> initialValue={null}>{ (value, onChange) =>
          <AutocompleteMode
            onSelect={onChange}
            testSuggestionsProvider={testSuggestionsProvider}
            value={value} />
        }</ValueHolder>
      ) as unknown as Provider;
      assert.ok(rendered);
      const valueHolder = ReactTestUtils.findRenderedComponentWithType(rendered, ValueHolder) as ValueHolder<any>;

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);

      input.focus();
      ReactTestUtils.Simulate.focus(input);

      // manual enter
      input.value = 'Q752285';
      ReactTestUtils.Simulate.change(input);
      assert.equal(valueHolder.getValue(), 'Q752285');

      const suggestionTable = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'table') as HTMLTableElement;
      ReactTestUtils.Simulate.click(suggestionTable);
      assert.equal(valueHolder.getValue(), 'Q752285');

      const wikibaseItemInput: WikibaseItemInput = ReactTestUtils.findRenderedComponentWithType(rendered, WikibaseItemInput);

      // cursor inside input: dirty value without label
      assert.equal(input.value, 'Q752285');
      assert.equal(wikibaseItemInput.state.focused, true);

      // leaving input: must be with label
      console.log('TEST: leaving input: must be with label');
      input.blur();
      ReactTestUtils.Simulate.blur(input);
      assert.equal(wikibaseItemInput.state.focused, false);
      assert.equal(input.value, 'Laws (Q752285)');

      // must be the previously entered text, i.e. Q752285
      input.focus();
      ReactTestUtils.Simulate.focus(input);
      assert.equal(wikibaseItemInput.state.focused, true);
      assert.equal(input.value, 'Q752285');

    });

    it('Correctly handles copypaste of Wikidata URL', () => {
      function testSuggestionsProvider () {
        return [];
      }

      const rendered = ReactTestUtils.renderIntoDocument(
        <ValueHolder<string | null> initialValue="">{ (value, onChange) =>
          <AutocompleteMode
            onSelect={onChange}
            testSuggestionsProvider={testSuggestionsProvider}
            value={value} />
        }</ValueHolder>
      ) as unknown as ValueHolder<string | null>;
      assert.ok(rendered);

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'input') as HTMLInputElement;
      assert.ok(input);

      input.focus();
      ReactTestUtils.Simulate.focus(input);

      // copypaste
      input.value = 'http://www.wikidata.org/wiki/Q752285';
      ReactTestUtils.Simulate.change(input);
      assert.equal(rendered.getValue(), '');
    });
  });
});
