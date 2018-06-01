import React, { Component } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import JQueryButton from '../wrappers/JQueryButton';
import PropTypes from 'prop-types';

export default class AddClaimButtonCell extends Component {

  render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell>
      <JQueryButton
        icon="plus"
        onClick={onClick}
        label={i18n.buttonAddClaim}
        showLabel={false}
        disabled={disabled} />
    </ButtonCell>;
  }

}

AddClaimButtonCell.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

AddClaimButtonCell.defaultProps = {
  disabled: false
};
