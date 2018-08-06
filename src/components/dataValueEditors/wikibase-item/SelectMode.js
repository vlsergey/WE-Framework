import React, { PureComponent } from 'react';
import { DataValue } from 'model/Shapes';
import expect from 'expect';
import i18n from './i18n';
import LabelDescriptionsProvider from 'caches/LabelDescriptionsProvider';
import PropTypes from 'prop-types';
import stableSort from 'utils/stableSort';

function sort( cache, oneOf ) {
  return stableSort( [ ...oneOf ], ( o1, o2 ) => {
    const v1 = ( ( cache[ o1 ] || {} ).label || '' ).toLowerCase();
    const v2 = ( ( cache[ o2 ] || {} ).label || '' ).toLowerCase();
    return v1 === v2 ? 0 : v1 > v2 ? +1 : -1;
  } );
}

export default class SelectMode extends PureComponent {

  static propTypes = {
    datavalue: PropTypes.shape( DataValue ),
    oneOf: PropTypes.arrayOf( PropTypes.string ).isRequired,
    onOtherSelect: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static hasCompatibleOneOfRestriction( props ) {
    const currentValue = ( ( props.datavalue || {} ).value || {} ).id || '';
    const hasOneOfConstrain = !!props.propertyDescription.oneOf;
    return hasOneOfConstrain &&
        ( currentValue === '' || props.propertyDescription.oneOf.indexOf( currentValue ) !== -1 );
  }

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    const selectedValue = event.target.value;
    if ( selectedValue === 'OTHER' ) {
      this.props.onOtherSelect();
      return;
    }

    this.props.onSelect( selectedValue );
  }

  render() {
    const { datavalue, oneOf } = this.props;
    const currentValue = ( ( datavalue || {} ).value || {} ).id || '';

    return <select onChange={this.handleChange} value={currentValue}>
      <option key="_empty" value="" />
      <LabelDescriptionsProvider entityIds={oneOf}>
        { cache => sort( cache, oneOf ).map( entityId => {
          expect( cache ).toBeAn( 'object', 'LabelDescriptionsProvider didn\'t return cache object (' + cache + ')' );

          const labelDescription = cache[ entityId ];
          if ( !labelDescription || !labelDescription.label ) {
            return <option key={entityId} value={entityId}>{entityId}</option>;
          }

          return <SelectOption
            description={labelDescription.description}
            entityId={entityId}
            key={entityId}
            label={labelDescription.label} />;
        } )}
      </LabelDescriptionsProvider>
      <option key="OTHER" value="OTHER">{i18n.optionOther}</option>
    </select>;
  }

}


class SelectOption extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
  }

  render() {
    const { entityId, description, label } = this.props;

    const actualLabel = label
      ? label + ' (' + entityId + ')'
      : entityId;

    return <option
      title={description}
      value={entityId}>{actualLabel}</option>;
  }
}
