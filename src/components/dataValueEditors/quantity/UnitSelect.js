import React, { PureComponent } from 'react';
import EntityField from 'components/entityField';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';

export default class UnitSelect extends PureComponent {

  ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';

  static propTypes = {
    value: PropTypes.object,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    onValueChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    value: {
      amount: '',
      unit: '',
    },
    readOnly: false,
  };

  ENTITY_URL_PREFIX = 'http://www.wikidata.org/entity/';

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( entityId ) {
    this.props.onValueChange( {
      ...this.props.value,
      unit: !/^Q\d+$/.test( entityId )
        ? ''
        : this.ENTITY_URL_PREFIX + entityId,
    } );
  }

  render() {
    const { value, propertyDescription, readOnly } = this.props;

    const currentUnitStr = ( value || {} ).unit || '';
    const currentEntityId = currentUnitStr && currentUnitStr.startsWith( this.ENTITY_URL_PREFIX )
      ? currentUnitStr.substr( this.ENTITY_URL_PREFIX.length )
      : null;

    return <EntityField
      lruKey={propertyDescription.id}
      onChange={this.handleChange}
      oneOf={propertyDescription.quantityUnits}
      readOnly={readOnly}
      value={currentEntityId} />;
  }

}
