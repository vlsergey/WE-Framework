import { createSelector, defaultMemoize } from 'reselect';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};
const EMPTY_STRING = '';

const labelalikesFromEntity = ( entityElementName ) => ( entity ) => entity[ entityElementName ] || EMPTY_OBJECT;
const labelsFromEntity = labelalikesFromEntity( 'labels' );
const descriptionsFromEntity = labelalikesFromEntity( 'descriptions' );
const aliasesFromEntity = labelalikesFromEntity( 'aliases' );

/* 3 different instances of the same thing -- since cache size is 1 */
const allLanguagesFromLabels = defaultMemoize( labelalike => Object.keys( labelalike ) );
const allLanguagesFromDescriptions = defaultMemoize( labelalike => Object.keys( labelalike ) );
const allLanguagesFromAliases = defaultMemoize( labelalike => Object.keys( labelalike ) );

export const listLabelalikeLanguages = createSelector(
  entity => allLanguagesFromLabels( labelsFromEntity( entity ) ),
  entity => allLanguagesFromDescriptions( labelsFromEntity( entity ) ),
  entity => allLanguagesFromAliases( labelsFromEntity( entity ) ),
  ( fromLabels, fromDescriptions, fromAliases ) => {
    const result = [ ...DEFAULT_LANGUAGES ];

    const languages = new Set();
    fromLabels.forEach( langCode => languages.add( langCode ) );
    fromDescriptions.forEach( langCode => languages.add( langCode ) );
    fromAliases.forEach( langCode => languages.add( langCode ) );

    // remove DEFAULT_LANGUAGES from set
    result.forEach( langCode => languages.delete( langCode ) );
    const sorted = Array.from( languages );
    sorted.sort();

    sorted.forEach( langCode => result.push( langCode ) );
    return result;
  } );

export const labelFromEntityByLanguage = defaultMemoize( ( entity, language ) => {
  const allLanguages = labelsFromEntity( entity ) || EMPTY_OBJECT;
  return allLanguages[ language ] || EMPTY_OBJECT;
} );
export const labelValue = ( labelObject ) => ( labelObject || EMPTY_OBJECT ).value || EMPTY_STRING;

export const descriptionFromEntityByLanguage = defaultMemoize( ( entity, language ) => {
  const allLanguages = descriptionsFromEntity( entity ) || EMPTY_OBJECT;
  return allLanguages[ language ] || EMPTY_OBJECT;
} );
export const descriptionValue = ( labelObject ) => ( labelObject || EMPTY_OBJECT ).value || EMPTY_STRING;

export const aliasesFromEntityByLanguage = defaultMemoize( ( entity, language ) => {
  const allLanguages = aliasesFromEntity( entity ) || EMPTY_OBJECT;
  return allLanguages[ language ] || EMPTY_ARRAY;
} );
export const aliasValues = createSelector(
  aliasObjects => aliasObjects || EMPTY_ARRAY,
  ( aliasObjects ) => aliasObjects.map( alias => alias.value )
);
