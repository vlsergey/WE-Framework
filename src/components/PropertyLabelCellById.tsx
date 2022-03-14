import React, {PureComponent} from 'react';

import PropertyDescriptionsProvider from '../caches/PropertyDescriptionsProvider';
import PropertyLabelCell from './PropertyLabelCell';
import styles from './PropertyLabelCell.css';

const WIKIDATA_LINK_URL = '//www.wikidata.org/wiki/';

interface PropsType {
  propertyId: string;
}

export default class PropertyLabelCellById extends PureComponent<PropsType> {

  override render () {
    const {propertyId} = this.props;

    return <PropertyDescriptionsProvider propertyIds={[propertyId]}>
      { cache => {
        const propertyDescription = cache[propertyId];
        if (!propertyDescription) {
          return <th className={styles.wef_property_label}>
            <a
              href={`${WIKIDATA_LINK_URL}Property:${propertyId}`}
              rel="noopener noreferrer"
              target="_blank">
              {propertyId}
            </a>
          </th>;
        }
        return <PropertyLabelCell propertyDescription={propertyDescription} />;
      } }
    </PropertyDescriptionsProvider>;
  }

}
