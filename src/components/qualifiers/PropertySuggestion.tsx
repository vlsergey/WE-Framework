import React, {PureComponent} from 'react';

import EntityDescription from '../../caches/EntityDescription';
import EntityLabel from '../../caches/EntityLabel';
import styles from './NewQualifierAutosuggest.css';

interface PropsType {
  propertyId: string;
}

export default class PropertySuggestion extends PureComponent<PropsType> {

  override render () {
    const {propertyId} = this.props;

    return <div className={styles.property_suggestion}>
      <span className={styles.property_suggestion_label}>&nbsp;&nbsp;<EntityLabel entityId={propertyId} /></span>
      <br />
      <span className={styles.property_suggestion_description}>&nbsp;&nbsp;<EntityDescription entityId={propertyId} /></span>
    </div>;
  }
}
