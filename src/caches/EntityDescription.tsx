import React from 'react';

import {useLabelDescription} from './labelDescriptionCache';

interface PropsType {
  entityId?: string;
}

const EntityLabel = ({
  entityId
}: PropsType): JSX.Element => {
  const labelDescription = useLabelDescription(entityId);
  return (labelDescription?.description || null) as unknown as JSX.Element;
};

export default React.memo(EntityLabel);
