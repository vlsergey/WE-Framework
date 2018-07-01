import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimQualifierTableRow from './ClaimQualifierTableRow';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import styles from './ClaimQualifiersTable.css';

export default class ClaimQualifiersTable extends PureComponent {

  static propTypes = {
    allowedQualifiers: PropTypes.arrayOf( PropTypes.string ),
    claim: PropTypes.shape( Claim ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowedQualifiers: [],
  }

  constructor() {
    super( ...arguments );

    this.state = {
      hiddenBehindLabel: true,
    };

    this.showFromBehindLabel = this.showFromBehindLabel.bind( this );
  }

  showFromBehindLabel() {
    if ( this.state.hiddenBehindLabel ) {
      this.setState( {
        hiddenBehindLabel: false,
      } );
    }
  }

  handleQualifierChangeF( propertyId, index ) {
    return qualifier => {
      const qualifiers = [ ...this.props.claim.qualifiers[ propertyId ] ];
      qualifiers[ index ] = qualifier;
      const newClaim = {
        ...this.props.claim,
        qualifiers: {
          ...this.props.claim.qualifiers,
          [ propertyId ]: qualifiers,
        },
      };
      this.props.onClaimUpdate( newClaim );
    };
  }

  render() {
    const { claim } = this.props;
    const { hiddenBehindLabel } = this.state;

    const allQualifierPropertyIds = Object.keys( claim.qualifiers || [] );
    return <PropertyDescriptionsProvider propertyIds={allQualifierPropertyIds}>
      {cache => <table
        className={styles.wef_claim_qualifiers_table}
        onClick={this.showFromBehindLabel}>
        { Object.keys( claim.qualifiers ).map( propertyId => {
          const propertyDescription = cache[ propertyId ];

          if ( typeof propertyDescription === 'undefined' ) {
            return <tbody key={propertyId}>
              <tr>
                <td colSpan={ClaimQualifierTableRow.TABLE_COLUMNS}>
                  <i>Loading property description of {propertyId}...</i>
                </td>
              </tr>
            </tbody>;
          }

          expect( propertyDescription ).toBeA( PropertyDescription );
          return <tbody key={propertyId}>
            { claim.qualifiers[ propertyId ].map( ( qualifier, index ) =>
              <ClaimQualifierTableRow
                key={qualifier.hash}
                onQualifierChange={this.handleQualifierChangeF( propertyId, index )}
                propertyDescription={propertyDescription}
                qualifier={qualifier}
                readOnly={hiddenBehindLabel} />
            ) }
          </tbody>;
        } )}
      </table>}
    </PropertyDescriptionsProvider>;
  }

}
