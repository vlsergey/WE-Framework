import React, {PureComponent} from 'react';

import CacheValueProvider from './CacheValueProvider';
import flagImageHtmlCache from './flagImageHtmlCache';

interface PropsType {
  children: (flagImageHtml?: string) => any;
  fileName: string;
}

export default class FlagImageHtmlProvider extends PureComponent<PropsType> {

  override render () {
    const {children, fileName} = this.props;

    return <CacheValueProvider<string>
      cache={flagImageHtmlCache}
      cacheKey={fileName}>
      {children}
    </CacheValueProvider>;
  }
}
