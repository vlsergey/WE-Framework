// @flow

export type ChildrenContainerDefType = {
  fields? : FieldDefType[],
  fieldsets? : FieldsetDefType[],
  specials? : SpecialGroup[],
};

export type EditorDefType = {
  description? : ?string,
  dialogTitle : string,
  id : string,
  linkText : string,
  newEntityInstanceOf? : string,
  recommendedClasses? : string[],
  tabs : TabDefType[],
};

export type FieldDefType = {
  property : string,
};

export type FieldsetDefType = ChildrenContainerDefType & {
  key? : string,
  label? : string,
  labelEntity? : string,
  labelEntityId? : string,
};

export type SpecialGroup = LabelsAndDescriptionAreaSpecialGroup | SparqlSpecialGroup;

export type LabelsAndDescriptionAreaSpecialGroup = {|
  key? : string,
  type : 'LabelsAndDescriptionArea',
|};

export type SparqlSpecialGroup = {|
  key? : string,
  sortBy? : string,
  sparql : string,
  type : 'SparqlPropertyGroup',
|};

export type TabDefType = ChildrenContainerDefType & {
  key? : ?string,
  label? : ?string,
  labelEntityId? : ?string,
};
