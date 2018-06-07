import { API_PARAMETER_LANGUAGES } from '../../src/utils/I18nUtils';
import assert from 'assert';

describe('I18nUtils', () => {
  describe('Should provide API_PARAMETER_LANGUAGES', () => {

    it('API_PARAMETER_LANGUAGES is correct', () => {
      assert.equal(API_PARAMETER_LANGUAGES, "en|ru|nl");
    });

  });
});
