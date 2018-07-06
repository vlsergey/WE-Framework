import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimReferencesEditorDialog from './ClaimReferencesEditorDialog';
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

    this.handleClick = () => this.setState( { displayEditor: !this.state.displayEditor } );
  }

  render() {
    const { claim, onClaimUpdate } = this.props;
    const count = ( ( claim || {} ).references || [] ).length;

    return <td className={styles.referencesButtonCell}>
      <JQueryButton
        className={styles.referencesButton}
        disabled={count === 0}
        icon={null}
        label={'[' + count + ']'}
        onClick={this.handleClick}
        text />
      {this.state.displayEditor && <ClaimReferencesEditorDialog
        claim={claim}
        onClaimUpdate={onClaimUpdate}
        onCloseClick={this.handleClick} />}
    </td>;
  }

}
