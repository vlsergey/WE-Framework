import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {

  static propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
  }

  state = {
    hasError: false,
  }

  componentDidCatch( error, info ) {
    this.setState( { hasError: true } );
    mw.log.error( error );
    mw.log.error( info );
  }

  render() {
    if ( this.state.hasError ) {
      return <div>Unable to render child element: {this.props.description}</div>;
    }
    return this.props.children;
  }
}
