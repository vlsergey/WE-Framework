import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import { flagImageHtmlsQueue } from 'caches/actions';
import PropTypes from 'prop-types';

export default class FlagImageHtmlProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired,
  }

  render() {
    const { children, fileName } = this.props;

    return <CacheValueProvider
      action={flagImageHtmlsQueue}
      cacheKey={fileName}
      type={'FLAGIMAGEHTMLS'}>
      {children}
    </CacheValueProvider>;
  }
}
