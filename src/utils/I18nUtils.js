export const DEFAULT_LANGUAGES = [];

[ mw.config.get( 'wgUserLanguage' ), mw.config.get( 'wgContentLanguage' ), 'en', 'ru' ]
  .forEach( code => { if ( DEFAULT_LANGUAGES.indexOf( code ) === -1 ) DEFAULT_LANGUAGES.push( code ); } );

export const API_PARAMETER_LANGUAGES = DEFAULT_LANGUAGES.join( '|' );

function getTitleFromOptions( allLanguagesData, languageCode ) {
  const languageOptions = allLanguagesData[ languageCode ];

  if ( languageOptions.length === 1 ) {
    // it's alias
    const [ actualLanguageCode ] = languageOptions;
    return getTitleFromOptions( allLanguagesData, actualLanguageCode );
  }

  if ( languageOptions.length === 3 ) {
    return languageOptions[ 2 ];
  }

  throw new Error( 'Unable to get language title for code \'' + languageCode + '\': '
     + JSON.stringify( languageOptions ) );
}

export const LANGUAGE_TITLES = ( () => {
  const result = {};
  for ( const languageCode in jQuery.uls.data.languages ) {
    const languageTitle = getTitleFromOptions( jQuery.uls.data.languages, languageCode );
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
