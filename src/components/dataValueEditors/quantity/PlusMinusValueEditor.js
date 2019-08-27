import React, { PureComponent } from 'react';

const ok = x => typeof x === 'string' && x.trim() !== '';

type PropsType = {
  onValueChange : QuantityValueType => any,
  readOnly? : boolean,
  value? : ?QuantityValueType,
};

export default class PlusMinusValueEditor extends PureComponent<PropsType> {

  static defaultProps = {
    value: null,
    readOnly: false,
  };

  static canBeUsedForValue( value : QuantityValueType ) : boolean {
    const { amount, lowerBound, upperBound } = value || {};

    return !ok( lowerBound ) && !ok( upperBound )
      || Number( amount ) - Number( lowerBound ) === Number( upperBound ) - Number( amount );
  }

  constructor() {
    super( ...arguments );

    this.handleAmountChange = this.handleAmountChange.bind( this );
    this.handlePlusMinusChange = this.handlePlusMinusChange.bind( this );
  }

  handleAmountChange( event ) {
    const oldValue = this.props.value || {};
    if ( !ok( oldValue.lowerBound ) ) {
      this.props.onValueChange( {
        ...this.props.value,
        amount: event.target.value,
      } );
      return;
    }

    if ( !ok( event.target.value ) ) {
      // need to align boundaries around zero
      const oldAmount = ok( oldValue.amount ) ? Number( oldValue.amount ) : 0;
      const oldLowerBound = ok( oldValue.lowerBound ) ? Number( oldValue.lowerBound ) : oldAmount;
      const oldPlusMinus = oldAmount - oldLowerBound;
      this.props.onValueChange( {
        ...oldValue,
        lowerBound: String( 0 - oldPlusMinus ),
        amount: '',
        upperBound: String( 0 - oldPlusMinus ),
      } );
      return;
    }

    const newAmount = Number( event.target.value );
    const oldAmount = ok( oldValue.amount ) ? Number( oldValue.amount ) : 0;
    const oldLowerBound = ok( oldValue.lowerBound ) ? Number( oldValue.lowerBound ) : oldAmount;
    const oldPlusMinus = oldAmount - oldLowerBound;
    this.props.onValueChange( {
      ...this.props.value,
      lowerBound: String( newAmount - oldPlusMinus ),
      amount: String( newAmount ),
      upperBound: String( newAmount + oldPlusMinus ),
    } );
  }

  handlePlusMinusChange( event ) {
    const oldValue = this.props.value || {};
    const oldAmount = Number( oldValue.amount ) || 0;

    if ( event.target.value == null || event.target.value.trim() === '' ) {
      const newValue = { ...this.props.value };
      delete newValue.lowerBound;
      delete newValue.upperBound;
      this.props.onValueChange( newValue );
      return;
    }

    const newPlusMinus = Number( event.target.value ) || 0;

    this.props.onValueChange( {
      ...this.props.value,
      lowerBound: String( oldAmount - newPlusMinus ),
      upperBound: String( oldAmount + newPlusMinus ),
    } );
  }

  render() {
    const { readOnly, value } = this.props;

    const strAmount = ( value || {} ).amount || '';
    const numAmount : number = Number.parseFloat( strAmount ) || 0;
    const numLowerBound : number = Number.parseFloat( ( value || {} ).lowerBound || '' ) || 0;

    if ( readOnly ) {
      if ( !value || !value.amount )
        return null;

      if ( numLowerBound )
        return value.amount + ' ± ' + ( numAmount - numLowerBound ).toString();

      return value.amount || '';
    }

    let plusMinus : string;
    if ( !ok( value.lowerBound ) ) {
      plusMinus = '';
    } else {
      plusMinus = ( numAmount - ( numLowerBound || numAmount ) ).toString();
    }

    return <React.Fragment>
      <td>
        <input onChange={this.handleAmountChange} value={strAmount} />
      </td>
      <td>&nbsp;±&nbsp;</td>
      <td>
        <input onChange={this.handlePlusMinusChange} value={plusMinus || ''} />
      </td>
    </React.Fragment>;
  }

}
