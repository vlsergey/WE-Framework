import React, { PureComponent } from 'react';
import AnimatedTr from 'components/AnimatedTr';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

export default class ClaimQualifierTableRow extends PureComponent {

  static TABLE_COLUMNS = 2 + SnakEditorTableRowPart.TABLE_COLUMNS;

  static propTypes = {
    firstCell: PropTypes.node.isRequired,
    lastCell: PropTypes.node.isRequired,
    onQualifierChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    qualifier: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    readOnly: false,
  }

  render() {
    const { firstCell, lastCell, onQualifierChange, propertyDescription, qualifier, readOnly } = this.props;

    return <AnimatedTr>
      {firstCell}
      <PropertyLabelCell
        description={propertyDescription.description}
        label={propertyDescription.label}
        propertyId={propertyDescription.id} />
      <SnakEditorTableRowPart
        onSnakChange={onQualifierChange}
        propertyDescription={propertyDescription}
        readOnly={readOnly}
        snak={qualifier} />
      {lastCell}
    </AnimatedTr>;
  }
}
