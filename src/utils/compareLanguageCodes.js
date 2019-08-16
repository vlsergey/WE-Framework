import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';

export default function compareLanguageCodes( a, b ) {
  const empty = x => typeof x === 'undefined' || x === null || x.length === 0;
  const has = ( arr, item ) => !empty( arr ) && arr.indexOf( item ) !== -1;

  if ( empty( a ) && empty( b ) ) return 0;

  for ( let i = 0; i < DEFAULT_LANGUAGES.length; i++ ) {
    const lc = DEFAULT_LANGUAGES[ i ];
    if ( has( a, lc ) && !has( b, lc ) ) return -1;
    if ( !has( a, lc ) && has( b, lc ) ) return +1;
  }

  // other items by labels
  return 0;
}
