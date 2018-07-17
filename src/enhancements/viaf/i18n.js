import { localize } from 'utils/I18nUtils';

const en = {
  buttonLabelViafLookup: 'Find and download VIAF data',

  buttonLabelSelect: 'Select',

  dialogTitle: 'Find and download VIAF data',
};

const fr = {
  buttonLabelViafLookup: 'Rechercher et importer les données du VIAF',

  dialogTitle: 'Rechercher et importer les données du VIAF',
};

const ru = {
  buttonLabelViafLookup: 'Найти и загрузить данные с сервера VIAF',

  buttonLabelSelect: 'Выбрать',

  dialogTitle: 'Найти и загрузить данные с сервера VIAF',
};

const result = localize( {}, { en, fr, ru } );
export default result;
