import React, {ChangeEvent, useCallback} from 'react';

import {ComparatorCode} from './DatavalueComparator';
import i18n from './i18n';

interface PropsType {
  onChange: (value: ComparatorCode | null) => any;
  options: readonly ComparatorCode[];
  value: ComparatorCode | null;
}

const ComparatorSelect = ({onChange, options, value}: PropsType) => {
  const handleChange = useCallback(({currentTarget: {value}}: ChangeEvent< HTMLSelectElement >) => {
    onChange(value as ComparatorCode);
  }, [onChange, options]);

  return <select onChange={handleChange} value={value || ''}>
    {options.map(code => <option key={code} value={code}>
      { i18n.comparators[code as ComparatorCode] || code }
    </option>) }
  </select>;
};

export default React.memo(ComparatorSelect);
