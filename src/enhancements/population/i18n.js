import { localize } from 'utils/I18nUtils';

const en = {
  buttonLabelPopulationLookup: 'Import population data',

  buttonLabelSelectAll: 'Select all',
  buttonLabelImport: 'Import',

  dialogTitle: 'Import population data',

  queryState: {
    ERROR: 'Querying data from „$1“ completes with error (details are in browser console log)',
    SCHEDULED: 'Querying data from „$1“…',
    WAITING: 'Query complete. Show results from „$1“',
  },

  sourceButtonLabel_articleTimelines: 'Data from article timeline graphs',
  sourceButtonLabel_usCensusPopTemplate: 'Data from USCensusPop template',
  sourceButtonLabel_Численность_населенияTemplate: 'Data from «Численность населения» template',
};

const ru = {
  buttonLabelPopulationLookup: 'Импорт демографических данных',

  buttonLabelSelectAll: 'Выбрать все',
  buttonLabelImport: 'Импорт',

  dialogTitle: 'Импорт демографических данных',

  queryState: {
    ERROR: 'Поиск данных в источнике «$1» закончился с ошибкой (детали в логе консоли браузера)',
    SCHEDULED: 'Поиск данных в источнике «$1»…',
    WAITING: 'Поиск закочнен. Показаны результаты источника «$1»',
  },

  sourceButtonLabel_articleTimelines: 'Данные из timelines-графиков',
  sourceButtonLabel_usCensusPopTemplate: 'Данные из шаблона USCensusPop',
  sourceButtonLabel_Численность_населенияTemplate: 'Данные из шаблона «Численность населения»',
};

const result = localize( {}, { en, ru } );
export default result;
