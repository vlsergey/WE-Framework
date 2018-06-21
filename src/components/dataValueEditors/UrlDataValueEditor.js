import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import GoToUrlButtonCell from './GoToUrlButtonCell';
import React from 'react';
import styles from 'components/core.css';

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
    const { datavalue } = this.props;

    const params = {
      className: styles.wef_url,
      onChange: this.handleChange,
      type: 'text',
      value: datavalue && datavalue.value ? datavalue.value : '',
    };

    const href = datavalue && datavalue.value ? datavalue.value : null;

    return [
      <td colSpan={11} key="input">
        <input {...params} />
      </td>,
      <GoToUrlButtonCell href={href} key="button" />,
    ];
  }

}
