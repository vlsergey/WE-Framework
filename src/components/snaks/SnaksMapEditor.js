import React, { PureComponent } from 'react';
import { COLUMNS_FOR_SNAK_ROW } from 'components/TableColSpanConstants';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import PropTypes from 'prop-types';
import SnaksArrayEditor from './SnaksArrayEditor';

export default class SnaksMapEditor extends PureComponent {

  static propTypes = {
    ignorePropertyIds: PropTypes.arrayOf( PropTypes.string ),
    onSnaksMapUpdate: PropTypes.func.isRequired,
    snaksMap: PropTypes.object,
    readOnly: PropTypes.bool,
    removeButtonLabel: PropTypes.string.isRequired,
    removeButtonConfirmMessageF: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ignorePropertyIds: [],
    readOnly: false,
  };

  handleSnaksArrayUpdateF( propertyDescription ) {
    return snaksArray => {
      this.props.onSnaksMapUpdate( {
        ...this.props.snaksMap,
        [ propertyDescription.id ]: snaksArray,
      } );
    };
  }

  render() {
    const { ignorePropertyIds, readOnly, removeButtonLabel, removeButtonConfirmMessageF, snaksMap } = this.props;

    if ( !snaksMap ) return null;

    const propertyIds = Object.keys( snaksMap )
      .filter( propertyId => ignorePropertyIds.indexOf( propertyId ) === -1 );
    return <PropertyDescriptionsProvider propertyIds={propertyIds}>
      {cache => propertyIds.map( propertyId => {
        const propertyDescription : ?PropertyDescription = cache[ propertyId ];

        if ( !propertyDescription ) {
          return <PropertyIsLoadingTBody
            key={propertyId}
            propertyId={propertyId} />;
        }

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
  };

  render() {
    const { propertyId } = this.props;

    return <tbody key={propertyId}>
      <tr>
        <td colSpan={COLUMNS_FOR_SNAK_ROW}>
          <i>Loading property description of {propertyId}...</i>
        </td>
      </tr>
    </tbody>;
  }
}
