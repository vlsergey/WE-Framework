import {defaultMemoize} from 'reselect';

import {DEFAULT_LANGUAGES} from '../../utils/I18nUtils';

function getEmptySuggestionsImpl (provided: string[]): string[] {
  const added: Set< string > = new Set();
  const result: string[] = [];

  const codeNotYetIncluded = (code: string) => !added.has(code);
  const add = (code: string) => { added.add(code); result.push(code); };

  // both in default and in present
  DEFAULT_LANGUAGES
    .filter(code => provided.includes(code))
    .filter(codeNotYetIncluded)
    .forEach(add);

  // rest defaults
  DEFAULT_LANGUAGES.filter(codeNotYetIncluded).forEach(add);

  // rest provided
  provided.filter(codeNotYetIncluded).forEach(add);

  return result;
}

export function createEmptySuggestionsSelector (): (_: string[]) => string[] {
  return defaultMemoize(getEmptySuggestionsImpl);
}
