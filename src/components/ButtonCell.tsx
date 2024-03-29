import React, {PureComponent} from 'react';

import JQueryButton from '../wrappers/JQueryButton';
import styles from './ButtonCell.css';

interface PropsType {
  cellRef?: React.RefObject<HTMLTableCellElement> | React.LegacyRef<HTMLTableCellElement>;
  children?: any;
  disabled?: boolean;
  icon?: string;
  label?: string;
  onClick?: () => any;
}

export default class ButtonCell extends PureComponent<PropsType> {

  override render () {
    const {cellRef, children, icon, label, disabled, onClick} = this.props;

    const child = <JQueryButton
      disabled={disabled}
      icon={icon}
      label={label}
      onClick={onClick}
      text={false} />;

    return <td className={styles.buttonCell} height={22} ref={cellRef} width={28}>
      { typeof children === 'function' ? children(child) : child}
    </td>;
  }
}
