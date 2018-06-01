import React, { Component } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import JQueryButton from '../wrappers/JQueryButton';
import PropTypes from 'prop-types';

export default class SelectSnakTypeButtonCell extends Component {

  render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell>
      <JQueryButton
        className="wef_select_snak_type_button"
        icon="ui-icon-triangle-1-e"
        onClick={onClick}
        label={i18n.buttonAddClaim}
        showLabel={false}
        disabled={disabled} />
    </ButtonCell>;
  }

}

SelectSnakTypeButtonCell.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SelectSnakTypeButtonCell.defaultProps = {
  disabled: false
};
