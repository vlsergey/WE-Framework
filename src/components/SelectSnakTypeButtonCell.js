import React, { PureComponent } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import SnakTypeSelect from './SnakTypeSelect';
import styles from './core.css';

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
    this.handleClick = this.handleClick.bind( this );
    this.handleChange = this.handleChange.bind( this );

    this.state = {
      open: false,
    };
  }

  handleChange( value ) {
    this.setState( {
      open: false,
    } );

    if ( value !== this.props.value ) {
      const { onChange } = this.props;
      if ( onChange )
        onChange( ...arguments );
    }
  }

  handleClick() {
    this.setState( {
      open: !this.state.open,
    } );
  }

  render() {
    const { disabled, value } = this.props;

    return <ButtonCell
      disabled={disabled}
      icon={styles[ 'ui-icon-wef-snaktype-' + value ]}
      label={i18n.snakType[ value ]}
      onClick={this.handleClick}>
      {children =>
        <Popup
          arrow={false}
          contentStyle={{ padding: 0 }}
          open={this.state.open}
          position="bottom right"
          trigger={children}>
          <SnakTypeSelect
            onChange={this.handleChange}
            value={value} />
        </Popup>}</ButtonCell>;
  }

}
