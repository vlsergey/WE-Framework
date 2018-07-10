import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { Claim } from 'model/Shapes';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import ClaimReferencesButtonCell from 'components/references/ClaimReferencesButtonCell';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import QualifierSelectButtonCell from 'components/qualifiers/QualifierSelectButtonCell';
import SelectRankButtonCell from './SelectRankButtonCell';
import SingleQualifierEditor from 'components/qualifiers/SingleQualifierEditor';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';
import styles from './ClaimsWithQualifiers.css';

export default class ClaimsWithQualifiersTableRows extends PureComponent {

  static propTypes = {
    firstCell: PropTypes.node.isRequired,
    claim: PropTypes.shape( Claim ).isRequired,
    columns: PropTypes.arrayOf( PropTypes.string ).isRequired,
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

  handleSnaksArrayUpdateF( propertyId ) {
    expect( propertyId ).toBeA( 'string' );

    return snaksArray => this.props.onClaimUpdate( {
      ...this.props.claim,
      qualifiers: {
        ...( this.props.claim || {} ).qualifiers,
        [ propertyId ]: snaksArray,
      },
    } );
  }

  render() {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*" }] */
    const { claim, columns, firstCell, hasClaimDelete, onClaimDelete, onClaimUpdate, propertyDescription, ...other } = this.props;

    const claimPropertyDescription = propertyDescription;
    return <React.Fragment>
      <AnimatedTr {...other} key="claim">
        {firstCell}
        <SelectRankButtonCell
          onChange={this.handleRankChange}
          value={claim.rank} />
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
        <PropertyDescriptionsProvider propertyIds={columns}>
          { cache => columns.map( propertyId => {
            const propertyDescription = cache[ propertyId ];
            if ( typeof propertyDescription === 'undefined' ) {
              return <td><i>Loading property description of {propertyId}...</i></td>;
            }
            return <td className={styles.qualifier_cell} key={propertyId}>
              <table className={styles.qualifier_table}>
                <SingleQualifierEditor
                  claim={claim}
                  claimPropertyDescription={claimPropertyDescription}
                  onClaimUpdate={this.props.onClaimUpdate}
                  qualifierPropertyDescription={propertyDescription} />
              </table>
            </td>;
          } )}
        </PropertyDescriptionsProvider>
      </AnimatedTr>
      <AnimatedTr>
        <td colSpan={2} />
        <td colSpan={1 + SnakEditorTableRowPart.TABLE_COLUMNS + 2 + columns.length * 1}>
          <ClaimQualifiersTable
            allowedQualifiers={propertyDescription.allowedQualifiers}
            claim={claim}
            claimPropertyDescription={propertyDescription}
            disabledQualifiers={columns}
            onClaimUpdate={onClaimUpdate}
            ref={this.claimQualifiersTable} />
        </td>
      </AnimatedTr>
    </React.Fragment>;
  }

}
