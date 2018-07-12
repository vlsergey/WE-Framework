import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { Claim } from 'model/Shapes';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import ClaimReferencesButtonCell from 'components/references/ClaimReferencesButtonCell';
import expect from 'expect';
import FlagCell from './FlagCell';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import PropTypes from 'prop-types';
import QualifierSelectButtonCell from 'components/qualifiers/QualifierSelectButtonCell';
import SelectRankButtonCell from './SelectRankButtonCell';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

export default class ClaimsTableRows extends PureComponent {

  static TABLE_COLUMNS = 7 + SnakEditorTableRowPart.TABLE_COLUMNS;

  static propTypes = {
    claim: PropTypes.shape( Claim ).isRequired,
    displayLabel: PropTypes.bool,
    firstCell: PropTypes.node.isRequired,
    hasClaimDelete: PropTypes.bool.isRequired,
    onClaimDelete: PropTypes.func.isRequired,
    onClaimUpdate: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
  };

  static defaultProps = {
    displayLabel: true,
  }

  constructor() {
    super( ...arguments );

    this.state = {
      displayQualifierSelect: false,
    };

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
    if ( this.claimQualifiersTable.current !== null ) {
      this.claimQualifiersTable.current.showQualifierSelect();
    } else {
      this.setState( { displayQualifierSelect: true } );
    }
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
    const { claim, displayLabel, firstCell, hasClaimDelete, onClaimDelete, onClaimUpdate, propertyDescription, ...other } = this.props;
    const { displayQualifierSelect } = this.state;
    const flagImage = propertyDescription.countryFlags && propertyDescription.countryFlags.length > 0
      ? propertyDescription.countryFlags[ 0 ]
      : null;

    return <React.Fragment>
      <AnimatedTr {...other}>
        {firstCell}
        <SelectRankButtonCell onChange={this.handleRankChange} value={claim.rank} />
        <FlagCell flagImage={flagImage} />
        { displayLabel
          ? <PropertyLabelCell propertyDescription={propertyDescription} />
          : <td />
        }
        <QualifierSelectButtonCell
          onClick={this.handleQualifierSelect} />
        <SnakEditorTableRowPart
          onSnakChange={this.handleSnakChange}
          propertyDescription={propertyDescription}
          snak={claim.mainsnak} />
        <ClaimReferencesButtonCell
          claim={claim}
          onClaimUpdate={onClaimUpdate} />
        <ClaimDeleteButtonCell
          disabled={!hasClaimDelete}
          onClaimDelete={this.handleClaimDelete}
          propertyId={propertyDescription.id}
          propertyLabel={propertyDescription.label} />
      </AnimatedTr>
      { ( displayQualifierSelect || claim.qualifiers ) && <tr>
        <td colSpan={2} />
        <td colSpan={ClaimsTableRows.TABLE_COLUMNS - 2}>
          <ClaimQualifiersTable
            allowedQualifiers={propertyDescription.allowedQualifiers}
            claim={claim}
            claimPropertyDescription={propertyDescription}
            defaultAddQuailifier={displayQualifierSelect}
            onClaimUpdate={onClaimUpdate}
            ref={this.claimQualifiersTable} />
        </td>
      </tr> }
    </React.Fragment>;
  }

}
