import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import expect from 'expect';
import React from 'react';
import SearchOnSourceWebsitesButtonCell from './SearchOnSourceWebsitesButtonCell';
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
    const { datavalue, propertyDescription, readOnly } = this.props;
    const url = datavalue && datavalue.value ? propertyDescription.formatUrl( datavalue.value ) : null;

    if ( readOnly ) {
      if ( datavalue && datavalue.value ) {
        if ( url ) {
          return <td colSpan={12}>
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank">
              {datavalue.value}
            </a>
          </td>;
        } else {
          return <td colSpan={12}>{datavalue.value}</td>;
        }
      } else {
        return null;
      }
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

    const buttons = this.renderButtonCells();
    expect( buttons ).toBeAn( 'array' );

    return <React.Fragment>
      <td colSpan={5}>
        <input {...params} />
      </td>
      <td className={styles.wef_external_links_url_cell} colSpan={7 - buttons.length}>
        <div className={styles.wef_external_links_url_div}>
          {url ? <a className={styles.wef_external_links_url_a} href={url} rel="noopener noreferrer" target="_blank">{url}</a> : ''}
        </div>
      </td>
      { buttons }
    </React.Fragment>;
  }

  renderButtonCells() {
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
