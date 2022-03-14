import React, { PureComponent } from 'react';
import CacheValuesProvider, {CacheType} from './CacheValuesProvider';
import parentTypesCache from './parentTypesCache';

type PropsType = {
  children : (cachePart : CacheType<string[]>) => any,
  typeIds : string[],
};

export default class StringPropertyValuesProvider
  extends PureComponent<PropsType> {

  override render() {
    const { children, typeIds } = this.props;

    return <CacheValuesProvider<string[]>
      cache={parentTypesCache}
      cacheKeys={typeIds}>
      {children}
    </CacheValuesProvider>;
  }
}
