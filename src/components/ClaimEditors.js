import { Claim, newStatementClaim } from '../model/Shapes';
import React, { Component } from 'react';
import AddClaimButtonCell from './AddClaimButtonCell';
import ClaimEditorTableRow from './ClaimEditorTableRow';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './core.css';

class ClaimEditors extends Component {

  render() {
    const { claims, label, onAddClaim, onChangeClaim, propertyId } = this.props;

    const firstFirstCell = <AddClaimButtonCell onClick={onAddClaim} />;
    
    let children;
    if ( !claims || claims.length === 0 ) {
      const newClaim = newStatementClaim( propertyId );
      children = [ <ClaimEditorTableRow 
        claim={ newClaim } 
        firstCell={firstFirstCell} 
        key={newClaim.id} 
        label={label} 
        onAddClaim={onAddClaim}
        onChange={ onChangeClaim } /> ];
    } else {
      children = claims.map( ( claim, i ) => <ClaimEditorTableRow 
        claim={claim}
        firstCell={i == 0 ? firstFirstCell : <td /> }
        key={claim.id}
        label={label}
        onAddClaim={onAddClaim}
        onChange={ onChangeClaim } /> );
    }
    
    return <tbody className={styles.wef_property_editor_tbody + ' ' + styles[ 'wef_property_editor_' + propertyId ]}>{children}</tbody>;
  }

}

ClaimEditors.propTypes = {
  claims: PropTypes.arrayOf( PropTypes.shape( Claim ) ),
  label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
  onAddClaim: PropTypes.func.isRequired,
  onChangeClaim: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
};

const mapStateToProps = ( state, ownProps ) => ( {
  claims: state.entity.claims[ ownProps.propertyId ] || [],
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
  onAddClaim: () => dispatch( { type: 'CLAIM_ADD', propertyId: ownProps.propertyId } ),
  onChangeClaim: ( claim ) => dispatch( { type: 'CLAIM_UPDATE', claim } ),
} );

const ClaimEditorsConnected = connect( mapStateToProps, mapDispatchToProps )( ClaimEditors );
export default ClaimEditorsConnected;

