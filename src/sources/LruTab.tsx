import React, {PureComponent} from 'react';

import {get} from './LruStore';
import SourceItem from './SourceItem';

interface PropsType {
  onInsert: (entityId: string) => any;
}

export default class LruTab extends PureComponent<PropsType> {

  lru: string[] = get();

  handleClickF = (entityId: string) => () => this.props.onInsert(entityId);

  override render () {
    return <div>
      { this.lru.map(entityId =>
        <SourceItem
          entityId={entityId}
          key={entityId}
          onClick={this.handleClickF(entityId)} />
      ) }
    </div>;
  }

}
