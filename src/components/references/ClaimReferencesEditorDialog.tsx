import React, { PureComponent } from 'react';
import ClaimReferencesEditorContent from './ClaimReferencesEditorContent';
import DialogWrapper from '../../wrappers/DialogWrapper';
import generateRandomString from '../../utils/generateRandomString';
import i18n from './i18n';

type PropsType = {
  claim : ClaimType,
  onClaimUpdate : (claim : ClaimType) => any,
  onCloseClick : () => any,
};

export default class ClaimReferencesEditorDialog
  extends PureComponent<PropsType> {

  handleReferenceAdd = () => {
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

  override render() {
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
