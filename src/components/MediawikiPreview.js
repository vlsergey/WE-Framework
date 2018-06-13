import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';

export default class MediawikiPreview extends Component {
  
  static propTypes = {
    spinnerSize: PropTypes.number,
    wikitext: PropTypes.string.isRequired,
  }
  
  constructor() {
    super( ...arguments );
    
    this.state = {
      html: null,
    };
    
    this.loadHtml = this.loadHtml.bind( this ); 
    
    // initial loading
    this.loadHtml();
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.wikitext !== this.props.wikitext ) {
      this.setState( { html: null } );
      this.loadHtml();
    }
  }

  loadHtml() {
    if ( !this.props.wikitext )
      return;
    
    new mw.Api().post( {
      action: 'parse',
      contentmodel: 'wikitext',
      format: 'json',
      prop: 'text',
      text: this.props.wikitext,
    } ).done( ( result ) => {
      if ( result.error ) {
        console.log( result );
        mw.notify( 'Unable to expand templates: ' + result.error.info );
        return;
      }
      
      this.setState( { html: result.parse.text[ '*' ] } );
    } );
  }
  
  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "wikitext" }] */
    const { spinnerSize, wikitext, ...other } = this.props;
    
    if ( this.state.html ) {
      return <div dangerouslySetInnerHTML={{ __html: this.state.html }} {...other} />;
    }

    return <RingLoader size={spinnerSize} {...other} />;
  }
  
}
