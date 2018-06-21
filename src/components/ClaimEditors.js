import { Claim, newStatementClaim } from 'model/Shapes';
import React, { PureComponent } from 'react';
import AddClaimButtonCell from './AddClaimButtonCell';
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
    label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
    onAddClaim: PropTypes.func.isRequired,
    onChangeClaim: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ),
  };

  render() {
    const { claims, label, onAddClaim, onChangeClaim, propertyDescription } = this.props;

    const firstFirstCell = <AddClaimButtonCell onClick={onAddClaim} />;

    let children;
    if ( !claims || claims.length === 0 ) {
      const newClaim = newStatementClaim( propertyDescription );
      children = [ <ClaimEditorTableRow
        claim={ newClaim }
        firstCell={firstFirstCell}
        key={newClaim.id}
        label={label}
        onClaimChange={ onChangeClaim }
        propertyDescription={propertyDescription} /> ];
    } else {
      children = claims.map( ( claim, i ) => <ClaimEditorTableRow
        claim={claim}
        firstCell={i == 0 ? firstFirstCell : <td /> }
        key={claim.id}
        label={label}
        onClaimChange={ onChangeClaim }
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
  onAddClaim: () => dispatch( { type: 'CLAIM_ADD', propertyDescription: ownProps.propertyDescription } ),
  onChangeClaim: claim => {
    expect( claim ).toBeAn( 'object' );
    expect( claim.id ).toBeAn( 'string' );
    return dispatch( { type: 'CLAIM_UPDATE', claim } );
  },
} );

const ClaimEditorsConnected = connect( mapStateToProps, mapDispatchToProps )( ClaimEditors );
export default ClaimEditorsConnected;
