// @flow

import * as I18nUtils from 'utils/I18nUtils';

const en = {

  buttonTitleReferences: 'View and edit references (sources) of the claim',
  buttonTitleRemoveQualifier: 'Remove reference property value',

  confirmRemoveSnakTemplate: 'Remove reference property „{snakPropertyLabel}“ ({snakPropertyId}) value?',

  dialogTitle: 'View and edit references (sources) of the claim — WE-Framework',

  dialogButtonAddLabel: 'Add',
  dialogButtonAddTitle: 'Add new reference to the list',

  dialogButtonCloseLabel: 'Close',
  dialogButtonCloseTitle: 'Close the dialog',

  dialogLabelAddRecentlyUsed: 'Quick add recently used sources',

  placehoderSelect: 'Select property to add to reference',
};

const ru = {

  buttonTitleReferences: 'Просмотр и редактирование источников для утверждения',
  buttonTitleRemoveQualifier: 'Удалить значение свойства для источника',

  confirmRemoveSnakTemplate: 'Удалить значение свойства «{snakPropertyLabel}» ({snakPropertyId}) источника?',

  dialogTitle: 'Просмотр и редактирование источников для утверждения — WE-Framework',

  dialogButtonAddLabel: 'Добавить',
  dialogButtonAddTitle: 'Добавить новую сноску на источник в список',

  dialogButtonCloseLabel: 'Закрыть',
  dialogButtonCloseTitle: 'Закрыть диалоговое окно',

  dialogLabelAddRecentlyUsed: 'Быстрое добавление недавно использованных источников',

  placehoderSelect: 'Выберите свойство для добавления к ссылке',

};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
