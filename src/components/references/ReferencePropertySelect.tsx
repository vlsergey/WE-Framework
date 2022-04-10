import React, {ChangeEvent, useCallback} from 'react';

import {usePropertiesBySparql} from '../../caches/propertiesBySparqlCache';
import usePropertyDescription from '../../caches/usePropertyDescription';
import {SUPPORTED_DATATYPES} from '../SnakValueEditorFactory';
import i18n from './i18n';
import styles from './references.css';

const INSTANCE_OF = 'wdt:P31';
const SOURCE_TYPE = 'wd:Q18608359';

interface PropsType {
  alreadyPresent: readonly string[];
  onSelect: (propertyId: string) => unknown;
}

const ReferencePropertySelect = ({
  alreadyPresent,
  onSelect,
}: PropsType) => {

  const handleChange = useCallback(({currentTarget: {value}}: ChangeEvent< HTMLSelectElement >) => {
    if (value) {
      onSelect(value);
    }
  }, [onSelect]);

  const propertyIds = usePropertiesBySparql(`SELECT DISTINCT ?property WHERE { ?property ${INSTANCE_OF} ${SOURCE_TYPE} . }`);
  if (!propertyIds) return <i>Loading possible reference properties...</i>;

  return <select onChange={handleChange} value="_placeholder">
    <option
      disabled
      hidden
      key="_placeholder"
      value="_placeholder">{i18n.placehoderSelect}</option>
    { propertyIds.map(propertyId => <SelectOption
      alreadyPresent={alreadyPresent.includes(propertyId)}
      key={propertyId}
      propertyId={propertyId} />) }
  </select>;
};

export default React.memo(ReferencePropertySelect);

interface SelectOptionPropsType {
  alreadyPresent: boolean;
  propertyId: string;
}

const SelectOption = ({
  alreadyPresent,
  propertyId,
}: SelectOptionPropsType) => {

  const propertyDescription = usePropertyDescription(propertyId);
  if (!propertyDescription) {
    return <option value={propertyId}>{propertyId}</option>;
  }

  const unsupported = !SUPPORTED_DATATYPES.includes(propertyDescription.datatype);

  const classNames = [];
  if (alreadyPresent) classNames.push(styles.referencePropertyAlreadyPresent);
  if (unsupported) classNames.push(styles.referencePropertyUnsupported);

  const actualLabel = (propertyDescription.label
    ? propertyDescription.label + ' (' + propertyId + ')'
    : propertyId)
    + (unsupported
      ? i18n.optionSuffixUnsupported
      : '');

  return <option
    className={classNames.join(' ')}
    title={propertyDescription.description}
    value={propertyId}>{actualLabel}</option>;
};
