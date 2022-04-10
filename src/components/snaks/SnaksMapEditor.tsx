import React, {PureComponent, useCallback} from 'react';

import usePropertyDescription from '../../caches/usePropertyDescription';
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

    return propertyIds.map(propertyId =>
      <PropertySnaksEditTBody
        key={propertyId}
        propertyId={propertyId}
        readOnly={readOnly}
        removeButtonConfirmMessageF={removeButtonConfirmMessageF}
        removeButtonLabel={removeButtonLabel}
        snaksMap={snaksMap} />
    );
  }

}

interface PropertySnaksEditTBodyProps {
  onSnaksMapUpdate?: (value: SnaksMap) => any;
  propertyId: string;
  readOnly?: boolean;
  removeButtonConfirmMessageF: (pd: PropertyDescription) => string;
  removeButtonLabel: string;
  snaksMap?: SnaksMap;
}

const PropertySnaksEditTBody = ({
  propertyId,
  onSnaksMapUpdate,
  readOnly,
  removeButtonConfirmMessageF,
  removeButtonLabel,
  snaksMap
}: PropertySnaksEditTBodyProps) => {
  const propertyDescription = usePropertyDescription(propertyId);

  const handleSnaksArrayUpdate = useCallback((snaksArray: null | SnakType[]) => {
    if (!onSnaksMapUpdate) return;

    if (snaksArray == null) {
      const newMap = {...snaksMap};
      delete newMap[propertyId];
      onSnaksMapUpdate(newMap);
    } else {
      onSnaksMapUpdate({...snaksMap, [propertyId]: snaksArray});
    }
  }, [onSnaksMapUpdate, propertyId, snaksMap]);

  if (!propertyDescription) {
    return <PropertyIsLoadingTBody
      key={propertyId}
      propertyId={propertyId} />;
  }

  const removeButtonConfirmMessage = removeButtonConfirmMessageF(propertyDescription);

  return <SnaksArrayEditor
    key={propertyId}
    onSnaksArrayUpdate={handleSnaksArrayUpdate}
    propertyDescription={propertyDescription}
    readOnly={readOnly}
    removeButtonConfirmMessage={removeButtonConfirmMessage}
    removeButtonLabel={removeButtonLabel}
    snaksArray={snaksMap?.[propertyId]} />;
};

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
