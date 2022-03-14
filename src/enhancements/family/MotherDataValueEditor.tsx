import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import FamilyMemberDataValueEditor from './FamilyMemberDataValueEditor';

const GENDER_FEMALE = 'Q6581072';

const PROPERTY_FATHER = 'P22';
const PROPERTY_SPOUSE = 'P26';
const PROPERTIES_MAPPING: Map< string, string > = Object.freeze(new Map([
  // by default father of current entity will be spouse of new entity
  [PROPERTY_FATHER, PROPERTY_SPOUSE]
]));

interface PropsType {
  datavalue: DataValueType | null;
  onDataValueChange: (dataValue: DataValueType | null) => any;
  propertyDescription: PropertyDescription;
}

export default class MotherDataValueEditor extends PureComponent<PropsType> {

  override render () {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={GENDER_FEMALE}
      propertiesMapping={PROPERTIES_MAPPING}
      propertyIdSelfInto="P40" />;
  }
}
