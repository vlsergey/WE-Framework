import React, { PureComponent } from 'react';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './PropertyLabelCell.css';

export default class PropertyLabelCell extends PureComponent {

  static propTypes = {
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  }

  render() {
    const { label, description, id } = this.props.propertyDescription;
    return <th className={styles.wef_property_label}>
      <a
        href={'//www.wikidata.org/wiki/Property:' + id}
        rel="noopener noreferrer"
        target="_blank"
        title={description}>
        <span>{label || id}</span>
      </a>
    </th>;
  }

}
