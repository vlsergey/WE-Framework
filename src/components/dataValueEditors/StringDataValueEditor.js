// @flow

import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import React from 'react';
import styles from 'components/core.css';

export default class StringDataValueEditor extends AbstractStringBasedDataValueEditor {

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    this.handleValueChange( event.target.value );
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

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = this.handleChange;

    return <td colSpan={12}><input {...params} /></td>;
  }

}
