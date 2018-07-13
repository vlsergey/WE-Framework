import * as I18nUtils from 'utils/I18nUtils';

const en = {
  linkText: 'WEF: Settings',
  dialogTitle: 'Enabled editors settings — WE-Framework',

  fieldSetEditors: 'Editors to enable (in left menu and dropdowns)',

  windowButtonSave: 'Save',
  windowButtonCancel: 'Cancel',
};

const ru = {
  linkText: 'WEF: Настройки',
  dialogTitle: 'Загружаемые гаджеты — WE-Framework',

  fieldSetEditors: 'Включить следующие редакторы (в меню и в выпадающих списках)',

  windowButtonSave: 'Сохранить',
  windowButtonCancel: 'Отмена',

};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
