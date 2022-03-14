import React, {PureComponent} from 'react';

import CacheValueProvider from './CacheValueProvider';
import LabelDescription from './LabelDescription';
import labelDescriptionCache from './labelDescriptionCache';

interface PropsType {
  children: (labelDescription?: LabelDescription) => any;
  entityId: string;
}

export default class LabelDescriptionProvider extends PureComponent<PropsType> {

  override render () {
    const {children, entityId} = this.props;

    return <CacheValueProvider<LabelDescription>
      cache={labelDescriptionCache}
      cacheKey={entityId}>
      {children}
    </CacheValueProvider>;
  }
}
