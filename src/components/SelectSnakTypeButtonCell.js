import React, { Component } from 'react';
import ButtonCell from './ButtonCell';
import i18n from './core.i18n';
import JQueryButton from '../wrappers/JQueryButton';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import styles from './core.css';

class SelectSnakType extends Component {

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
    this.handleChange = this.handleChange.bind( this );
  }

  componentDidMount() {
    this.ref.current.focus();
  }

  handleChange( event ) {
    this.props.onChange( this.ref.current.value );
    event.stopPropagation();
  }

  render() {
    /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "onChange" }]*/
    const { onChange, value, ...other } = this.props;

    return <select
      className={ styles[ 'wef-snaktypeselector-menu' ]}
      onChange={this.handleChange}
      ref={this.ref}
      size={3}
      value={value}
      {...other}>
      <option
        title={i18n.snakTypeValueTitle}
        value='value'>{i18n.snakTypeValue}</option>
      <option
        title={i18n.snakTypeNoValueTitle}
        value='novalue'>{i18n.snakTypeNoValue}</option>
      <option
        title={i18n.snakTypeSomeValueTitle}
        value='somevalue'>{i18n.snakTypeSomeValue}</option>
    </select>;
  }
}

SelectSnakType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

SelectSnakType.defaultProps = {
  value: 'value',
};

export default class SelectSnakTypeButtonCell extends Component {

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
    const { disabled } = this.props;

    return <ButtonCell>
      <Popup
        arrow={false}
        contentStyle={{ padding: 0 }}
        onClose={() => console.log( ...arguments )}
        onOpen={() => console.log( ...arguments )}
        open={this.state.open}
        position="bottom right"
        trigger={
          <JQueryButton
            className={ styles.wef_select_snak_type_button }
            disabled={disabled}
            icon="ui-icon-triangle-1-e"
            label={i18n.buttonSelectSnakType}
            onClick={ this.handleClick }
            ref={this.ref}
            text={false}
          />
        }>
        <SelectSnakType
          onChange={this.handleChange}
          onClick={() => this.setState( { open: false } )}
          value={this.props.value} />
      </Popup>
    </ButtonCell>;
  }

}

SelectSnakTypeButtonCell.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

SelectSnakTypeButtonCell.defaultProps = {
  disabled: false,
  value: 'value',
};
