import React, { PureComponent } from 'react';
import CacheValueProvider from './CacheValueProvider';
import localTitleCache from './localTitleCache';

type PropsType = {
  children : (title?: null | string) => any,
  entityId? : string,
};

export default class LocalTitleProvider extends PureComponent<PropsType> {

  override render() {
    const { children, entityId } = this.props;
    if (!entityId) return children(undefined);

    return <CacheValueProvider<null | string>
      cache={localTitleCache}
      cacheKey={entityId}>
      {children}
    </CacheValueProvider>;
  }
}
