import * as I18nUtils from 'utils/I18nUtils';

const en = {
  buttonLabelGoToLocal: 'Open item page on current wiki',

  optionOther: 'Select other value…',
};

const ru = {
  buttonLabelGoToLocal: 'Открыть страницу элемента на текущей вики',

  optionOther: 'Указать другое значение…',
};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
