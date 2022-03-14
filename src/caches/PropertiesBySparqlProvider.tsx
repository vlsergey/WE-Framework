import React, { PureComponent } from 'react';
import CacheValueProvider from './CacheValueProvider';
import propertiesBySparqlCache from './propertiesBySparqlCache';

type PropsType = {
  children : ( propertyIds?: string[] ) => any,
  sparql : string,
};

export default class PropertiesBySparqlProvider extends PureComponent<PropsType> {

  override render() {
    const { children, sparql } = this.props;

    return <CacheValueProvider<string[]>
      cache={propertiesBySparqlCache}
      cacheKey={sparql}>
      {children}
    </CacheValueProvider>;
  }
}
