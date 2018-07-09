import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimReferencesEditorContent from './ClaimReferencesEditorContent';
import DialogWrapper from 'wrappers/DialogWrapper';
import generateRandomString from 'utils/generateRandomString';
import i18n from './i18n';
import PropTypes from 'prop-types';

export default class ClaimReferencesEditorDialog extends PureComponent {

  static propTypes = {
    claim: PropTypes.shape( Claim ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    onCloseClick: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleReferenceAdd = this.handleReferenceAdd.bind( this );
  }

  handleReferenceAdd() {
    const { claim, onClaimUpdate } = this.props;
    const references = claim.references || [];
    onClaimUpdate( {
      ...claim,
      references: [
        ...references,
        {
          hash: generateRandomString(),
          snaks: {},
        },
      ],
    } );
  }

  render() {
    const { claim, onClaimUpdate } = this.props;

    return <DialogWrapper
      buttons={[
        {
          text: i18n.dialogButtonAddLabel,
          label: i18n.dialogButtonAddTitle,
          click: this.handleReferenceAdd,
        },
        {
          text: i18n.dialogButtonCloseLabel,
          label: i18n.dialogButtonCloseTitle,
          click: this.props.onCloseClick,
        },
      ]}
      minWidth={600}
      title={i18n.dialogTitle}>
      <ClaimReferencesEditorContent
        claim={claim}
        onClaimUpdate={onClaimUpdate} />
    </DialogWrapper>;
  }

}
