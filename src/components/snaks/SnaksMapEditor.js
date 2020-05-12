// @flow

import React, { PureComponent } from 'react';
import { COLUMNS_FOR_SNAK_ROW } from 'components/TableColSpanConstants';
import PropertyDescription from 'core/PropertyDescription';
import PropertyDescriptionsProvider from 'caches/PropertyDescriptionsProvider';
import SnaksArrayEditor from './SnaksArrayEditor';

type PropsType = {
  ignorePropertyIds : string[],
  onSnaksMapUpdate : any => any,
  readOnly : boolean,
  removeButtonConfirmMessageF : PropertyDescription => string,
  removeButtonLabel : string,
  snaksMap? : ?any,
};

export default class SnaksMapEditor extends PureComponent<PropsType> {

  static defaultProps = {
    ignorePropertyIds: [],
    readOnly: false,
  };

  handleSnaksArrayUpdateF( propertyDescription : PropertyDescription ) {
    return ( snaksArray : SnakType[] ) => {
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
        const propertyDescription : ?PropertyDescription = cache.get( propertyId );

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

type PropertyIsLoadingTBodyPropsType = {
  propertyId : string,
};

class PropertyIsLoadingTBody extends PureComponent<PropertyIsLoadingTBodyPropsType> {

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
