import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/external-id/ExternalIdDataValueEditor';
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
  onClaimsFill: ( normalizeF, newValue ) => dispatch( {
    type: 'CLAIMS_FILL',
    property: 'P212',
    datatype: 'external-id',
    datavalue: { type: 'string', value: newValue },
    normalizeF,
  } ),
} );

const Isbn10PropertyDataValueEditorConnected = connect( undefined, mapDispatchToProps )( Isbn10PropertyDataValueEditor );
export default Isbn10PropertyDataValueEditorConnected;
