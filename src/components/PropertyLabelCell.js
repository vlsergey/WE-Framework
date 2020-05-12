// @flow

import React, { PureComponent } from 'react';
import PropertyDescription from 'core/PropertyDescription';
import styles from './PropertyLabelCell.css';

const WIKIDATA_LINK_URL : string = '//www.wikidata.org/wiki/';

type PropsType = {
  propertyDescription : PropertyDescription,
};

export default class PropertyLabelCell extends PureComponent<PropsType> {

  render() {
    const { label, description, id } = this.props.propertyDescription;
    return <th className={styles.wef_property_label}>
      <a
        href={`${WIKIDATA_LINK_URL}Property:${id}`}
        rel="noopener noreferrer"
        target="_blank"
        title={description}>
        {label || id}
      </a>
    </th>;
  }

}
