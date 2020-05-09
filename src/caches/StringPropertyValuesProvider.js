// @flow

import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import PropTypes from 'prop-types';
import stringPropertyValuesCache from './stringPropertyValuesCache';

export default class StringPropertyValuesProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider
      cache={stringPropertyValuesCache}
      cacheKeys={entityIds}>
      {children}
    </CacheValuesProvider>;
  }
}
