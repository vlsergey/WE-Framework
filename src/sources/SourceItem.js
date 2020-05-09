// @flow

import React, { PureComponent } from 'react';
import MediawikiPreview from 'components/MediawikiPreview';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class SourceItem extends PureComponent {

  static propTypes = {
    entityId: PropTypes.string.isRequired,
  };

  render() {
    const { entityId, ...etc } = this.props;

    const wikitext1 = '{{#statements:P31|from=' + entityId + '}}';
    const wikitext2 = '{{source|' + entityId + '}}';

    return <button className={styles.sourceItem} {...etc}>
      <div>
        <span className={styles.entityId}>{entityId}</span>: <MediawikiPreview className={styles.entityClasses} spinnerSize={10} wikitext={wikitext1} />
      </div>
      <MediawikiPreview className={styles.sourcePreview} spinnerSize={20} wikitext={wikitext2} />
    </button>;
  }

}
