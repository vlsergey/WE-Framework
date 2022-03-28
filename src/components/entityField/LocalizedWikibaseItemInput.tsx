import React, {ChangeEventHandler, FocusEventHandler} from 'react';

import {useLabelDescription} from '../../caches/labelDescriptionCache';
import WikibaseItemInput from './WikibaseItemInput';

interface Props {
  entityId?: string;
  inputRef?: any;
  onBlur: FocusEventHandler< HTMLInputElement >;
  onChange: ChangeEventHandler< HTMLInputElement >;
  onFocus: FocusEventHandler< HTMLInputElement >;
  value?: string;
  wikibaseItemInputRef: any;
}

const LocalizedWikibaseItemInput = ({
  entityId,
  wikibaseItemInputRef,
  ...etc
}: Props) => {
  const labelDescription = useLabelDescription(entityId);

  return <WikibaseItemInput
    {...etc}
    entityId={entityId || undefined}
    entityLabel={labelDescription?.label}
    ref={wikibaseItemInputRef} />;
};

export default React.memo(LocalizedWikibaseItemInput) as typeof LocalizedWikibaseItemInput;
