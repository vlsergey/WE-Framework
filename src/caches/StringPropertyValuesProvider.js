// @flow

import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
/* eslint no-duplicate-imports: 0 */
import stringPropertyValuesCache from './stringPropertyValuesCache';

type PropsType = {
  children : any => any,
  entityIds : string[],
};

export default class StringPropertyValuesProvider
  extends PureComponent<PropsType> {

  render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider
      cache={stringPropertyValuesCache}
      cacheKeys={entityIds}>
      {children}
    </CacheValuesProvider>;
  }
}
