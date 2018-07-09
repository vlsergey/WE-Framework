import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimReferenceEditor from './ClaimReferenceEditor';
import generateRandomString from 'utils/generateRandomString';
import PropTypes from 'prop-types';
import styles from './references.css';

export default class ClaimReferencesEditorContent extends PureComponent {

  static propTypes = {
    claim: PropTypes.shape( Claim ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleReferenceAdd = this.handleReferenceAdd.bind( this );
    this.handleReferenceChange = this.handleReferenceChange.bind( this );
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

  handleReferenceChange( reference ) {
    const { claim, onClaimUpdate } = this.props;

    onClaimUpdate( {
      ...claim,
      references: claim
        .references.map( oldRef => oldRef.hash === reference.hash ? reference : oldRef ),
    } );
  }

  render() {
    const { claim } = this.props;
    const references = claim.references || [];

    return <table className={styles.referencesEditorTable}>
      <tbody>
        {references.map( ( reference, index ) =>
          <tr className={styles.referenceEditor} key={reference.hash}>
            <th className={styles.referenceCounter}>{index + 1}.</th>
            <td>
              <ClaimReferenceEditor
                onReferenceChange={this.handleReferenceChange}
                reference={reference} />
            </td>
          </tr> )}
      </tbody>
    </table>;
  }

}
