import React, { PureComponent } from 'react';
import EntityLabel from 'caches/EntityLabel';
import i18n from 'components/core.i18n';
import PropTypes from 'prop-types';

export default class NewQualifierSelect extends PureComponent {

  static propTypes = {
    allowedQualifiers: PropTypes.arrayOf( PropTypes.string ),
    onSelect: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    const propertyId = event.target.value;
    if ( propertyId ) {
      this.props.onSelect( propertyId );
    }
  }

  render() {
    const { allowedQualifiers } = this.props;

    return <select defaultValue="_placeholder" onChange={this.handleChange}>
      <option disabled hidden key="_placeholder" value="_placeholder">{i18n.qualifiersNewSelectPlaceholder}</option>
      { allowedQualifiers.map( propertyId =>
        <option key={propertyId} value={propertyId}>
          <EntityLabel appendEntityId entityId={propertyId} />
        </option>
      )}
    </select>;
  }

}
