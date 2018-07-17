import ExternalIdDataValueEditor from 'components/dataValueEditors/ExternalIdDataValueEditor';
import HyphenateIsbnButtonCell from './HyphenateIsbnButtonCell';
import React from 'react';

export default class Isbn13PropertyDataValueEditor extends ExternalIdDataValueEditor {

  renderButtonCells() {
    const { datavalue } = this.props;
    const isbn = ( datavalue || {} ).value || '';

    return [
      <HyphenateIsbnButtonCell
        isbn={isbn}
        key="HyphenateIsbn"
        mode="Isbn13"
        onHyphenate={this.handleValueChange} />,
    ];
  }

}
