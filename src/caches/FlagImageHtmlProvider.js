import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import flagImageHtmlCache from './flagImageHtmlCache';
import PropTypes from 'prop-types';

export default class FlagImageHtmlProvider extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired,
  }

  render() {
    const { children, fileName } = this.props;

    return <CacheValueProvider
      cache={flagImageHtmlCache}
      cacheKey={fileName}>
      {children}
    </CacheValueProvider>;
  }
}
