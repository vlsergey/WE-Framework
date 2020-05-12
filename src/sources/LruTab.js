// @flow

import React, { PureComponent } from 'react';
import { get } from './LruStore';
import SourceItem from './SourceItem';
import styles from './styles.css';

type PropsType = {
  onInsert : any => any,
};

export default class LruTab extends PureComponent<PropsType> {

  lru : string[] = get();

  handleClickF( entityId : string ) {
    return () => this.props.onInsert( entityId );
  }

  render() {
    return <div className={styles.lruTab}>
      { this.lru.map( entityId =>
        <SourceItem
          entityId={entityId}
          key={entityId}
          onClick={this.handleClickF( entityId )} />
      ) }
    </div>;
  }

}
