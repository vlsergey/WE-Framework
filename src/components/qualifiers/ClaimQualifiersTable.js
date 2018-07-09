import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { Claim } from 'model/Shapes';
import ClaimQualifiersTBody from './ClaimQualifiersTBody';
import ClaimQualifierTableRow from './ClaimQualifierTableRow';
import expect from 'expect';
import generateRandomString from 'utils/generateRandomString';
import NewQualifierAutosuggest from './NewQualifierAutosuggest';
import NewQualifierSelect from './NewQualifierSelect';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import styles from './ClaimQualifiersTable.css';

export default class ClaimQualifiersTable extends PureComponent {

  static propTypes = {
    allowedQualifiers: PropTypes.arrayOf( PropTypes.string ),
    disabledQualifiers: PropTypes.arrayOf( PropTypes.string ),
    claim: PropTypes.shape( Claim ).isRequired,
    claimPropertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowedQualifiers: [],
    disabledQualifiers: [],
  }

  constructor() {
    super( ...arguments );

    this.state = {
      hiddenBehindLabel: true,
      addQualifierMode: 'HIDDEN',
    };

    this.handleQualifierAdd = this.handleQualifierAdd.bind( this );
    this.showFromBehindLabel = this.showFromBehindLabel.bind( this );
  }

  handleQualifierAdd( propertyId ) {
    if ( propertyId === 'OTHER' ) {
      // switch from simple select to complex autosuggest
      this.setState( {
        addQualifierMode: 'AUTOSUGGEST',
      } );
      return;
    }

    const { claim } = this.props;
    const qualifiers = claim.qualifiers || {};
    const propertyQualifiers = qualifiers[ propertyId ] || [];

    this.setState( {
      addQualifierMode: 'HIDDEN',
    } );

    this.props.onClaimUpdate( {
      ...claim,
      qualifiers: {
        ...qualifiers,
        [ propertyId ]: [
          ...propertyQualifiers,
          {
            snaktype: 'value',
            property: propertyId,
            hash: generateRandomString(),
          },
        ],
      },
    } );
  }

  showFromBehindLabel() {
    if ( this.state.hiddenBehindLabel ) {
      this.setState( {
        hiddenBehindLabel: false,
      } );
    }
  }

  showQualifierSelect() {
    const { allowedQualifiers } = this.props;
    this.setState( {
      addQualifierMode: allowedQualifiers.length > 0 ? 'SELECT' : 'AUTOSUGGEST',
    } );
  }

  render() {
    const { allowedQualifiers, claim, claimPropertyDescription, disabledQualifiers, onClaimUpdate } = this.props;
    const { addQualifierMode, hiddenBehindLabel } = this.state;

    const qualifiers = claim.qualifiers || {};
    const qualifierPropertyIds = Object.keys( qualifiers )
      .filter( qualifier => disabledQualifiers.indexOf( qualifier ) === -1 );
    const alreadyPresentQualifiers = qualifierPropertyIds
      .filter( propertyId => qualifiers[ propertyId ].length > 0 );

    return <table
      className={styles.wef_claim_qualifiers_table}
      onClick={this.showFromBehindLabel}>
      <PropertyDescriptionsProvider propertyIds={qualifierPropertyIds}>
        {cache => qualifierPropertyIds.map( propertyId => {
          const propertyDescription = cache[ propertyId ];

          if ( typeof propertyDescription === 'undefined' ) {
            return <PropertyIsLoadingTBody
              key={propertyId}
              propertyId={propertyId} />;
          }

          expect( propertyDescription ).toBeA( PropertyDescription );
          return <ClaimQualifiersTBody
            claim={claim}
            claimPropertyDescription={claimPropertyDescription}
            key={propertyId}
            onClaimUpdate={onClaimUpdate}
            propertyDescription={propertyDescription}
            readOnly={hiddenBehindLabel} />;
        } )}
      </PropertyDescriptionsProvider>
      { addQualifierMode === 'SELECT' &&
        <tbody className={styles.wef_claim_new_qualifier}>
          <AnimatedTr>
            <th colSpan={2}>
              <NewQualifierSelect
                allowedQualifiers={allowedQualifiers}
                alreadyPresent={alreadyPresentQualifiers}
                onSelect={this.handleQualifierAdd} />
            </th>
            <td />
          </AnimatedTr>
        </tbody>}
      { addQualifierMode === 'AUTOSUGGEST' &&
        <tbody className={styles.wef_claim_new_qualifier}>
          <AnimatedTr>
            <th colSpan={2}>
              <NewQualifierAutosuggest onSelect={this.handleQualifierAdd} />
            </th>
            <td />
          </AnimatedTr>
        </tbody>}
    </table>;
  }

}

class PropertyIsLoadingTBody extends PureComponent {

  static propTypes = {
    propertyId: PropTypes.string.isRequired,
  }

  render() {
    const { propertyId } = this.props;

    return <tbody key={propertyId}>
      <tr>
        <td colSpan={ClaimQualifierTableRow.TABLE_COLUMNS}>
          <i>Loading property description of {propertyId}...</i>
        </td>
      </tr>
    </tbody>;
  }
}
