// @flow

import React, { Component } from 'react';

let counter = 0;
const UL_TABS_CONTENT_STYLE = { margin: 0, padding: 0 };

type PropsType = {
  onActivate? : any => any,
  tabs : {
    content : any,
    label : any
  }[],
};

export default class TabsWrapper extends Component<PropsType> {

  ref : ReactObjRef< HTMLDivElement > = React.createRef();
  renderCounter : number = counter++;

  componentDidMount() {
    if ( this.ref.current ) {
      jQuery( this.ref.current ).tabs( {
        activate: this.props.onActivate,
      } );
    }
  }

  componentWillUnmount() {
    if ( this.ref.current ) {
      jQuery( this.ref.current ).tabs( 'destroy' );
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { tabs } = this.props;

    const prefix = 'tab-' + this.renderCounter + '-';
    return <div ref={this.ref}>
      <ul>
        {tabs.map( ( tab, index ) =>
          <li key={prefix + index}>
            <a href={'#' + prefix + index}>
              {tab.label}
            </a>
          </li>
        ) }
      </ul>
      <ul style={UL_TABS_CONTENT_STYLE}>
        {tabs.map( ( tab, index ) =>
          <div id={prefix + index} key={prefix + index}>
            {tab.content}
          </div>
        ) }
      </ul>
    </div>;
  }

}
