import {assert} from 'chai';

import * as I18nUtils from '../../src/utils/I18nUtils';

describe('I18nUtils', () => {

  describe('API_PARAMETER_LANGUAGES', () => {
    it('is correct', () => {
      assert.equal(I18nUtils.API_PARAMETER_LANGUAGES, 'en|ru');
    });
  });

  describe('DEFAULT_LANGUAGES', () => {
    it('is correct', () => {
      assert.deepEqual(I18nUtils.DEFAULT_LANGUAGES, ['en', 'ru']);
    });
  });

  describe('languageTitles', () => {
    it('is correct', () => {
      assert.equal(I18nUtils.LANGUAGE_TITLES.get('en'), 'English');
      assert.equal(I18nUtils.LANGUAGE_TITLES.get('kk'), 'қазақша');
      assert.equal(I18nUtils.LANGUAGE_TITLES.get('ru'), 'русский');
    });
  });

});
