// @flow

import AbstractStringBasedDataValueEditor from '../AbstractStringBasedDataValueEditor';
import { COLUMNS_FOR_DATA_VALUE_EDITOR } from 'components/TableColSpanConstants';
import React from 'react';
import SearchOnSourceWebsitesButtonCell from './SearchOnSourceWebsitesButtonCell';
import styles from './styles.css';

export default class ExternalIdDataValueEditor extends AbstractStringBasedDataValueEditor {

  constructor() {
    super( ...arguments );

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( event ) {
    this.handleValueChange( event.target.value );
  }

  render() {
    const { datavalue, propertyDescription, readOnly } = this.props;
    const url = datavalue && datavalue.value ? propertyDescription.formatUrl( datavalue.value ) : null;

    if ( readOnly ) {
      if ( datavalue && datavalue.value ) {
        if ( url ) {
          return <td colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR}>
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank">
              {datavalue.value}
            </a>
          </td>;
        }
        return <td colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR}>{datavalue.value}</td>;
      }
      return null;
    }

    const params = {
      type: 'text',
      className: styles.externalIdInput,
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = this.handleChange;

    const buttons : any[] = this.props.buttons || this.renderButtonCells();
    return <React.Fragment>
      <td className={styles.externalIdTableCell} colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR - buttons.length}>
        <div className={styles.container}>
          <input {...params} />
          {url ? <a className={styles.urlLink} href={url} rel="noopener noreferrer" target="_blank">{url}</a> : ''}
        </div>
      </td>
      { buttons }
    </React.Fragment>;
  }

  renderButtonCells() : any[] {
    const { propertyDescription } = this.props;

    return [
      propertyDescription.sourceWebsites && propertyDescription.languageCodes
        ? <SearchOnSourceWebsitesButtonCell
          key="SearchOnSourceWebsitesButtonCell"
          languageCodes={propertyDescription.languageCodes}
          sourceWebsites={propertyDescription.sourceWebsites} />
        : <td key="SearchOnSourceWebsitesButtonCell" />,
    ];
  }

}
