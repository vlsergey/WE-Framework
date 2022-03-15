import React from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import FamilyMemberDataValueEditor from './FamilyMemberDataValueEditor';

const GENDER_FEMALE = 'Q6581072';

const PROPERTY_FATHER = 'P22';
const PROPERTY_SPOUSE = 'P26';
const PROPERTIES_MAPPING = Object.freeze(new Map([
  // by default father of current entity will be spouse of new entity
  [PROPERTY_FATHER, PROPERTY_SPOUSE]
]));

interface PropsType {
  datavalue: WikibaseEntityIdDataValue | null;
  onDataValueChange: (dataValue: WikibaseEntityIdDataValue | null) => unknown;
  propertyDescription: PropertyDescription;
}

const MotherDataValueEditor = (props: PropsType) =>
  <FamilyMemberDataValueEditor
    {...props}
    newEntityGenderEntityId={GENDER_FEMALE}
    propertiesMapping={PROPERTIES_MAPPING}
    propertyIdSelfInto="P40" />;

export default React.memo(MotherDataValueEditor);
