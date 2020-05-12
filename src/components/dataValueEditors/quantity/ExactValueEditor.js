// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';

const EMPTY_OBJECT : any = Object.freeze( {} );
const ok = x => typeof x === 'string' && x.trim() !== '';

type PropsType = {
  onValueChange : QuantityValueType => any,
  readOnly? : ?boolean,
  value : QuantityValueType,
};

export default class ExactValueEditor extends PureComponent<PropsType> {

  static defaultProps = {
    value: EMPTY_OBJECT,
  };

  static canBeUsedForValue( value : QuantityValueType ) : boolean {
    const { amount, lowerBound, upperBound } = value;

    return !ok( lowerBound ) && !ok( upperBound )
      || Number( lowerBound ) === Number( amount ) && Number( upperBound ) === Number( amount );
  }

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    /* eslint no-unused-vars: 0 */
    const { lowerBound, amount, upperBound, ...etc } = this.props.value;
    this.props.onValueChange( {
      ...etc,
      amount: value || '',
    } );
  }

  render() {
    const { readOnly, value } = this.props;

    if ( readOnly ) {
      if ( !value ) {
        return null;
      }
      return value.amount || null;
    }

    return <td>
      <input onChange={this.handleChange} value={value.amount || ''} />
    </td>;
  }

}
