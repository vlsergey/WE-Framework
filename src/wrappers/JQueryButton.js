import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class JQueryButton extends Component {

  componentDidMount() {
    this.jQueryComponent.button( {
      click: this.props.onClick,
      disabled: this.props.disabled,
      icons: { primary: this.props.icon },
      label: this.props.label,
      text: this.props.text,
    } );
  }

  componentDidUpdate() {
    this.jQueryComponent.button( {
      click: this.props.onClick,
      disabled: this.props.disabled,
      icons: { primary: this.props.icon },
      label: this.props.label,
      text: this.props.text,
    } );
  }

  render() {
    const { className } = this.props;
    return <div className={className} ref={ ( component ) => { this.jQueryComponent = jQuery( component ); } } />;
  }

  componentWillUnmount() {
    this.jQueryComponent.button( 'destroy' );
  }

}

JQueryButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.bool,
};
