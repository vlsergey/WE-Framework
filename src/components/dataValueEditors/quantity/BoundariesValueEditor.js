// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';

const EMPTY_OBJECT : any = Object.freeze( {} );

type PropsType = {
  onValueChange : QuantityValueType => any,
  readOnly? : ?boolean,
  value : QuantityValueType,
};

export default class BoundariesValueEditor extends PureComponent<PropsType> {

  static defaultProps = {
    value: EMPTY_OBJECT,
  };

  static canBeUsedForValue() : boolean {
    return true;
  }

  @boundMethod
  handleChange( { currentTarget: { name, value } } : SyntheticEvent< HTMLInputElement > ) {
    this.props.onValueChange( {
      ...this.props.value,
      [ name ]: value || '',
    } );
  }

  render() {
    const { readOnly, value } = this.props;

    if ( readOnly ) {
      if ( !value || !value.amount )
        return null;

      return ( value.lowerBound || '?' )
        + ' < ' + ( value.amount || '?' )
        + ' < ' + ( value.upperBound || '?' );
    }

    return <React.Fragment>
      <td>
        <input name="lowerBound" onChange={this.handleChange} value={value.lowerBound || ''} />
      </td>
      <td>&nbsp;&lt;&nbsp;</td>
      <td>
        <input name="amount" onChange={this.handleChange} value={value.amount || ''} />
      </td>
      <td>&nbsp;&lt;&nbsp;</td>
      <td>
        <input name="upperBound" onChange={this.handleChange} value={value.upperBound || ''} />
      </td>
    </React.Fragment>;
  }

}
