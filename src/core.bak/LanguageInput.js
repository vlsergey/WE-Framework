import styles from './core.css';

let availableLanguagesCache = null;

function getAvailableLanguages() {
  if ( availableLanguagesCache === null ) {
    availableLanguagesCache = [];
    $.each( $.uls.data.languages, function( languageCode, languageOptions ) {
      const languageTitle = languageOptions[ 2 ];
      const auctocompleteObject = {
        label: languageCode + ' — ' + languageTitle,
        value: languageCode,
      };
      availableLanguagesCache.push( auctocompleteObject );
    } );
  }
  return availableLanguagesCache;
}


/**
 * Creates input field to input language code based on $.uls.data.languages list
 */
export default class WEF_LanguageInput{
  constructor() {
    const input = $( document.createElement( 'input' ) )
      .addClass( styles.wef_language_select );

    input.autocomplete( {
      source: getAvailableLanguages(),
    } );

    this.appendTo = input.appendTo.bind( input );
    this.change = input.change.bind( input );
    this.val = input.val.bind( input );
  }

}
