import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimReferencesEditorDialog from './ClaimReferencesEditorDialog';
import { defaultMemoize } from 'reselect';
import i18n from './i18n';
import JQueryButton from 'wrappers/JQueryButton';
import PropTypes from 'prop-types';
import styles from './references.css';

export default class ClaimReferencesButtonCell extends PureComponent {

  static propTypes = {
    claim: PropTypes.shape( Claim ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      displayEditor: false,
    };

    this.labelMemoize = defaultMemoize( claim => '[' + ( ( claim || {} ).references || [] ).length + ']' );
    this.handleClick = () => this.setState( { displayEditor: !this.state.displayEditor } );
  }

  render() {
    const { claim, onClaimUpdate } = this.props;

    return <td className={styles.referencesButtonCell}>
      <JQueryButton
        className={styles.referencesButton}
        icon={null}
        label={this.labelMemoize( claim )}
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
