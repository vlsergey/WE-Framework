import { localize } from 'utils/I18nUtils';

const en = {
  buttonLabelViafLookup: 'Find and download VIAF data',

  buttonLabelSelect: 'Select',

  dialogTitle: 'Find and download VIAF data',

  queryState: {
    SCHEDULED: 'Querying VIAF for „$1“…',
    WAITING: 'Query complete. Show top results for „$1“',
  },
};

const fr = {
  buttonLabelViafLookup: 'Rechercher et importer les données du VIAF',

  dialogTitle: 'Rechercher et importer les données du VIAF',
};

const ru = {
  buttonLabelViafLookup: 'Найти и загрузить данные с сервера VIAF',

  buttonLabelSelect: 'Выбрать',

  dialogTitle: 'Найти и загрузить данные с сервера VIAF',

  queryState: {
    SCHEDULED: 'Поиск на сайте VIAF по строке «$1»…',
    WAITING: 'Поиск закочнен. Показаны результаты для «$1»',
  },
};

const result = localize( {}, { en, fr, ru } );
export default result;
