import { localize } from '../../utils/I18nUtils';

const en = {
  buttonLabelAdd: 'add new value for this property',
};

const ru = {
  buttonLabelAdd: 'добавить новое значение к свойству',
};

const translations = { en, ru };
const result = localize( {}, translations );
export default result;
