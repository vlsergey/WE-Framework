import React, {PureComponent} from 'react';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import ParentTypesProvider from '../../../caches/ParentTypesProvider';
import {onNewElementClick} from '../../../core/edit';
import PropertyDescription from '../../../core/PropertyDescription';
import allEditorTemplates from '../../../editors';
import {EditorDefType} from '../../../editors/EditorDefModel';
import ButtonCell from '../../ButtonCell';
import styles from './CreateNewButtonCell.css';
import i18n from './i18n';

interface PropsType {
  disabled?: boolean;
  onCreate: (entityId: string) => any;
  propertyDescription: PropertyDescription;
}

export default class CreateNewButtonCell extends PureComponent<PropsType> {

  override render () {
    const {disabled, propertyDescription} = this.props;
    const instanceOf = (propertyDescription.valueTypeConstraint || {}).instanceOf || null;

    if (disabled) {
      return <ButtonCell
        disabled
        icon={'ui-icon-pencil'}
        label={i18n.buttonLabelCreateNew} />;
    }

    return <ButtonCell
      icon={'ui-icon-pencil'}
      label={i18n.buttonLabelCreateNew}>
      {(children: any) =>
        <Popup
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

interface PopupContentPropsType {
  instanceOf?: string[] | null;
  onCreate: (entityId: string) => any;
}

class PopupContent extends PureComponent<PopupContentPropsType> {

  override render () {
    const {instanceOf} = this.props;
    const editorTemplates = allEditorTemplates
      .filter(template => !!template.newEntityInstanceOf);

    return <>
      {i18n.paragraphTextSelectEditorForCreate}
      <ParentTypesProvider typeIds={instanceOf || []}>{ typeIds => <EditorButtons
        editorTemplates={editorTemplates}
        onCreate={this.props.onCreate}
        typeIds={new Set(Object.values(typeIds || {}).flatMap(array => array))} />}
      </ParentTypesProvider>
    </>;
  }
}

interface EditorButtonsPropsType {
  editorTemplates: EditorDefType[];
  onCreate: (entityId: string) => any;
  typeIds: Set< string >;
}

class EditorButtons extends PureComponent<EditorButtonsPropsType> {

  handleClickF = (editorTemplate: EditorDefType) => () => onNewElementClick(editorTemplate, editorTemplate.newEntityInstanceOf)
    .then(entityId => this.props.onCreate(entityId));

  override render () {
    const {typeIds, editorTemplates} = this.props;

    return editorTemplates.map(editorTemplate => {
      const recommendTemplate = (editorTemplate.recommendedClasses || [])
        .some(typeId => typeIds.has(typeId));

      return <button className={recommendTemplate
        ? styles.button + ' ' + styles.buttonRecommend
        : styles.button + ' ' + styles.buttonUsual}
      key={editorTemplate.id}
      onClick={this.handleClickF(editorTemplate)}
      title={editorTemplate.description}>
        {editorTemplate.linkText}
      </button>;
    });
  }

}
