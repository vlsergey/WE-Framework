// @flow

import * as I18nUtils from 'utils/I18nUtils';

const en = {

  calendarModel: {
    'http://www.wikidata.org/entity/Q1985786': 'Julian',
    'http://www.wikidata.org/entity/Q1985727': 'Gregorian',
  },

  labelPrecision: 'precision',
  labelCalendar: 'calendar',
  labelSetManually: 'set manually',
  labelWillBeDisplayedAs: 'will be displayed as:',

  precision: [
    '1 Gigayear',
    '100 Megayears',
    '10 Megayears',
    'Megayear',
    '100 Kiloyears',
    '10 Kiloyears',
    'Kiloyear',
    '100 years',
    '10 years',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
  ],

};

const ru = {

  calendarModel: {
    'http://www.wikidata.org/entity/Q1985786': 'Юлианский',
    'http://www.wikidata.org/entity/Q1985727': 'Грегорианский',
  },

  labelPrecision: 'точность',
  labelCalendar: 'календарь',
  labelSetManually: 'установить вручную',
  labelWillBeDisplayedAs: 'будет отображаться как:',

  precision: [
    'гигагод',
    '100 мегалет',
    '10 мегалет',
    'мегагод',
    '100 килолет',
    '10 килолет',
    'килогод',
    'век',
    '10 лет',
    'год',
    'месяц',
    'день',
    'час',
    'минута',
    'секунда',
  ],
};

const translations = { en, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
