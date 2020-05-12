// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import SnakTypeSelect from './SnakTypeSelect';
import styles from './SelectSnakTypeButtonCell.css';

type PropsType = {
  disabled : boolean,
  onChange : SnakTypeType => any,
  value : SnakTypeType,
};

export default class SnakTypeSelectButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
    value: 'value',
  };

  @boundMethod
  handleChange( value : SnakTypeType ) {
    if ( value !== this.props.value ) {
      const { onChange } = this.props;
      if ( onChange )
        onChange( ...arguments );
    }
  }

  render() {
    const { disabled, value } = this.props;

    return <ButtonCell
      className={styles.selectSnakTypeButtonCell}
      disabled={disabled}
      icon={styles[ 'ui-icon-wef-snaktype-' + value ]}
      label={i18n.snakType[ value ]}>
      {children =>
        <Popup
          basic
          className={styles.selectSnakTypePopup}
          hoverable
          on="click"
          position="bottom right"
          trigger={children}
          verticalOffset={-10}
          wide={false}>
          <SnakTypeSelect
            onChange={this.handleChange}
            value={value} />
        </Popup>}</ButtonCell>;
  }

}
