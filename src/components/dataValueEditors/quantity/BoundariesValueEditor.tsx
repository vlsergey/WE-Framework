import React, {ChangeEvent, PureComponent} from 'react';

interface PropsType {
  onValueChange: (value: null | QuantityValue) => unknown;
  readOnly?: boolean;
  value: null | QuantityValue;
}

export default class BoundariesValueEditor extends PureComponent<PropsType> {

  static canBeUsedForValue (this: void): boolean {
    return true;
  }

  handleChange = ({currentTarget: {name, value}}: ChangeEvent< HTMLInputElement >) => {
    this.props.onValueChange({
      ...this.props.value,
      [name]: value || '',
    });
  };

  override render () {
    const {readOnly, value} = this.props;

    if (readOnly) {
      if (!value?.amount)
        return null;

      return (value.lowerBound || '?')
        + ' < ' + (value.amount || '?')
        + ' < ' + (value.upperBound || '?');
    }

    return <>
      <td>
        <input name="lowerBound" onChange={this.handleChange} value={value?.lowerBound || ''} />
      </td>
      <td>&nbsp;&lt;&nbsp;</td>
      <td>
        <input name="amount" onChange={this.handleChange} value={value?.amount || ''} />
      </td>
      <td>&nbsp;&lt;&nbsp;</td>
      <td>
        <input name="upperBound" onChange={this.handleChange} value={value?.upperBound || ''} />
      </td>
    </>;
  }

}
