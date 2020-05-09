// @flow

import { closeWithoutSave, saveAndClose } from 'core/save';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DialogWithTabs from 'components/formbuilders/DialogWithTabs';
import i18n from './core.i18n';
import ImportDataDialog from 'enhancements/importers/ImportDataDialog';
import styles from './EditorApp.css';

type PropsType = {
  closeWithoutSave : ( string => any ) => any,
  description : EditorDefType,
  reject : string => any,
  resolve : string => any,
  saveAndClose : ( ( string => any ), ( string => any ) ) => any,
};

type StateType = {
  dialogOpen : boolean
};

class EditorApp extends PureComponent<PropsType, StateType> {

  constructor() {
    super( ...arguments );

    this.state = {
      dialogOpen: false,
    };

    this.dialogRef = React.createRef();
    this.handleCloseClick = this.handleCloseClick.bind( this );
    this.triggerImportDataDialogOpen = this.triggerImportDataDialogOpen.bind( this );
  }

  handleCloseClick() {
    const { closeWithoutSave, reject } = this.props;
    closeWithoutSave( reject );
    return false;
  }

  triggerImportDataDialogOpen() {
    this.setState( state => ( { ...state, dialogOpen: !state.dialogOpen } ) );
  }

  render() {
    const { description, closeWithoutSave, saveAndClose, resolve, reject } = this.props;

    const buttons = [];

    buttons.push( {
      class: styles.importDataButton,
      text: i18n.dialogButtonImportDataText,
      title: i18n.dialogButtonImportDataTitle,
      click: this.triggerImportDataDialogOpen,
    } );

    buttons.push( {
      text: i18n.dialogButtonSaveText,
      title: i18n.dialogButtonSaveTitle,
      click: () => {
        saveAndClose( resolve, reject );
      },
    } );

    buttons.push( {
      text: i18n.dialogButtonCancelText,
      title: i18n.dialogButtonCancelTitle,
      click() {
        closeWithoutSave( reject );
      },
    } );

    return [
      <DialogWithTabs
        buttons={buttons}
        className={styles.wef_dialog}
        key="editorDialog"
        minWidth={950}
        onBeforeClose={this.handleCloseClick}
        ref={this.dialogRef}
        tabs={description.tabs}
        title={description.dialogTitle} />,
      this.state.dialogOpen
        && <ImportDataDialog key="importDataDialog" onClose={this.triggerImportDataDialogOpen} />,
    ];
  }

}

const mapDispatchToProps = dispatch => ( {
  closeWithoutSave: reject => dispatch( closeWithoutSave( reject ) ),
  saveAndClose: ( resolve, reject ) => dispatch( saveAndClose( resolve, reject ) ),
} );

const EditorAppConnected = connect( undefined, mapDispatchToProps )( EditorApp );
export default EditorAppConnected;
