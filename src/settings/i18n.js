import * as I18nUtils from 'utils/I18nUtils';

const en = {
  linkText: 'WE-F Settings',
  windowTitle: 'WE-F Settings',

  fieldSetEditors: 'Editors to enable (in left menu and dropdowns)',

  windowButtonSave: 'Save',
  windowButtonCancel: 'Cancel',
};

const ru = {
  linkText: 'WE-F: Настройка',
  windowTitle: 'WE-F: Настройка гаджетов',

  fieldSetEditors: 'Включить следующие редакторы (в меню и в выпадающих списках)',

  windowButtonSave: 'Сохранить',
  windowButtonCancel: 'Отмена',

};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
