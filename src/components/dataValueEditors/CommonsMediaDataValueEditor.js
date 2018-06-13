import * as Shapes from '../../model/Shapes';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import dataTypeStyles from './CommonsMedia.css';
import MediawikiPreview from '../MediawikiPreview';
import PropertyDescription from '../../core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from '../core.css';

export default class CommonsMediaDataValueEditor extends Component {

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  constructor() {
    super( ...arguments );

    this.commonsApi = new mw.ForeignApi( '//commons.wikimedia.org/w/api.php' );
    this.state = {
      suggestions: [],
    };

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
    } ).done( ( result ) => {
      if ( result.error ) {
        console.log( result );
        mw.notify( 'Unable to expand templates: ' + result.error.info );
        return;
      }

      const suggestions = result.query.prefixsearch.map( p => p.title.substring( 'File:'.length ) );
      this.setState( { suggestions } );
    } );
  }


  render() {
    const { onDataValueChange, datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + propertyDescription.datatype ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.value = datavalue ? datavalue.value : '';
    params.onChange = ( event, { newValue } ) => {
      onDataValueChange( {
        type: datavalue ? datavalue.type : 'string',
        value: newValue ? newValue : '',
      } );
    };

    return <td colSpan={12}>
      <Autosuggest
        getSuggestionValue={ ( data ) => data ? data : ''}
        inputProps={params}
        onSuggestionsClearRequested={ this.handleSuggestionsClearRequested }
        onSuggestionsFetchRequested ={ this.handleSuggestionsFetchRequested }
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
