import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DialogWrapper extends Component {

  componentDidMount() {
    jQuery( this.component ).dialog( {
      autoOpen: true,
      autoResize: true,
      close: ( event, ui ) => { if ( this.props.onClose ) return this.props.onClose( event, ui ); },
    } );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div title={ this.props.title } ref={ ( component ) => this.component = component }>
      {this.props.children}
    </div>;
  }

  componentWillUnmount() {
    jQuery( this.component ).dialog( 'destroy' );
  }

}

DialogWrapper.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
