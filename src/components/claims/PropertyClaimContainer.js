// @flow

import React, { PureComponent } from 'react';
import { claimColumnsF } from './selectors';
import ClaimsTableBody from './ClaimsTableBody';
import ClaimsWithQualifiersTable from './ClaimsWithQualifiersTable';
import { COLUMNS_FOR_CLAIMS_EDITOR } from 'components/TableColSpanConstants';
import { connect } from 'react-redux';
import PropertyDescription from 'core/PropertyDescription';

type PropsType = {
  claims : ClaimType[],
  displayLabel? : boolean,
  onClaimAdd : () => any,
  onClaimAddTwice : () => any,
  onClaimDelete : ClaimType => any,
  onClaimUpdate : ClaimType => any,
  onClaimsReorder : string[] => any,
  propertyDescription : PropertyDescription,
};

class PropertyClaimContainer extends PureComponent<PropsType> {

  static defaultProps = {
    displayLabel: true,
  };

  columnsMemoization = claimColumnsF();

  render() {
    const { claims } = this.props;
    const columns = this.columnsMemoization( claims );

    if ( columns.length !== 0 ) {
      return <tr>
        <td colSpan={COLUMNS_FOR_CLAIMS_EDITOR}>
          <ClaimsWithQualifiersTable {...this.props} columns={columns} />
        </td>
      </tr>;
    }

    return <ClaimsTableBody {...this.props} />;
  }
}

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const mapStateToProps = ( state, ownProps ) => ( {
  claims: ( state.entity.claims || EMPTY_OBJECT )[ ownProps.propertyDescription.id ] || EMPTY_ARRAY,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onClaimAdd: () => dispatch( { type: 'CLAIM_ADD', propertyId: ownProps.propertyDescription.id, datatype: ownProps.propertyDescription.datatype } ),
  onClaimAddTwice: () => {
    dispatch( { type: 'CLAIM_ADD', propertyId: ownProps.propertyDescription.id, datatype: ownProps.propertyDescription.datatype } );
    dispatch( { type: 'CLAIM_ADD', propertyId: ownProps.propertyDescription.id, datatype: ownProps.propertyDescription.datatype } );
  },
  onClaimUpdate: claim => dispatch( { type: 'CLAIM_UPDATE', claim } ),
  onClaimDelete: claim => dispatch( { type: 'CLAIM_DELETE', claim } ),
  onClaimsReorder: claimIds => dispatch( { type: 'CLAIMS_REORDER', propertyId: ownProps.propertyDescription.id, claimIds } ),
} );

const PropertyClaimContainerConnected = connect( mapStateToProps, mapDispatchToProps )( PropertyClaimContainer );
export default PropertyClaimContainerConnected;
