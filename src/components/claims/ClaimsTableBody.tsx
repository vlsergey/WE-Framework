import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import {newStatementClaim} from '../../model/Shapes';
import ClaimAddButtonCell from './ClaimAddButtonCell';
import ClaimsTableRows from './ClaimsTableRows';
import SortClaimsButtonCell from './sort/SortClaimsButtonCell';

interface PropType {
  claims?: ClaimType[];
  displayLabel?: boolean;
  onClaimAdd: () => any;
  onClaimAddTwice: () => any;
  onClaimDelete: (claim: ClaimType) => any;
  onClaimsReorder: (claimIds: string[]) => any;
  onClaimUpdate: (claim: ClaimType) => any;
  propertyDescription: PropertyDescription;
}

export default class ClaimsTableBody
  extends PureComponent<PropType> {

  static defaultProps = {
    displayLabel: true,
  };

  override render () {
    const {claims, displayLabel, propertyDescription,
      onClaimAdd, onClaimAddTwice, onClaimUpdate, onClaimDelete, onClaimsReorder} = this.props;

    let children: any;
    if (!claims || claims.length === 0) {
      const newClaim = newStatementClaim(propertyDescription.id, propertyDescription.datatype);
      children = [<ClaimsTableRows
        claim={newClaim}
        displayLabel={displayLabel}
        firstCell={<ClaimAddButtonCell onClick={onClaimAddTwice} />}
        hasClaimDelete={false}
        key={newClaim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} />];
    } else {
      children = claims.map<any>((claim, i) => <ClaimsTableRows
        claim={claim}
        displayLabel={displayLabel}
        firstCell={i === 0
          ? <ClaimAddButtonCell onClick={onClaimAdd} />
          : i === 1
            ? <SortClaimsButtonCell claims={claims} onClaimsReorder={onClaimsReorder} />
            : <td />}
        hasClaimDelete
        key={claim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} />);
    }

    return children;
  }
}
