import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import { defaultMemoize } from 'reselect';

function getEmptySuggestionsImpl( provided ) {
  const added = new Set();
  const result = [];

  const codeNotYetIncluded = code => !added.has( code );
  const add = code => { added.add( code ); result.push( code ); };

  // both in default and in present
  DEFAULT_LANGUAGES
    .filter( code => provided.indexOf( code ) !== -1 )
    .filter( codeNotYetIncluded )
    .forEach( add );

  // rest defaults
  DEFAULT_LANGUAGES.filter( codeNotYetIncluded ).forEach( add );

  // rest provided
  provided.filter( codeNotYetIncluded ).forEach( add );

  return result;
}

export function createEmptySuggestionsSelector() {
  return defaultMemoize( getEmptySuggestionsImpl );
}