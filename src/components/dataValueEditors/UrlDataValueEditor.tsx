import React, {ChangeEvent} from 'react';

import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import GoToUrlButtonCell from './GoToUrlButtonCell';
import styles from './UrlDataValueEditor.css';

const EMPTY_OBJECT: any = Object.freeze({});
const EMPTY_STRING = '';

export default class UrlDataValueEditor extends AbstractStringBasedDataValueEditor {

  handleChange = ({currentTarget: {value}}: ChangeEvent< HTMLInputElement >) =>
  { this.handleValueChange(value); };

  override render () {
    const {datavalue, readOnly} = this.props;
    const href = datavalue?.value || undefined;

    if (readOnly) {
      if (datavalue && datavalue.value) {
        return <td className={styles.wef_datavalue_url + ' ' + styles.wef_datavalue_url_readonly} colSpan={12}>
          { href && <a href={href} rel="noopener noreferrer" target="_blank">
            {href}
          </a> }
        </td>;
      }
      return null;
    }

    return <React.Fragment>
      <td className={styles.wef_datavalue_url} colSpan={11}>
        <input
          onChange={this.handleChange}
          type="text"
          value={(datavalue || EMPTY_OBJECT).value || EMPTY_STRING} />
      </td>
      <GoToUrlButtonCell href={href} />
    </React.Fragment>;
  }

}
