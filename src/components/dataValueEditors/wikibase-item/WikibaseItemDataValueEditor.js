import * as ApiUtils from 'core/ApiUtils';
import * as Shapes from 'model/Shapes';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { DEFAULT_LANGUAGES } from 'utils/I18nUtils';
import EntityLabel from 'caches/EntityLabel';
import expect from 'expect';
import GoToWikidataButtonCell from './GoToWikidataButtonCell';
import LocalizedWikibaseItemInput from './LocalizedWikibaseItemInput';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './WikibaseItem.css';
import Suggestion from './Suggestion';

const NUMBER_OF_SUGGESTIONS_PER_LANGUAGE = 5;

class WikibaseItemDataValueEditor extends Component {

  static DATATYPE = 'wikibase-item';

  static propTypes = {
    cache: PropTypes.object.isRequired,
    datavalue: PropTypes.shape( Shapes.DataValue ),
    onDataValueChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
    readOnly: PropTypes.bool,
    testSuggestionsProvider: PropTypes.func,
  }

  static defaultProps = {
    readOnly: false,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      suggestions: [ ],
      textValue: '',
      cleanValue: true,
    };
    this.wikidataApi = ApiUtils.getWikidataApi();

    this.handleChange = this.handleChange.bind( this );
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind( this );
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind( this );

    this.renderInput = this.renderInput.bind( this );
    this.renderSuggestion = this.renderSuggestion.bind( this );
  }

  setState( update ) {
    console.log( 'setState( ' + JSON.stringify( update ) + ' )' );
    super.setState( update );
  }

  handleSuggestionsClearRequested() {
    console.log( 'handleSuggestionsClearRequested()' );
    this.setState( { suggestions: [] } );
  }

  handleSuggestionsFetchRequested( { value } ) {
    console.log( 'handleSuggestionsFetchRequested(..., { "' + value + '"})' );
    expect( value ).toBeA( 'string' );

    if ( this.props.testSuggestionsProvider ) {
      this.setState( {
        suggestions: this.props.testSuggestionsProvider( value ),
      } );
    }

    const resultSet = new Set();
    DEFAULT_LANGUAGES.forEach( language => {
      this.wikidataApi.get( {
        action: 'wbsearchentities',
        language,
        limit: NUMBER_OF_SUGGESTIONS_PER_LANGUAGE,
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
    console.log( 'handleChange(..., { "' + method + '", "' + newValue + '"})' );

    switch ( method ) {
    case 'type': {
      this.setState( {
        textValue: newValue,
        cleanValue: false,
      } );
      break;
    }
    default: {
      const { cache, datavalue, onDataValueChange } = this.props;

      onDataValueChange( {
        ...datavalue,
        value: {
          'entity-type': 'item',
          'numeric-id': newValue.substr( 1 ),
          'id': newValue,
        },
        type: 'wikibase-entityid',
      } );

      this.setState( {
        textValue: cache[ newValue ] && cache[ newValue ].label ? cache[ newValue ].label : newValue,
        cleanValue: true,
      } );

      break;
    }
    }
  }

  render() {
    const { datavalue, propertyDescription, readOnly } = this.props;

    const className = styles[ 'wef_datavalue_' + WikibaseItemDataValueEditor.DATATYPE ];
    const entityId = datavalue && datavalue.value && datavalue.value.id ? datavalue.value.id : null;
    const params = {
      type: 'text',
    };

    if ( readOnly ) {
      return <td className={className + ' ' + styles[ 'wef_datavalue_' + WikibaseItemDataValueEditor.DATATYPE + '_readonly' ]} colSpan={12}>
        { entityId && <a href={'https://www.wikidata.org/wiki/' + entityId}>
          <EntityLabel entityId={entityId} />
        </a> }
      </td>;
    }

    if ( propertyDescription.regexp ) {
      params.pattern = propertyDescription.regexp;
    }

    params.cleanValue = this.state.cleanValue;
    params.value = this.state.textValue;
    params.onChange = this.handleChange;

    console.log( 'render with value "' + params.value + '" and suggestions: ' + JSON.stringify( this.state.suggestions ) );
    return <React.Fragment>
      <td className={className} colSpan={11}>
        <Autosuggest
          alwaysRenderSuggestions={this.state.componentFocused}
          getSuggestionValue={this.getSuggestionValue}
          inputProps={params}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          renderInputComponent={this.renderInput}
          renderSuggestion={this.renderSuggestion}
          suggestions={this.state.suggestions}
          theme={styles} />
      </td>
      <GoToWikidataButtonCell entityId={entityId} />
    </React.Fragment>;
  }

  renderInput( inputProps ) {
    const { datavalue } = this.props;
    const { value, onChange, ref, ...etc } = inputProps;
    console.log( 'renderInput() with datavalue ' + JSON.stringify( datavalue ) + ' value "' + value + '"' );

    if ( datavalue && datavalue.value && datavalue.value.id ) {
      return <LocalizedWikibaseItemInput
        {...etc}
        entityId={datavalue.value.id}
        inputRef={ref}
        onChange={onChange}
        value={this.state.textValue} />;
    } else {
      return <LocalizedWikibaseItemInput
        {...etc}
        inputRef={ref}
        onChange={onChange}
        value={this.state.textValue} />;
    }
  }

  renderSuggestion( data ) {
    return <Suggestion entityId={data} />;
  }
}

const mapStateToProps = state => ( {
  cache: state.LABELDESCRIPTIONS.cache,
} );

const WikibaseItemDataValueEditorConnected = connect( mapStateToProps )( WikibaseItemDataValueEditor );
export default WikibaseItemDataValueEditorConnected;
