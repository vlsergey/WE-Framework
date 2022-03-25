import {localize} from '../../utils/I18nUtils';

const en = {
  buttonLabelCreateNew: 'Create new entity with prefilled claims',
};

const ru = {
  buttonLabelCreateNew: 'Создать новую сущность с предопределёнными значениями',
};

const translations = {en, ru};
const result = localize({}, translations) as typeof en;
export default result;
