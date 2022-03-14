import React, {PureComponent} from 'react';
import {defaultMemoize} from 'reselect';

import JQueryButton from '../../wrappers/JQueryButton';
import ClaimReferencesEditorDialog from './ClaimReferencesEditorDialog';
import i18n from './i18n';
import styles from './references.css';

interface PropsType {
  claim: ClaimType;
  onClaimUpdate: (claim: ClaimType) => any;
}

interface StateType {
  displayEditor: boolean;
}

export default class ClaimReferencesButtonCell
  extends PureComponent<PropsType, StateType> {

  labelMemoize: (claim: ClaimType) => string
    = defaultMemoize(claim => '[' + ((claim || {}).references || []).length + ']');

  override state = {
    displayEditor: false,
  };

  handleClick = () =>
  { this.setState(({displayEditor}) => ({displayEditor: !displayEditor})); };

  override render () {
    const {claim, onClaimUpdate} = this.props;

    return <td className={styles.referencesButtonCell}>
      <JQueryButton
        className={styles.referencesButton}
        label={this.labelMemoize(claim)}
        onClick={this.handleClick}
        text
        title={i18n.buttonTitleReferences} />
      {this.state.displayEditor && <ClaimReferencesEditorDialog
        claim={claim}
        onClaimUpdate={onClaimUpdate}
        onCloseClick={this.handleClick} />}
    </td>;
  }

}
