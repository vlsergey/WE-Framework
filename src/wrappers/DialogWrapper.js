import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DialogWrapper extends Component {

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
  }

  componentDidMount() {
    jQuery( this.ref.current ).dialog( {
      autoOpen: true,
      autoResize: true,
      close: ( event, ui ) => { if ( this.props.onClose ) return this.props.onClose( event, ui ); },
      minWidth: this.props.minWidth,
    } );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref={ this.ref } title={ this.props.title }>
      {this.props.children}
    </div>;
  }

  componentWillUnmount() {
    jQuery( this.component ).dialog( 'destroy' );
  }

}

DialogWrapper.propTypes = {
  children: PropTypes.node,
  minWidth: PropTypes.number,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
