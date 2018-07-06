import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import { propertiesSparqlQueueF } from 'caches/actions';
import PropTypes from 'prop-types';

export default class PropertiesBySparqlProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    sparql: PropTypes.string.isRequired,
  }

  render() {
    const { children, sparql } = this.props;

    return <CacheValueProvider
      action={propertiesSparqlQueueF}
      cacheKey={sparql}
      type={'PROPERTIESBYSPARQL'}>
      {children}
    </CacheValueProvider>;
  }
}
