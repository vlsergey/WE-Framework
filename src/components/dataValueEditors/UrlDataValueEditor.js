// @flow

import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import { boundMethod } from 'autobind-decorator';
import GoToUrlButtonCell from './GoToUrlButtonCell';
import React from 'react';
import styles from './UrlDataValueEditor.css';

const EMPTY_OBJECT : any = Object.freeze( {} );
const EMPTY_STRING : string = '';

export default class UrlDataValueEditor extends AbstractStringBasedDataValueEditor {

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    this.handleValueChange( value );
  }

  render() {
    const { datavalue, readOnly } = this.props;
    const href = datavalue && datavalue.value ? datavalue.value : null;

    if ( readOnly ) {
      if ( datavalue && datavalue.value ) {
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
          className={styles.wef_url}
          onChange={this.handleChange}
          type="text"
          value={( datavalue || EMPTY_OBJECT ).value || EMPTY_STRING} />
      </td>
      <GoToUrlButtonCell href={href} />
    </React.Fragment>;
  }

}
