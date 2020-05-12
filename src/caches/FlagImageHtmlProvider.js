// @flow

import React, { PureComponent } from 'react';
import CacheValueProvider from 'caches/CacheValueProvider';
import flagImageHtmlCache from './flagImageHtmlCache';

type PropsType = {
  children : any => any,
  fileName : string,
};

export default class FlagImageHtmlProvider extends PureComponent<PropsType> {

  render() {
    const { children, fileName } = this.props;

    return <CacheValueProvider
      cache={flagImageHtmlCache}
      cacheKey={fileName}>
      {children}
    </CacheValueProvider>;
  }
}
