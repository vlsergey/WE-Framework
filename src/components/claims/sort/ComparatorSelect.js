// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import { DatavalueComparator } from './DatavalueComparator';
import i18n from './i18n';

type PropsType = {
  onChange : ?DatavalueComparator => any,
  options : DatavalueComparator[],
  value? : ?DatavalueComparator,
};

export default class ComparatorSelect extends PureComponent<PropsType> {

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLSelectElement > ) {
    const { onChange } = this.props;

    const newComparator : ?DatavalueComparator = this.props.options.find( c => c.code === value );
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
