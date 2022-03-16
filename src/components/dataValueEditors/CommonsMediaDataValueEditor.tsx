import React, {ChangeEvent, PureComponent} from 'react';
import Autosuggest from 'react-autosuggest';

import * as ApiUtils from '../../core/ApiUtils';
import PropertyDescription from '../../core/PropertyDescription';
import MediawikiPreview from '../MediawikiPreview';
import styles from './CommonsMediaDataValueEditor.css';

interface PropsType {
  datavalue: StringDataValue | null;
  onDataValueChange: (dataValue: StringDataValue | null) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
}

interface StateType {
  suggestions: string[];
}

const EMPTY_OBJECT: any = Object.freeze({});

const getSuggestionValue = (data: string): string => data || '';

export default class CommonsMediaDataValueEditor
  extends PureComponent<PropsType, StateType> {

  static DATATYPE = 'commonsMedia';

  commonsApi = ApiUtils.getCommonsApi();

  override state = {
    suggestions: [],
  };

  handleSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  handleSuggestionsFetchRequested = ({value}: {value: string | null}) => {
    this.commonsApi.post({
      action: 'query',
      list: 'prefixsearch',
      psnamespace: '6',
      pslimit: '10',
      pssearch: value,
      format: 'json',
    }).then((result: any) => {
      const suggestions = result.query.prefixsearch.map((p: any) => p.title.substring('File:'.length));
      this.setState({suggestions});
    });
  };

  handleChange = (
    _event: ChangeEvent< any >,
    {newValue}: {newValue: string | null}
  ) => { this.handleValueChange(newValue); };

  handleValueChange = (value: string | null) => {
    const {datavalue, onDataValueChange} = this.props;

    if (value) {
      onDataValueChange({
        ...datavalue,
        type: 'string',
        value,
      });
    } else {
      onDataValueChange(null);
    }
  };

  override render () {
    const {datavalue, propertyDescription, readOnly} = this.props;
    const className = styles.wef_datavalue_commonsMedia;

    if (readOnly) {
      if (datavalue && datavalue.value) {
        return <td className={className} colSpan={12}>
          <a
            href={'https://commons.wikimedia.org/wiki/File:' + datavalue.value}
            rel="noopener noreferrer"
            target="_blank">
            {datavalue.value}
          </a>
        </td>;
      }
      return null;
    }

    return <td className={className} colSpan={12}>
      <Autosuggest
        getSuggestionValue={getSuggestionValue}
        inputProps={{
          type: 'text',
          pattern: propertyDescription.regexp || undefined,
          value: (datavalue || EMPTY_OBJECT).value || '',
          onChange: this.handleChange
        }}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        theme={styles} />
    </td>;
  }

  renderSuggestion (this: void, data: string): any {
    return <div className={styles.suggestionContent}>
      <div className={styles.suggestionContentPreviewOuter}>
        <div className={styles.suggestionContentPreviewInner}>
          <MediawikiPreview spinnerSize={45} wikitext={'[[File:' + data + '|50x50px|frameless|link=]]'} />
        </div>
      </div>
      <span className={styles.suggestionContentText}>&nbsp;&nbsp;{data}</span>
    </div>;
  }

}
