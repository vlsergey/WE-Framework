import React, { PureComponent } from 'react';
import i18n from './i18n';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import styles from './NewQualifierSelect.css';
import { SUPPORTED_DATATYPES } from 'components/SnakValueEditorFactory';

function sort( cache, propertyIds ) {
  const result = [ ...propertyIds ];
  return result.sort( ( a, b ) => {
    const labelA = ( cache[ a ] || {} ).label || a;
    const labelB = ( cache[ b ] || {} ).label || b;

    if ( labelA < labelB ) return -1;
    if ( labelA > labelB ) return +1;
    return 0;
  } );
}

export default class NewQualifierSelect extends PureComponent {

  static propTypes = {
    allowedQualifiers: PropTypes.arrayOf( PropTypes.string ).isRequired,
    alreadyPresent: PropTypes.arrayOf( PropTypes.string ).isRequired,
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
    const { allowedQualifiers, alreadyPresent } = this.props;

    // include SELECT into PDP, becase rerendering only options leads to lost current option in SELECT
    return <PropertyDescriptionsProvider propertyIds={allowedQualifiers}>
      { cache => <select defaultValue="_placeholder" onChange={this.handleChange}>
        <option disabled hidden key="_placeholder" value="_placeholder">{i18n.placehoderSelect}</option>
        {sort( cache, allowedQualifiers ).map( propertyId => {
          const propertyDescription = cache[ propertyId ];
          if ( !propertyDescription || !propertyDescription.label ) {
            return <option key={propertyId} value={propertyId}>{propertyId}</option>;
          }

          return <NewQualifierSelectOption
            alreadyPresent={alreadyPresent.indexOf( propertyId ) !== -1}
            description={propertyDescription.description}
            key={propertyId}
            label={propertyDescription.label}
            propertyId={propertyId}
            unsupported={SUPPORTED_DATATYPES.indexOf( propertyDescription.datatype ) === -1} />;
        } )}
        <option key="OTHER" value="OTHER">{i18n.optionOther}</option>
      </select>}
    </PropertyDescriptionsProvider>;
  }
}


class NewQualifierSelectOption extends PureComponent {

  static propTypes = {
    alreadyPresent: PropTypes.bool.isRequired,
    unsupported: PropTypes.bool.isRequired,
    propertyId: PropTypes.string.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
  }

  render() {
    const { alreadyPresent, unsupported, propertyId, description, label } = this.props;

    const classNames = [];
    if ( alreadyPresent ) classNames.push( styles.alreadypresent );
    if ( unsupported ) classNames.push( styles.unsupported );

    const actualLabel = ( label
      ? label + ' (' + propertyId + ')'
      : propertyId )
      + ( unsupported
        ? i18n.optionSuffixUnsupported
        : '' );

    return <option
      className={classNames.join( ' ' )}
      title={description}
      value={propertyId}>{actualLabel}</option>;
  }
}
