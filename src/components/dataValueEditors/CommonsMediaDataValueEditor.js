// @flow

import * as ApiUtils from 'core/ApiUtils';
import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { boundMethod } from 'autobind-decorator';
import MediawikiPreview from 'components/MediawikiPreview';
import PropertyDescription from 'core/PropertyDescription';
import styles from './CommonsMediaDataValueEditor.css';

type PropsType = {
  datavalue? : DataValueType,
  onDataValueChange : ?DataValueType => any,
  propertyDescription : PropertyDescription,
  readOnly? : boolean,
};

type StateType = {
  suggestions : string[],
};

const EMPTY_OBJECT : any = Object.freeze( {} );

export default class CommonsMediaDataValueEditor
  extends PureComponent<PropsType, StateType> {

  static DATATYPE = 'commonsMedia';
  static DATAVALUE_TYPE : string = 'string';

  commonsApi : any;

  constructor() {
    super( ...arguments );

    this.commonsApi = ApiUtils.getCommonsApi();
    this.state = {
      suggestions: [],
    };
  }

  @boundMethod
  handleSuggestionsClearRequested() {
    this.setState( { suggestions: [] } );
  }

  @boundMethod
  handleSuggestionsFetchRequested( { value } : { value : ?string } ) {
    this.commonsApi.post( {
      action: 'query',
      list: 'prefixsearch',
      psnamespace: '6',
      pslimit: '10',
      pssearch: value,
      format: 'json',
    } ).then( result => {
      const suggestions = result.query.prefixsearch.map( p => p.title.substring( 'File:'.length ) );
      this.setState( { suggestions } );
    } );
  }

  getSuggestionValue( data : string ) : string {
    return data ? data : '';
  }

  @boundMethod
  handleChange(
    event : SyntheticEvent< any >,
    { newValue } : { newValue : ?string }
  ) {
    this.handleValueChange( newValue );
  }

  @boundMethod
  handleValueChange( value : ?string ) {
    const { datavalue, onDataValueChange } = this.props;

    if ( value ) {
      onDataValueChange( {
        ...datavalue,
        type: CommonsMediaDataValueEditor.DATAVALUE_TYPE,
        value,
      } );
    } else {
      onDataValueChange( null );
    }
  }

  render() {
    const { datavalue, propertyDescription, readOnly } = this.props;
    const className = styles[ 'wef_datavalue_' + CommonsMediaDataValueEditor.DATATYPE ];

    if ( readOnly ) {
      if ( datavalue && datavalue.value ) {
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
        getSuggestionValue={this.getSuggestionValue}
        inputProps={{
          type: 'text',
          pattern: propertyDescription.regexp || undefined,
          value: ( datavalue || EMPTY_OBJECT ).value || '',
          onChange: this.handleChange
        }}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        theme={styles} />
    </td>;
  }

  renderSuggestion( data : string ) : any {
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
