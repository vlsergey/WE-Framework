// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import EntityField from 'components/entityField';
import PropertyDescription from 'core/PropertyDescription';

const ENTITY_URL_PREFIX : string = 'http://www.wikidata.org/entity/';
const NOOP : ( any => any ) = () => {};

type PropsType = {
  onValueChange : QuantityValueType => any,
  propertyDescription : PropertyDescription,
  readOnly? : ?boolean,
  value : QuantityValueType,
};

export default class UnitSelect extends PureComponent<PropsType> {

  static defaultProps = {
    value: {
      amount: '',
      unit: '',
    },
    onValueChange: NOOP,
  };

  @boundMethod
  handleChange( entityId : ?string ) {
    return this.props.onValueChange( {
      ...this.props.value,
      unit: !!entityId && /^Q\d+$/.test( entityId )
        ? ENTITY_URL_PREFIX + entityId
        : '',
    } );
  }

  render() {
    const { value, propertyDescription, readOnly } = this.props;

    const currentUnitStr : string = ( value || {} ).unit || '';
    const currentEntityId : ?string = currentUnitStr && currentUnitStr.startsWith( ENTITY_URL_PREFIX )
      ? currentUnitStr.substr( ENTITY_URL_PREFIX.length )
      : null;

    return <EntityField
      lruKey={propertyDescription.id}
      onChange={this.handleChange}
      oneOf={propertyDescription.quantityUnits}
      readOnly={readOnly}
      value={currentEntityId} />;
  }

}
