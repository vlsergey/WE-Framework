import * as I18nUtils from '../utils/I18nUtils';

const en = {

  actionAnalyzeChanges: 'Collecting and analyzing changes to entity',
  actionNoChangesPurge: 'No changes found, purge and refresh current page',
  actionUpdateEntity: 'Saving changes in entity (update and create statements)',
  actionUpdateEntityDone: 'Saving changes in entity (update and create statements): done',
  actionUpdateEntityFail: 'Saving changes in entity (update and create statements): fail',
  actionRemoveClaims: 'Saving changes in entity (remove statements)',
  actionRemoveClaimsDone: 'Saving changes in entity (remove statements): done',
  actionRemoveClaimsFail: 'Saving changes in entity (remove statements): fail',

  confirmCloseWithoutSave: 'You\'ve made changes to entity. Are you sure you want to close editor dialog without save?',

  errorUpdateEntity: 'Unable to update entity',

};

const ru = {

  actionAnalyzeChanges: 'Сбор и анализ изменений в элементе',
  actionNoChangesPurge: 'Изменения не найдены, перезагрузка текущей страницы',
  actionUpdateEntity: 'Сохранение изменений в элемент (обновление и создание утверждений)',
  actionUpdateEntityDone: 'Сохранение изменений в элемент (обновление и создание утверждений): успешно.',
  actionUpdateEntityFail: 'Сохранение изменений в элемент (обновление и создание утверждений): ошибка!',
  actionRemoveClaims: 'Сохранение изменений в элемент (удаление утверждений)',
  actionRemoveClaimsDone: 'Сохранение изменений в элемент (удаление утверждений): успешно.',
  actionRemoveClaimsFail: 'Сохранение изменений в элемент (удаление утверждений): ошибка!',

  confirmCloseWithoutSave: 'Вы внесли изменения в сущность. Вы действительно хотите закрыть редактор без сохранения изменений?',

  errorUpdateEntity: 'Произошла ошибка при сохранении изменений в элемент',

};

const translations = {en, ru};
const result = I18nUtils.localize({}, translations);
export default result;
