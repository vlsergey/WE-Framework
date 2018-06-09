import React, { Component } from 'react';
import { Claim } from '../model/Shapes';
import FlagCell from './FlagCell';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from './SnakEditorTableRowPart';
import styles from './core.css';

export default class ClaimEditorTableRow extends Component {

  constructor() {
    super( ...arguments );
    
    this.handleSnakChange = this.handleSnakChange.bind( this );
  }
  
  handleSnakChange( snak ) {
    this.props.onChange( {
      ...this.props.claim,
      mainsnak: snak,
    } );
  }
  
  render() {
    const { claim, firstCell, flag, label, ...other } = this.props;

    return <tr {...other}>
      {firstCell}
      <FlagCell country={flag} />
      <th className={styles.wef_property_editor_label}>{label}</th>
      {/* add quialifier button cell */}
      {/* next component renders multiple cells */}
      <SnakEditorTableRowPart onChange={this.handleSnakChange} snak={claim.mainsnak} />
      {/* references editor button cell */}
      {/* delete claim button cell */}
    </tr>;
  }

}

ClaimEditorTableRow.propTypes = {
  firstCell: PropTypes.node.isRequired,
  claim: PropTypes.shape( Claim ).isRequired,
  flag: PropTypes.string,
  label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
  onChange: PropTypes.func.isRequired,
};
