import React, { PureComponent } from 'react';
import i18n from './i18n';
import PropertiesBySparqlProvider from 'caches/PropertiesBySparqlProvider';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import styles from './references.css';
import { SUPPORTED_DATATYPES } from 'components/SnakValueEditorFactory';

export default class ReferencePropertySelect extends PureComponent {

  static propTypes = {
    alreadyPresent: PropTypes.arrayOf( PropTypes.string ).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  INSTANCE_OF = 'wdt:P31';
  SOURCE_TYPE = 'wd:Q18608359';

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
    const { alreadyPresent } = this.props;

    // see https://www.wikidata.org/wiki/Q18608359
    return <PropertiesBySparqlProvider sparql={'SELECT DISTINCT ?property '
              + 'WHERE { '
              + `?property ${this.INSTANCE_OF} ${this.SOURCE_TYPE} . `
              + '}'}>
      { propertyIds => {
        if ( !propertyIds ) return <i>Loading possible reference properties...</i>;

        return <PropertyDescriptionsProvider propertyIds={propertyIds}>{ caches => {
          if ( !caches ) return <i>Loading possible reference properties...</i>;

          return <select onChange={this.handleChange} value="_placeholder">
            <option
              disabled
              hidden
              key="_placeholder"
              value="_placeholder">{i18n.placehoderSelect}</option>
            { propertyIds.map( propertyId => {
              const propertyDescription = caches[ propertyId ];
              if ( !propertyDescription || !propertyDescription.label ) {
                return <option key={propertyId} value={propertyId}>{propertyId}</option>;
              }

              return <SelectOption
                alreadyPresent={alreadyPresent.indexOf( propertyId ) !== -1}
                description={propertyDescription.description}
                key={propertyId}
                label={propertyDescription.label}
                propertyId={propertyId}
                unsupported={SUPPORTED_DATATYPES.indexOf( propertyDescription.datatype ) === -1} />;
            } ) }
          </select>;
        }}</PropertyDescriptionsProvider>;
      } }
    </PropertiesBySparqlProvider>;
  }

}

class SelectOption extends PureComponent {

  static propTypes = {
    alreadyPresent: PropTypes.bool.isRequired,
    unsupported: PropTypes.bool.isRequired,
    propertyId: PropTypes.string.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
  };

  render() {
    const { alreadyPresent, unsupported, propertyId, description, label } = this.props;

    const classNames = [];
    if ( alreadyPresent ) classNames.push( styles.referencePropertyAlreadyPresent );
    if ( unsupported ) classNames.push( styles.referencePropertyUnsupported );

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
