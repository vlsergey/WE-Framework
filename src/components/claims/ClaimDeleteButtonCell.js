// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';

type PropsType = {
  disabled : boolean,
  onClaimDelete : void => any,
  propertyId : string,
  propertyLabel : string,
};

export default class ClaimDeleteButtonCell extends PureComponent<PropsType> {

  @boundMethod
  handleClick() {
    const { propertyId, propertyLabel } = this.props;

    const question = i18n.confirmDeleteClaim //
      .replace( '{code}', propertyId ) //
      .replace( '{label}', propertyLabel );

    if ( confirm( question ) ) {
      this.props.onClaimDelete();
    }
  }

  render() {
    const { disabled } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon={'ui-icon-trash'}
      label={i18n.buttonRemoveClaim}
      onClick={this.handleClick} />;
  }

}
