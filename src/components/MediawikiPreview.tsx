import React, { PureComponent } from 'react';
import Spinner from '../components/Spinner';

type PropsType = {
  className?: string,
  spinnerSize? : number,
  wikitext : string,
};

type StateType = {
  html : string | null,
};

export default class MediawikiPreview
  extends PureComponent<PropsType, StateType> {

  override state = {
    html: null,
  };

  override componentDidMount() {
    // initial loading
    this.loadHtml();
  }

  override componentDidUpdate( prevProps : PropsType ) {
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
    } ).then( (result : any) => {
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

  override render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "wikitext" }] */
    const { spinnerSize, wikitext, ...etc } = this.props;

    if ( this.state.html ) {
      return <div {...etc} dangerouslySetInnerHTML={{ __html: this.state.html }} />;
    }

    return <Spinner {...etc} size={spinnerSize} />;
  }

}
