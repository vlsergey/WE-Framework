import React, { PureComponent } from 'react';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from './PropertyLabelCell';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from './SnakEditorTableRowPart';

export default class ClaimQualifierTableRow extends PureComponent {

  static TABLE_COLUMNS = 1 + SnakEditorTableRowPart.TABLE_COLUMNS;

  static propTypes = {
    onQualifierChange: PropTypes.func.isRequired,
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    qualifier: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    readOnly: false,
  }

  render() {
    const { onQualifierChange, propertyDescription, qualifier, readOnly } = this.props;

    return <tr>
      <PropertyLabelCell
        description={propertyDescription.description}
        label={propertyDescription.label}
        propertyId={propertyDescription.id} />
      <SnakEditorTableRowPart
        onSnakChange={onQualifierChange}
        propertyDescription={propertyDescription}
        readOnly={readOnly}
        snak={qualifier} />
    </tr>;
  }
}
