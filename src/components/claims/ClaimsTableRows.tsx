import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import AnimatedTr from '../AnimatedTr';
import PropertyLabelCell from '../PropertyLabelCell';
import ClaimQualifiersTable from '../qualifiers/ClaimQualifiersTable';
import QualifierSelectButtonCell from '../qualifiers/QualifierSelectButtonCell';
import ClaimReferencesButtonCell from '../references/ClaimReferencesButtonCell';
import SnakEditorTableRowPart from '../SnakEditorTableRowPart';
import {COLUMNS_FOR_CLAIMS_EDITOR} from '../TableColSpanConstants';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import FlagCell from './FlagCell';
import SelectRankButtonCell from './SelectRankButtonCell';

interface PropsType {
  claim: ClaimType;
  displayLabel?: boolean;
  firstCell: any;
  hasClaimDelete: boolean;
  onClaimDelete: (claim: ClaimType) => any;
  onClaimUpdate: (claim: ClaimType) => any;
  propertyDescription: PropertyDescription;
}

interface StateType {
  displayQualifierSelect: boolean;
}

export default class ClaimsTableRows
  extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    displayLabel: true,
  };

  claimQualifiersTable = React.createRef< ClaimQualifiersTable >();

  override state = {
    displayQualifierSelect: false,
  };

  handleClaimDelete = () =>
    this.props.onClaimDelete(this.props.claim);

  handleQualifierSelect = () => {
    if (this.claimQualifiersTable.current !== null) {
      this.claimQualifiersTable.current.showQualifierSelect();
    } else {
      this.setState({displayQualifierSelect: true});
    }
  };

  handleRankChange = (rank: RankType) => {
    this.props.onClaimUpdate({
      ...this.props.claim,
      rank,
    });
  };

  handleSnakChange = (snak: SnakType) => {
    this.props.onClaimUpdate({
      ...this.props.claim,
      mainsnak: snak,
    });
  };

  override render () {
    /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "on.*" }] */
    const {claim, displayLabel, firstCell, hasClaimDelete, onClaimDelete, onClaimUpdate, propertyDescription, ...other} = this.props;
    const {displayQualifierSelect} = this.state;
    const flagImage = propertyDescription.countryFlags[0];

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
          propertyLabel={propertyDescription.label || propertyDescription.id} />
      </AnimatedTr>
      { (displayQualifierSelect || claim.qualifiers) && <tr>
        <td colSpan={2} />
        <td colSpan={COLUMNS_FOR_CLAIMS_EDITOR - 2}>
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
