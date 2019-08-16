import React, { PureComponent } from 'react';
import { get } from './LruStore';
import PropTypes from 'prop-types';
import SourceItem from './SourceItem';
import styles from './styles.css';

export default class LruTab extends PureComponent {

  static propTypes = {
    onInsert: PropTypes.func.isRequired,
  };

  constructor() {
    super( ...arguments );
    this.lru = get();
  }

  handleClickF( entityId ) {
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
