// @flow

import React, { PureComponent } from 'react';
import JQueryButton from 'wrappers/JQueryButton';
import styles from './ButtonCell.css';

type PropsType = {
  children? : ?( any => any ),
  disabled? : ?boolean,
  icon? : ?string,
  label? : ?string,
  onClick? : ?( any => any ),
};

export default class ButtonCell extends PureComponent<PropsType> {

  render() {
    const { children, icon, label, disabled, onClick } = this.props;

    const child = <JQueryButton
      disabled={disabled}
      icon={icon}
      label={label}
      onClick={onClick}
      text={false} />;

    return <td className={styles.buttonCell} height={22} width={28}>
      { typeof children === 'function' ? children( child ) : child}
    </td>;
  }
}
