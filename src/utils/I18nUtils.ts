export const DEFAULT_LANGUAGES = [] as string[];

// @ts-expect-error
[mw.config.get('wgUserLanguage'), mw.config.get('wgContentLanguage'), 'en', 'ru']
  .forEach(code => { if (!DEFAULT_LANGUAGES.includes(code)) DEFAULT_LANGUAGES.push(code); });

export const API_PARAMETER_LANGUAGES = DEFAULT_LANGUAGES.join('|');

function getTitleFromOptions (allLanguagesData: any, languageCode: string): string {
  const languageOptions = allLanguagesData[languageCode];

  if (languageOptions.length === 1) {
    // it's alias
    const [actualLanguageCode] = languageOptions;
    return getTitleFromOptions(allLanguagesData, actualLanguageCode);
  }

  if (languageOptions.length === 3) {
    return languageOptions[2];
  }

  throw new Error('Unable to get language title for code \'' + languageCode + '\': '
     + JSON.stringify(languageOptions));
}

export const LANGUAGE_TITLES: Map< string, string > = (() => {
  // @ts-expect-error
  const ulsDataLanguages = jQuery.uls.data.languages;
  const result: Map< string, string > = new Map(
    Object.keys(ulsDataLanguages)
      .map(languageCode => [languageCode, getTitleFromOptions(ulsDataLanguages, languageCode)])
  );
  return result;
})();

export function localize (prototypeDictionaty: any, translations: any) {
  let result = {...prototypeDictionaty};
  DEFAULT_LANGUAGES.forEach(languageCode => {
    if (translations[languageCode]) {
      result = {...translations[languageCode], ...result};
    }
  });
  return result;
}
