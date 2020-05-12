// @flow

import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import { boundMethod } from 'autobind-decorator';
import React from 'react';
import styles from 'components/core.css';

const EMPTY_OBJECT : any = Object.freeze( {} );

export default class StringDataValueEditor extends AbstractStringBasedDataValueEditor {

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  @boundMethod
  handleChange( { currentTarget: { value } } : SyntheticEvent< HTMLInputElement > ) {
    this.handleValueChange( value );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*" }] */
    const { datavalue, onDataValueChange, propertyDescription, readOnly } = this.props;

    if ( readOnly ) {
      if ( datavalue && datavalue.value ) {
        return <td colSpan={12}>
          <span>{datavalue.value}</span>
        </td>;
      }
      return null;

    }

    return <td colSpan={12}>
      <input
        className={styles[ 'wef_' + propertyDescription.datatype ]}
        onChange={this.handleChange}
        pattern={propertyDescription.regexp || undefined}
        type="text"
        value={( datavalue || EMPTY_OBJECT ).value || ''} />
    </td>;
  }

}
