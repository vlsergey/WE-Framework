// @flow

import React, { PureComponent } from 'react';
import allEditorTemplates from 'editors';
import ButtonCell from 'components/ButtonCell';
import i18n from './i18n';
import { onNewElementClick } from 'core/edit';
import ParentTypesProvider from 'caches/ParentTypesProvider';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './CreateNewButtonCell.css';

export default class CreateNewButtonCell extends PureComponent {

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  };

  constructor() {
    super( ...arguments );
  }

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
      label={i18n.buttonLabelCreateNew}
      onClick={this.handleClick}>
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

class PopupContent extends PureComponent {

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    instanceOf: PropTypes.arrayOf( PropTypes.string ),
  };

  constructor() {
    super( ...arguments );
  }

  render() {
    const { instanceOf } = this.props;
    const editorTemplates = allEditorTemplates
      .filter( template => !!template.newEntityInstanceOf );

    return <React.Fragment>
      {i18n.paragraphTextSelectEditorForCreate}
      <ParentTypesProvider typeIds={instanceOf || []}>{ typeIds => <EditorButtons
        editorTemplates={editorTemplates}
        onCreate={this.props.onCreate}
        typeIds={new Set( Object.values( typeIds || {} ).flatMap( array => array ) )} />}
      </ParentTypesProvider>
    </React.Fragment>;
  }
}

class EditorButtons extends PureComponent {

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    editorTemplates: PropTypes.arrayOf( PropTypes.object ),
    typeIds: PropTypes.instanceOf( Set ),
  };

  handleClickF( editorTemplate ) {
    return () => onNewElementClick( editorTemplate, editorTemplate.newEntityInstanceOf )
      .then( entityId => this.props.onCreate( entityId ) );
  }

  render() {
    const { typeIds, editorTemplates } = this.props;
    const handleClickF = this.handleClickF.bind( this );

    return editorTemplates.map( editorTemplate => {
      const recommendTemplate = ( editorTemplate.recommendedClasses || [] )
        .some( typeId => typeIds.has( typeId ) );

      return <button className={recommendTemplate
        ? styles.button + ' ' + styles.buttonRecommend
        : styles.button + ' ' + styles.buttonUsual}
      key={editorTemplate.id}
      onClick={handleClickF( editorTemplate )}
      title={editorTemplate.description}>
        {editorTemplate.linkText}
      </button>;
    } );
  }

}
