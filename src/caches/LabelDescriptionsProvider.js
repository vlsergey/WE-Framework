import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import { labelDescriptionQueue } from 'caches/actions';
import PropTypes from 'prop-types';

export default class LabelDescriptionsProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider
      action={labelDescriptionQueue}
      cacheKeys={entityIds}
      type={'LABELDESCRIPTIONS'}>
      {children}
    </CacheValuesProvider>;
  }
}
