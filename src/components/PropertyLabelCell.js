import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './PropertyLabelCell.css';

export default class PropertyLabelCell extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    propertyId: PropTypes.string.isRequired,
  }

  render() {
    const { label, description, propertyId } = this.props;

    return <th className={styles.wef_property_editor_label}>
      <a
        href={'//www.wikidata.org/wiki/Property:' + propertyId}
        rel="noopener noreferrer"
        target="_blank"
        title={description}>
        <span>{label || propertyId}</span>
      </a>
    </th>;
  }

}
