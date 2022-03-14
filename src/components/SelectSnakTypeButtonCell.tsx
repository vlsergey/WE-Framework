import React, { PureComponent } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import {Popup} from 'semantic-ui-react';
import SnakTypeSelect from './SnakTypeSelect';
import styles from './SelectSnakTypeButtonCell.css';

type PropsType = {
  disabled : boolean,
  onChange? : (value : SnakTypeType) => any,
  value : SnakTypeType,
};

export default class SnakTypeSelectButtonCell extends PureComponent<PropsType> {

  static defaultProps = {
    disabled: false,
    value: 'value',
  };

  handleChange = ( value : SnakTypeType ) => {
    if ( value !== this.props.value ) {
      const { onChange } = this.props;
      if ( onChange ) onChange( value );
    }
  }

  override render() {
    const { disabled, value } = this.props;
    // @ts-ignore
    const iconClassname = styles[ 'ui-icon-wef-snaktype-' + value ]

    return <ButtonCell
      disabled={disabled}
      icon={iconClassname}
      label={i18n.snakType[ value ]}>
      {(children : any) =>
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
