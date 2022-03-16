import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import ExternalIdDataValueEditor from '../../components/dataValueEditors/external-id/ExternalIdDataValueEditor';
import PropertyDescription from '../../core/PropertyDescription';
import FillSisterIsbnClaimButtonCell from './FillSisterIsbnClaimButtonCell';
import HyphenateIsbnButtonCell from './HyphenateIsbnButtonCell';

type NormalizeFunction = (str: null | string) => null | string;

interface PropsType {
  datavalue?: null | StringDataValue;
  onClaimsFill: (normalizeF: NormalizeFunction, value: string) => any;
  onDataValueChange: (datavalue: null | StringDataValue) => any;
  propertyDescription: PropertyDescription;
  readOnly?: boolean;
}

class Isbn10PropertyDataValueEditor extends PureComponent<PropsType> {

  handleValueChange = (value: string) => {
    this.props.onDataValueChange(value.length !== 0
      ? {
        ...this.props.datavalue,
        type: 'string',
        value,
      }
      : null);
  };

  override render () {
    const {datavalue, onClaimsFill, onDataValueChange, ...etc} = this.props;
    const isbn = (datavalue || {}).value || '';

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
        onClaimsFill={onClaimsFill} />,
    ];

    return <ExternalIdDataValueEditor
      {...etc}
      buttons={buttons}
      datavalue={datavalue}
      onDataValueChange={onDataValueChange} />;
  }

}

const mapDispatchToProps = (dispatch: any) => ({
  onClaimsFill: (normalizeF: NormalizeFunction, newValue: string) => dispatch({
    type: 'CLAIMS_FILL',
    property: 'P212',
    datatype: 'external-id',
    datavalue: {type: 'string', value: newValue},
    normalizeF,
  }),
});

const Isbn10PropertyDataValueEditorConnected = connect(undefined, mapDispatchToProps)(Isbn10PropertyDataValueEditor);
export default Isbn10PropertyDataValueEditorConnected;
