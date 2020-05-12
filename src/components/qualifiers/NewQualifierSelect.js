// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import i18n from './i18n';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import styles from './NewQualifierSelect.css';
import { SUPPORTED_DATATYPES } from 'components/SnakValueEditorFactory';

function sort( cache, propertyIds : string[] ) {
  const result = [ ...propertyIds ];
  return result.sort( ( a : string, b : string ) => {
    const labelA = ( cache.get( a ) || {} ).label || a;
    const labelB = ( cache.get( b ) || {} ).label || b;

    if ( labelA < labelB ) return -1;
    if ( labelA > labelB ) return +1;
    return 0;
  } );
}

type PropsType = {
  allowedQualifiers : string[],
  alreadyPresent : string[],
  onSelect : string => any,
};

export default class NewQualifierSelect extends PureComponent<PropsType> {

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLSelectElement > ) {
    if ( value ) {
      this.props.onSelect( value );
    }
  }

  render() {
    const { allowedQualifiers, alreadyPresent } = this.props;

    // include SELECT into PDP, becase rerendering only options leads to lost current option in SELECT
    return <PropertyDescriptionsProvider propertyIds={allowedQualifiers}>
      { cache => <select defaultValue="_placeholder" onChange={this.handleChange}>
        <option disabled hidden key="_placeholder" value="_placeholder">{i18n.placehoderSelect}</option>
        {sort( cache, allowedQualifiers ).map( propertyId => {
          const propertyDescription = cache.get( propertyId );
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

type NewQualifierSelectOptionPropsType = {
  alreadyPresent : boolean,
  description? : ?string,
  label? : ?string,
  propertyId : string,
  unsupported : boolean,
};

class NewQualifierSelectOption extends PureComponent<NewQualifierSelectOptionPropsType> {

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
