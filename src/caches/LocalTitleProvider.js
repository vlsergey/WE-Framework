// @flow

import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import localTitleCache from './localTitleCache';
import PropTypes from 'prop-types';

export default class LocalTitleProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityId: PropTypes.string.isRequired,
  }

  render() {
    const { children, entityId } = this.props;

    return <CacheValueProvider
      cache={localTitleCache}
      cacheKey={entityId}>
      {children}
    </CacheValueProvider>;
  }
}
