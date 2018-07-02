import * as ApiUtils from 'core/ApiUtils';
import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import i18n from './i18n';
import PropertySuggestion from './PropertySuggestion';
import PropTypes from 'prop-types';
import styles from './NewQualifierAutosuggest.css';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

export default class NewQualifierAutosuggest extends PureComponent {

    static propTypes = {
      onSelect: PropTypes.func.isRequired,
    }

    constructor() {
      super( ...arguments );
      this.wikidataApi = ApiUtils.getWikidataApi();

      this.state = {
        suggestions: [],
        textValue: '',
      };

      this.handleChange = this.handleChange.bind( this );
      this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind( this );
      this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind( this );
      this.renderSuggestion = this.renderSuggestion.bind( this );
    }

    handleChange( event, { method, newValue } ) {
      switch ( method ) {
      case 'enter':
      case 'click':
      {
        this.props.onSelect( newValue );
        break;
      }
      default:
        // typed or up/down
        this.setState( {
          textValue: newValue,
        } );
      }
    }

    handleSuggestionsClearRequested() {
      this.setState( { suggestions: [] } );
    }

    handleSuggestionsFetchRequested( { value } ) {
      const resultSet = new Set();
      DEFAULT_LANGUAGES.forEach( language => {
        this.wikidataApi.get( {
          action: 'wbsearchentities',
          language,
          limit: NUMBER_OF_SUGGESTIONS_PER_LANGUAGE,
          search: value,
          type: 'property',
        } ).then( result => {
          result.search.forEach( item => resultSet.add( item.id ) );
          this.setState( {
            suggestions: [ ...resultSet ],
          } );
        } );
      } );
    }

    getSuggestionValue( data ) {
      return data ? data : '';
    }

    render() {
      return <Autosuggest
        getSuggestionValue={this.getSuggestionValue}
        inputProps={{
          type: 'text',
          onChange: this.handleChange,
          placeholder: i18n.placehoderAutosuggest,
          value: this.state.textValue,
        }}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        theme={styles} />;
    }

    renderSuggestion( propertyId ) {
      return <PropertySuggestion propertyId={propertyId} />;
    }
}
