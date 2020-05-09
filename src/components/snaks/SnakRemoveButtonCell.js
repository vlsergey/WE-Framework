// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import PropTypes from 'prop-types';

export default class SnakRemoveButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,

    confirmMessage: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  static defaultProps = {
    disabled: false,
  };

  constructor() {
    super( ...arguments );

    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    const { confirmMessage, onClick } = this.props;

    if ( confirm( confirmMessage ) ) {
      onClick();
    }
  }

  render() {
    const { disabled, label } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-trash"
      label={label}
      onClick={this.handleClick} />;
  }

}
