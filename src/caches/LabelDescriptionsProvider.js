// @flow

import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import labelDescriptionCache from './labelDescriptionCache';

type PropsType = {
  children : any => any,
  entityIds : string[],
};

export default class LabelDescriptionsProvider
  extends PureComponent<PropsType> {

  render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider
      cache={labelDescriptionCache}
      cacheKeys={entityIds}>
      {children}
    </CacheValuesProvider>;
  }
}
