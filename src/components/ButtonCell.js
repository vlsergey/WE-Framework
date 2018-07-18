import React, { PureComponent } from 'react';
import JQueryButton from 'wrappers/JQueryButton';
import PropTypes from 'prop-types';
import styles from './ButtonCell.css';

export default class ButtonCell extends PureComponent {

  static propTypes = {
    children: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
  };

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
