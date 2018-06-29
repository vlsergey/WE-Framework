import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import { propertyDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';

export default class PropertyDescriptionProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    propertyId: PropTypes.string.isRequired,
  }

  render() {
    const { children, propertyId } = this.props;

    return <CacheValueProvider
      action={propertyDescriptionQueue}
      cacheKey={propertyId}
      type={'PROPERTYDESCRIPTIONS'}>
      {children}
    </CacheValueProvider>;
  }
}
