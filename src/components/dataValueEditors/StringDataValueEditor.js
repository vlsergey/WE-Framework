import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import React from 'react';
import styles from '../core.css';

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
    const { onDataValueChange, datavalue, propertyDescription } = this.props;

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
