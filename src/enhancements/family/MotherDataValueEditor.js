// @flow

import React, { PureComponent } from 'react';
import FamilyMemberDataValueEditor from './FamilyMemberDataValueEditor';
import PropertyDescription from 'core/PropertyDescription';

const GENDER_FEMALE : string = 'Q6581072';

const PROPERTY_FATHER : string = 'P22';
const PROPERTY_SPOUSE : string = 'P26';
const PROPERTIES_MAPPING = Object.freeze( {
  // by default father of current entity will be spouse of new entity
  [ PROPERTY_FATHER ]: PROPERTY_SPOUSE
} );

type PropsType = {
  datavalue? : ?DataValueType,
  onDataValueChange : DataValueType => any,
  propertyDescription : PropertyDescription,
};

export default class MotherDataValueEditor extends PureComponent<PropsType> {

  render() {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={GENDER_FEMALE}
      propertiesMapping={PROPERTIES_MAPPING}
      propertyIdSelfInto="P40" />;
  }
}
