import React, { Component } from 'react';
import PropTypes from 'prop-types';

let counter = 0;
const UL_TABS_CONTENT_STYLE = { margin: 0, padding: 0 };

export default class TabsWrapper extends Component {

  constructor() {
    super( ...arguments );
    this.ref = React.createRef();
    this.renderCounter = counter++;
  }

  componentDidMount() {
    jQuery( this.ref.current ).tabs();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { tabs } = this.props;

    const prefix = 'tab-' + this.renderCounter + '-';
    return <div ref={ this.ref }>
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

  componentWillUnmount() {
    jQuery( this.ref.current ).tabs( 'destroy' );
  }

}

TabsWrapper.propTypes = {
  tabs: PropTypes.arrayOf( PropTypes.shape( {
    key: PropTypes.string.isRequired,
    label: PropTypes.oneOfType( [ PropTypes.node, PropTypes.string ] ),
    content: PropTypes.node,
  } ) ),
};
