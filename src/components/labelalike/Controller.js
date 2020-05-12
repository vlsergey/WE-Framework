// @flow

import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import { connect } from 'react-redux';
import { defaultMemoize } from 'reselect';
import SingleLanguageEditor from './SingleLanguageEditor';

const EMPTY_STRING : string = '';

type PropsType = {
  aliases : LabelalikeType[],
  description : LabelalikeType,
  draftAlias : LabelalikeType,
  label : LabelalikeType,
  language : string,
  onAliasesChange : ( ?( LabelalikeType[] ) ) => any,
  onDescriptionChange : ( ?LabelalikeType ) => any,
  onDraftAliasChange : any => any,
  onLabelChange : ( ?LabelalikeType ) => any,
};

class Controller extends PureComponent<PropsType> {

  aliasValues : ( LabelalikeType[] => string[] ) = defaultMemoize(
    ( aliases : LabelalikeType[] ) => aliases.map( alias => alias.value || '' )
  );

  @boundMethod
  handleLabelChange( newValue : ?string ) {
    this.props.onLabelChange( !newValue || newValue.length === 0
      ? undefined
      : { language: this.props.language, value: newValue } );
  }

  @boundMethod
  handleDescriptionChange( newValue : ?string ) {
    this.props.onDescriptionChange( !newValue || newValue.length === 0
      ? undefined
      : { language: this.props.language, value: newValue } );
  }

  @boundMethod
  handleDraftAliasChange( newValue : ?string ) {
    this.props.onDraftAliasChange( !newValue || newValue.length === 0
      ? undefined
      : { language: this.props.language, value: newValue } );
  }

  @boundMethod
  handleAliasesChange( tags : ?( string[] ) ) {
    const aliases : string[] = ( tags || [] ).filter( item => item.length > 0 );
    this.props.onAliasesChange( aliases.length === 0 ? undefined
      : aliases.map( alias => ( { language: this.props.language, value: alias } ) ) );
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
const EMPTY_OBJECT : any = Object.freeze( {} );

const mapStateToProps = ( state, ownProps ) => {
  const entity = state.entity || EMPTY_OBJECT;
  return {
    language: ownProps.language,

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

// $FlowFixMe
const ControllerConnected = connect( mapStateToProps, mapDispatchToProps )( Controller );
export default ControllerConnected;
