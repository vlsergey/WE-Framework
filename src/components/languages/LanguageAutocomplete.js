import * as selectors from './selectors';
import { DEFAULT_LANGUAGES, LANGUAGE_TITLES } from 'utils/I18nUtils';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { defaultMemoize } from 'reselect';
import PropTypes from 'prop-types';
import styles from './LanguageAutocomplete.css';

export default class LanguageAutocomplete extends Component {

  static propTypes = {
    provided: PropTypes.arrayOf( PropTypes.string ),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    provided: [],
    value: DEFAULT_LANGUAGES[ 0 ],
  }

  constructor() {
    super( ...arguments );

    this.getEmptySuggestions = selectors.createEmptySuggestionsSelector();
    /* we don't need to immediately update component when emptySuggestions
     * changed -- so it is not in state */
    this.emptySuggestions = this.getEmptySuggestions( this.props.provided );

    this.state = {
      value: this.props.value,
      suggestions: this.emptySuggestions,
    };

    this.handleChange = this.handleChange.bind( this );
    this.paramsF = defaultMemoize( value => ( {
      autoComplete: 'false',
      className: styles[ 'wef_languageSelect' ],
      onChange: this.handleChange,
      type: 'text',
      value,
    } ) );

    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind( this );
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind( this );
    this.renderSuggestion = this.renderSuggestion.bind( this );
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.provided !== this.props.provided ) {
      this.emptySuggestions = this.getEmptySuggestions( this.props.provided );
    }
    if ( prevProps.value !== this.props.value ) {
      this.setState( {
        value: this.props.value,
      } );
    }
  }

  handleSuggestionsClearRequested() {
    this.setState( { suggestions: this.emptySuggestions } );
  }

  handleSuggestionsFetchRequested( { value } ) {
    const added = new Set();
    const result = [ ...DEFAULT_LANGUAGES ];

    const codeNotYetIncluded = code => !added.has( code );
    const add = code => { added.add( code ); result.push( code ); };

    // iterate over codes first
    Object.keys( LANGUAGE_TITLES )
      .filter( code => codeNotYetIncluded( code ) )
      .filter( code => code.startsWith( value ) )
      .forEach( add );
    Object.keys( LANGUAGE_TITLES )
      .filter( code => codeNotYetIncluded( code ) )
      .filter( code => code.includes( value ) )
      .forEach( add );
    Object.entries( LANGUAGE_TITLES )
      .filter( ( [ code, title ] ) => codeNotYetIncluded( code ) && !!title && title.includes( value ) )
      .forEach( ( [ code ] ) => add( code ) );

    this.setState( { suggestions: result } );
  }

  getSuggestionValue( data ) {
    return data ? data : '';
  }

  handleChange( event, { newValue } ) {
    this.setState( {
      value: newValue,
    } );
    if ( !!newValue
        // should be correct code: either in known languages or in provided array
        && ( LANGUAGE_TITLES[ newValue ] || this.props.provided.indexOf( newValue ) !== -1 ) ) {
      this.props.onChange( newValue );
    }
  }

  render() {
    const params = this.paramsF( this.state.value );

    return <Autosuggest
      getSuggestionValue={this.getSuggestionValue}
      inputProps={params}
      onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      renderSuggestion={this.renderSuggestion}
      suggestions={this.state.suggestions}
      theme={styles} />;
  }

  renderSuggestion( data, { query } ) {
    const string = data + ( LANGUAGE_TITLES[ data ] ? ' — ' + LANGUAGE_TITLES[ data ] : '' );
    const spans = [];
    string.split( query ).forEach( ( substr, index, array ) => {
      if ( substr ) {
        spans.push( <span key={'i' + index + 'n'}>{substr}</span> );
      }
      if ( index !== array.length - 1 ) {
        spans.push( <span className={styles.highlight} key={'i' + index + 'b'}>{query}</span> );
      }
    } );

    return <div className={styles.suggestionContent}>
      <span className={styles.suggestionContentText + ( this.props.provided.indexOf( data ) !== -1 ? ' ' + styles.provided : '' )}>
        { spans }
      </span>
    </div>;
  }

}
