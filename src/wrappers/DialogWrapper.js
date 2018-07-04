import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DialogWrapper extends Component {

  static propTypes = {
    buttons: PropTypes.arrayOf( PropTypes.object ),
    children: PropTypes.node,
    className: PropTypes.string,
    minWidth: PropTypes.number,
    onClose: PropTypes.func,
    title: PropTypes.string,
  };

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { buttons, className, minWidth, onClose } = this.props;

    jQuery( this.ref.current ).dialog( {
      autoOpen: true,
      autoResize: true,
      buttons,
      close: onClose,
      dialogClass: className,
      minWidth,
      open: () => this.resizeToFit(),
    } );
  }

  componentWillUnmount() {
    jQuery( this.ref.current ).dialog( 'destroy' );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { children, title } = this.props;

    return <div ref={this.ref} title={title}>
      {children}
    </div>;
  }

  resizeToFit() {
    const wrapped = jQuery( this.ref.current );
    if ( wrapped.parent().height() > $( window ).height() ) {
      wrapped.height( $( window ).height() * 0.7 );
    }
  }

}
