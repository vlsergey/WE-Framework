import React, { PureComponent } from 'react';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropertyLabelCell from './PropertyLabelCell';
import PropTypes from 'prop-types';
import styles from './PropertyLabelCell.css';

export default class PropertyLabelCellById extends PureComponent {

  static propTypes = {
    propertyId: PropTypes.string.isRequired,
  };

  WIKIDATA_LINK_URL = '//www.wikidata.org/wiki/';

  render() {
    const { propertyId } = this.props;

    return <PropertyDescriptionsProvider propertyIds={[ propertyId ]}>
      { cache => cache[ propertyId ]
        ? <PropertyLabelCell propertyDescription={cache[ propertyId ]} />
        : <th className={styles.wef_property_label}>
          <a
            href={`${this.WIKIDATA_LINK_URL}Property:${propertyId}`}
            rel="noopener noreferrer"
            target="_blank">
            {propertyId}
          </a>
        </th>}
    </PropertyDescriptionsProvider>;
  }

}
