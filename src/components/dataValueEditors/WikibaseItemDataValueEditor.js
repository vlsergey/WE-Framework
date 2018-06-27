import * as ApiUtils from 'core/ApiUtils';
import * as Shapes from 'model/Shapes';
import AbstractStringBasedDataValueEditor from './AbstractStringBasedDataValueEditor';
import Autosuggest from 'react-autosuggest';
import dataTypeStyles from './WikibaseItem.css';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import EntityDescription from 'components/EntityDescription';
import EntityLabel from 'components/EntityLabel';
import expect from 'expect';
import MediawikiPreview from 'components/MediawikiPreview';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import React from 'react';
import styles from 'components/core.css';

export default class WikibaseItemDataValueEditor extends AbstractStringBasedDataValueEditor {

  static DATATYPE = 'wikibase-item';

  static propTypes = {
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  }

  constructor() {
    super( ...arguments );

    this.wikidataApi = ApiUtils.getWikidataApi();
    this.state = {
      dirtyValue: this.props.datavalue && this.props.datavalue.value && this.props.datavalue.value.id
        ? this.props.datavalue.value.id
        : '',
      focused: false,
      suggestions: [],
    };

    this.handleBlur = this.handleBlur.bind( this );
    this.handleFocus = this.handleFocus.bind( this );

    this.handleChange = this.handleChange.bind( this );
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind( this );
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind( this );
  }

  handleSuggestionsClearRequested() {
    if ( this.props.datavalue
      && this.props.datavalue.value
      && this.props.datavalue.value.id ) {
      this.setState( { suggestions: [ this.props.datavalue.value.id ] } );
    } else {
      this.setState( { suggestions: [] } );
    }
  }

  handleSuggestionsFetchRequested( { value } ) {
    expect( value ).toBeA( 'string' );

    const resultSet = new Set();
    DEFAULT_LANGUAGES.forEach( language => {
      this.wikidataApi.get( {
        action: 'wbsearchentities',
        language,
        limit: 10,
        search: value,
      } ).then( result => {
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
    console.log( 'handleChange' );
    console.log( event );
    console.log( method );
    console.log( newValue );

    const { datavalue, onDataValueChange } = this.props;
    this.setState( {
      dirtyValue: newValue,
    } );

    if ( !/^Q\d+$/.test( newValue ) ) {
      onDataValueChange( {
        ...datavalue,
        value: null,
        type: 'wikibase-entityid',
      } );
      return;
    } else {
      onDataValueChange( {
        ...datavalue,
        value: {
          ...datavalue.value,
          'entity-type': 'item',
          'numeric-id': newValue.substr( 1 ),
          'id': newValue,
        },
        type: 'wikibase-entityid',
      } );
    }
  }

  handleFocus( event ) {
    console.log( 'handleFocus' );
    console.log( event );
    console.log( event.target );
    console.log( this.state );
    this.setState( {
      focused: true,
    } );
  }

  handleBlur( event ) {
    console.log( 'handleBlur' );
    console.log( event );
    console.log( event.target );
    console.log( this.state );
    this.setState( {
      focused: false,
    } );
  }

  render() {
    console.log( 'render' );
    console.log( this.state );

    const { datavalue, propertyDescription } = this.props;

    const params = {
      type: 'text',
      className: styles[ 'wef_' + WikibaseItemDataValueEditor.DATATYPE ],
    };

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.onChange = this.handleChange;

    if ( this.state.focused ) {
      params.value = this.state.dirtyValue || '';
    } else if ( datavalue && datavalue.value && datavalue.value.id ) {
      params.value = datavalue.value.id;
    } else {
      params.value = '';
    }

    return <td colSpan={12} onBlur={this.handleBlur} onFocus={this.handleFocus}>
      <Autosuggest
        getSuggestionValue={this.getSuggestionValue}
        inputProps={params}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        theme={dataTypeStyles} />
    </td>;
  }

  renderSuggestion( data ) {
    return <table className={dataTypeStyles.suggestionContainer}>
      <tbody>
        <tr>
          <td className={dataTypeStyles.suggestionImage}>
            <MediawikiPreview spinnerSize={35} wikitext={'{{#if:{{#property:P18|from=' + data + '}}|[[File:{{#property:P18|from=' + data + '}}|45x45px]]}}'} />
          </td>
          <td className={dataTypeStyles.suggestionText}>
            <span className={dataTypeStyles.suggestionLabel}>&nbsp;&nbsp;<EntityLabel entityId={data} /></span><br />
            <span className={dataTypeStyles.suggestionDescription}>&nbsp;&nbsp;<EntityDescription entityId={data} /></span>
          </td>
        </tr>
      </tbody>
    </table>;
  }

}
