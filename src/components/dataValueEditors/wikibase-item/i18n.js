import * as I18nUtils from 'utils/I18nUtils';

const en = {
  buttonLabelCreateNew: 'Create new element',
  buttonLabelGoToLocal: 'Open item page on current wiki',

  optionOther: 'Select other value…',
};

const ru = {
  buttonLabelCreateNew: 'Создать новый элемент',
  buttonLabelGoToLocal: 'Открыть страницу элемента на текущей вики',

  optionOther: 'Указать другое значение…',
};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
