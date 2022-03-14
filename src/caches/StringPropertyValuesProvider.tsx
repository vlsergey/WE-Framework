import React, { PureComponent } from 'react';
import CacheValuesProvider, {CacheType} from './CacheValuesProvider';
import stringPropertyValuesCache, {Item} from './stringPropertyValuesCache';

export type StringPropertyValuesCache = CacheType<Item>;

type PropsType = {
  children : (cachePart : StringPropertyValuesCache) => any,
  entityIds : string[],
};

export default class StringPropertyValuesProvider
  extends PureComponent<PropsType> {

  override render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider<Item>
      cache={stringPropertyValuesCache}
      cacheKeys={entityIds}>
      {children}
    </CacheValuesProvider>;
  }
}
