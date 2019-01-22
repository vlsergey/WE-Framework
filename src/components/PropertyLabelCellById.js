import React, { PureComponent } from 'react';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropertyLabelCell from './PropertyLabelCell';
import PropTypes from 'prop-types';
import styles from './PropertyLabelCell.css';

export default class PropertyLabelCellById extends PureComponent {

  static propTypes = {
    propertyId: PropTypes.string.isRequired,
  }

  render() {
    const { propertyId } = this.props;

    return <PropertyDescriptionsProvider propertyIds={[ propertyId ]}>
      { cache => cache[ propertyId ]
        ? <PropertyLabelCell propertyDescription={cache[ propertyId ]} />
        : <th className={styles.wef_property_label}>
          <a
            href={'//www.wikidata.org/wiki/Property:' + propertyId}
            rel="noopener noreferrer"
            target="_blank">
            {propertyId}
          </a>
        </th>}
    </PropertyDescriptionsProvider>;
  }

}
