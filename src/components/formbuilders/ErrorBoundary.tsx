import React, { PureComponent } from 'react';

type PropsType = {
  children : any,
  description? : string | null,
};

type StateType = {
  hasError : boolean,
};

export default class ErrorBoundary extends PureComponent<PropsType, StateType> {

  override state = {
    hasError: false,
  };

  override componentDidCatch( error : any, info : any ) {
    this.setState( { hasError: true } );
    console.log( error );
    mw.log.error( error );
    mw.log.error( info );
  }

  override render() {
    if ( this.state.hasError ) {
      return <div>Unable to render child element: {this.props.description}</div>;
    }
    return this.props.children;
  }
}
