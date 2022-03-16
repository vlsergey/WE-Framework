import React, {ChangeEvent, PureComponent} from 'react';

const EMPTY_OBJECT = Object.freeze({});
const ok = (x: any) => typeof x === 'string' && x.trim() !== '';

interface PropsType {
  onValueChange: (value: null | QuantityValue) => any;
  readOnly?: boolean;
  value: null | QuantityValue;
}

export default class ExactValueEditor extends PureComponent<PropsType> {

  static defaultProps = {
    value: EMPTY_OBJECT,
  };

  static canBeUsedForValue (this: void, value: null | QuantityValue): boolean {
    const {amount, lowerBound, upperBound} = value || {};

    return !ok(lowerBound) && !ok(upperBound)
      || Number(lowerBound) === Number(amount) && Number(upperBound) === Number(amount);
  }

  handleChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) => {
    if (this.props.value === null) {
      return this.props.onValueChange({
        amount: value || '',
      });
    }

    const {lowerBound, amount, upperBound, ...etc} = this.props.value;
    this.props.onValueChange({
      ...etc,
      amount: value || '',
    });
  };

  override render () {
    const {readOnly, value} = this.props;

    if (readOnly) {
      if (!value) {
        return null;
      }
      return value.amount || null;
    }

    return <td>
      <input onChange={this.handleChange} value={value?.amount || ''} />
    </td>;
  }

}
