import React, {PureComponent} from 'react';

import EntityLabel from '../../../caches/EntityLabel';
import PropertyDescription from '../../../core/PropertyDescription';
import {toWikibaseEntityIdValue} from '../../../model/ModelUtils';
import EntityField from '../../entityField';
import CreateNewButtonCell from './CreateNewButtonCell';
import GoToLocalButtonCell from './GoToLocalButtonCell';
import GoToWikidataButtonCell from './GoToWikidataButtonCell';
import styles from './WikibaseItem.css';

interface PropsType extends Omit<React.ComponentProps<typeof EntityField>, 'lruKey' | 'onChange' | 'oneOf' | 'value'> {
  buttonCells?: any[];
  datavalue?: WikibaseEntityIdDataValue | null;
  onDataValueChange: (datavalue: WikibaseEntityIdDataValue | null) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
}

export default class WikibaseItemDataValueEditor
  extends PureComponent<PropsType> {

  static DATATYPE = 'wikibase-item';
  static DATAVALUE_TYPE = 'wikibase-entityid';

  WIKIDATA_LINK_URL = 'https://www.wikidata.org/wiki/';

  handleCreate = (entityId: string) => {
    const {datavalue, onDataValueChange} = this.props;

    onDataValueChange({
      ...datavalue,
      value: toWikibaseEntityIdValue(entityId),
      type: 'wikibase-entityid',
    });
  };

  handleChange = (entityId: string | null) => {
    const {datavalue, onDataValueChange} = this.props;
    if (!entityId || entityId.trim() === '') {
      onDataValueChange({
        ...datavalue,
        value: null,
        type: 'wikibase-entityid',
      });
    } else {
      onDataValueChange({
        ...datavalue,
        value: toWikibaseEntityIdValue(entityId),
        type: 'wikibase-entityid',
      });
    }
  };

  override render () {
    const {datavalue, onDataValueChange, propertyDescription, readOnly, ...etc} = this.props;

    const currentValue = datavalue?.value?.id || '';
    const className = styles['wef_datavalue_wikibase-item'];

    if (readOnly) {
      return <td
        className={className + ' ' + styles['wef_datavalue_wikibase-item_readonly']}
        colSpan={12}>
        { currentValue && <a href={this.WIKIDATA_LINK_URL + currentValue}>
          <EntityLabel entityId={currentValue} />
        </a> }
      </td>;
    }

    const buttonCells = this.props.buttonCells || this.renderButtons(propertyDescription, currentValue);

    return <React.Fragment>
      <td className={className} colSpan={12 - buttonCells.length}>
        <EntityField
          {...etc}
          lruKey={propertyDescription.id}
          onChange={this.handleChange}
          oneOf={propertyDescription.oneOf}
          value={currentValue} />
      </td>
      { buttonCells }
    </React.Fragment>;
  }

  renderButtons (propertyDescription: PropertyDescription, entityId: string) {
    return [
      <CreateNewButtonCell
        disabled={!!entityId}
        key="CreateNew"
        onCreate={this.handleCreate}
        propertyDescription={propertyDescription} />,
      <GoToLocalButtonCell entityId={entityId} key="GoToLocal" />,
      <GoToWikidataButtonCell entityId={entityId} key="GoToWikidata" />,
    ];
  }
}
