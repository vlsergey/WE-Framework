import React, { PureComponent } from 'react';
import ClaimQualifierTableRow from './ClaimQualifierTableRow';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import QualifierAddButtonCell from './QualifierAddButtonCell';
import QualifierRemoveButtonCell from './QualifierRemoveButtonCell';

let qualifiersCounter = 0;

export default class ClaimQualifiersTBody extends PureComponent {

  static propTypes = {
    claim: PropTypes.object,
    claimPropertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    readOnly: PropTypes.bool.isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleQualifierAdd = this.handleQualifierAdd.bind( this );
  }

  handleQualifierAdd() {
    const { datatype, id } = this.props.propertyDescription;

    const qualifiers = [ ...this.props.claim.qualifiers[ id ] ];
    const newClaim = {
      ...this.props.claim,
      qualifiers: {
        ...this.props.claim.qualifiers,
        [ id ]: [
          ...qualifiers,
          {
            snaktype: 'value',
            property: id,
            hash: 'new#ClaimQualifiersTBody#' + ++qualifiersCounter,
            datatype,
          },
        ],
      },
    };
    this.props.onClaimUpdate( newClaim );
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

  handleQualifierRemoveF( indexToDelete ) {
    const propertyId = this.props.propertyDescription.id;

    return () => {
      const qualifiers = this.props.claim.qualifiers[ propertyId ]
        .filter( ( item, i ) => i !== indexToDelete );

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
    const { claim, claimPropertyDescription, propertyDescription, readOnly } = this.props;
    const qualifiers = claim.qualifiers[ propertyDescription.id ];
    expect( qualifiers ).toBeAn( 'array' );

    return <tbody>
      { qualifiers.map( ( qualifier, index ) =>
        <ClaimQualifierTableRow
          firstCell={index === 0
            ? <QualifierAddButtonCell onClick={this.handleQualifierAdd} />
            : <td />}
          key={qualifier.hash}
          lastCell={<QualifierRemoveButtonCell
            claimPropertyId={claimPropertyDescription.id}
            claimPropertyLabel={claimPropertyDescription.label}
            onClick={this.handleQualifierRemoveF( index )}
            qualifierPropertyId={propertyDescription.id}
            qualifierPropertyLabel={propertyDescription.label} />}
          onQualifierChange={this.handleQualifierChangeF( index )}
          propertyDescription={propertyDescription}
          qualifier={qualifier}
          readOnly={readOnly} />
      ) }
    </tbody>;
  }
}
