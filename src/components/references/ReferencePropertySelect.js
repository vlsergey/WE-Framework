// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import i18n from './i18n';
import PropertiesBySparqlProvider from 'caches/PropertiesBySparqlProvider';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import styles from './references.css';
import { SUPPORTED_DATATYPES } from 'components/SnakValueEditorFactory';

const INSTANCE_OF : string = 'wdt:P31';
const SOURCE_TYPE : string = 'wd:Q18608359';

type PropsType = {
  alreadyPresent : string[],
  onSelect : string => any,
};

export default class ReferencePropertySelect extends PureComponent<PropsType> {

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLSelectElement > ) {
    if ( value ) {
      this.props.onSelect( value );
    }
  }

  render() {
    const { alreadyPresent } = this.props;

    // see https://www.wikidata.org/wiki/Q18608359
    return <PropertiesBySparqlProvider
      sparql={`SELECT DISTINCT ?property WHERE { ?property ${INSTANCE_OF} ${SOURCE_TYPE} . }`}>
      { propertyIds => {
        if ( !propertyIds ) return <i>Loading possible reference properties...</i>;

        return <PropertyDescriptionsProvider propertyIds={propertyIds}>{ caches => {
          if ( !caches || caches.size === 0 ) return <i>Loading possible reference properties...</i>;

          return <select onChange={this.handleChange} value="_placeholder">
            <option
              disabled
              hidden
              key="_placeholder"
              value="_placeholder">{i18n.placehoderSelect}</option>
            { propertyIds.map( propertyId => {
              const propertyDescription = caches.get( propertyId );
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

type SelectOptionPropsType = {
  alreadyPresent : boolean,
  description? : ?string,
  label? : ?string,
  propertyId : string,
  unsupported : boolean,
};

class SelectOption extends PureComponent<SelectOptionPropsType> {

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
