import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { defaultMemoize } from 'reselect';
import SingleLanguageEditor from './SingleLanguageEditor';

const EMPTY_STRING : string = '';

type ExternalProps = {
  language : string,
}

type PropsType = ExternalProps & {
  aliases : LabelalikeType[],
  description : LabelalikeType,
  draftAlias : LabelalikeType,
  label : LabelalikeType,
  onAliasesChange : (aliases: LabelalikeType[] | null ) => any,
  onDescriptionChange : ( descriptions:LabelalikeType | null ) => any,
  onDraftAliasChange : (draft : LabelalikeType | null) => any,
  onLabelChange : ( label: LabelalikeType | null ) => any,
};

class Controller extends PureComponent<PropsType> {

  aliasValues = defaultMemoize(
    ( aliases : LabelalikeType[] ) => aliases.map( alias => alias.value || '' )
  )

  handleLabelChange = ( newValue : string | null ) => {
    this.props.onLabelChange( !newValue || newValue.length === 0
      ? null
      : { language: this.props.language, value: newValue } );
  }

  handleDescriptionChange = ( newValue : string | null ) => {
    this.props.onDescriptionChange( !newValue || newValue.length === 0
      ? null
      : { language: this.props.language, value: newValue } );
  }

  handleDraftAliasChange = ( newValue : string | null ) => {
    this.props.onDraftAliasChange( !newValue || newValue.length === 0
      ? null
      : { language: this.props.language, value: newValue } );
  }

  handleAliasesChange = ( tags : string[] | null ) => {
    const aliases : string[] = ( tags || [] ).filter( item => item.length > 0 );
    this.props.onAliasesChange( aliases.length === 0 ? null
      : aliases.map( alias => ( { language: this.props.language, value: alias } ) ) );
  }

  override render() {
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

const EMPTY_ARRAY : never[] = [];
const EMPTY_OBJECT : any = Object.freeze( {} );

const mapStateToProps = ( state : any, ownProps : ExternalProps ) => {
  const entity = state.entity || EMPTY_OBJECT;
  return {
    language: ownProps.language,

    label: ( entity.labels || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_OBJECT,
    description: ( entity.descriptions || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_OBJECT,
    draftAlias: ( entity.draftAliases || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_OBJECT,
    aliases: ( entity.aliases || EMPTY_OBJECT )[ ownProps.language ] || EMPTY_ARRAY,
  };
};

const mapDispatchToProps = ( dispatch : any, ownProps : ExternalProps ) => ( {
  onLabelChange: ( newValue: LabelalikeType | null ) => dispatch( { type: 'LABELS_CHANGE', language: ownProps.language, newValue } ),
  onDescriptionChange: ( newValue:LabelalikeType | null ) => dispatch( { type: 'DESCRIPTION_CHANGE', language: ownProps.language, newValue } ),
  onDraftAliasChange: ( newValue: LabelalikeType | null) => dispatch( { type: 'DRAFT_ALIAS_CHANGE', language: ownProps.language, newValue } ),
  onAliasesChange:  (newValue : LabelalikeType[] | null )=> dispatch( { type: 'ALIASES_CHANGE', language: ownProps.language, newValue } ),
} );

const ControllerConnected = connect( mapStateToProps, mapDispatchToProps )( Controller );
export default ControllerConnected;
