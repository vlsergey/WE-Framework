import * as I18nUtils from 'utils/I18nUtils';

const en = {
  buttonSearchOnWebsites: "Search for element on source websites",
};

const ru = {
  buttonSearchOnWebsites: "Искать элемент на сайтах-источниках",
};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
