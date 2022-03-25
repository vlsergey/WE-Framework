import * as I18nUtils from '../utils/I18nUtils';

const en = {
  linkText: 'WEF: Settings',
  dialogTitle: 'Enabled editors settings — WE-Framework',

  fieldSetEditors: 'Editors to enable (in left menu and dropdowns)',

  portalLabel: 'Wikidata Edit',

  windowButtonSave: 'Save',
  windowButtonCancel: 'Cancel',
};

const ru = {
  linkText: 'WEF: Настройки',
  dialogTitle: 'Загружаемые гаджеты — WE-Framework',

  fieldSetEditors: 'Включить следующие редакторы (в меню и в выпадающих списках)',

  portalLabel: 'Викиданные',

  windowButtonSave: 'Сохранить',
  windowButtonCancel: 'Отмена',

};

const translations = {en, ru};
const result = I18nUtils.localize({}, translations) as typeof en;
export default result;
