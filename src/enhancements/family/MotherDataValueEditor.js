import React, {PureComponent} from 'react';
import FamilyMemberDataValueEditor from "./FamilyMemberDataValueEditor";

export default class MotherDataValueEditor extends PureComponent {

  constructor() {
    super( ...arguments );
  }

  render() {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId="Q6581072"
      propertyIdSelfInto="P40"
      propertiesMapping={{ P22: "P26" }}
      />;
  }
}
