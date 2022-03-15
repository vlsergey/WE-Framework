export const DEFAULT_LANGUAGES = [] as string[];

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

let languageTitlesCache: Map< string, string > | null = null;

export function getLanguageTitles (): Map< string, string > {
  if (languageTitlesCache != null) return languageTitlesCache;

  const ulsDataLanguages = jQuery.uls.data.languages;
  languageTitlesCache = new Map(
    Object.keys(ulsDataLanguages)
      .map(languageCode => [languageCode, getTitleFromOptions(ulsDataLanguages, languageCode)])
  );
  return languageTitlesCache;
}

export function localize (prototypeDictionaty: any, translations: any) {
  let result = {...prototypeDictionaty};
  DEFAULT_LANGUAGES.forEach(languageCode => {
    if (translations[languageCode]) {
      result = {...translations[languageCode], ...result};
    }
  });
  return result;
}
