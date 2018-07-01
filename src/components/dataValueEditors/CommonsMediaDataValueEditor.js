import * as ApiUtils from 'core/ApiUtils';
import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import Autosuggest from 'react-autosuggest';
import dataTypeStyles from './CommonsMedia.css';
import MediawikiPreview from 'components/MediawikiPreview';
import React from 'react';
import styles from 'components/core.css';

export default class CommonsMediaDataValueEditor extends AbstractStringBasedDataValueEditor {

  static DATATYPE = 'commonsMedia';

  static propTypes = AbstractStringBasedDataValueEditor.propTypes;

  constructor() {
    super( ...arguments );

    this.commonsApi = ApiUtils.getCommonsApi();
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
    } ).then( result => {
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

  handleChange( event, { newValue } ) {
    this.handleValueChange( newValue );
  }

  render() {
    const { datavalue, propertyDescription, readOnly } = this.props;

    if ( readOnly ) {
      if ( datavalue && datavalue.value ) {
        return <td colSpan={12}>
          <a
            href={'https://commons.wikimedia.org/wiki/File:' + datavalue.value}
            rel="noopener noreferrer"
            target="_blank">
            {datavalue.value}
          </a>
        </td>;
      } else {
        return null;
      }
    }

    const params = {
      type: 'text',
      className: styles[ 'wef_' + CommonsMediaDataValueEditor.DATATYPE ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = this.handleChange;

    return <td colSpan={12}>
      <Autosuggest
        getSuggestionValue={this.getSuggestionValue}
        inputProps={params}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        theme={dataTypeStyles} />
    </td>;
  }

  renderSuggestion( data ) {
    return <div className={dataTypeStyles.suggestionContent}>
      <div className={dataTypeStyles.suggestionContentPreviewOuter}>
        <div className={dataTypeStyles.suggestionContentPreviewInner}>
          <MediawikiPreview spinnerSize={45} wikitext={'[[File:' + data + '|50x50px]]'} />
        </div>
      </div>
      <span className={dataTypeStyles.suggestionContentText}>&nbsp;&nbsp;{data}</span>
    </div>;
  }

}
