import React, { PureComponent } from 'react';
import EntityField from 'components/entityField';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';

const PREFIX = 'http://www.wikidata.org/entity/';

export default class UnitSelect extends PureComponent {

  static propTypes = {
    value: PropTypes.object,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    onValueChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    value: {
      amount: '',
      unit: '',
    },
    readOnly: false,
  }

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( entityId ) {
    this.props.onValueChange( {
      ...this.props.value,
      unit: !/^Q\d+$/.test( entityId )
        ? ''
        : PREFIX + entityId,
    } );
  }

  render() {
    const { value, propertyDescription, readOnly } = this.props;

    const currentUnitStr = ( value || {} ).unit || '';
    const currentEntityId = currentUnitStr && currentUnitStr.startsWith( PREFIX )
      ? currentUnitStr.substr( PREFIX.length )
      : null;

    return <EntityField
      lruKey={propertyDescription.id}
      onChange={this.handleChange}
      oneOf={propertyDescription.quantityUnits}
      readOnly={readOnly}
      value={currentEntityId} />;
  }

}
