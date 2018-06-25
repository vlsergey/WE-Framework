import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogWrapper from 'wrappers/DialogWrapper';
import { EditorShape } from 'components/formbuilders/FormShapes';
import EditorTabsBuilder from 'components/formbuilders/EditorTabsBuilder';
import i18n from './core.i18n';
import LabelDescriptionCacheContainer from 'core/LabelDescriptionCacheContainer';
import PropertiesCacheContainer from 'core/PropertiesCacheContainer';
import PropTypes from 'prop-types';
import save from 'core/save';

class EditorApp extends Component {

  static propTypes = {
    description: PropTypes.shape( EditorShape ),
    onExit: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  };

  constructor() {
    super( ...arguments );

    this.state = {
      visible: true,
    };
  }

  render() {
    const { description, onExit, save } = this.props;

    const buttons = [];

    // TODO: add labels update button
    //    buttons.push( {
    //      text: i18n.dialogButtonUpdateLabelsText,
    //      label: i18n.dialogButtonUpdateLabelsLabel,
    //      click() {
    //        wef_LabelsCache.clearCacheAndRequeue();
    //      },
    //      style: 'position: absolute; left: 1em;',
    //    } );

    buttons.push( {
      text: i18n.dialogButtonSaveText,
      label: i18n.dialogButtonSaveLabel,
      click: () => {
        this.setState( { visible: false } );
        save();

        //        const saveD = wef_analyze_and_save( editorForm.currentPageItem, editorForm.entityId, labelsEditor, claimEditorsTables );
        //        saveD.done( function( entityId ) {
        //          WEF_Utils.tagRevisions( entityId, true ).always( function() {
        //            editDeferred.resolve( entityId );
        //          } );
        //        } );
        //        saveD.fail( function() {
        // TODO: Add question if need to try one-by-one?
        //          reject();
        //        } );
      },
    } );

    // TODO: Add onClose check for changes
    buttons.push( {
      text: i18n.dialogButtonCancelText,
      label: i18n.dialogButtonCancelLabel,
      click() {
        onExit();
      },
    } );

    return this.state.visible && <DialogWrapper buttons={buttons} minWidth={800} onClose={onExit} title={description.title}>
      <LabelDescriptionCacheContainer>
        <PropertiesCacheContainer>
          <EditorTabsBuilder tabs={description.tabs} />
        </PropertiesCacheContainer>
      </LabelDescriptionCacheContainer>
    </DialogWrapper>;
  }

}

const mapDispatchToProps = dispatch => ( {
  save: () => dispatch( save() ),
} );

const EditorAppConnected = connect( undefined, mapDispatchToProps )( EditorApp );
export default EditorAppConnected;
