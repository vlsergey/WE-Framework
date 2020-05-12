// @flow

import FamilyMemberDataValueEditor, { oppositeGender } from './FamilyMemberDataValueEditor';
import React, { PureComponent } from 'react';
import PropertyDescription from 'core/PropertyDescription';

const EMPTY_OBJECT : any = Object.freeze( {} );

type PropsType = {
  datavalue? : ?DataValueType,
  onDataValueChange : DataValueType => any,
  propertyDescription : PropertyDescription,
};

export default class PartnerDataValueEditor extends PureComponent<PropsType> {

  render() {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={oppositeGender}
      propertiesMapping={EMPTY_OBJECT}
      propertyIdSelfInto="P451" />;
  }
}
