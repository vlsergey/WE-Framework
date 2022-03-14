import React, {PureComponent} from 'react';

import CacheValuesProvider, {CacheType} from './CacheValuesProvider';
import LabelDescription from './LabelDescription';
import labelDescriptionCache from './labelDescriptionCache';

interface PropsType {
  children: (cachePart: CacheType<LabelDescription>) => any;
  entityIds: string[];
}

export default class LabelDescriptionsProvider
  extends PureComponent<PropsType> {

  override render (): JSX.Element {
    const {children, entityIds} = this.props;

    return <CacheValuesProvider<LabelDescription>
      cache={labelDescriptionCache}
      cacheKeys={entityIds}>
      {children}
    </CacheValuesProvider>;
  }
}
