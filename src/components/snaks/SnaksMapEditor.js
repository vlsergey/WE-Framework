import React, { PureComponent } from 'react';
import expect from 'expect';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'core/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import SnaksArrayEditor from './SnaksArrayEditor';

export default class SnaksMapEditor extends PureComponent {

  static propTypes = {
    onSnaksMapUpdate: PropTypes.func.isRequired,
    snaksMap: PropTypes.object,
    readOnly: PropTypes.bool,
    removeButtonLabel: PropTypes.string.isRequired,
    removeButtonConfirmMessageF: PropTypes.func.isRequired,
  }

  static defaultProps = {
    readOnly: false,
  }

  handleSnaksArrayUpdateF( propertyDescription ) {
    return snaksArray => {
      this.props.onSnaksMapUpdate( {
        ...this.props.snaksMap,
        [ propertyDescription.id ]: snaksArray,
      } );
    };
  }

  render() {
    const { readOnly, removeButtonLabel, removeButtonConfirmMessageF, snaksMap } = this.props;

    if ( !snaksMap ) return null;

    const propertyIds = Object.keys( snaksMap );
    return <PropertyDescriptionsProvider propertyIds={propertyIds}>
      {cache => propertyIds.map( propertyId => {
        const propertyDescription = cache[ propertyId ];

        if ( typeof propertyDescription === 'undefined' ) {
          return <PropertyIsLoadingTBody
            key={propertyId}
            propertyId={propertyId} />;
        }

        expect( propertyDescription ).toBeA( PropertyDescription );
        const removeButtonConfirmMessage = removeButtonConfirmMessageF( propertyDescription );

        return <SnaksArrayEditor
          key={propertyId}
          onSnaksArrayUpdate={this.handleSnaksArrayUpdateF( propertyDescription )}
          propertyDescription={propertyDescription}
          readOnly={readOnly}
          removeButtonConfirmMessage={removeButtonConfirmMessage}
          removeButtonLabel={removeButtonLabel}
          snaksArray={snaksMap[ propertyId ]} />;
      } )}
    </PropertyDescriptionsProvider>;
  }

}

class PropertyIsLoadingTBody extends PureComponent {

  static propTypes = {
    propertyId: PropTypes.string.isRequired,
  }

  render() {
    const { propertyId } = this.props;

    return <tbody key={propertyId}>
      <tr>
        <td colSpan={SnaksArrayEditor.TABLE_COLUMNS}>
          <i>Loading property description of {propertyId}...</i>
        </td>
      </tr>
    </tbody>;
  }
}
