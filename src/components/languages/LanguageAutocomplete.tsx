import React, {ChangeEvent, PureComponent} from 'react';
import Autosuggest from 'react-autosuggest';
import {defaultMemoize} from 'reselect';

import {DEFAULT_LANGUAGES, getLanguageTitles} from '../../utils/I18nUtils';
import styles from './LanguageAutocomplete.css';
import * as selectors from './selectors';

interface PropsType {
  onChange: (value: string) => any;
  provided: string[];
  value: string;
}

interface StateType {
  suggestions: string[];
  value: string;
}

const getSuggestionValue = (data: string | null) => data || '';

export default class LanguageAutocomplete
  extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    provided: [],
    value: DEFAULT_LANGUAGES[0],
  };

  languageTitles = getLanguageTitles();

  emptySuggestions: string[];
  getEmptySuggestions: (_: string[]) => string[];
  inputPropsF: (_: string) => any;

  constructor (props: PropsType) {
    super(props);

    this.getEmptySuggestions = selectors.createEmptySuggestionsSelector();
    /* we don't need to immediately update component when emptySuggestions
     * changed -- so it is not in state */
    this.emptySuggestions = this.getEmptySuggestions(this.props.provided);

    this.state = {
      value: this.props.value,
      suggestions: this.emptySuggestions,
    };

    this.inputPropsF = defaultMemoize(value => ({
      autoComplete: 'false',
      onChange: this.handleChange,
      type: 'text',
      value,
    }));
  }

  override componentDidUpdate (prevProps: PropsType) {
    if (prevProps.provided !== this.props.provided) {
      this.emptySuggestions = this.getEmptySuggestions(this.props.provided);
    }
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  handleSuggestionsClearRequested = () =>
  { this.setState({suggestions: this.emptySuggestions}); };

  handleSuggestionsFetchRequested = ({value}: {value: string}) => {
    const result = [...DEFAULT_LANGUAGES];
    const added = new Set(result);

    const codeNotYetIncluded = (code: string) => !added.has(code);
    const add = (code: string) => { added.add(code); result.push(code); };

    // iterate over codes first
    [...this.languageTitles.keys()]
      .filter(codeNotYetIncluded)
      .filter(code => code.startsWith(value))
      .forEach(add);
    [...this.languageTitles.keys()]
      .filter(codeNotYetIncluded)
      .filter(code => code.includes(value))
      .forEach(add);
    [...this.languageTitles.entries()]
      .filter(([code, title]) => codeNotYetIncluded(code) && !!title && title.includes(value))
      .forEach(([code]) => { add(code); });

    this.setState({suggestions: result});
  };

  handleChange = (
    _: ChangeEvent< any >,
    {newValue}: {newValue: string | null}
  ) => {
    this.setState({
      value: newValue || '',
    });
    if (!!newValue
        // should be correct code: either in known languages or in provided array
        && (this.languageTitles.has(newValue) || this.props.provided.includes(newValue))) {
      this.props.onChange(newValue);
    }
  };

  override render () {
    const inputProps = this.inputPropsF(this.state.value);

    return <Autosuggest
      getSuggestionValue={getSuggestionValue}
      inputProps={inputProps}
      onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
      onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      renderSuggestion={this.renderSuggestion}
      suggestions={this.state.suggestions}
      theme={styles} />;
  }

  renderSuggestion = (data: string, {query}: {query: string}) => {
    const string = data + (this.languageTitles.has(data) ? ' — ' + (this.languageTitles.get(data) || '') : '');
    const spans: JSX.Element[] = [];
    string.split(query).forEach((substr, index, array) => {
      if (substr) {
        spans.push(<span key={'i' + index + 'n'}>{substr}</span>);
      }
      if (index !== array.length - 1) {
        spans.push(<span className={styles.highlight} key={'i' + index + 'b'}>{query}</span>);
      }
    });

    return <div className={styles.suggestionContent}>
      <span className={styles.suggestionContentText + (this.props.provided.includes(data) ? ' ' + styles.provided : '')}>
        { spans }
      </span>
    </div>;
  };

}
