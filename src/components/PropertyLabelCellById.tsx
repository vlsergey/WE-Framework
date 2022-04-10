import React from 'react';

import usePropertyDescription from '../caches/usePropertyDescription';
import PropertyLabelCell from './PropertyLabelCell';
import styles from './PropertyLabelCell.css';

const WIKIDATA_LINK_URL = '//www.wikidata.org/wiki/';

interface PropsType {
  propertyId: string;
}

const PropertyLabelCellById = ({
  propertyId
}: PropsType) => {
  const propertyDescription = usePropertyDescription(propertyId);
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
};

export default React.memo(PropertyLabelCellById);
