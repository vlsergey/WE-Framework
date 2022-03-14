import React, {PureComponent} from 'react';

import ButtonCell from '../ButtonCell';

interface PropsType {
  confirmMessage: string;
  disabled: boolean;
  label: string;
  onClick: () => any;
}

export default class SnakRemoveButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
  };

  handleClick = () => {
    const {confirmMessage, onClick} = this.props;

    if (confirm(confirmMessage)) {
      onClick();
    }
  };

  override render () {
    const {disabled, label} = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-trash"
      label={label}
      onClick={this.handleClick} />;
  }

}
