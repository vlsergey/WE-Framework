import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import FamilyMemberDataValueEditor, {oppositeGender} from './FamilyMemberDataValueEditor';

const EMPTY_MAP: Map< string, string > = Object.freeze(new Map());

interface PropsType {
  datavalue: DataValueType | null;
  onDataValueChange: (dataValue: DataValueType | null) => any;
  propertyDescription: PropertyDescription;
}

export default class PartnerDataValueEditor extends PureComponent<PropsType> {

  override render () {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={oppositeGender}
      propertiesMapping={EMPTY_MAP}
      propertyIdSelfInto="P451" />;
  }
}
