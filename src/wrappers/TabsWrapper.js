import React, { Component } from 'react';
import PropTypes from 'prop-types';

let counter = 0;

export default class TabsWrapper extends Component {

  constructor() {
    super( ...arguments );
    this.renderCounter = counter++;
  }

  componentDidMount() {
    jQuery( this.component ).tabs();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { tabs } = this.props;

    const prefix = 'tab-' + this.renderCounter + '-';
    return <div ref={ ( component ) => this.component = component }>
      <ul>
        {tabs.map( ( tab, index ) => <li key={prefix + index}><a href={'#' + prefix + index}>{tab.label}</a></li> ) }
      </ul>
      <ul>
        {tabs.map( ( tab, index ) => <div key={prefix + index} id={prefix + index}>{tab.content}</div> ) }
      </ul>
    </div>;
  }

  componentWillUnmount() {
    jQuery( this.component ).tabs( 'destroy' );
  }

}

TabsWrapper.propTypes = {
  tabs: PropTypes.arrayOf( PropTypes.shape( {
    key: PropTypes.string.isRequired,
    label: PropTypes.oneOfType( [ PropTypes.node, PropTypes.string ] ),
    content: PropTypes.node,
  } ) ),
};
