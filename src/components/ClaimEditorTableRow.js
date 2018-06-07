import React, { Component } from 'react';
import AddClaimButtonCell from './AddClaimButtonCell';
import { Claim } from '../model/Shapes';
import FlagCell from './FlagCell';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from './SnakEditorTableRowPart';
import styles from './core.css';

export default class ClaimEditorTableRow extends Component {

  render() {
    const { claim, flag, label, onAddClaim, ...other } = this.props;

    return <tr>
      <AddClaimButtonCell onClick={onAddClaim} {...other} />
      <FlagCell country={flag} />
      <th className={styles.wef_property_editor_label}>{label}</th>
      {/* add quialifier button cell */}
      {/* next component renders multiple cells */}
      <SnakEditorTableRowPart snak={claim.mainsnak} />
      {/* references editor button cell */}
      {/* delete claim button cell */}
    </tr>;
  }

}

ClaimEditorTableRow.propTypes = {
  claim: PropTypes.shape( Claim ).isRequired,
  flag: PropTypes.string,
  label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
  onAddClaim: PropTypes.func.isRequired,
};
