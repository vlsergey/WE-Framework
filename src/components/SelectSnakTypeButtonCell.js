// @flow

import React, { PureComponent } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import PropTypes from 'prop-types';
import SnakTypeSelect from './SnakTypeSelect';
import styles from './SelectSnakTypeButtonCell.css';

export default class SnakTypeSelectButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    value: 'value',
  };

  constructor() {
    super( ...arguments );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( value ) {
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
      label={i18n.snakType[ value ]}
      onClick={this.handleClick}>
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
