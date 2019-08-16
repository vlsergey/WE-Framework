import { getLastRecentlyUsedReferences, onReferenceUpdate } from './LastRecentlyUsedReferencesStore';
import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { Claim } from 'model/Shapes';
import ClaimReferenceEditor from './ClaimReferenceEditor';
import { constructDescription } from 'caches/EntityDescription';
import { constructLabel } from 'caches/EntityLabel';
import { defaultMemoize } from 'reselect';
import generateRandomString from 'utils/generateRandomString';
import i18n from './i18n';
import JQueryButton from 'wrappers/JQueryButton';
import LabelDescriptionsProvider from 'caches/LabelDescriptionsProvider';
import PropTypes from 'prop-types';
import styles from './references.css';

export default class ClaimReferencesEditorContent extends PureComponent {

  static propTypes = {
    claim: PropTypes.shape( Claim ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
  };

  constructor() {
    super( ...arguments );

    this.memoizeLruKeys = defaultMemoize( lru => lru.map( item => item.key ) );

    this.handleReferenceAdd = this.handleReferenceAdd.bind( this );
    this.handleReferenceChange = this.handleReferenceChange.bind( this );

    this.state = {
      lru: getLastRecentlyUsedReferences(),
    };
  }

  bindLruClick( item ) {
    return () => {
      this.setState( state => ( {
        lru: state.lru.filter( i => i.key !== item.key ),
      } ) );
      this.handleReferenceAddImpl( {
        ...item.value,
        hash: generateRandomString(),
      } );
    };
  }

  handleReferenceAdd() {
    this.handleReferenceAddImpl( {
      hash: generateRandomString(),
      snaks: {},
    } );
  }

  handleReferenceAddImpl( newReference ) {
    const { claim, onClaimUpdate } = this.props;
    const references = claim.references || [];
    onClaimUpdate( {
      ...claim,
      references: [
        ...references,
        newReference,
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
    onReferenceUpdate( reference );
  }

  render() {
    const { claim } = this.props;
    const references = claim.references || [];

    return <div>
      <table className={styles.referencesEditorTable}>
        <tbody>
          {references.map( ( reference, index ) =>
            <AnimatedTr className={styles.referenceEditor} key={reference.hash}>
              <th className={styles.referenceCounter}>{index + 1}.</th>
              <td>
                <ClaimReferenceEditor
                  onReferenceChange={this.handleReferenceChange}
                  reference={reference} />
              </td>
            </AnimatedTr> )}
        </tbody>
      </table>
      { this.state.lru.length !== 0 && <div>
        <p className={styles.lruLabel}>{i18n.dialogLabelAddRecentlyUsed}</p>
        <LabelDescriptionsProvider
          entityIds={this.memoizeLruKeys( this.state.lru )}>
          { cache => this.state.lru.map( item => <div key={item.key}>
            <JQueryButton
              className={styles.lruButton}
              label={constructLabel( item.key, cache[ item.key ], true )}
              onClick={this.bindLruClick( item )}
              text
              title={constructDescription( cache[ item.key ] )} />
          </div> ) }
        </LabelDescriptionsProvider>
      </div> }
    </div>;
  }

}
