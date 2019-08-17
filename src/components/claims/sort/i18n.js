import { localize } from 'utils/I18nUtils';

const en = {
  buttonLabelSortClaims: 'Sort claims',

  comparators: {
    alphabetical: 'alphabetical',
    time: 'as time',
    naturalSort: 'natural sort',
  },

  dialogButtonLabelCancel: 'Cancel',
  dialogButtonTextCancel: 'Cancel',
  dialogButtonLabelSortClaims: 'Sort',
  dialogButtonTextSortClaims: 'Sort',

  dialogTitleSortClaims: 'Sort existing claims',

  fieldLabelComparator: 'Sort rule',
  fieldLabelEmptyValuesSort: 'Put empty and non-existing values...',
  fieldLabelSortBy: 'Qualifier to sort by',
  fieldLabelSortOrder: 'Sort order',

  optionSortAsFirst: 'to the top',
  optionSortAsLast: 'to the end',

  optionSortOrderAsc: 'ascending',
  optionSortOrderDesc: 'descending',
};

const ru = {
  buttonLabelSortClaims: 'Сортировать элементы',

  comparators: {
    alphabetical: 'по алвавиту',
    time: 'как время',
    naturalSort: 'естественная',
  },

  dialogButtonLabelCancel: 'Отменить',
  dialogButtonTextCancel: 'Отменить',
  dialogButtonLabelSortClaims: 'Сортировать',
  dialogButtonTextSortClaims: 'Сортировать',

  dialogTitleSortClaims: 'Сортировать существующие значения',

  fieldLabelComparator: 'Правило сортировки',
  fieldLabelEmptyValuesSort: 'Поместить пустые и отсутствующие значения...',
  fieldLabelSortBy: 'Квалификатор для сортировки',
  fieldLabelSortOrder: 'Порядок сортировки',

  optionSortAsFirst: 'в начало',
  optionSortAsLast: 'в конец',

  optionSortOrderAsc: 'восходящий',
  optionSortOrderDesc: 'нисходящий',
};

const result = localize( {}, { en, ru } );
export default result;
