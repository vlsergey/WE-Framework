import React, {ChangeEvent, useCallback, useMemo} from 'react';

import {usePropertiesData} from '../../caches/propertyDataCache';
import usePropertyDescription from '../../caches/usePropertyDescription';
import getPropertyLocalTitleAndDescription from '../../core/getPropertyLocalTitleAndDescription';
import PropertyData from '../../core/PropertyData';
import {SUPPORTED_DATATYPES} from '../SnakValueEditorFactory';
import i18n from './i18n';
import styles from './NewQualifierSelect.css';

function sort (cache: Record<string, PropertyData>, propertyIds: readonly string[]) {
  const result = [...propertyIds];
  const labels = Object.fromEntries(propertyIds
    .map(propertyId => [propertyId, cache[propertyId]] as [string, PropertyData?])
    .filter(([_, data]) => data !== undefined)
    .map(([propertyId, data]) => [propertyId, getPropertyLocalTitleAndDescription(data!).label] as [string, string]));

  return result.sort((a: string, b: string) => {
    const labelA = labels[a] || a;
    const labelB = labels[b] || b;

    if (labelA < labelB) return -1;
    if (labelA > labelB) return +1;
    return 0;
  });
}

interface PropsType {
  allowedQualifiers: readonly string[];
  alreadyPresent: readonly string[];
  onSelect: (value: string) => any;
}

const NewQualifierSelect = ({
  allowedQualifiers,
  alreadyPresent,
  onSelect
}: PropsType) => {
  const allowedQualifiersData = usePropertiesData(allowedQualifiers);
  const sorted = useMemo(() => sort(allowedQualifiersData, allowedQualifiers), [allowedQualifiers, allowedQualifiersData]);

  const handleChange = useCallback(({currentTarget: {value}}: ChangeEvent< HTMLSelectElement >) => {
    if (value) {
      onSelect(value);
    }
  }, [onSelect]);

  // include SELECT into PDP, becase rerendering only options leads to lost current option in SELECT
  return <select defaultValue="_placeholder" onChange={handleChange}>
    <option disabled hidden key="_placeholder" value="_placeholder">{i18n.placehoderSelect}</option>
    {sorted.map(propertyId =>
      <NewQualifierSelectOption
        alreadyPresent={alreadyPresent.includes(propertyId)}
        key={propertyId}
        propertyId={propertyId} />
    )}
    <option key="OTHER" value="OTHER">{i18n.optionOther}</option>
  </select>;
};

export default React.memo(NewQualifierSelect);

interface NewQualifierSelectOptionProps {
  alreadyPresent: boolean;
  propertyId: string;
}

const NewQualifierSelectOption = ({
  alreadyPresent,
  propertyId
}: NewQualifierSelectOptionProps) => {

  const propertyDescription = usePropertyDescription(propertyId);
  const label = propertyDescription?.label;

  if (!label) {
    return <option key={propertyId} value={propertyId}>{propertyId}</option>;
  }

  const unsupported = !SUPPORTED_DATATYPES.includes(propertyDescription.datatype);

  const classNames = [];
  if (alreadyPresent) classNames.push(styles.alreadypresent);
  if (unsupported) classNames.push(styles.unsupported);

  const actualLabel = (label
    ? label + ' (' + propertyId + ')'
    : propertyId)
    + (unsupported
      ? i18n.optionSuffixUnsupported
      : '');

  return <option
    className={classNames.join(' ')}
    title={propertyDescription.description}
    value={propertyId}>{actualLabel}</option>;
};
