import React, {PureComponent} from 'react';

import LabelDescription from './LabelDescription';
import LabelDescriptionProvider from './LabelDescriptionProvider';

export function constructLabel (
    entityId: string,
    labelDescription: LabelDescription | undefined,
    appendEntityId: boolean
) {
  if (!labelDescription || !labelDescription.label)
    return entityId;

  let result = labelDescription.label;
  if (appendEntityId) {
    result += ' (' + entityId + ')';
  }
  return result;
}

interface PropsType {
  appendEntityId: boolean;
  entityId?: string;
}

export default class EntityLabel extends PureComponent<PropsType> {

  static defaultProps = {
    appendEntityId: false,
  };

  override render () {
    const {appendEntityId, entityId} = this.props;
    if (!entityId)
      return null;

    return <LabelDescriptionProvider entityId={entityId}>
      { labelDescription => constructLabel(entityId, labelDescription, appendEntityId)}
    </LabelDescriptionProvider>;
  }

}
