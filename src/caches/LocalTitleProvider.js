// @flow

import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import localTitleCache from './localTitleCache';

type PropsType = {
  children : any => any,
  entityId? : ?string,
};

export default class LocalTitleProvider extends PureComponent<PropsType> {

  render() {
    const { children, entityId } = this.props;

    return <CacheValueProvider
      cache={localTitleCache}
      cacheKey={entityId}>
      {children}
    </CacheValueProvider>;
  }
}
