// @flow

import React, { PureComponent } from 'react';
import Spinner from 'components/Spinner';

type PropsType = {
  spinnerSize? : number,
  wikitext : string,
};

type StateType = {
  html : ?string,
};

export default class MediawikiPreview
  extends PureComponent<PropsType, StateType> {

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

    const { wikitext } = this.props;
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
    const { spinnerSize, wikitext, ...etc } = this.props;

    if ( this.state.html ) {
      return <div {...etc} dangerouslySetInnerHTML={{ __html: this.state.html }} />;
    }

    return <Spinner {...etc} size={spinnerSize} />;
  }

}
