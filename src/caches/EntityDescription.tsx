import React, {PureComponent} from 'react';

import LabelDescription from './LabelDescription';
import LabelDescriptionProvider from './LabelDescriptionProvider';

export function constructDescription (labelDescription: LabelDescription | undefined): string | null {
  return labelDescription?.description || null;
}

interface PropsType {
  entityId?: string;
}

export default class EntityLabel extends PureComponent<PropsType> {

  override render () {
    const {entityId} = this.props;
    if (!entityId) return null;

    return <LabelDescriptionProvider entityId={entityId}>
      {constructDescription}
    </LabelDescriptionProvider>;
  }

}
