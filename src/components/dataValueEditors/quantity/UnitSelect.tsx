import React, {PureComponent} from 'react';

import PropertyDescription from '../../../core/PropertyDescription';
import EntityField from '../../entityField';

const ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';

interface PropsType {
  onValueChange?: (value: QuantityValue) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
  value: null | QuantityValue;
}

export default class UnitSelect extends PureComponent<PropsType> {

  handleChange = (entityId: string | null) => !this.props.onValueChange || this.props.onValueChange({
    ...this.props.value,
    unit: !!entityId && /^Q\d+$/.test(entityId)
      ? ENTITY_URL_PREFIX + entityId
      : '',
  });

  override render () {
    const {value, propertyDescription, readOnly} = this.props;

    const currentUnitStr = value?.unit || '';
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
