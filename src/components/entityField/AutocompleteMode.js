import * as ApiUtils from 'core/ApiUtils';
import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import LocalizedWikibaseItemInput from './LocalizedWikibaseItemInput';
import styles from './styles.css';
import Suggestion from './Suggestion';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

type PropsType = {
  cache : any,
  onSelect : ?string => any,
  readOnly? : ?boolean,
  testSuggestionsProvider? : string => string[],
  value? : ?string,
};

type StateType = {
  suggestions : string[],
  textValue : string,
};

class AutocompleteMode extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  };

  requestedValue : ?string;

  constructor() {
    super( ...arguments );

    const value = this.props.value || null;
    this.state = {
      suggestions: value ? [ value ] : [],
      textValue: value || '',
    };
    this.wikidataApi = ApiUtils.getWikidataApi();

    this.wikibaseItemInputRef = React.createRef();

    this.handleChange = this.handleChange.bind( this );
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind( this );
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind( this );

    this.renderInput = this.renderInput.bind( this );
    this.renderSuggestion = this.renderSuggestion.bind( this );
  }

  handleSuggestionsClearRequested() {
    this.setState( { suggestions: [] } );
  }

  handleSuggestionsFetchRequested( { value } : ( {value : string} ) ) {
    if ( this.props.testSuggestionsProvider ) {
      this.setState( {
        suggestions: this.props.testSuggestionsProvider( value ),
      } );
    }

    const resultSet = new Set();
    this.requestedValue = value;
    DEFAULT_LANGUAGES.forEach( language => {
      this.wikidataApi.get( {
        action: 'wbsearchentities',
        language,
        limit: NUMBER_OF_SUGGESTIONS_PER_LANGUAGE,
        search: value,
        type: 'item',
      } ).then( result => {
        // may be out of sync, another string already required
        if ( this.requestedValue !== value ) return;

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

  handleChange( event, { method, newValue } ) {
    const { cache, value, onSelect } = this.props;

    switch ( method ) {
    case 'type': {
      if ( newValue === null || newValue.trim() === '' ) {
        onSelect( null );
        break;
      }
      this.setState( {
        textValue: newValue,
      } );
      if ( /^Q\d+$/.test( newValue.trim() ) ) {
        onSelect( newValue.trim() );
      }
      break;
    }
    default: {
      onSelect( newValue );
      const newTextValue = cache[ newValue ] && cache[ newValue ].label ? cache[ newValue ].label : newValue;
      this.setState( {
        textValue: newTextValue,
      } );
      this.wikibaseItemInputRef.current.setValue( newTextValue );
      break;
    }
    }
  }

  render() {
    const inputProps = {
      type: 'text',
    };

    inputProps.entityId = this.props.value || null;
    inputProps.onChange = this.handleChange;
    inputProps.value = this.state.textValue;

    return <Autosuggest
      getSuggestionValue={this.getSuggestionValue}
      inputProps={inputProps}
      onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      renderInputComponent={this.renderInput}
      renderSuggestion={this.renderSuggestion}
      suggestions={this.state.suggestions}
      theme={styles} />;
  }

  renderInput( inputProps ) {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "value" }] */
    const { value, onChange, ref, ...etc } = inputProps;

    return <LocalizedWikibaseItemInput
      {...etc}
      inputRef={ref}
      onChange={onChange}
      value={this.state.textValue}
      wikibaseItemInputRef={this.wikibaseItemInputRef} />;
  }

  renderSuggestion( data ) {
    return <Suggestion entityId={data} />;
  }
}

const mapStateToProps = state => ( {
  cache: state.LABELDESCRIPTIONS.cache,
} );

const AutocompleteModeConnected = connect( mapStateToProps )( AutocompleteMode );
export default AutocompleteModeConnected;
