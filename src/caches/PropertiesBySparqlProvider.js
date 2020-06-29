// @flow

import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import propertiesBySparqlCache from './propertiesBySparqlCache';

type PropsType = {
  children : ( ?( string[] ) ) => any,
  sparql : string,
};

export default class PropertiesBySparqlProvider extends PureComponent<PropsType> {

  render() {
    const { children, sparql } = this.props;

    return <CacheValueProvider
      cache={propertiesBySparqlCache}
      cacheKey={sparql}>
      {( data : ?( string[] ) ) => children( data )}
    </CacheValueProvider>;
  }
}
