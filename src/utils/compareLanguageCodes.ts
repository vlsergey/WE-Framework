import {DEFAULT_LANGUAGES} from '../utils/I18nUtils';

export default function compareLanguageCodes (a: null | readonly string[] | undefined, b: null | readonly string[] | undefined) {
  const empty = (x: null | readonly string[] | undefined) => typeof x === 'undefined' || x === null || x.length === 0;
  const has = (arr: null | readonly string[] | undefined, item: string) => !empty(arr) && (arr as string[]).includes(item);

  if (empty(a) && empty(b)) return 0;

  for (let i = 0; i < DEFAULT_LANGUAGES.length; i++) {
    const lc = DEFAULT_LANGUAGES[i] as string;
    if (has(a, lc) && !has(b, lc)) return -1;
    if (!has(a, lc) && has(b, lc)) return +1;
  }

  // other items by labels
  return 0;
}
