// @flow

import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import propertiesBySparqlCache from './propertiesBySparqlCache';
import PropTypes from 'prop-types';

export default class PropertiesBySparqlProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    sparql: PropTypes.string.isRequired,
  }

  render() {
    const { children, sparql } = this.props;

    return <CacheValueProvider
      cache={propertiesBySparqlCache}
      cacheKey={sparql}>
      {children}
    </CacheValueProvider>;
  }
}
