import {localize} from '../../../utils/I18nUtils';

const en = {

  modes: {
    exact: 'exact',
    plusMinus: 'plus-minus',
    boundaries: 'boundaries',
  },

  inputQuantityUnitLabel: 'unit',
  inputQuantityUnitTitle: '',
  inputQuantityLowerBoundLabel: 'lower bound',
  inputQuantityLowerBoundTitle: '',
  inputQuantityAmountLabel: 'amount',
  inputQuantityAmountTitle: '',
  inputQuantityUpperBoundLabel: 'upper bound',
  inputQuantityUpperBoundTitle: '',
};

const ru = {

  modes: {
    exact: 'точно',
    plusMinus: 'плюс-минус',
    boundaries: 'границы',
  },

  inputQuantityUnitLabel: 'единица',
  inputQuantityUnitTitle: '',
  inputQuantityLowerBoundLabel: 'нижняя граница',
  inputQuantityLowerBoundTitle: '',
  inputQuantityAmountLabel: 'количество',
  inputQuantityAmountTitle: '',
  inputQuantityUpperBoundLabel: 'верхняя граница',
  inputQuantityUpperBoundTitle: '',

};

const translations = {en, ru};
const result = localize({}, translations) as typeof en;
export default result;
