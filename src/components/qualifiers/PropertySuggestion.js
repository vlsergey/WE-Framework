import React, { PureComponent } from 'react';
import EntityDescription from 'caches/EntityDescription';
import EntityLabel from 'caches/EntityLabel';
import PropTypes from 'prop-types';
import styles from './NewQualifierAutosuggest.css';

export default class PropertySuggestion extends PureComponent {

  static propTypes = {
    propertyId: PropTypes.string.isRequired,
  };

  render() {
    const { propertyId } = this.props;

    return <div className={styles.property_suggestion}>
      <span className={styles.property_suggestion_label}>&nbsp;&nbsp;<EntityLabel entityId={propertyId} /></span>
      <br />
      <span className={styles.property_suggestion_description}>&nbsp;&nbsp;<EntityDescription entityId={propertyId} /></span>
    </div>;
  }
}
