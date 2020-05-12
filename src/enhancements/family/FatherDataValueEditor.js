// @flow

import React, { PureComponent } from 'react';
import FamilyMemberDataValueEditor from './FamilyMemberDataValueEditor';
import PropertyDescription from 'core/PropertyDescription';

const GENDER_MALE : string = 'Q6581097';

const PROPERTY_MOTHER : string = 'P25';
const PROPERTY_SPOUSE : string = 'P26';
const PROPERTIES_MAPPING = Object.freeze( {
  // by default mother of current entity will be spouse of new entity
  [ PROPERTY_MOTHER ]: PROPERTY_SPOUSE
} );

type PropsType = {
  datavalue? : ?DataValueType,
  onDataValueChange : DataValueType => any,
  propertyDescription : PropertyDescription,
};

export default class FatherDataValueEditor extends PureComponent<PropsType> {

  render() {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={GENDER_MALE}
      propertiesMapping={PROPERTIES_MAPPING}
      propertyIdSelfInto="P40" />;
  }
}
