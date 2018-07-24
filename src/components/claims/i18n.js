import { localize } from 'utils/I18nUtils';

const en = {
  buttonLabelSortClaims: 'Sort claims',

  dialogButtonLabelCancel: 'Cancel',
  dialogButtonTextCancel: 'Cancel',
  dialogButtonLabelSortClaims: 'Sort',
  dialogButtonTextSortClaims: 'Sort',

  dialogTitleSortClaims: 'Sort exising claims',

  fieldLabelEmptyValuesSort: 'Put empty and non-existing values...',
  fieldLabelSortBy: 'Sort by qualifier value',
  fieldLabelSortOrder: 'Sort order',

  optionSortAsFirst: 'to the top',
  optionSortAsLast: 'to the end',

  optionSortOrderAsc: 'ascending',
  optionSortOrderDesc: 'descending',
};

const ru = {
  buttonLabelSortClaims: 'Сортировать элементы',

  dialogButtonLabelCancel: 'Отменить',
  dialogButtonTextCancel: 'Отменить',
  dialogButtonLabelSortClaims: 'Сортировать',
  dialogButtonTextSortClaims: 'Сортировать',

  dialogTitleSortClaims: 'Сортировать существующие значения',

  fieldLabelEmptyValuesSort: 'Поместить пустые и отсутствующие значения...',
  fieldLabelSortBy: 'Сортировать по значению квалификатора',
  fieldLabelSortOrder: 'Порядок сортировки',

  optionSortAsFirst: 'в начало',
  optionSortAsLast: 'в конец',

  optionSortOrderAsc: 'восходящий',
  optionSortOrderDesc: 'нисходящий',
};

const result = localize( {}, { en, ru } );
export default result;
