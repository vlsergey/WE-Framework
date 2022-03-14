import React, {HTMLAttributes, PureComponent} from 'react';

import MediawikiPreview from '../components/MediawikiPreview';
import styles from './styles.css';

type PropsType = HTMLAttributes<HTMLButtonElement> & {
  entityId: string;
};

export default class SourceItem extends PureComponent<PropsType> {

  override render () {
    const {entityId, ...etc} = this.props;

    const wikitext1 = '{{#statements:P31|from=' + entityId + '}}';
    const wikitext2 = '{{source|' + entityId + '}}';

    return <button {...etc} className={styles.sourceItem}>
      <div>
        <span className={styles.entityId}>{entityId}</span>: <MediawikiPreview className={styles.entityClasses} spinnerSize={10} wikitext={wikitext1} />
      </div>
      <MediawikiPreview className={styles.sourcePreview} spinnerSize={20} wikitext={wikitext2} />
    </button>;
  }

}
