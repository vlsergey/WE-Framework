// @flow

import * as ApiUtils from 'core/ApiUtils';
import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { boundMethod } from 'autobind-decorator';
import { connect } from 'react-redux';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import LocalizedWikibaseItemInput from './LocalizedWikibaseItemInput';
import styles from './styles.css';
import Suggestion from './Suggestion';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

type PropsType = {
  cache : any,
  onSelect : ?string => any,
  readOnly : boolean,
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

  wikibaseItemInputRef : ReactObjRef< any > = React.createRef();
  wikidataApi = ApiUtils.getWikidataApi();

  constructor() {
    super( ...arguments );

    const value = this.props.value || null;
    this.state = {
      suggestions: value ? [ value ] : [],
      textValue: value || '',
    };
  }

  @boundMethod
  handleSuggestionsClearRequested() {
    this.setState( { suggestions: [] } );
  }

  @boundMethod
  handleSuggestionsFetchRequested( { value } : { value : string } ) : void {
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

  getSuggestionValue( data : ?string ) : string {
    return data || '';
  }

  @boundMethod
  handleChange(
    event : SyntheticEvent< any >,
    { method, newValue } : { method : string, newValue : ?string }
  ) {
    const { cache, value, onSelect } = this.props;

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
        this.wikibaseItemInputRef.current.setValue( newTextValue );
      }
      break;
    }
    }
  }

  render() {
    return <Autosuggest
      getSuggestionValue={this.getSuggestionValue}
      inputProps={{
        entityId: this.props.value || null,
        onChange: this.handleChange,
        type: 'text',
        value: this.state.textValue,
      }}
      onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      renderInputComponent={this.renderInput}
      renderSuggestion={this.renderSuggestion}
      suggestions={this.state.suggestions}
      theme={styles} />;
  }

  @boundMethod
  renderInput( inputProps : any ) {
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

const mapStateToProps = state => ( {
  cache: state.LABELDESCRIPTIONS.cache,
} );

// $FlowFixMe
const AutocompleteModeConnected = connect( mapStateToProps )( AutocompleteMode );
export default AutocompleteModeConnected;
