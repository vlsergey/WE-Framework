import FamilyMemberDataValueEditor, { oppositeGender } from './FamilyMemberDataValueEditor';
import React, { PureComponent } from 'react';
import PropertyDescription from '../../core/PropertyDescription';

const EMPTY_MAP : Map< string, string > = Object.freeze( new Map() );

type PropsType = {
  datavalue : DataValueType | null,
  onDataValueChange : (dataValue : DataValueType | null) => any,
  propertyDescription : PropertyDescription,
};

export default class SpouseDataValueEditor extends PureComponent<PropsType> {

  override render() {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={oppositeGender}
      propertiesMapping={EMPTY_MAP}
      propertyIdSelfInto="P26" />;
  }
}
