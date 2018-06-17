import { aliasesFromEntityByLanguage,
  aliasValues,
  descriptionFromEntityByLanguage,
  descriptionValue,
  labelFromEntityByLanguage,
  labelValue } from '../../core/selectors.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleLanguageEditor from './SingleLanguageEditor';

class Controller extends Component {

  static propTypes = {
    label: PropTypes.object,
    description: PropTypes.object,
    aliases: PropTypes.arrayOf( PropTypes.object ),

    onLabelChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onAliasesChange: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );
    this.state = {
      language: mw.config.get( 'wgContentLanguage' ),
    };

    this.handleLabelChange = this.handleLabelChange.bind( this );
    this.handleDescriptionChange = this.handleDescriptionChange.bind( this );
    this.handleAliasesChange = this.handleAliasesChange.bind( this );
  }

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

  handleAliasesChange( tags ) {
    const aliases = ( tags || [] ).filter( item => item.length > 0 );
    this.props.onAliasesChange( aliases.length === 0
      ? undefined
      : aliases.map( alias => ( { language: this.state.language, value: alias } ) ) );
  }

  render() {
    const { label, description, aliases } = this.props;

    const _labelValue = labelValue( label );
    const _descriptionValue = descriptionValue( description );
    const _aliasValues = aliasValues( aliases );

    return <SingleLanguageEditor
      aliases={_aliasValues} description={_descriptionValue} label={_labelValue}
      onAliasesChange={this.handleAliasesChange} onDescriptionChange={this.handleDescriptionChange} onLabelChange={this.handleLabelChange} />;
  }

}

const mapStateToProps = ( state, ownProps ) => ( {
  label: labelFromEntityByLanguage( state.entity, ownProps.language ),
  description: descriptionFromEntityByLanguage ( state.entity, ownProps.language ),
  aliases: aliasesFromEntityByLanguage( state.entity, ownProps.language ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onLabelChange: ( newValue ) => dispatch( { type: 'LABELS_CHANGE', language: ownProps.language, newValue } ),
  onDescriptionChange: ( newValue ) => dispatch( { type: 'DESCRIPTION_CHANGE', language: ownProps.language, newValue } ),
  onAliasesChange: ( newValue ) => dispatch( { type: 'ALIASES_CHANGE', language: ownProps.language, newValue } ),
} );

const ControllerConnected = connect( mapStateToProps, mapDispatchToProps )( Controller );
export default ControllerConnected;
