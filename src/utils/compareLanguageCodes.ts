import { DEFAULT_LANGUAGES } from '../utils/I18nUtils';

export default function compareLanguageCodes( a : null | string[] | undefined, b : null | string[] | undefined ) {
  const empty = (x : null | string[] | undefined) => typeof x === 'undefined' || x === null || x.length === 0;
  const has = ( arr : null | string[] | undefined, item : string ) => !empty( arr ) && (arr as string[]).indexOf( item ) !== -1;

  if ( empty( a ) && empty( b ) ) return 0;

  for ( let i = 0; i < DEFAULT_LANGUAGES.length; i++ ) {
    const lc = DEFAULT_LANGUAGES[ i ] as string;
    if ( has( a, lc ) && !has( b, lc ) ) return -1;
    if ( !has( a, lc ) && has( b, lc ) ) return +1;
  }

  // other items by labels
  return 0;
}
