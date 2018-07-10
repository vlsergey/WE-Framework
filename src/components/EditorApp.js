import { closeWithoutSave, saveAndClose } from 'core/save';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogWithTabs from 'components/formbuilders/DialogWithTabs';
import { EditorShape } from 'components/formbuilders/FormShapes';
import i18n from './core.i18n';
import PropTypes from 'prop-types';
import styles from './core.css';

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

    this.dialogRef = React.createRef();
    this.handleCloseClick = this.handleCloseClick.bind( this );
  }

  handleCloseClick() {
    const { closeWithoutSave, reject } = this.props;
    closeWithoutSave( reject, () => {
      this.dialogRef.current.open();
    } );
    return false;
  }

  render() {
    const { description, closeWithoutSave, saveAndClose, resolve, reject } = this.props;

    const buttons = [];

    buttons.push( {
      text: i18n.dialogButtonSaveText,
      label: i18n.dialogButtonSaveLabel,
      click: () => {
        saveAndClose( resolve, reject );
      },
    } );

    buttons.push( {
      text: i18n.dialogButtonCancelText,
      label: i18n.dialogButtonCancelLabel,
      click() {
        closeWithoutSave( reject );
      },
    } );

    return <DialogWithTabs
      buttons={buttons}
      className={styles.wef_dialog}
      minWidth={950}
      onBeforeClose={this.handleCloseClick}
      ref={this.dialogRef}
      tabs={description.tabs}
      title={description.dialogTitle} />;
  }

}

const mapDispatchToProps = dispatch => ( {
  closeWithoutSave: reject => dispatch( closeWithoutSave( reject ) ),
  saveAndClose: ( resolve, reject ) => dispatch( saveAndClose( resolve, reject ) ),
} );

const EditorAppConnected = connect( undefined, mapDispatchToProps )( EditorApp );
export default EditorAppConnected;
