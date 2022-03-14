import React, { ChangeEvent, PureComponent } from 'react';
import { DatavalueComparator } from './DatavalueComparator';
import i18n from './i18n';

type PropsType = {
  onChange : (value : DatavalueComparator | null) => any,
  options : DatavalueComparator[],
  value : DatavalueComparator | null,
};

export default class ComparatorSelect extends PureComponent<PropsType> {

  handleChange = ( { currentTarget: { value } } : ChangeEvent< HTMLSelectElement > ) => {
    const { onChange } = this.props;

    const newComparator = this.props.options.find( c => c.code === value );
    if ( newComparator ) {
      onChange( newComparator );
    }
  }

  override render() {
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
