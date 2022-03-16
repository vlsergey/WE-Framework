import React, {useMemo} from 'react';
import {connect} from 'react-redux';

import PropertyDescription from '../../core/PropertyDescription';
import {COLUMNS_FOR_CLAIMS_EDITOR} from '../TableColSpanConstants';
import ClaimsTableBody from './ClaimsTableBody';
import ClaimsWithQualifiersTable from './ClaimsWithQualifiersTable';
import {getClaimsColumns, sortColumns} from './getClaimsColumns';

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

const PropertyClaimContainer = ({ claims, ...etc} : InternalPropsType) => {

  const unsortedColumns = useMemo( () => getClaimsColumns(claims), [claims] );
  const sortedColumns = useMemo( () => sortColumns(unsortedColumns), [unsortedColumns] );

  if (sortedColumns.length !== 0) {
    return <tr>
      <td colSpan={COLUMNS_FOR_CLAIMS_EDITOR}>
        <ClaimsWithQualifiersTable {...etc} claims={claims} columns={sortedColumns} />
      </td>
    </tr>;
  }

  return <ClaimsTableBody claims={claims} {...etc} />;
}

const mapStateToProps = (state: ReduxState, ownProps: ExternalProps) => ({
  claims: state.entity.claims?.[ownProps.propertyDescription.id],
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyClaimContainer);
