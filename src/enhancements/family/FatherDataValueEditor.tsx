import React, {PureComponent} from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import FamilyMemberDataValueEditor from './FamilyMemberDataValueEditor';

const GENDER_MALE = 'Q6581097';

const PROPERTY_MOTHER = 'P25';
const PROPERTY_SPOUSE = 'P26';
const PROPERTIES_MAPPING: Map< string, string > = Object.freeze(new Map([
  // by default mother of current entity will be spouse of new entity
  [PROPERTY_MOTHER, PROPERTY_SPOUSE]
]));

interface PropsType {
  datavalue: DataValueType | null;
  onDataValueChange: (dataValue: DataValueType | null) => any;
  propertyDescription: PropertyDescription;
}

export default class FatherDataValueEditor extends PureComponent<PropsType> {

  override render () {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId={GENDER_MALE}
      propertiesMapping={PROPERTIES_MAPPING}
      propertyIdSelfInto="P40" />;
  }
}
