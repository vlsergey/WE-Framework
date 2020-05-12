// @flow

import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import LabelDescription from './LabelDescription';
import labelDescriptionCache from './labelDescriptionCache';

type PropsType = {
  children : ?LabelDescription => any,
  entityId : string,
};

export default class LabelDescriptionProvider extends PureComponent<PropsType> {

  render() {
    const { children, entityId } = this.props;

    return <CacheValueProvider
      cache={labelDescriptionCache}
      cacheKey={entityId}>
      {children}
    </CacheValueProvider>;
  }
}
