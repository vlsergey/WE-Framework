// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';

type PropsType = {
  disabled? : ?boolean,
  onClick : any => any,
};

export default class ClaimAddButtonCell extends PureComponent<PropsType> {

  render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-plus"
      label={i18n.buttonAddClaim}
      onClick={onClick} />;
  }

}
