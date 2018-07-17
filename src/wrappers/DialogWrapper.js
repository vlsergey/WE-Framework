import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class DialogWrapper extends PureComponent {

  static propTypes = {
    buttons: PropTypes.arrayOf( PropTypes.object ),
    children: PropTypes.node,
    className: PropTypes.string,
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    onBeforeClose: PropTypes.func,
    onClose: PropTypes.func,
    title: PropTypes.string,
  };

  constructor() {
    super( ...arguments );
    this.state = { manuallyResized: false };

    this.ref = React.createRef();

    this.handleResize = this.handleResize.bind( this );
    this.resizeToFit = this.resizeToFit.bind( this );
  }

  componentDidMount() {
    const { buttons, className, minHeight, minWidth, onBeforeClose, onClose } = this.props;

    jQuery( this.ref.current ).dialog( {
      autoOpen: true,
      autoResize: true,
      beforeClose: onBeforeClose,
      buttons,
      close: onClose,
      dialogClass: className,
      minHeight,
      minWidth,
      open: this.resizeToFit,
      resizeStart: this.handleResize,
      // workaround for content shrinking bug in jQuery
      // inspired by https://stackoverflow.com/a/49965986/1885756
      resize() {
        jQuery( this ).closest( '.ui-dialog-content' ).css( 'width', 'unset' );
      },
    } );
  }

  componentWillUnmount() {
    jQuery( this.ref.current ).dialog( 'destroy' );
  }

  close() {
    jQuery( this.ref.current ).dialog( 'close' );
  }

  open() {
    jQuery( this.ref.current ).dialog( 'open' );
  }

  handleResize() {
    this.setState( { manuallyResized: true } );
    jQuery( this.ref.current )
      .dialog( 'option', 'dialogClass', 'manuallyResized' + ( this.props.className
        ? ' ' + this.props.className
        : ''
      ) );
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const { children, title } = this.props;

    return <div ref={this.ref} title={title}>
      {children}
    </div>;
  }

  resizeToFit() {
    if ( !this.state.manuallyResized ) {
      const wrapped = jQuery( this.ref.current );
      if ( wrapped.parent().height() > $( window ).height() ) {
        wrapped.height( $( window ).height() * 0.7 );
      }
    }
  }

}
