import * as I18nUtils from 'utils/I18nUtils';
import assert from 'assert';

describe( 'I18nUtils', () => {

  describe( 'API_PARAMETER_LANGUAGES', () => {
    it( 'is correct', () => {
      assert.equal( I18nUtils.API_PARAMETER_LANGUAGES, 'en|ru' );
    } );
  } );

  describe( 'DEFAULT_LANGUAGES', () => {
    it( 'is correct', () => {
      assert.deepEqual( I18nUtils.DEFAULT_LANGUAGES, [ 'en', 'ru' ] );
    } );
  } );

  describe( 'languageTitles', () => {
    it( 'is correct', () => {
      assert.equal( I18nUtils.LANGUAGE_TITLES.en, 'English' );
      assert.equal( I18nUtils.LANGUAGE_TITLES.ru, 'русский' );
    } );
  } );

} );
