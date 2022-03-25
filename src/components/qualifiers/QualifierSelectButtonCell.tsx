import React, {PureComponent} from 'react';

import ButtonCell from '../ButtonCell';
import i18n from './i18n';

interface PropsType {
  disabled?: boolean;
  onClick: () => unknown;
}

export default class QualifierSelectButtonCell extends PureComponent<PropsType> {

  override render () {
    const {disabled, onClick} = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-tag"
      label={i18n.buttonLabelAddQualifier}
      onClick={onClick} />;
  }

}
