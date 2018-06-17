export const DEFAULT_LANGUAGES = [];

[ mw.config.get( 'wgContentLanguage' ), mw.config.get( 'wgUserLanguage' ), 'en', 'ru' ]
  .forEach( code => { if ( DEFAULT_LANGUAGES.indexOf( code ) === -1 ) DEFAULT_LANGUAGES.push( code ); } );

export const API_PARAMETER_LANGUAGES = DEFAULT_LANGUAGES.join( '|' );

export const LANGUAGE_TITLES = ( () => {
  const result = {};
  for ( const languageCode in jQuery.uls.data.languages ) {
    const languageOptions = jQuery.uls.data.languages[ languageCode ];
    const languageTitle = languageOptions[ 2 ];
    result[ languageCode ] = languageTitle;
  }
  return result;
} )();

export function localize( prototypeDictionaty, translations ) {
  let result = { ...prototypeDictionaty };
  DEFAULT_LANGUAGES.forEach( languageCode => {
    if ( translations[ languageCode ] ) {
      result = { ...translations[ languageCode ], ...result };
    }
  } );
  return result;
}
