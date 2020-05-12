// @flow

import * as ApiUtils from 'core/ApiUtils';
import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { boundMethod } from 'autobind-decorator';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import i18n from './i18n';
import PropertySuggestion from './PropertySuggestion';
import styles from './NewQualifierAutosuggest.css';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

type PropsType = {
  onSelect : string => any,
};

type StateType = {
  suggestions : string[],
  textValue : string,
};

export default class NewQualifierAutosuggest
  extends PureComponent<PropsType, StateType> {

  wikidataApi : any;

  constructor() {
    super( ...arguments );
    this.wikidataApi = ApiUtils.getWikidataApi();

    this.state = {
      suggestions: [],
      textValue: '',
    };
  }

  @boundMethod
  handleChange(
    event : SyntheticEvent< any >,
    { method, newValue } : { method : string, newValue : ?string }
  ) {
    switch ( method ) {
    case 'enter':
    case 'click':
    {
      if ( newValue ) {
        this.props.onSelect( newValue );
      }
      break;
    }
    default:
      // typed or up/down
      this.setState( {
        textValue: newValue || '',
      } );
    }
  }

  @boundMethod
  handleSuggestionsClearRequested() {
    this.setState( { suggestions: [] } );
  }

  @boundMethod
  handleSuggestionsFetchRequested( { value } : { value : string } ) : void {
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

  getSuggestionValue( data : ?string ) {
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

  @boundMethod
  renderSuggestion( propertyId : string ) {
    return <PropertySuggestion propertyId={propertyId} />;
  }
}
