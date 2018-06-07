const languages = [];

[ mw.config.get( 'wgContentLanguage' ), mw.config.get( 'wgUserLanguage' ), 'en', 'ru', 'nl' ]
  .forEach( code => { if ( languages.indexOf( code ) === -1 ) languages.push( code ); } );

export const API_PARAMETER_LANGUAGES = languages.join( '|' );

export function localize( prototypeDictionaty, translations ) {
  let result = { ...prototypeDictionaty };
  languages.forEach( languageCode => {
    if ( translations[ languageCode ] ) {
      result = { ...translations[ languageCode ], ...result };
    }
  } );
  return result;
}
