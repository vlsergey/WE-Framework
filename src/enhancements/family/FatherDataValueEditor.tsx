import React from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import FamilyMemberDataValueEditor from './FamilyMemberDataValueEditor';

const GENDER_MALE = 'Q6581097';

const PROPERTY_MOTHER = 'P25';
const PROPERTY_SPOUSE = 'P26';
const PROPERTIES_MAPPING = Object.freeze(new Map([
  // by default mother of current entity will be spouse of new entity
  [PROPERTY_MOTHER, PROPERTY_SPOUSE]
]));

interface PropsType {
  datavalue: WikibaseEntityIdDataValue | null;
  onDataValueChange: (dataValue: WikibaseEntityIdDataValue | null) => unknown;
  propertyDescription: PropertyDescription;
}

const MotherDataValueEditor = (props: PropsType) =>
  <FamilyMemberDataValueEditor
    {...props}
    newEntityGenderEntityId={GENDER_MALE}
    propertiesMapping={PROPERTIES_MAPPING}
    propertyIdSelfInto="P40" />;

export default React.memo(MotherDataValueEditor);
