import { localize } from '../../utils/I18nUtils';

const en = {
  buttonLabelAddQualifier: 'add qualifier',
  buttonLabelRemoveQualifier: 'remove qualifier',

  confirmRemoveQualifierTemplate: 'Remove the qualifier „{qualifierPropertyLabel}“ ({qualifierPropertyId})'
  + ' of the property „{claimPropertyLabel}“ ({claimPropertyId})?',

  placehoderAutosuggest: 'Enter text to lookup…',
  placehoderSelect: 'Select qualifier type…',

  optionOther: 'Add other qualifier…',

  optionSuffixUnsupported: ' (unsupported)',
};

const ru = {
  buttonLabelAddQualifier: 'добавить квалификатор',
  buttonLabelRemoveQualifier: 'удалить квалификатор',

  confirmRemoveQualifierTemplate: 'Удалить квалификатор «{qualifierPropertyLabel}» ({qualifierPropertyId})'
   + ' свойства «{claimPropertyLabel}» ({claimPropertyId})?',

  placehoderAutosuggest: 'Введите текст для поиска квалификатора…',
  placehoderSelect: 'Выберите тип квалификатора…',

  optionOther: 'Добавить другой квалификатор…',

  optionSuffixUnsupported: ' (не поддерживается)',
};

const translations = { en, ru };
const result = localize( {}, translations );
export default result;
