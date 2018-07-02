import React, { PureComponent } from 'react';
import ClaimQualifierTableRow from './ClaimQualifierTableRow';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';

export default class ClaimQualifiersTBody extends PureComponent {

  static propTypes = {
    claim: PropTypes.object,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    readOnly: PropTypes.bool.isRequired,
  }

  handleQualifierChangeF( index ) {
    const propertyId = this.props.propertyDescription.id;

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
    const { claim, propertyDescription, readOnly } = this.props;
    const qualifiers = claim.qualifiers[ propertyDescription.id ];
    expect( qualifiers ).toBeAn( 'array' );

    return <tbody>
      { qualifiers.map( ( qualifier, index ) =>
        <ClaimQualifierTableRow
          key={qualifier.hash}
          onQualifierChange={this.handleQualifierChangeF( index )}
          propertyDescription={propertyDescription}
          qualifier={qualifier}
          readOnly={readOnly} />
      ) }
    </tbody>;
  }
}
