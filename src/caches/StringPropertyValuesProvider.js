import React, { PureComponent } from 'react';
import CacheValuesProvider from 'caches/CacheValuesProvider';
import PropTypes from 'prop-types';
import { stringPropertyValuesQueueF } from 'caches/actions';

export default class StringPropertyValuesProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    entityIds: PropTypes.arrayOf( PropTypes.string ).isRequired,
  }

  render() {
    const { children, entityIds } = this.props;

    return <CacheValuesProvider
      action={stringPropertyValuesQueueF}
      cacheKeys={entityIds}
      type={'STRINGPROPERTYVALUES'}>
      {children}
    </CacheValuesProvider>;
  }
}
