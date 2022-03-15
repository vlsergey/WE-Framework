import React, {ChangeEvent, PureComponent} from 'react';

const EMPTY_OBJECT = Object.freeze({});
const ok = (x: any) => typeof x === 'string' && x.trim() !== '';

interface PropsType {
  onValueChange: (value: null | QuantityValue) => any;
  readOnly?: boolean;
  value: null | QuantityValue;
}

export default class PlusMinusValueEditor extends PureComponent<PropsType> {

  static defaultProps = {
    value: EMPTY_OBJECT,
  };

  static canBeUsedForValue (value: QuantityValue): boolean {
    const {amount, lowerBound, upperBound} = value || EMPTY_OBJECT;

    return !ok(lowerBound) && !ok(upperBound)
      || Number(amount) - Number(lowerBound) === Number(upperBound) - Number(amount);
  }

  handleAmountChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    const oldValue = this.props.value || {};
    if (!ok(oldValue.lowerBound)) {
      this.props.onValueChange({
        ...this.props.value,
        amount: value,
      });
      return;
    }

    if (!ok(value)) {
      // need to align boundaries around zero
      const oldAmount = ok(oldValue.amount) ? Number(oldValue.amount) : 0;
      const oldLowerBound = ok(oldValue.lowerBound) ? Number(oldValue.lowerBound) : oldAmount;
      const oldPlusMinus = oldAmount - oldLowerBound;
      this.props.onValueChange({
        ...oldValue,
        lowerBound: String(0 - oldPlusMinus),
        amount: '',
        upperBound: String(0 - oldPlusMinus),
      });
      return;
    }

    const newAmount = Number(value);
    const oldAmount = ok(oldValue.amount) ? Number(oldValue.amount) : 0;
    const oldLowerBound = ok(oldValue.lowerBound) ? Number(oldValue.lowerBound) : oldAmount;
    const oldPlusMinus = oldAmount - oldLowerBound;
    this.props.onValueChange({
      ...this.props.value,
      lowerBound: String(newAmount - oldPlusMinus),
      amount: String(newAmount),
      upperBound: String(newAmount + oldPlusMinus),
    });
  };

  handlePlusMinusChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    const oldValue = this.props.value || {};
    const oldAmount = Number(oldValue.amount) || 0;

    if (!value) {
      const newValue: QuantityValue = {...this.props.value};
      delete newValue.lowerBound;
      delete newValue.upperBound;
      this.props.onValueChange(newValue);
      return;
    }

    const newPlusMinus = Number(value) || 0;

    this.props.onValueChange({
      ...this.props.value,
      lowerBound: String(oldAmount - newPlusMinus),
      upperBound: String(oldAmount + newPlusMinus),
    });
  };

  override render () {
    const {readOnly, value} = this.props;

    const strAmount = (value || {}).amount || '';
    const numAmount: number = Number.parseFloat(strAmount) || 0;
    const numLowerBound: number = Number.parseFloat((value || {}).lowerBound || '') || 0;

    if (readOnly) {
      if (!value || !value.amount)
        return null;

      if (numLowerBound)
        return value.amount + ' ± ' + (numAmount - numLowerBound).toString();

      return value.amount || '';
    }

    let plusMinus: string;
    if (!ok(value?.lowerBound)) {
      plusMinus = '';
    } else {
      plusMinus = (numAmount - (numLowerBound || numAmount)).toString();
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
