import React, {PureComponent} from 'react';

import PropertyDescriptionsProvider from '../../caches/PropertyDescriptionsProvider';
import PropertyDescription from '../../core/PropertyDescription';
import {COLUMNS_FOR_SNAK_ROW} from '../TableColSpanConstants';
import SnaksArrayEditor from './SnaksArrayEditor';

interface PropsType {
  ignorePropertyIds?: readonly string[];
  onSnaksMapUpdate?: (value: SnaksMap) => any;
  readOnly?: boolean;
  removeButtonConfirmMessageF: (pd: PropertyDescription) => string;
  removeButtonLabel: string;
  snaksMap?: SnaksMap;
}

export default class SnaksMapEditor extends PureComponent<PropsType> {

  handleSnaksArrayUpdateF (propertyDescription: PropertyDescription) {
    return (snaksArray: null | SnakType[]) => {
      if (!this.props.onSnaksMapUpdate) return;

      if (snaksArray == null) {
        const newMap = {...this.props.snaksMap};
        delete newMap[propertyDescription.id];
        this.props.onSnaksMapUpdate(newMap);
      } else {
        this.props.onSnaksMapUpdate({
          ...this.props.snaksMap,
          [propertyDescription.id]: snaksArray || [],
        });
      }
    };
  }

  override render () {
    const {ignorePropertyIds, readOnly, removeButtonLabel, removeButtonConfirmMessageF, snaksMap} = this.props;

    if (!snaksMap) return null;

    const propertyIds = ignorePropertyIds === undefined ? Object.keys(snaksMap) :
      Object.keys(snaksMap).filter(propertyId => !ignorePropertyIds.includes(propertyId));
    return <PropertyDescriptionsProvider propertyIds={propertyIds}>
      {cache => propertyIds.map(propertyId => {
        const propertyDescription = cache[propertyId];

        if (!propertyDescription) {
          return <PropertyIsLoadingTBody
            key={propertyId}
            propertyId={propertyId} />;
        }

        const removeButtonConfirmMessage = removeButtonConfirmMessageF(propertyDescription);

        return <SnaksArrayEditor
          key={propertyId}
          onSnaksArrayUpdate={this.handleSnaksArrayUpdateF(propertyDescription)}
          propertyDescription={propertyDescription}
          readOnly={readOnly}
          removeButtonConfirmMessage={removeButtonConfirmMessage}
          removeButtonLabel={removeButtonLabel}
          snaksArray={snaksMap[propertyId]} />;
      })}
    </PropertyDescriptionsProvider>;
  }

}

interface PropertyIsLoadingTBodyPropsType {
  propertyId: string;
}

class PropertyIsLoadingTBody extends PureComponent<PropertyIsLoadingTBodyPropsType> {

  override render () {
    const {propertyId} = this.props;

    return <tbody key={propertyId}>
      <tr>
        <td colSpan={COLUMNS_FOR_SNAK_ROW}>
          <i>Loading property description of {propertyId}...</i>
        </td>
      </tr>
    </tbody>;
  }
}
