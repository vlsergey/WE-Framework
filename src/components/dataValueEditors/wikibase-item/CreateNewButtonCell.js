// @flow

import React, { PureComponent } from 'react';
import allEditorTemplates from 'editors';
import { boundMethod } from 'autobind-decorator';
import ButtonCell from 'components/ButtonCell';
import type { EditorDefType } from 'editors/EditorDefModel';
import i18n from './i18n';
import { onNewElementClick } from 'core/edit';
import ParentTypesProvider from 'caches/ParentTypesProvider';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import PropertyDescription from 'core/PropertyDescription';
import styles from './CreateNewButtonCell.css';
import { values } from 'utils/ObjectUtils';

type PropsType = {
  disabled : boolean,
  onCreate : string => any,
  propertyDescription : PropertyDescription,
};

export default class CreateNewButtonCell extends PureComponent<PropsType> {

  render() {
    const { disabled, propertyDescription } = this.props;
    const instanceOf = ( propertyDescription.valueTypeConstraint || {} ).instanceOf || null;

    if ( disabled ) {
      return <ButtonCell
        disabled
        icon={'ui-icon-pencil'}
        label={i18n.buttonLabelCreateNew} />;
    }

    return <ButtonCell
      icon={'ui-icon-pencil'}
      label={i18n.buttonLabelCreateNew}>
      {children =>
        <Popup
          className={styles.createNewPopup}
          hoverable
          on="click"
          position="bottom right"
          trigger={children}
          wide={false}>
          <PopupContent
            instanceOf={instanceOf}
            onCreate={this.props.onCreate} />
        </Popup>}</ButtonCell>;
  }

}

type PopupContentPropsType = {
  instanceOf? : ?( string[] ),
  onCreate : string => any,
};

class PopupContent extends PureComponent<PopupContentPropsType> {

  render() {
    const { instanceOf } = this.props;
    const editorTemplates = allEditorTemplates
      .filter( template => !!template.newEntityInstanceOf );

    return <>
      {i18n.paragraphTextSelectEditorForCreate}
      <ParentTypesProvider typeIds={instanceOf || []}>{ typeIds => <EditorButtons
        editorTemplates={editorTemplates}
        onCreate={this.props.onCreate}
        typeIds={new Set( values( typeIds || {} ).flatMap( array => array ) )} />}
      </ParentTypesProvider>
    </>;
  }
}

type EditorButtonsPropsType = {
  editorTemplates : EditorDefType[],
  onCreate : string => any,
  typeIds : Set< string >,
};

class EditorButtons extends PureComponent<EditorButtonsPropsType> {

  @boundMethod
  handleClickF( editorTemplate ) {
    return () => onNewElementClick( editorTemplate, editorTemplate.newEntityInstanceOf )
      .then( entityId => this.props.onCreate( entityId ) );
  }

  render() {
    const { typeIds, editorTemplates } = this.props;

    return editorTemplates.map( editorTemplate => {
      const recommendTemplate = ( editorTemplate.recommendedClasses || [] )
        .some( typeId => typeIds.has( typeId ) );

      return <button className={recommendTemplate
        ? styles.button + ' ' + styles.buttonRecommend
        : styles.button + ' ' + styles.buttonUsual}
      key={editorTemplate.id}
      onClick={this.handleClickF( editorTemplate )}
      title={editorTemplate.description}>
        {editorTemplate.linkText}
      </button>;
    } );
  }

}
