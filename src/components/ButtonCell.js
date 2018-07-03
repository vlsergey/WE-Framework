import React, { PureComponent } from 'react';
import JQueryButton from 'wrappers/JQueryButton';
import PropTypes from 'prop-types';
import styles from './ButtonCell.css';

export default class ButtonCell extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { children, icon, label, disabled, onClick } = this.props;

    const child = <JQueryButton
      disabled={disabled}
      icon={icon}
      label={label}
      onClick={onClick}
      text={false} />;

    return <td className={styles.buttonCell}>
      { typeof children === 'function' ? children( child ) : child}
    </td>;
  }
}
