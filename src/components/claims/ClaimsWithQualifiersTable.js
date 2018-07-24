import { Claim, newStatementClaim } from 'model/Shapes';
import React, { PureComponent } from 'react';
import ClaimAddButtonCell from './ClaimAddButtonCell';
import ClaimsWithQualifiersTableRows from './ClaimsWithQualifiersTableRows';
import EntityLabel from 'caches/EntityLabel';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import SortClaimsButtonCell from './SortClaimsButtonCell';
import styles from './ClaimsWithQualifiers.css';

const QUALIFIER_COLUMNS_WIDTH = [ '0%', '33%', '25%', '20%', '17%' ];

export default class ClaimsWithQualifiersTable extends PureComponent {

  static propTypes = {
    claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ),
    columns: PropTypes.arrayOf( PropTypes.string ).isRequired,
    displayEmpty: PropTypes.bool,
    onClaimAdd: PropTypes.func.isRequired,
    onClaimAddTwice: PropTypes.func.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    onClaimsReorder: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  render() {
    const { claims, columns, displayEmpty, propertyDescription,
      onClaimAdd, onClaimAddTwice, onClaimUpdate, onClaimDelete, onClaimsReorder } = this.props;

    let children;
    if ( !claims || claims.length === 0 ) {
      if ( !displayEmpty ) return null;

      const newClaim = newStatementClaim( propertyDescription );
      children = [ <ClaimsWithQualifiersTableRows
        claim={newClaim}
        columns={columns}
        firstCell={<ClaimAddButtonCell onClick={onClaimAddTwice} />}
        hasClaimDelete={false}
        key={newClaim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> ];
    } else {
      children = claims.map( ( claim, i ) => <ClaimsWithQualifiersTableRows
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
        propertyDescription={propertyDescription} /> );
    }

    return <table className={styles.claims_with_qualifiers}>
      <thead>
        <tr>
          <th colSpan={18} key="_mainsnak">
            {propertyDescription.label || propertyDescription.id}
          </th>
          { columns.map( column =>
            <th key={column} width={QUALIFIER_COLUMNS_WIDTH[ columns.length ]}>
              <EntityLabel entityId={column} />
            </th>
          ) }
        </tr>
      </thead>
      <tbody className={styles.wef_property_editor_tbody}>{children}</tbody>
    </table>;
  }
}
