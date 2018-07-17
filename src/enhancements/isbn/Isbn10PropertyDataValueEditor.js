import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/ExternalIdDataValueEditor';
import FillSisterIsbnClaimButtonCell from './FillSisterIsbnClaimButtonCell';
import HyphenateIsbnButtonCell from './HyphenateIsbnButtonCell';
import React from 'react';

class Isbn10PropertyDataValueEditor extends ExternalIdDataValueEditor {

  renderButtonCells() {
    const { datavalue, onClaimsFill } = this.props;
    const isbn = ( datavalue || {} ).value || '';

    return [
      <HyphenateIsbnButtonCell
        isbn={isbn}
        key="HyphenateIsbn"
        mode="Isbn10"
        onHyphenate={this.handleValueChange} />,
      <FillSisterIsbnClaimButtonCell
        isbn={isbn}
        key="FillSisterIsbnClaim"
        modeOwn="Isbn10"
        modeSister="Isbn13"
        onClaimsFill={onClaimsFill}
        onHyphenate={this.handeFillIsbn13} />,
    ];
  }

}

const mapDispatchToProps = dispatch => ( {
  onClaimsFill: ( normalizeF, newValue ) => dispatch( { type: 'CLAIMS_FILL', propertyId: 'P212', normalizeF, newValue } ),
} );

const Isbn10PropertyDataValueEditorConnected = connect( undefined, mapDispatchToProps )( Isbn10PropertyDataValueEditor );
export default Isbn10PropertyDataValueEditorConnected;
