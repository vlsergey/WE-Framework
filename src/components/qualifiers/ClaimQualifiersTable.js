import React, { PureComponent } from 'react';
import { Claim } from 'model/Shapes';
import ClaimQualifiersTBody from './ClaimQualifiersTBody';
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

  render() {
    const { claim, onClaimUpdate } = this.props;
    const { hiddenBehindLabel } = this.state;

    const allQualifierPropertyIds = Object.keys( claim.qualifiers || [] );
    return <PropertyDescriptionsProvider propertyIds={allQualifierPropertyIds}>
      {cache => <table
        className={styles.wef_claim_qualifiers_table}
        onClick={this.showFromBehindLabel}>
        { Object.keys( claim.qualifiers ).map( propertyId => {
          const propertyDescription = cache[ propertyId ];

          if ( typeof propertyDescription === 'undefined' ) {
            return <PropertyIsLoadingTBody
              key={propertyId}
              propertyId={propertyId} />;
          }

          expect( propertyDescription ).toBeA( PropertyDescription );
          return <ClaimQualifiersTBody
            claim={claim}
            key={propertyId}
            onClaimUpdate={onClaimUpdate}
            propertyDescription={propertyDescription}
            readOnly={hiddenBehindLabel} />;
        } )}
      </table>}
    </PropertyDescriptionsProvider>;
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
