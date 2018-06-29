import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import { labelDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';

export default class LabelDescriptionProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityId: PropTypes.string.isRequired,
  }

  render() {
    const { children, entityId } = this.props;

    return <CacheValueProvider
      action={labelDescriptionQueue}
      cacheKey={entityId}
      type={'LABELDESCRIPTIONS'}>
      {children}
    </CacheValueProvider>;
  }
}
