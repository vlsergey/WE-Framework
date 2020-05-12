// @flow

import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';

type PropsType = {
  disabled : boolean,
  onClick : any => any,
};

export default class SnakAddButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
  };

  render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-plus"
      label={i18n.buttonLabelAdd}
      onClick={onClick} />;
  }

}
