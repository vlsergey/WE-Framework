import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultMemoize } from 'reselect';
import PropTypes from 'prop-types';
import SingleLanguageEditor from './SingleLanguageEditor';

const EMPTY_STRING = '';

class Controller extends Component {

  static propTypes = {
    label: PropTypes.object,
    description: PropTypes.object,
    draftAlias: PropTypes.object,
    aliases: PropTypes.arrayOf( PropTypes.object ),

    onLabelChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onDraftAliasChange: PropTypes.func.isRequired,
    onAliasesChange: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );
    this.state = {
      language: mw.config.get( 'wgContentLanguage' ),
    };

    this.handleLabelChange = this.handleLabelChange.bind( this );
    this.handleDescriptionChange = this.handleDescriptionChange.bind( this );
    this.handleDraftAliasChange = this.handleDraftAliasChange.bind( this );
    this.handleAliasesChange = this.handleAliasesChange.bind( this );
  }

  aliasValues = defaultMemoize(
    aliases => aliases.map( alias => alias.value || '' )
  );

  handleLabelChange( newValue ) {
    this.props.onLabelChange( !newValue || newValue.length === 0
      ? undefined
      : { language: this.state.language, value: newValue } );
  }

  handleDescriptionChange( newValue ) {
    this.props.onDescriptionChange( !newValue || newValue.length === 0
      ? undefined
      : { language: this.state.language, value: newValue } );
  }

  handleDraftAliasChange( newValue ) {
    this.props.onDraftAliasChange( !newValue || newValue.length === 0
      ? undefined
      : { language: this.state.language, value: newValue } );
  }

  handleAliasesChange( tags ) {
    const aliases = ( tags || [] ).filter( item => item.length > 0 );
    this.props.onAliasesChange( aliases.length === 0
      ? undefined
      : aliases.map( alias => ( { language: this.state.language, value: alias } ) ) );
  }

  render() {
    const { label, description, draftAlias, aliases } = this.props;

    return <SingleLanguageEditor
      aliases={this.aliasValues( aliases )}
      description={description.value || EMPTY_STRING}
      draftAlias={draftAlias.value || EMPTY_STRING}
      label={label.value || EMPTY_STRING}
      onAliasesChange={this.handleAliasesChange}
      onDescriptionChange={this.handleDescriptionChange}
      onDraftAliasChange={this.handleDraftAliasChange}
      onLabelChange={this.handleLabelChange} />;
  }

}

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const mapStateToProps = ( state, ownProps ) => {
  const entity = state.entity || EMPTY_OBJECT;
  return {
    label: ( entity.labels || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_OBJECT,
    description: ( entity.descriptions || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_OBJECT,
    draftAlias: ( entity.draftAliases || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_OBJECT,
    aliases: ( entity.aliases || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_ARRAY,
  };
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onLabelChange: newValue => dispatch( { type: 'LABELS_CHANGE', language: ownProps.language, newValue } ),
  onDescriptionChange: newValue => dispatch( { type: 'DESCRIPTION_CHANGE', language: ownProps.language, newValue } ),
  onDraftAliasChange: newValue => dispatch( { type: 'DRAFT_ALIAS_CHANGE', language: ownProps.language, newValue } ),
  onAliasesChange: newValue => dispatch( { type: 'ALIASES_CHANGE', language: ownProps.language, newValue } ),
} );

const ControllerConnected = connect( mapStateToProps, mapDispatchToProps )( Controller );
export default ControllerConnected;
