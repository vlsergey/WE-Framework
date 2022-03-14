import AbstractStringBasedDataValueEditor from '../AbstractStringBasedDataValueEditor';
import { COLUMNS_FOR_DATA_VALUE_EDITOR } from '../../TableColSpanConstants';
import React, {ChangeEventHandler} from 'react';
import SearchOnSourceWebsitesButtonCell from './SearchOnSourceWebsitesButtonCell';
import styles from './styles.css';

const EMPTY_OBJECT : any = Object.freeze( {} );

export default class ExternalIdDataValueEditor extends AbstractStringBasedDataValueEditor {

  handleChange : ChangeEventHandler<HTMLInputElement> = ( { currentTarget: { value } }) =>
    this.handleValueChange( value );

  override render() {
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

    const buttons : any[] = this.props.buttons || this.renderButtonCells();
    return <React.Fragment>
      <td className={styles.externalIdTableCell} colSpan={COLUMNS_FOR_DATA_VALUE_EDITOR - buttons.length}>
        <div className={styles.container}>
          <input
            className={styles.externalIdInput}
            onChange={this.handleChange}
            pattern={propertyDescription.regexp || undefined}
            type="text"
            value={( datavalue || EMPTY_OBJECT ).value || ''} />
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
