
export type ChildrenContainerDefType = {
  fields? : FieldDefType[],
  fieldsets? : FieldsetDefType[],
  specials? : SpecialDefType[],
};

export type EditorDefType = {
  dialogTitle : string,
  linkText : string,
  tabs? : TabDefType[],
};

export type FieldDefType = {
  property : string,
};

export type FieldsetDefType = ChildrenContainerDefType & {
  key? : string,
  label?: string,
  labelEntity? : string,
  labelEntityId? : string,
};

export type SpecialDefType = {
  key? : string,
  type : string,
};

export type TabDefType = ChildrenContainerDefType & {
  key : string,
  label : string,
  labelEntityId : string,
};
