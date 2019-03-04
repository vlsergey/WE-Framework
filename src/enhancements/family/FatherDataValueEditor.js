import React, {PureComponent} from 'react';
import FamilyMemberDataValueEditor from "./FamilyMemberDataValueEditor";

export default class FatherDataValueEditor extends PureComponent {

  constructor() {
    super( ...arguments );
  }

  render() {
    return <FamilyMemberDataValueEditor
      {...this.props}
      newEntityGenderEntityId="Q6581097"
      propertyIdSelfInto="P40"
      propertiesMapping={{ P25: "P26" }}
      />;
  }
}
