import { localize } from 'utils/I18nUtils';

const en = {
  buttonCloseText: 'Close',
  buttonCloseTitle: 'Close dialog',

  dialogTitle: 'Importing data',

  state_LOADING: 'Page XML tree is loading…',
  state_ERROR: 'Error occurred during XML loading or analyzing. Please check browser console and contact gadget developer.',
  state_HAS_SUPPORTED_IMPORTERS: 'Page XML tree was successfully loaded and analyzed. The following data import techniques are available:',
  state_NO_SUPPORTED_IMPORTERS: 'Page XML tree was successfully loaded and analyzed. Sadly there is no supported data import techniques.',
};

const ru = {
  buttonCloseText: 'Закрыть',
  buttonCloseTitle: 'Закрыть окно диалога',

  dialogTitle: 'Импорт данных',

  state_LOADING: 'Идёт загрузка содержания страницы в виде XML-дерева…',
  state_ERROR: 'При загрузке или анализе данных произошла ошибка. Проверьте содержимое консоли браузера и обратитесь к разработчику',
  state_HAS_SUPPORTED_IMPORTERS: 'XML-дерево содержания страницы загружено и проанализировано. Есть возможность использовать следующие механизмы импорта данных:',
  state_NO_SUPPORTED_IMPORTERS: 'XML-дерево содержания страницы загружено и проанализировано. К сожалению не найдено доступных механизмов импорта данных.',
};

const result = localize( {}, { en, ru } );
export default result;
