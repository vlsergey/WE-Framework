import React, { Component } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import JQueryButton from 'wrappers/JQueryButton';
import PropTypes from 'prop-types';
import styles from './core.css';

export default class ClaimDeleteButtonCell extends Component {

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

    return <ButtonCell>
      <JQueryButton
        className={styles.wef_select_rank_button}
        disabled={disabled}
        icon={'ui-icon-trash'}
        label={i18n.buttonRemoveClaim}
        onClick={this.handleClick}
        text={false} />
    </ButtonCell>;
  }

}
