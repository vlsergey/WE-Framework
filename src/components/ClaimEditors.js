import { Claim, newStatementClaim } from 'model/Shapes';
import React, { PureComponent } from 'react';
import ClaimAddButtonCell from './ClaimAddButtonCell';
import ClaimEditorTableRow from './ClaimEditorTableRow';
import { connect } from 'react-redux';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import PropTypes from 'prop-types';
import styles from './core.css';

class ClaimEditors extends PureComponent {

  static TABLE_COLUMNS = ClaimEditorTableRow.TABLE_COLUMNS;

  static propTypes = {
    claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ),
    onClaimAdd: PropTypes.func.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  render() {
    const { claims, onClaimAdd, onClaimUpdate, onClaimDelete, propertyDescription } = this.props;

    const firstFirstCell = <ClaimAddButtonCell onClick={onClaimAdd} />;

    let children;
    if ( !claims || claims.length === 0 ) {
      const newClaim = newStatementClaim( propertyDescription );
      children = [ <ClaimEditorTableRow
        claim={newClaim}
        firstCell={firstFirstCell}
        hasClaimDelete={false}
        key={newClaim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> ];
    } else {
      children = claims.map( ( claim, i ) => <ClaimEditorTableRow
        claim={claim}
        firstCell={i == 0 ? firstFirstCell : <td />}
        hasClaimDelete
        key={claim.id}
        onClaimDelete={onClaimDelete}
        onClaimUpdate={onClaimUpdate}
        propertyDescription={propertyDescription} /> );
    }

    return <tbody className={styles.wef_property_editor_tbody + ' ' + styles[ 'wef_property_editor_' + propertyDescription.id ]}>{children}</tbody>;
  }
}

const EMPTY_ARRAY = [];

const mapStateToProps = ( state, ownProps ) => ( {
  claims: state.entity.claims[ ownProps.propertyDescription.id ] || EMPTY_ARRAY,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onClaimAdd: () => dispatch( { type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription } ),
  onClaimUpdate: claim => {
    expect( claim ).toBeAn( 'object' );
    expect( claim.id ).toBeAn( 'string' );
    return dispatch( { type: 'CLAIM_UPDATE', claim } );
  },
  onClaimDelete: claim => {
    expect( claim ).toBeAn( 'object' );
    expect( claim.id ).toBeAn( 'string' );
    return dispatch( { type: 'CLAIM_DELETE', claim } );
  },
} );

const ClaimEditorsConnected = connect( mapStateToProps, mapDispatchToProps )( ClaimEditors );
export default ClaimEditorsConnected;
