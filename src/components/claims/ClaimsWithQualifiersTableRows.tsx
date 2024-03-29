import React, {PureComponent} from 'react';

import usePropertyDescription from '../../caches/usePropertyDescription';
import PropertyDescription from '../../core/PropertyDescription';
import AnimatedTr from '../AnimatedTr';
import ClaimQualifiersTable from '../qualifiers/ClaimQualifiersTable';
import QualifierSelectButtonCell from '../qualifiers/QualifierSelectButtonCell';
import SingleQualifierEditor from '../qualifiers/SingleQualifierEditor';
import ClaimReferencesButtonCell from '../references/ClaimReferencesButtonCell';
import SnakEditorTableRowPart from '../SnakEditorTableRowPart';
import {COLUMNS_FOR_SNAK_EDITOR} from '../TableColSpanConstants';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import styles from './ClaimsWithQualifiers.css';
import SelectRankButtonCell from './SelectRankButtonCell';

interface PropsType {
  claim: ClaimType;
  columns: readonly string[];
  firstCell: any;
  hasClaimDelete: boolean;
  onClaimDelete: (claim: ClaimType) => any;
  onClaimUpdate: (claim: ClaimType) => any;
  propertyDescription: PropertyDescription;
}

export default class ClaimsWithQualifiersTableRows
  extends PureComponent<PropsType> {

  claimQualifiersTable = React.createRef< ClaimQualifiersTable >();

  handleClaimDelete = () =>
    this.props.onClaimDelete(this.props.claim);

  handleQualifierSelect = () => {
    if (this.claimQualifiersTable.current) {
      this.claimQualifiersTable.current.showQualifierSelect();
    }
  };

  handleRankChange = (rank: RankType) =>
    this.props.onClaimUpdate({
      ...this.props.claim,
      rank,
    });

  handleSnakChange = (snak: SnakType) =>
    this.props.onClaimUpdate({
      ...this.props.claim,
      mainsnak: snak,
    });

  handleSnaksArrayUpdateF (propertyId: string) {
    return (snaksArray: SnakType[]) => this.props.onClaimUpdate({
      ...this.props.claim,
      qualifiers: {
        ...(this.props.claim || {}).qualifiers,
        [propertyId]: snaksArray,
      },
    });
  }

  override render () {
    const {claim, columns, firstCell, hasClaimDelete, onClaimDelete, onClaimUpdate, propertyDescription, ...other} = this.props;

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
        {columns.map(propertyId =>
          <QualifierCell
            claim={claim}
            claimPropertyDescription={claimPropertyDescription}
            key={propertyId}
            onClaimUpdate={this.props.onClaimUpdate}
            propertyId={propertyId} />
        )}
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

interface QualifierCellPropsType {
  claim: ClaimType;
  claimPropertyDescription: PropertyDescription;
  onClaimUpdate: (claim: ClaimType) => unknown;
  propertyId: string;
}

const QualifierCell = ({
  claim,
  claimPropertyDescription,
  onClaimUpdate,
  propertyId,
}: QualifierCellPropsType) => {
  const propertyDescription = usePropertyDescription(propertyId);

  if (!propertyDescription) {
    return <td key={propertyId}>
      <i>Loading property description of {propertyId}...</i>
    </td>;
  }
  return <td key={propertyId}>
    <table className={styles.qualifier_table}>
      <SingleQualifierEditor
        claim={claim}
        claimPropertyDescription={claimPropertyDescription}
        onClaimUpdate={onClaimUpdate}
        qualifierPropertyDescription={propertyDescription} />
    </table>
  </td>;
};
