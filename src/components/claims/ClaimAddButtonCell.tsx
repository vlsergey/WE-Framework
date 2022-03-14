import React, { PureComponent } from 'react';
import ButtonCell from '../ButtonCell';
import i18n from '../core.i18n';

type PropsType = {
  disabled? : boolean,
  onClick : () => any,
};

export default class ClaimAddButtonCell extends PureComponent<PropsType> {

  override render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-plus"
      label={i18n.buttonAddClaim}
      onClick={onClick} />;
  }

}
