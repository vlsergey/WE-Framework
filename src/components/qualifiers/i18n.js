import { localize } from 'utils/I18nUtils';

const en = {
  buttonAddQualifier: 'add qualifier',
  buttonRemoveQualifier: 'remove qualifier',

  confirmRemoveQualifier: 'Remove the qualifier „{qualifierPropertyLabel}“ ({qualifierPropertyId})'
  + ' of the property „{claimPropertyLabel}“ ({claimPropertyId})?',

  placehoderAutosuggest: 'Enter text to lookup…',
  placehoderSelect: 'Select qualifier type…',

  optionOther: 'Add other qualifier…',

  optionSuffixUnsupported: ' (unsupported)',
};

const ru = {
  buttonAddQualifier: 'добавить квалификатор',
  buttonRemoveQualifier: 'удалить квалификатор',

  confirmRemoveQualifier: 'Удалить квалификатор «{qualifierPropertyLabel}» ({qualifierPropertyId})'
   + ' свойства «{claimPropertyLabel}» ({claimPropertyId})?',

  placehoderAutosuggest: 'Введите текст для поиска квалификатора…',
  placehoderSelect: 'Выберите тип квалификатора…',

  optionOther: 'Добавить другой квалификатор…',

  optionSuffixUnsupported: ' (не поддерживается)',
};

const translations = { en, ru };
const result = localize( {}, translations );
export default result;
