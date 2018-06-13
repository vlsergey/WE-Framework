import React, { PureComponent } from 'react';
import { Claim } from '../model/Shapes';
import expect from 'expect';
import FlagCell from './FlagCell';
import PropertyDescription from '../core/PropertyDescription';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from './SnakEditorTableRowPart';
import styles from './core.css';

export default class ClaimEditorTableRow extends PureComponent {

  constructor() {
    super( ...arguments );

    this.handleSnakChange = this.handleSnakChange.bind( this );
  }

  handleSnakChange( snak ) {
    expect( snak ).toBeAn( 'object' );
    expect( snak.property ).toBeAn( 'string' );
    expect( snak.snaktype ).toBeAn( 'string' );
    expect( snak.datatype ).toBeAn( 'string' );

    this.props.onChange( {
      ...this.props.claim,
      mainsnak: snak,
    } );
  }

  render() {
    const { claim, firstCell, flag, label, propertyDescription, ...other } = this.props;

    return <tr {...other}>
      {firstCell}
      <FlagCell country={flag} />
      <th className={styles.wef_property_editor_label}>{label}</th>
      {/* add quialifier button cell */}
      {/* next component renders multiple cells */}
      <SnakEditorTableRowPart onChange={this.handleSnakChange} propertyDescription={propertyDescription} snak={claim.mainsnak} />
      {/* references editor button cell */}
      {/* delete claim button cell */}
    </tr>;
  }

}

ClaimEditorTableRow.TABLE_COLUMNS = 3 + SnakEditorTableRowPart.TABLE_COLUMNS;

ClaimEditorTableRow.propTypes = {
  firstCell: PropTypes.node.isRequired,
  claim: PropTypes.shape( Claim ).isRequired,
  flag: PropTypes.string,
  label: PropTypes.oneOfType( [ PropTypes.string, PropTypes.node ] ).isRequired,
  onChange: PropTypes.func.isRequired,
  propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
};
