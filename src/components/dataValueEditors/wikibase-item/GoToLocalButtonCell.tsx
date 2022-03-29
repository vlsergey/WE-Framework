import React from 'react';

import {useLocalTitle} from '../../../caches/localTitleCache';
import ButtonCell from '../../ButtonCell';
import i18n from './i18n';

const wgArticlePath = mw.config.get('wgArticlePath');

interface PropsType {
  entityId?: string;
}

const GoToLocalButtonCell = ({
  entityId
}: PropsType) => {
  const localTitle = useLocalTitle(entityId);

  if (!localTitle) {
    return <ButtonCell
      disabled
      icon="ui-icon-extlink"
      key="button"
      label={i18n.buttonLabelGoToLocal}>
      { (children: any) => <a href={'#'}>{children}</a> }
    </ButtonCell>;
  }

  return <ButtonCell
    icon="ui-icon-extlink"
    key="button"
    label={i18n.buttonLabelGoToLocal}>
    { (children: any) => <a href={wgArticlePath.replace('$1', localTitle)}
      rel="noopener noreferrer"
      target="_blank">{children}</a> }
  </ButtonCell>;
};

export default React.memo(GoToLocalButtonCell);
