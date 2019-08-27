import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExternalIdDataValueEditor from 'components/dataValueEditors/external-id/ExternalIdDataValueEditor';
import FillSisterIsbnClaimButtonCell from './FillSisterIsbnClaimButtonCell';
import HyphenateIsbnButtonCell from './HyphenateIsbnButtonCell';
import PropertyDescription from 'core/PropertyDescription';

type PropsType = {
  datavalue? : DataValueType,
  onClaimsFill : ( string => string, string ) => any,
  onDataValueChange : ?DataValueType => any,
  propertyDescription : PropertyDescription,
  readOnly? : boolean,
};

class Isbn10PropertyDataValueEditor extends PureComponent<PropsType> {

  render() {
    const { datavalue, onClaimsFill, onDataValueChange, ...etc } = this.props;
    const isbn = ( datavalue || {} ).value || '';

    const buttons = [
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

    return <ExternalIdDataValueEditor
      buttons={buttons}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange}
      {...etc} />;
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
