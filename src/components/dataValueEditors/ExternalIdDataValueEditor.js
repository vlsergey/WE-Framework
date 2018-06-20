import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import React from 'react';
import styles from 'components/core.css';

export default class ExternalIdDataValueEditor extends AbstractStringBasedDataValueEditor {

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    this.handleValueChange( event.target.value );
  }

  render() {
    const { datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = this.handleChange;

    const url = datavalue && datavalue.value ? propertyDescription.formatUrl( datavalue.value ) : null;

    return [
      <td colSpan={5} key="input"><input {...params} /></td>,
      <td className={styles.wef_external_links_url_cell} colSpan={7} key="url">
        <div className={styles.wef_external_links_url_div}>{url ? <a className={styles.wef_external_links_url_a} href={url} rel="noopener noreferrer" target="_blank">{url}</a> : ''}</div>
      </td>,
    ];
  }

}
