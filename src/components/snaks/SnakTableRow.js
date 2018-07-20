import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

export default class SnakTableRow extends PureComponent {

  static propTypes = {
    firstCell: PropTypes.node.isRequired,
    displayLabel: PropTypes.bool,
    lastCell: PropTypes.node.isRequired,
    onSnakChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    readOnly: PropTypes.bool,
    snak: PropTypes.object.isRequired,
  }

  static defaultProps = {
    displayLabel: true,
    readOnly: false,
  }

  render() {
    const { firstCell, displayLabel, lastCell, onSnakChange, propertyDescription, snak, readOnly } = this.props;

    // TODO: looks ugly, inline and cleanup this
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
