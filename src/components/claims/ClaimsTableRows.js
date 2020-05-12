// @flow

import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import { boundMethod } from 'autobind-decorator';
import ClaimDeleteButtonCell from './ClaimDeleteButtonCell';
import ClaimQualifiersTable from 'components/qualifiers/ClaimQualifiersTable';
import ClaimReferencesButtonCell from 'components/references/ClaimReferencesButtonCell';
import { COLUMNS_FOR_CLAIMS_EDITOR } from 'components/TableColSpanConstants';
import FlagCell from './FlagCell';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import QualifierSelectButtonCell from 'components/qualifiers/QualifierSelectButtonCell';
import SelectRankButtonCell from './SelectRankButtonCell';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

type PropsType = {
  claim : ClaimType,
  displayLabel? : boolean,
  firstCell : any,
  hasClaimDelete : boolean,
  onClaimDelete : ClaimType => any,
  onClaimUpdate : ClaimType => any,
  propertyDescription : PropertyDescription,
};

type StateType = {
  displayQualifierSelect : boolean,
};

export default class ClaimsTableRows
  extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    displayLabel: true,
  };

  claimQualifiersTable : ReactObjRef< ClaimQualifiersTable > = React.createRef();

  state = {
    displayQualifierSelect: false,
  };

  @boundMethod
  handleClaimDelete() {
    return this.props.onClaimDelete( this.props.claim );
  }

  @boundMethod
  handleQualifierSelect() {
    if ( this.claimQualifiersTable.current !== null ) {
      this.claimQualifiersTable.current.showQualifierSelect();
    } else {
      this.setState( { displayQualifierSelect: true } );
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
          propertyLabel={propertyDescription.label || propertyDescription.id} />
      </AnimatedTr>
      { ( displayQualifierSelect || claim.qualifiers ) && <tr>
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
