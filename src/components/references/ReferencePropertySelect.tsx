import React, {ChangeEvent, PureComponent} from 'react';
import { PropertiesBySparqlProvider } from '../../caches/propertiesBySparqlCache';

import PropertyDescriptionsProvider from '../../caches/PropertyDescriptionsProvider';
import {SUPPORTED_DATATYPES} from '../SnakValueEditorFactory';
import i18n from './i18n';
import styles from './references.css';

const INSTANCE_OF = 'wdt:P31';
const SOURCE_TYPE = 'wd:Q18608359';

interface PropsType {
  alreadyPresent: string[];
  onSelect: (propertyId: string) => any;
}

export default class ReferencePropertySelect extends PureComponent<PropsType> {

  handleChange = ({currentTarget: {value}}: ChangeEvent< HTMLSelectElement >) => {
    if (value) {
      this.props.onSelect(value);
    }
  };

  override render () {
    const {alreadyPresent} = this.props;

    // see https://www.wikidata.org/wiki/Q18608359
    return <PropertiesBySparqlProvider
      cacheKey={`SELECT DISTINCT ?property WHERE { ?property ${INSTANCE_OF} ${SOURCE_TYPE} . }`}>
      { propertyIds => {
        if (!propertyIds) return <i>Loading possible reference properties...</i>;

        return <PropertyDescriptionsProvider propertyIds={propertyIds}>{ caches => {
          if (!caches || Object.keys(caches).length === 0) return <i>Loading possible reference properties...</i>;

          return <select onChange={this.handleChange} value="_placeholder">
            <option
              disabled
              hidden
              key="_placeholder"
              value="_placeholder">{i18n.placehoderSelect}</option>
            { propertyIds.map(propertyId => {
              const propertyDescription = caches[propertyId];
              if (!propertyDescription || !propertyDescription.label) {
                return <option key={propertyId} value={propertyId}>{propertyId}</option>;
              }

              return <SelectOption
                alreadyPresent={alreadyPresent.includes(propertyId)}
                description={propertyDescription.description}
                key={propertyId}
                label={propertyDescription.label}
                propertyId={propertyId}
                unsupported={!SUPPORTED_DATATYPES.includes(propertyDescription.datatype)} />;
            }) }
          </select>;
        }}</PropertyDescriptionsProvider>;
      } }
    </PropertiesBySparqlProvider>;
  }

}

interface SelectOptionPropsType {
  alreadyPresent: boolean;
  description?: string | null;
  label?: string | null;
  propertyId: string;
  unsupported: boolean;
}

class SelectOption extends PureComponent<SelectOptionPropsType> {

  override render () {
    const {alreadyPresent, unsupported, propertyId, description, label} = this.props;

    const classNames = [];
    if (alreadyPresent) classNames.push(styles.referencePropertyAlreadyPresent);
    if (unsupported) classNames.push(styles.referencePropertyUnsupported);

    const actualLabel = (label
      ? label + ' (' + propertyId + ')'
      : propertyId)
      + (unsupported
        ? i18n.optionSuffixUnsupported
        : '');

    return <option
      className={classNames.join(' ')}
      title={description || undefined}
      value={propertyId}>{actualLabel}</option>;
  }
}
