import React, {PureComponent} from 'react';

import EntityLabel from '../../caches/EntityLabel';
import PropertyDescription from '../../core/PropertyDescription';
import {newStatementClaim} from '../../model/Shapes';
import ClaimAddButtonCell from './ClaimAddButtonCell';
import styles from './ClaimsWithQualifiers.css';
import ClaimsWithQualifiersTableRows from './ClaimsWithQualifiersTableRows';
import SortClaimsButtonCell from './sort/SortClaimsButtonCell';

const QUALIFIER_COLUMNS_WIDTH = ['0%', '33%', '25%', '20%', '17%'];

interface PropsType {
  claims?: ClaimType[];
  columns: readonly string[];
  displayEmpty?: boolean;
  onClaimAdd: () => any;
  onClaimAddTwice: () => any;
  onClaimDelete: (claim: ClaimType) => any;
  onClaimsReorder: (claimIds: string[]) => any;
  onClaimUpdate: (claim: ClaimType) => any;
  propertyDescription: PropertyDescription;
}

export default class ClaimsWithQualifiersTable
  extends PureComponent<PropsType> {

  override render () {
    const {claims, columns, displayEmpty, propertyDescription,
      onClaimAdd, onClaimAddTwice, onClaimUpdate, onClaimDelete, onClaimsReorder} = this.props;

    let children: JSX.Element[];
    if (!claims || claims.length === 0) {
      if (!displayEmpty) return null;

      const newClaim = newStatementClaim(propertyDescription.id, propertyDescription.datatype);
      children = [<ClaimsWithQualifiersTableRows
        claim={newClaim}
        columns={columns}
        firstCell={<ClaimAddButtonCell onClick={onClaimAddTwice} />}
        hasClaimDelete={false}
        key={newClaim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} />];
    } else {
      children = claims.map((claim, i) => <ClaimsWithQualifiersTableRows
        claim={claim}
        columns={columns}
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

    return <table className={styles.claims_with_qualifiers}>
      <thead>
        <tr>
          <th colSpan={18} key="_mainsnak">
            {propertyDescription.label || propertyDescription.id}
          </th>
          { columns.map(column =>
            // @ts-expect-error
            <th key={column} width={QUALIFIER_COLUMNS_WIDTH[columns.length]}>
              <EntityLabel entityId={column} />
            </th>
          ) }
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>;
  }
}
