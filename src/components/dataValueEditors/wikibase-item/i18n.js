import * as I18nUtils from 'utils/I18nUtils';

const en = {
  optionOther: 'Select other value…',
};

const ru = {
  optionOther: 'Указать другое значение…',
};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
