import React, { PureComponent } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import JQueryButton from '../wrappers/JQueryButton';
import PropTypes from 'prop-types';

export default class AddClaimButtonCell extends PureComponent {

  render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell>
      <JQueryButton
        disabled={disabled}
        icon="ui-icon-plus"
        label={i18n.buttonAddClaim}
        onClick={onClick}
        text={false} />
    </ButtonCell>;
  }

}

AddClaimButtonCell.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

AddClaimButtonCell.defaultProps = {
  disabled: false,
};
