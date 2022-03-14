import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import PropertyDescription from '../../core/PropertyDescription';
import {COLUMNS_FOR_CLAIMS_EDITOR} from '../TableColSpanConstants';
import ClaimsTableBody from './ClaimsTableBody';
import ClaimsWithQualifiersTable from './ClaimsWithQualifiersTable';
import {claimColumnsF} from './selectors';

interface ExternalProps {
  displayLabel?: boolean;
  propertyDescription: PropertyDescription;
}

type InternalPropsType = ExternalProps & {
  claims?: ClaimType[];
  onClaimAdd: () => any;
  onClaimAddTwice: () => any;
  onClaimDelete: (claim: ClaimType) => any;
  onClaimsReorder: (claimIds: string[]) => any;
  onClaimUpdate: (claim: ClaimType) => any;
};

class PropertyClaimContainer extends PureComponent<InternalPropsType> {

  static defaultProps = {
    displayLabel: true,
  };

  columnsMemoization : ((claims?: ClaimType[]) => readonly string[]) = claimColumnsF();

  override render () {
    const {claims} = this.props;
    const columns = this.columnsMemoization(claims);

    if (columns.length !== 0) {
      return <tr>
        <td colSpan={COLUMNS_FOR_CLAIMS_EDITOR}>
          <ClaimsWithQualifiersTable {...this.props} columns={columns} />
        </td>
      </tr>;
    }

    return <ClaimsTableBody {...this.props} />;
  }
}

const mapStateToProps = (state: any, ownProps: ExternalProps) => ({
  claims: (state.entity as EntityType).claims?.[ownProps.propertyDescription.id],
});

const mapDispatchToProps = (dispatch: any, ownProps: ExternalProps) => ({
  onClaimAdd: () => dispatch({type: 'CLAIM_ADD', propertyId: ownProps.propertyDescription.id, datatype: ownProps.propertyDescription.datatype}),
  onClaimAddTwice: () => {
    dispatch({type: 'CLAIM_ADD', propertyId: ownProps.propertyDescription.id, datatype: ownProps.propertyDescription.datatype});
    dispatch({type: 'CLAIM_ADD', propertyId: ownProps.propertyDescription.id, datatype: ownProps.propertyDescription.datatype});
  },
  onClaimUpdate: (claim: ClaimType) => dispatch({type: 'CLAIM_UPDATE', claim}),
  onClaimDelete: (claim: ClaimType) => dispatch({type: 'CLAIM_DELETE', claim}),
  onClaimsReorder: (claimIds: string[]) => dispatch({type: 'CLAIMS_REORDER', propertyId: ownProps.propertyDescription.id, claimIds}),
});

const PropertyClaimContainerConnected = connect(mapStateToProps, mapDispatchToProps)(PropertyClaimContainer);
export default PropertyClaimContainerConnected;
