import React, { PureComponent } from 'react';
import ButtonCell from 'components/ButtonCell';
import PropertyDescription from 'core/PropertyDescription';
import PropertyLabelCell from 'components/PropertyLabelCell';
import PropTypes from 'prop-types';
import SnakEditorTableRowPart from 'components/SnakEditorTableRowPart';

let snaksCounter = 0;

export default class ReferencePropertySnaksEditor extends PureComponent {

  static propTypes = {
    propertyDescription: PropTypes.instanceOf( PropertyDescription ).isRequired,
    onSnaksChange: PropTypes.func.isRequired,
    snaks: PropTypes.arrayOf( PropTypes.object ).isRequired,
  }

  constructor() {
    super( ...arguments );

    this.handleSnakAdd = this.handleSnakAdd.bind( this );
    this.handleSnakChange = this.handleSnakChange.bind( this );
  }

  handleSnakAdd( ) {
    const { propertyDescription, snaks } = this.props;
    this.props.onSnaksChange( propertyDescription.id,
      [
        ...snaks,
        {
          snaktype: 'value',
          property: propertyDescription.id,
          hash: 'ReferencePropertySnaksEditor#new#' + ++snaksCounter,
          datatype: propertyDescription.datatype,
        },
      ]
    );
  }

  handleSnakChange( snak ) {
    const { propertyDescription, snaks } = this.props;

    this.props.onSnaksChange( propertyDescription.id,
      snaks.map( oldSnak => oldSnak.hash === snak.hash ? snak : oldSnak )
    );
  }

  render() {
    const { propertyDescription, snaks } = this.props;

    return snaks.map( ( snak, index ) =>
      <tr key={snak.hash}>
        { index === 0
          ? <ButtonCell
            icon="ui-icon-plus"
            label={'+'}
            onClick={this.handleSnakAdd} />
          : <td />}
        { index === 0
          ? <PropertyLabelCell
            description={propertyDescription.description}
            label={propertyDescription.label}
            propertyId={propertyDescription.id} />
          : <td /> }
        <SnakEditorTableRowPart
          onSnakChange={this.handleSnakChange}
          propertyDescription={propertyDescription}
          snak={snak} />
      </tr>
    );
  }
}
