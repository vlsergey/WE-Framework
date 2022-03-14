import React, {PureComponent} from 'react';

import PropertyDescription from '../../../core/PropertyDescription';
import EntityField from '../../entityField';

const ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';
const NOOP = () => {};

interface PropsType {
  onValueChange: (value: QuantityValueType) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
  value: QuantityValueType;
}

export default class UnitSelect extends PureComponent<PropsType> {

  static defaultProps = {
    value: {
      amount: '',
      unit: '',
    },
    onValueChange: NOOP,
  };

  handleChange = (entityId: string | null) => this.props.onValueChange({
    ...this.props.value,
    unit: !!entityId && /^Q\d+$/.test(entityId)
      ? ENTITY_URL_PREFIX + entityId
      : '',
  });

  override render () {
    const {value, propertyDescription, readOnly} = this.props;

    const currentUnitStr = (value || {}).unit || '';
    const currentEntityId = currentUnitStr && currentUnitStr.startsWith(ENTITY_URL_PREFIX)
      ? currentUnitStr.substr(ENTITY_URL_PREFIX.length)
      : null;

    return <EntityField
      lruKey={propertyDescription.id}
      onChange={this.handleChange}
      oneOf={propertyDescription.quantityUnits}
      readOnly={readOnly}
      value={currentEntityId} />;
  }

}
