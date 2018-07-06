import * as I18nUtils from 'utils/I18nUtils';

const en = {

  dialogTitle: 'View and edit references (sources) of claim — WE-Framework',

  dialogButtonAddLabel: 'Add',
  dialogButtonAddTitle: 'Add new reference to the list',

  dialogButtonCloseLabel: 'Close',
  dialogButtonCloseTitle: 'Close the dialog',

  dialogLabelAddRecentlyUsed: 'Quick add recently used sources',

};

const ru = {

  dialogTitle: 'Просмотр и редактирование источников для утверждения — WE-Framework',

  dialogButtonAddLabel: 'Добавить',
  dialogButtonAddTitle: 'Добавить новую сноску на источник в список',

  dialogButtonCloseLabel: 'Закрыть',
  dialogButtonCloseTitle: 'Закрыть диалоговое окно',

  dialogLabelAddRecentlyUsed: 'Быстрое добавление недавно использованных источников',

};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
