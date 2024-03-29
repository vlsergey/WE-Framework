import React, {PureComponent} from 'react';

import PropertyDescription from '../core/PropertyDescription';
import styles from './PropertyLabelCell.css';

const WIKIDATA_LINK_URL = '//www.wikidata.org/wiki/';

interface PropsType {
  propertyDescription: PropertyDescription;
}

export default class PropertyLabelCell extends PureComponent<PropsType> {

  override render () {
    const {label, description, id} = this.props.propertyDescription;
    return <th className={styles.wef_property_label}>
      <a
        href={`${WIKIDATA_LINK_URL}Property:${id}`}
        rel="noopener noreferrer"
        target="_blank"
        title={description || undefined}>
        {label || id}
      </a>
    </th>;
  }

}
