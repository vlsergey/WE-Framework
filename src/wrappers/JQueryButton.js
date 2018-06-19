import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class JQueryButton extends Component {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    text: PropTypes.bool,
  };

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
  }

  componentDidMount() {
    jQuery( this.ref.current ).button( {
      disabled: this.props.disabled,
      icons: { primary: this.props.icon },
      label: this.props.label,
      text: this.props.text,
    } );
  }

  componentDidUpdate() {
    jQuery( this.ref.current ).button( {
      disabled: this.props.disabled,
      icons: { primary: this.props.icon },
      label: this.props.label,
      text: this.props.text,
    } );
  }

  componentWillUnmount() {
    jQuery( this.ref.current ).button( 'destroy' );
  }

  render() {
    const { className, onClick } = this.props;
    return <div className={className} onClick={ onClick } ref={ this.ref } />;
  }

}
