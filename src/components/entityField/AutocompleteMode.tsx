import * as ApiUtils from '../../core/ApiUtils';
import React, { ChangeEvent, PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { DEFAULT_LANGUAGES } from '../../utils/I18nUtils';
import LocalizedWikibaseItemInput from './LocalizedWikibaseItemInput';
import styles from './styles.css';
import Suggestion from './Suggestion';
import WikibaseItemInput from './WikibaseItemInput';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

type PropsType = {
  cache : any,
  onSelect : (value : null | string ) => any,
  readOnly : boolean,
  testSuggestionsProvider? : (_ : string) => string[],
  value : null | string,
};

type StateType = {
  suggestions : string[],
  textValue : string,
};

class AutocompleteMode extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    readOnly: false,
  };

  requestedValue : null | string = null;

  wikibaseItemInputRef = React.createRef();
  wikidataApi = ApiUtils.getWikidataApi();

  constructor( props : PropsType) {
    super( props );

    const value = this.props.value || null;
    this.state = {
      suggestions: value ? [ value ] : [],
      textValue: value || '',
    };
  }

  handleSuggestionsClearRequested = () =>this.setState( { suggestions: [] } );

  handleSuggestionsFetchRequested = ( { value } : { value : string } ) => {
    if ( this.props.testSuggestionsProvider ) {
      this.setState( {
        suggestions: this.props.testSuggestionsProvider( value ),
      } );
    }

    const resultSet : Set<string> = new Set();
    this.requestedValue = value;
    DEFAULT_LANGUAGES.forEach( language => {
      this.wikidataApi.get( {
        action: 'wbsearchentities',
        language,
        limit: NUMBER_OF_SUGGESTIONS_PER_LANGUAGE,
        search: value,
        type: 'item',
      } ).then( (result : any) => {
        // may be out of sync, another string already required
        if ( this.requestedValue !== value ) return;

        result.search.forEach( (item : any) => resultSet.add( item.id ) );
        this.setState( {
          suggestions: [ ...resultSet ],
        } );
      } );
    } );
  }

  getSuggestionValue = ( data : null | string ) => data || '';

  handleChange = (
    _event : ChangeEvent< any >,
    { method, newValue } : { method : string, newValue : string }
  ) => {
    const { cache, onSelect } = this.props;

    switch ( method ) {
    case 'type': {
      if ( !newValue || newValue.trim() === '' ) {
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
        textValue: newTextValue || '',
      } );
      if ( this.wikibaseItemInputRef.current ) {
        (this.wikibaseItemInputRef.current as WikibaseItemInput ).setValue( newTextValue );
      }
      break;
    }
    }
  }

  override render() {
    const inputProps = {
      entityId: this.props.value || null,
      onChange: this.handleChange,
      type: 'text',
      value: this.state.textValue,
    };

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

  renderInput = ( inputProps : any ) => {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "value" }] */
    const { value, onChange, ref, ...etc } = inputProps;

    return <LocalizedWikibaseItemInput
      {...etc}
      inputRef={ref}
      onChange={onChange}
      value={this.state.textValue}
      wikibaseItemInputRef={this.wikibaseItemInputRef} />;
  }

  renderSuggestion( data : string ) {
    return <Suggestion entityId={data} />;
  }
}

const mapStateToProps = (state : any) => ( {
  cache: state.LABELDESCRIPTIONS.cache,
} );

const AutocompleteModeConnected = connect( mapStateToProps )( AutocompleteMode );
export default AutocompleteModeConnected;
