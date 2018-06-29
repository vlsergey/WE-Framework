import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

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

    const wikitext = this.props.wikitext;
    new mw.Api().post( {
      action: 'parse',
      contentmodel: 'wikitext',
      disablelimitreport: true,
      disableeditsection: true,
      format: 'json',
      prop: 'text',
      text: wikitext,
    } ).then( result => {
      if ( result.error ) {
        console.log( result );
        mw.notify( 'Unable to expand templates: ' + result.error.info );
        return;
      }

      if ( this.props.wikitext === wikitext ) {
        this.setState( { html: result.parse.text[ '*' ] } );
      }
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "wikitext" }] */
    const { spinnerSize, wikitext, ...other } = this.props;

    if ( this.state.html ) {
      return <div dangerouslySetInnerHTML={{ __html: this.state.html }} {...other} />;
    }

    return <ClipLoader size={spinnerSize / 1.4} {...other} />;
  }

}
