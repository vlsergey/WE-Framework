import { Claim, newStatementClaim } from 'model/Shapes';
import React, { PureComponent } from 'react';
import ClaimAddButtonCell from './ClaimAddButtonCell';
import ClaimsTableRows from './ClaimsTableRows';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';

export default class ClaimsTableBody extends PureComponent {

  static TABLE_COLUMNS = ClaimsTableRows.TABLE_COLUMNS;

  static propTypes = {
    claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ),
    displayLabel: PropTypes.bool,
    onClaimAdd: PropTypes.func.isRequired,
    onClaimAddTwice: PropTypes.func.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  static defaultProps = {
    displayLabel: true,
  }

  render() {
    const { claims, displayLabel, propertyDescription,
      onClaimAdd, onClaimAddTwice, onClaimUpdate, onClaimDelete } = this.props;

    let children;
    if ( !claims || claims.length === 0 ) {
      const newClaim = newStatementClaim( propertyDescription );
      children = [ <ClaimsTableRows
        claim={newClaim}
        displayLabel={displayLabel}
        firstCell={<ClaimAddButtonCell onClick={onClaimAddTwice} />}
        hasClaimDelete={false}
        key={newClaim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> ];
    } else {
      children = claims.map( ( claim, i ) => <ClaimsTableRows
        claim={claim}
        displayLabel={displayLabel}
        firstCell={i == 0 ? <ClaimAddButtonCell onClick={onClaimAdd} /> : <td />}
        hasClaimDelete
        key={claim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> );
    }

    return children;
  }
}
