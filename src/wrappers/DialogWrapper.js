// @flow

import React, { PureComponent } from 'react';

type PropsType = {
  buttons? : ?any[],
  children? : ?any,
  className? : ?string,
  height? : ?( number | string ),
  maxHeight? : ?number,
  maxWidth? : ?number,
  minHeight? : ?number,
  minWidth? : ?number,
  onBeforeClose? : ?( any => any ),
  onClose? : ?( any => any ),
  title? : ?string,
  width? : ?( number | string ),
};

type StateType = {
  manuallyResized : boolean,
};

export default class DialogWrapper extends PureComponent<PropsType, StateType> {

  constructor() {
    super( ...arguments );
    this.state = { manuallyResized: false };

    this.ref = React.createRef();

    this.handleResize = this.handleResize.bind( this );
    this.resizeToFit = this.resizeToFit.bind( this );
  }

  componentDidMount() {
    const { buttons, className, height, maxHeight, maxWidth, minHeight, minWidth, onBeforeClose, onClose, width } = this.props;

    jQuery( this.ref.current ).dialog( {
      autoOpen: true,
      autoResize: true,
      beforeClose: onBeforeClose,
      buttons,
      close: onClose,
      dialogClass: className,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
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
  }

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
