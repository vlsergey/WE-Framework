import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import Autosuggest from 'react-autosuggest';
import dataTypeStyles from './CommonsMedia.css';
import MediawikiPreview from 'components/MediawikiPreview';
import React from 'react';
import styles from 'components/core.css';

export default class CommonsMediaDataValueEditor extends AbstractStringBasedDataValueEditor {

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  constructor() {
    super( ...arguments );

    this.commonsApi = new mw.ForeignApi( '//commons.wikimedia.org/w/api.php' );
    this.state = {
      suggestions: [],
    };

    this.handleChange = this.handleChange.bind( this );
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind( this );
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind( this );
  }

  handleSuggestionsClearRequested() {
    this.setState( { suggestions: [] } );
  }

  handleSuggestionsFetchRequested( { value } ) {
    this.commonsApi.post( {
      action: 'query',
      list: 'prefixsearch',
      psnamespace: '6',
      pslimit: '10',
      pssearch: value,
      format: 'json',
    } ).done( result => {
      if ( result.error ) {
        console.log( result );
        mw.notify( 'Unable to expand templates: ' + result.error.info );
        return;
      }

      const suggestions = result.query.prefixsearch.map( p => p.title.substring( 'File:'.length ) );
      this.setState( { suggestions } );
    } );
  }

  getSuggestionValue( data ) {
    return data ? data : '';
  }

  handleChange( event, value ) {
    this.handleValueChange( value );
  }

  render() {
    const { datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = this.handleChange;

    return <td colSpan={12}>
      <Autosuggest
        getSuggestionValue={ this.getSuggestionValue }
        inputProps={params}
        onSuggestionsClearRequested={ this.handleSuggestionsClearRequested }
        onSuggestionsFetchRequested={ this.handleSuggestionsFetchRequested }
        renderSuggestion={ this.renderSuggestion }
        suggestions={this.state.suggestions}
        theme={dataTypeStyles} />
    </td>;
  }

  renderSuggestion( data ) {
    return <div className={ dataTypeStyles.suggestionContent}>
      <div className={dataTypeStyles.suggestionContentPreviewOuter}>
        <div className={dataTypeStyles.suggestionContentPreviewInner}>
          <MediawikiPreview spinnerSize={45} wikitext={'[[File:' + data + '|50x50px]]'} />
        </div>
      </div>
      <span className={dataTypeStyles.suggestionContentText}>&nbsp;&nbsp;{data}</span>
    </div>;
  }

}
