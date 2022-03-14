import {localize} from '../../utils/I18nUtils';

const en = {
  buttonLabelFillSisterIsbn: 'Fill „sister“ ISBN property with corresponding value',
  buttonLabelHyphenate: 'Hyphenate ISBN value',
};

const ru = {
  buttonLabelFillSisterIsbn: 'Заполнить значение «братского» свойства ISBN соответствующим значением',
  buttonLabelHyphenate: 'Форматировать значение ISBN',
};

const result = localize({}, {en, ru});
export default result;
