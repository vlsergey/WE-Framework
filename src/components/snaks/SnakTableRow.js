// @flow

import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

type PropsType = {
  displayLabel : boolean,
  firstCell : any,
  lastCell : any,
  onSnakChange : SnakType => any,
  propertyDescription : PropertyDescription,
  readOnly : boolean,
  snak? : SnakType,
};

export default class SnakTableRow extends PureComponent<PropsType> {

  static defaultProps = {
    displayLabel: true,
    readOnly: false,
  };

  render() {
    const { firstCell, displayLabel, lastCell, onSnakChange, propertyDescription, snak, readOnly } = this.props;

    return <AnimatedTr>
      {firstCell}
      { displayLabel && <PropertyLabelCell propertyDescription={propertyDescription} /> }
      <SnakEditorTableRowPart
        onSnakChange={onSnakChange}
        propertyDescription={propertyDescription}
        readOnly={readOnly}
        snak={snak} />
      {lastCell}
    </AnimatedTr>;
  }
}
