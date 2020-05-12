// @flow

import React, { PureComponent } from 'react';
import CacheValuesProvider from './CacheValuesProvider';
import parentTypesCache from './parentTypesCache';

type PropsType = {
  children : any => any,
  typeIds : string[],
};

export default class StringPropertyValuesProvider
  extends PureComponent<PropsType> {

  render() {
    const { children, typeIds } = this.props;

    return <CacheValuesProvider
      cache={parentTypesCache}
      cacheKeys={typeIds}>
      {children}
    </CacheValuesProvider>;
  }
}
