import React, {ChangeEvent, PureComponent} from 'react';

const EMPTY_OBJECT: any = Object.freeze({});

interface PropsType {
  onValueChange: (value: QuantityValueType) => any;
  readOnly?: boolean;
  value: QuantityValueType;
}

export default class BoundariesValueEditor extends PureComponent<PropsType> {

  static defaultProps = {
    value: EMPTY_OBJECT,
  };

  static canBeUsedForValue (): boolean {
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
      if (!value || !value.amount)
        return null;

      return (value.lowerBound || '?')
        + ' < ' + (value.amount || '?')
        + ' < ' + (value.upperBound || '?');
    }

    return <>
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
    </>;
  }

}
