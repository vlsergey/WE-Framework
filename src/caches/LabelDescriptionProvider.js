import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import labelDescriptionCache from './labelDescriptionCache';
import PropTypes from 'prop-types';

export default class LabelDescriptionProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityId: PropTypes.string.isRequired,
  }

  render() {
    const { children, entityId } = this.props;

    return <CacheValueProvider
      cache={labelDescriptionCache}
      cacheKey={entityId}>
      {children}
    </CacheValueProvider>;
  }
}
