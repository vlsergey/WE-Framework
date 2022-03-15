import React from 'react';

import PropertyDescription from '../../core/PropertyDescription';
import FamilyMemberDataValueEditor, {oppositeGender} from './FamilyMemberDataValueEditor';

const EMPTY_MAP: Map< string, string > = Object.freeze(new Map());

interface PropsType {
  datavalue: WikibaseEntityIdDataValue | null;
  onDataValueChange: (dataValue: WikibaseEntityIdDataValue | null) => unknown;
  propertyDescription: PropertyDescription;
}

const PartnerDataValueEditor = (props: PropsType) =>
  <FamilyMemberDataValueEditor
    {...props}
    newEntityGenderEntityId={oppositeGender}
    propertiesMapping={EMPTY_MAP}
    propertyIdSelfInto="P451" />;

export default React.memo(PartnerDataValueEditor);
