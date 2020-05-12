// @flow

import * as selectors from './selectors';
import { DEFAULT_LANGUAGES, LANGUAGE_TITLES } from 'utils/I18nUtils';
import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { boundMethod } from 'autobind-decorator';
import { defaultMemoize } from 'reselect';
import styles from './LanguageAutocomplete.css';

type PropsType = {
  onChange : string => any,
  provided : string[],
  value : string,
};

type StateType = {
  suggestions : string[],
  value : string,
};

export default class LanguageAutocomplete
  extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    provided: [],
    value: DEFAULT_LANGUAGES[ 0 ],
  };

  emptySuggestions : string[];
  getEmptySuggestions : string[] => string[];
  inputPropsF : string => any;

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

    this.inputPropsF = defaultMemoize( value => ( {
      autoComplete: 'false',
      className: styles.wef_languageSelect,
      onChange: this.handleChange,
      type: 'text',
      value,
    } ) );
  }

  componentDidUpdate( prevProps : PropsType ) {
    if ( prevProps.provided !== this.props.provided ) {
      this.emptySuggestions = this.getEmptySuggestions( this.props.provided );
    }
    if ( prevProps.value !== this.props.value ) {
      this.setState( {
        value: this.props.value,
      } );
    }
  }

  @boundMethod
  handleSuggestionsClearRequested() {
    this.setState( { suggestions: this.emptySuggestions } );
  }

  @boundMethod
  handleSuggestionsFetchRequested( { value } : { value : string } ) : void {
    const result = [ ...DEFAULT_LANGUAGES ];
    const added = new Set( result );

    const codeNotYetIncluded = code => !added.has( code );
    const add = code => { added.add( code ); result.push( code ); };

    // iterate over codes first
    [ ...LANGUAGE_TITLES.keys() ]
      .filter( codeNotYetIncluded )
      .filter( code => code.startsWith( value ) )
      .forEach( add );
    [ ...LANGUAGE_TITLES.keys() ]
      .filter( codeNotYetIncluded )
      .filter( code => code.includes( value ) )
      .forEach( add );
    [ ...LANGUAGE_TITLES.entries() ]
      .filter( ( [ code, title ] ) => codeNotYetIncluded( code ) && !!title && title.includes( value ) )
      .forEach( ( [ code ] ) => add( code ) );

    this.setState( { suggestions: result } );
  }

  getSuggestionValue( data : ?string ) {
    return data ? data : '';
  }

  @boundMethod
  handleChange(
    event : SyntheticEvent< any >,
    { newValue } : { newValue : ?string }
  ) {
    this.setState( {
      value: newValue || '',
    } );
    if ( !!newValue
        // should be correct code: either in known languages or in provided array
        && ( LANGUAGE_TITLES.has( newValue ) || this.props.provided.indexOf( newValue ) !== -1 ) ) {
      this.props.onChange( newValue );
    }
  }

  render() {
    const inputProps = this.inputPropsF( this.state.value );

    return <Autosuggest
      getSuggestionValue={this.getSuggestionValue}
      inputProps={inputProps}
      onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      renderSuggestion={this.renderSuggestion}
      suggestions={this.state.suggestions}
      theme={styles} />;
  }

  @boundMethod
  renderSuggestion( data : string, { query } : {query : string} ) {
    const string = data + ( LANGUAGE_TITLES.has( data ) ? ' — ' + ( LANGUAGE_TITLES.get( data ) || '' ) : '' );
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
