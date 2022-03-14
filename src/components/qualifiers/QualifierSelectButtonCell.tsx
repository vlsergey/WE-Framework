import React, { PureComponent } from 'react';
import ButtonCell from '../ButtonCell';
import i18n from './i18n';

type PropsType = {
  disabled : boolean,
  onClick : () => any,
};

export default class QualifierSelectButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
  };

  override render() {
    const { disabled, onClick } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon="ui-icon-tag"
      label={i18n.buttonAddQualifier}
      onClick={onClick} />;
  }

}
