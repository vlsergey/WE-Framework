import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class JQueryButton extends Component {

  componentDidMount() {
    this.jQueryComponent.button( {
      disabled: this.props.disabled,
      icons: { primary: this.props.icon },
      label: this.props.label,
      text: this.props.text,
    } );
  }

  componentDidUpdate() {
    this.jQueryComponent.button( {
      disabled: this.props.disabled,
      icons: { primary: this.props.icon },
      label: this.props.label,
      text: this.props.text,
    } );
  }

  render() {
    const { className, onClick } = this.props;
    return <div className={className} onClick={ onClick } ref={ ( component ) => { this.jQueryComponent = jQuery( component ); } } />;
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
