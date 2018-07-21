import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/external-id/ExternalIdDataValueEditor';
import FillSisterIsbnClaimButtonCell from './FillSisterIsbnClaimButtonCell';
import HyphenateIsbnButtonCell from './HyphenateIsbnButtonCell';
import React from 'react';

class Isbn13PropertyDataValueEditor extends ExternalIdDataValueEditor {

  renderButtonCells() {
    const { datavalue, onClaimsFill } = this.props;
    const isbn = ( datavalue || {} ).value || '';

    return [
      <HyphenateIsbnButtonCell
        isbn={isbn}
        key="HyphenateIsbn"
        mode="Isbn13"
        onHyphenate={this.handleValueChange} />,
      <FillSisterIsbnClaimButtonCell
        isbn={isbn}
        key="FillSisterIsbnClaim"
        modeOwn="Isbn13"
        modeSister="Isbn10"
        onClaimsFill={onClaimsFill}
        onHyphenate={this.handeFillIsbn10} />,
    ];
  }
}

const mapDispatchToProps = dispatch => ( {
  onClaimsFill: ( normalizeF, newValue ) => dispatch( { type: 'CLAIMS_FILL', propertyId: 'P957', normalizeF, newValue } ),
} );

const Isbn13PropertyDataValueEditorConnected = connect( undefined, mapDispatchToProps )( Isbn13PropertyDataValueEditor );
export default Isbn13PropertyDataValueEditorConnected;
