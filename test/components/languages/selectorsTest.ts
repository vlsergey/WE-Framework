import {assert} from 'chai';

import * as selectors from '../../../src/components/languages/selectors';

describe('components/languages/selectors', () => {

  describe('createEmptySuggestionsSelector', () => {

    it('provides correct variants', () => {
      const result = selectors.createEmptySuggestionsSelector()(['fr', 'en', 'ru']);
      assert.deepEqual(result, ['en', 'ru', 'fr']);
    });

  });

});
