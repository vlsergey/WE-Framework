import { localize } from 'utils/I18nUtils';

const en = {
  buttonLabelCreateNew: 'Create new element',
  buttonLabelGoToLocal: 'Open item page on current wiki',

  optionOther: 'Select other value…',

  paragraphTextSelectEditorForCreate: 'Select editor for new item creation',
};

const ru = {
  buttonLabelCreateNew: 'Создать новый элемент',
  buttonLabelGoToLocal: 'Открыть страницу элемента на текущей вики',

  optionOther: 'Указать другое значение…',

  paragraphTextSelectEditorForCreate: 'Выберите редактор для создания нового элемента',
};

const result = localize( {}, { en, ru } );
export default result;
