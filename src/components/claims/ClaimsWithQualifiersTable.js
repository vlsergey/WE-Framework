import { Claim, newStatementClaim } from 'model/Shapes';
import React, { PureComponent } from 'react';
import ClaimAddButtonCell from './ClaimAddButtonCell';
import ClaimsWithQualifiersTableRows from './ClaimsWithQualifiersTableRows';
import EntityLabel from 'caches/EntityLabel';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './ClaimsWithQualifiers.css';

export default class ClaimsWithQualifiersTable extends PureComponent {

  static propTypes = {
    claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ),
    columns: PropTypes.arrayOf( PropTypes.string ).isRequired,
    onClaimAdd: PropTypes.func.isRequired,
    onClaimAdd2: PropTypes.func.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  render() {
    const { claims, columns, onClaimAdd, onClaimAdd2, onClaimUpdate, onClaimDelete, propertyDescription } = this.props;

    let children;
    if ( !claims || claims.length === 0 ) {
      const newClaim = newStatementClaim( propertyDescription );
      children = [ <ClaimsWithQualifiersTableRows
        claim={newClaim}
        columns={columns}
        firstCell={<ClaimAddButtonCell onClick={onClaimAdd2} />}
        hasClaimDelete={false}
        key={newClaim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> ];
    } else {
      children = claims.map( ( claim, i ) => <ClaimsWithQualifiersTableRows
        claim={claim}
        columns={columns}
        firstCell={i == 0 ? <ClaimAddButtonCell onClick={onClaimAdd} /> : <td />}
        hasClaimDelete
        key={claim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> );
    }

    return <table className={styles.claims_with_qualifiers}>
      <thead>
        <tr>
          <th colSpan={17}>{propertyDescription.label || propertyDescription.id}</th>
          { columns.map( column => <th key={column}>
            <EntityLabel entityId={column} />
          </th> ) }
        </tr>
      </thead>
      <tbody className={styles.wef_property_editor_tbody}>{children}</tbody>
    </table>;
  }
}
