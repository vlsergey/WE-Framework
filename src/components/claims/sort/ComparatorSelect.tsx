import React, {ChangeEvent, useCallback} from 'react';

import {DatavalueComparator} from './DatavalueComparator';
import i18n from './i18n';

interface PropsType {
  onChange: (value: DatavalueComparator | null) => any;
  options: DatavalueComparator[];
  value: DatavalueComparator | null;
}

const ComparatorSelect = ({onChange, options, value}: PropsType) => {
  const handleChange = useCallback(({currentTarget: {value}}: ChangeEvent< HTMLSelectElement >) => {
    const newComparator = options.find(c => c.code === value);
    if (newComparator) {
      onChange(newComparator);
    }
  }, [onChange, options]);

  return <select onChange={handleChange} value={value?.code || ''}>
    {options.map(({code}) => <option key={code} value={code}>
      { i18n.comparators?.[code] || code }
    </option>) }
  </select>;
};

export default React.memo(ComparatorSelect);
