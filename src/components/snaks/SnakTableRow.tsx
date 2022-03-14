import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import AnimatedTr from '../AnimatedTr';
import PropertyLabelCell from '../PropertyLabelCell';
import SnakEditorTableRowPart from '../SnakEditorTableRowPart';

interface PropsType {
  displayLabel: boolean;
  firstCell: any;
  lastCell: any;
  onSnakChange: (snak: SnakType) => any;
  propertyDescription: PropertyDescription;
  readOnly: boolean;
  snak?: SnakType;
}

export default class SnakTableRow extends PureComponent<PropsType> {

  static defaultProps = {
    displayLabel: true,
    readOnly: false,
  };

  override render () {
    const {firstCell, displayLabel, lastCell, onSnakChange, propertyDescription, snak, readOnly} = this.props;

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
