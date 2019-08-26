import React, { PureComponent } from 'react';
import { DatavalueComparator } from './DatavalueComparator';
import i18n from './i18n';

type PropsType = {
  onChange : ?DatavalueComparator => any,
  options : DatavalueComparator[],
  value? : ?DatavalueComparator,
};

export default class ComparatorSelect extends PureComponent<PropsType> {

  constructor() {
    super( ...arguments );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    const { onChange } = this.props;

    const newCode : ?string = event.target.value;
    const newComparator : ?DatavalueComparator = this.props.options.find( c => c.code === newCode );
    if ( newComparator ) {
      onChange( newComparator );
    }
  }

  render() {
    const { options, value } = this.props;
    const selectValue : string = ( value || {} ).code || '';

    return <select onChange={this.handleChange} value={selectValue}>
      {options.map( ( { code } ) => <option
        key={code}
        value={code}>
        { ( i18n.comparators || {} )[ code ] || code }
      </option> ) }
    </select>;
  }

}
