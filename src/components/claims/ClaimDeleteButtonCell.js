// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from 'components/core.i18n';
import PropTypes from 'prop-types';

export default class ClaimDeleteButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    onClaimDelete: PropTypes.func.isRequired,
    propertyId: PropTypes.string.isRequired,
    propertyLabel: PropTypes.string.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  constructor() {
    super( ...arguments );
    this.handleClick = this.handleClick.bind( this );
  }

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
