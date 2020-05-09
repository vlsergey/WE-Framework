// @flow

import React, { PureComponent } from 'react';
import CacheValuesProvider from './CacheValuesProvider';
import parentTypesCache from './parentTypesCache';
import PropTypes from 'prop-types';

export default class StringPropertyValuesProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    typeIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  render() {
    const { children, typeIds } = this.props;

    return <CacheValuesProvider
      cache={parentTypesCache}
      cacheKeys={typeIds}>
      {children}
    </CacheValuesProvider>;
  }
}
