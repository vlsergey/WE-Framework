import React, { PureComponent } from 'react';
import expect from 'expect';
import i18n from './i18n';
import LabelDescriptionsProvider from 'caches/LabelDescriptionsProvider';
import PropTypes from 'prop-types';
import stableSort from 'utils/stableSort';

function sort( cache, oneOf ) {
  expect( cache ).toBeAn( 'object' );
  expect( oneOf ).toBeAn( 'array' );

  return stableSort( [ ...oneOf ], ( o1, o2 ) => {
    const v1 = ( ( cache[ o1 ] || {} ).label || '' ).toLowerCase();
    const v2 = ( ( cache[ o2 ] || {} ).label || '' ).toLowerCase();
    return v1 === v2 ? 0 : v1 > v2 ? +1 : -1;
  } );
}

export default class SelectMode extends PureComponent {

  static propTypes = {
    value: PropTypes.string,
    oneOf: PropTypes.arrayOf( PropTypes.string ).isRequired,
    onOtherSelect: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

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
    const { value, oneOf } = this.props;

    // include SELECT into LDP, becase rerendering only options leads to lost current option in SELECT
    return <LabelDescriptionsProvider entityIds={oneOf}>
      { cache => <select onChange={this.handleChange} value={value || ''}>
        <option key="_empty" value="" />
        {sort( cache, oneOf ).map( ( entityId : string ) => {
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
        <option key="OTHER" value="OTHER">{i18n.optionOther}</option>
      </select>}
    </LabelDescriptionsProvider>;
  }

}


class SelectOption extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
    description: PropTypes.string,
    label: PropTypes.string,
  };

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
