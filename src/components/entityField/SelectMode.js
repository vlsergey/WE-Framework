import React, { PureComponent } from 'react';
import i18n from './i18n';
import LabelDescriptionsProvider from 'caches/LabelDescriptionsProvider';
import stableSort from 'utils/stableSort';

function sort( cache : { [string] : any }, oneOf : string[] ) {
  return stableSort( [ ...oneOf ], ( o1 : string, o2 : string ) => {
    const v1 : string = ( ( cache[ o1 ] || {} ).label || '' ).toLowerCase();
    const v2 : string = ( ( cache[ o2 ] || {} ).label || '' ).toLowerCase();
    return v1 === v2 ? 0 : v1 > v2 ? +1 : -1;
  } );
}

type PropsType = {
  onOtherSelect : () => any,
  onSelect : ?string => any,
  oneOf : string[],
  value? : ?string,
};

export default class SelectMode extends PureComponent<PropsType> {

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    const selectedValue : string = event.target.value;
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
      { ( cache : { [string] : any } ) => <select onChange={this.handleChange} value={value || ''}>
        <option key="_empty" value="" />
        {sort( cache, oneOf ).map( ( entityId : string ) => {
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

type SelectOptionPropsType = {
  description? : ?string,
  entityId : string,
  label? : ?string,
};

class SelectOption extends PureComponent<SelectOptionPropsType> {

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
