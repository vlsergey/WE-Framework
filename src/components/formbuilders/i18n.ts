import {localize} from '../../utils/I18nUtils';

const en = {

  labelDisplayEmpty: 'display empty:',
  labelQuickSearchTerm: 'quick search:',

};

const ru = {

  labelDisplayEmpty: 'показывать незаполненные:',
  labelQuickSearchTerm: 'быстрый поиск:',

};

const translations = {en, ru};
const result = localize({}, translations) as typeof en;
export default result;
