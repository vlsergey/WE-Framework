import { localize } from 'utils/I18nUtils';

const en = {
  buttonAddQualifier: 'add qualifier',
  buttonRemoveQualifier: 'remove qualifier',

  placehoderAutosuggest: 'Enter text to lookup…',
  placehoderSelect: 'Select qualifier type…',

  optionOther: 'Add other qualifier…',

  optionSuffixUnsupported: ' (unsupported)',
};

const ru = {
  buttonAddQualifier: 'добавить квалификатор',
  buttonRemoveQualifier: 'удалить квалификатор',

  placehoderAutosuggest: 'Введите текст для поиска квалификатора…',
  placehoderSelect: 'Выберите тип квалификатора…',

  optionOther: 'Добавить другой квалификатор…',

  optionSuffixUnsupported: ' (не поддерживается)',
};

const translations = { en, ru };
const result = localize( {}, translations );
export default result;
