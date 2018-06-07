export function localize( prototypeDictionaty, translations ) {
  let result = { ...prototypeDictionaty };
  const languageCodes = [ 'ru', 'en', mw.config.get( 'wgContentLanguage' ), mw.config.get( 'wgUserLanguage' ) ];
  languageCodes.forEach( languageCode => {
    if ( translations[ languageCode ] ) {
      result = { ...translations[ languageCode ], ...result };
    }
  } );
  return result;
}
