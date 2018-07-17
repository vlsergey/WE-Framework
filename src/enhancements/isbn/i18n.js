import * as I18nUtils from 'utils/I18nUtils';

const en = {
  buttonLabelHyphenate: 'Hyphenate ISBN value',
};

const ru = {
  buttonLabelHyphenate: 'Форматировать значение ISBN',
};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
