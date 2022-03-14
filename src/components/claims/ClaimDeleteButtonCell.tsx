import React, { PureComponent } from 'react';
import ButtonCell from '../ButtonCell';
import i18n from '../core.i18n';

type PropsType = {
  disabled : boolean,
  onClaimDelete : () => any,
  propertyId : string,
  propertyLabel : string,
};

export default class ClaimDeleteButtonCell extends PureComponent<PropsType> {

  handleClick = () => {
    const { propertyId, propertyLabel } = this.props;

    const question = i18n.confirmDeleteClaim //
      .replace( '{code}', propertyId ) //
      .replace( '{label}', propertyLabel );

    if ( confirm( question ) ) {
      this.props.onClaimDelete();
    }
  }

  override render() {
    const { disabled } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon={'ui-icon-trash'}
      label={i18n.buttonRemoveClaim}
      onClick={this.handleClick} />;
  }

}
