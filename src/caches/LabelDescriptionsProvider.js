import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import labelDescriptionCache from './labelDescriptionCache';
import PropTypes from 'prop-types';

export default class LabelDescriptionsProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider
      cache={labelDescriptionCache}
      cacheKeys={entityIds}>
      {children}
    </CacheValuesProvider>;
  }
}
