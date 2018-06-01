import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class JQueryButton extends Component {

  componentDidMount() {
    jQuery( this.component ).button( {
      click: this.props.onClick,
      disabled: this.props.disabled,
      icon: this.props.icon,
      label: this.props.label,
      showLabel: this.props.showLabel,
    } );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { className } = this.props;
    return <div className={className} ref={ ( component ) => this.component = component } />;
  }

  componentWillUnmount() {
    jQuery( this.component ).button( 'destroy' );
  }

}

JQueryButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
};
