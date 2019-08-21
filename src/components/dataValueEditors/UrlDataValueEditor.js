import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import GoToUrlButtonCell from './GoToUrlButtonCell';
import React from 'react';
import styles from './UrlDataValueEditor.css';

export default class UrlDataValueEditor extends AbstractStringBasedDataValueEditor {

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    this.handleValueChange( event.target.value );
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

    const params = {
      className: styles.wef_url,
      onChange: this.handleChange,
      type: 'text',
      value: datavalue && datavalue.value ? datavalue.value : '',
    };

    return <React.Fragment>
      <td className={styles.wef_datavalue_url} colSpan={11}>
        <input {...params} />
      </td>
      <GoToUrlButtonCell href={href} />
    </React.Fragment>;
  }

}
