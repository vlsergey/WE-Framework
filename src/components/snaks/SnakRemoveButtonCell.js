// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';

type PropsType = {
  confirmMessage : string,
  disabled : boolean,
  label : string,
  onClick : any => any,
};

export default class SnakRemoveButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
  };

  @boundMethod
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
