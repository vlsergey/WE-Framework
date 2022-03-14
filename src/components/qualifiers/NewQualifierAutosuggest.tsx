import * as ApiUtils from '../../core/ApiUtils';
import React, { ChangeEvent, PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { DEFAULT_LANGUAGES } from '../../utils/I18nUtils';
import i18n from './i18n';
import PropertySuggestion from './PropertySuggestion';
import styles from './NewQualifierAutosuggest.css';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

type PropsType = {
  onSelect : (value : string) => any,
};

type StateType = {
  suggestions : string[],
  textValue : string,
};

export default class NewQualifierAutosuggest
  extends PureComponent<PropsType, StateType> {

  wikidataApi : any;

  constructor( props : PropsType) {
    super( props );
    this.wikidataApi = ApiUtils.getWikidataApi();

    this.state = {
      suggestions: [],
      textValue: '',
    };
  }

  handleChange = (
    _event : ChangeEvent< any >,
    { method, newValue } : { method : string, newValue : string | null }
  ) => {
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

  handleSuggestionsClearRequested = () =>
    this.setState( { suggestions: [] } );

  handleSuggestionsFetchRequested = ( { value } : { value : string } ) => {
    const resultSet : Set<string> = new Set();
    DEFAULT_LANGUAGES.forEach( language => {
      this.wikidataApi.get( {
        action: 'wbsearchentities',
        language,
        limit: NUMBER_OF_SUGGESTIONS_PER_LANGUAGE,
        search: value,
        type: 'property',
      } ).then( (result : any) => {
        result.search.forEach( (item : any) => resultSet.add( item.id as string ) );
        this.setState( {
          suggestions: [ ...resultSet ],
        } );
      } );
    } );
  }

  getSuggestionValue( data : string | null ) {
    return data || '';
  }

  override render() {
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

  renderSuggestion = ( propertyId : string ) =>
    <PropertySuggestion propertyId={propertyId} />
}
