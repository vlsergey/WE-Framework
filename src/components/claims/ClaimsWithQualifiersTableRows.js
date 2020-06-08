// @flow

import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { boundMethod } from 'autobind-decorator';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import ClaimReferencesButtonCell from 'components/references/ClaimReferencesButtonCell';
import { COLUMNS_FOR_SNAK_EDITOR } from 'components/TableColSpanConstants';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import QualifierSelectButtonCell from 'components/qualifiers/QualifierSelectButtonCell';
import SelectRankButtonCell from './SelectRankButtonCell';
import SingleQualifierEditor from 'components/qualifiers/SingleQualifierEditor';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';
import styles from './ClaimsWithQualifiers.css';

type PropsType = {
  claim : ClaimType,
  columns : string[],
  firstCell : any,
  hasClaimDelete : boolean,
  onClaimDelete : ClaimType => any,
  onClaimUpdate : ClaimType => any,
  propertyDescription : PropertyDescription,
};

export default class ClaimsWithQualifiersTableRows
  extends PureComponent<PropsType> {

  claimQualifiersTable : ReactObjRef< ClaimQualifiersTable > = React.createRef();

  @boundMethod
  handleClaimDelete() {
    return this.props.onClaimDelete( this.props.claim );
  }

  @boundMethod
  handleQualifierSelect() {
    if ( this.claimQualifiersTable.current ) {
      this.claimQualifiersTable.current.showQualifierSelect();
    }
  }

  @boundMethod
  handleRankChange( rank : RankType ) {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      rank,
    } );
  }

  @boundMethod
  handleSnakChange( snak : SnakType ) {
    this.props.onClaimUpdate( {
      ...this.props.claim,
      mainsnak: snak,
    } );
  }

  handleSnaksArrayUpdateF( propertyId : string ) {
    return ( snaksArray : SnakType[] ) => this.props.onClaimUpdate( {
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
          propertyLabel={propertyDescription.label || propertyDescription.id} />
        <PropertyDescriptionsProvider propertyIds={columns}>
          { cache => columns.map( propertyId => {
            const propertyDescription : ?PropertyDescription = cache.get( propertyId );
            if ( !propertyDescription ) {
              return <td key={propertyId}>
                <i>Loading property description of {propertyId}...</i>
              </td>;
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
        <td colSpan={1 + COLUMNS_FOR_SNAK_EDITOR + 2 + columns.length * 1}>
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
