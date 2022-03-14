import React, {ChangeEvent} from 'react';

import styles from '../core.css';
import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';

const EMPTY_OBJECT: any = Object.freeze({});

export default class StringDataValueEditor extends AbstractStringBasedDataValueEditor {

  handleChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) =>
  { this.handleValueChange(value); };

  override render () {
    const {datavalue, propertyDescription, readOnly} = this.props;

    if (readOnly) {
      if (datavalue && datavalue.value) {
        return <td colSpan={12}>
          <span>{datavalue.value}</span>
        </td>;
      }
      return null;

    }

    return <td colSpan={12}>
      <input
        className={(styles as unknown as Record<string, string>)['wef_' + propertyDescription.datatype]}
        onChange={this.handleChange}
        pattern={propertyDescription.regexp || undefined}
        type="text"
        value={(datavalue || EMPTY_OBJECT).value || ''} />
    </td>;
  }

}
