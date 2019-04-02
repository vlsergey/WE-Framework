import { closeWithoutSave, saveAndClose } from 'core/save';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogWithTabs from 'components/formbuilders/DialogWithTabs';
import { EditorShape } from 'components/formbuilders/FormShapes';
import i18n from './core.i18n';
import ImportDataDialog from 'enhancements/importers/ImportDataDialog';
import PropTypes from 'prop-types';
import styles from './EditorApp.css';

class EditorApp extends Component {

  static propTypes = {
    description: PropTypes.shape( EditorShape ),
    resolve: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    closeWithoutSave: PropTypes.func.isRequired,
    saveAndClose: PropTypes.func.isRequired,
  };

  constructor() {
    super( ...arguments );

    this.state = {
      ...this.state,
      dialogOpen: false,
    };

    this.dialogRef = React.createRef();
    this.handleCloseClick = this.handleCloseClick.bind( this );
    this.triggerImportDataDialogOpen = this.triggerImportDataDialogOpen.bind( this );
  }

  handleCloseClick() {
    const { closeWithoutSave, reject } = this.props;
    closeWithoutSave( reject, () => {
      this.dialogRef.current.open();
    } );
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
