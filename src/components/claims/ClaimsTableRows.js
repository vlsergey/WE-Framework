import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { Claim } from 'model/Shapes';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import expect from 'expect';
import FlagCell from './FlagCell';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import PropTypes from 'prop-types';
import QualifierSelectButtonCell from 'components/qualifiers/QualifierSelectButtonCell';
import SelectRankButtonCell from './SelectRankButtonCell';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

export default class ClaimsTableRows extends PureComponent {

  static TABLE_COLUMNS = 6 + SnakEditorTableRowPart.TABLE_COLUMNS;

  static propTypes = {
    firstCell: PropTypes.node.isRequired,
    claim: PropTypes.shape( Claim ).isRequired,
    hasClaimDelete: PropTypes.bool.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  };

  constructor() {
    super( ...arguments );

    this.claimQualifiersTable = React.createRef();

    this.handleClaimDelete = this.handleClaimDelete.bind( this );
    this.handleQualifierSelect = this.handleQualifierSelect.bind( this );
    this.handleRankChange = this.handleRankChange.bind( this );
    this.handleSnakChange = this.handleSnakChange.bind( this );
  }

  handleClaimDelete() {
    return this.props.onClaimDelete( this.props.claim );
  }

  handleQualifierSelect() {
    this.claimQualifiersTable.current.showQualifierSelect();
  }

  handleRankChange( rank ) {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      rank,
    } );
  }

  handleSnakChange( snak ) {
    expect( snak ).toBeAn( 'object' );
    expect( snak.property ).toBeAn( 'string' );
    expect( snak.snaktype ).toBeAn( 'string' );
    expect( snak.datatype ).toBeAn( 'string' );

    this.props.onClaimUpdate( {
      ...this.props.claim,
      mainsnak: snak,
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*" }] */
    const { claim, firstCell, hasClaimDelete, onClaimDelete, onClaimUpdate, propertyDescription, ...other } = this.props;
    const flagImage = propertyDescription.countryFlags && propertyDescription.countryFlags.length > 0
      ? propertyDescription.countryFlags[ 0 ]
      : null;

    return <React.Fragment>
      <AnimatedTr {...other} key="claim">
        {firstCell}
        <SelectRankButtonCell onChange={this.handleRankChange} value={claim.rank} />
        <FlagCell flagImage={flagImage} />
        <PropertyLabelCell
          description={propertyDescription.description}
          label={propertyDescription.label}
          propertyId={propertyDescription.id} />
        <QualifierSelectButtonCell
          onClick={this.handleQualifierSelect} />
        <SnakEditorTableRowPart
          onSnakChange={this.handleSnakChange}
          propertyDescription={propertyDescription}
          snak={claim.mainsnak} />
        {/* references editor button cell */}
        <ClaimDeleteButtonCell
          disabled={!hasClaimDelete}
          onClaimDelete={this.handleClaimDelete}
          propertyId={propertyDescription.id}
          propertyLabel={propertyDescription.label} />
      </AnimatedTr>
      <tr>
        <td colSpan={2} />
        <td colSpan={ClaimsTableRows.TABLE_COLUMNS - 2}>
          <ClaimQualifiersTable
            allowedQualifiers={propertyDescription.allowedQualifiers}
            claim={claim}
            claimPropertyDescription={propertyDescription}
            onClaimUpdate={onClaimUpdate}
            ref={this.claimQualifiersTable} />
        </td>
      </tr>
    </React.Fragment>;
  }

}
