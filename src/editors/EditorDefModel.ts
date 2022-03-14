export interface ChildrenContainerDefType {
  fields?: FieldDefType[];
  fieldsets?: FieldsetDefType[];
  specials?: SpecialGroup[];

  // TODO: find a better way to pass those props
  parentLabelEntityId?: string;
  quickSearch?: boolean;
  sortBy?: string[];
}

export interface EditorDefType {
  description?: string;
  dialogTitle: string;
  id: string;
  linkText: string;
  newEntityInstanceOf?: string;
  recommendedClasses?: string[];
  tabs: TabDefType[];
}

export interface FieldDefType {
  property: string;
}

export type FieldsetDefType = ChildrenContainerDefType & {
  key?: string;
  label?: string;
  labelEntity?: string;
  labelEntityId?: string;
};

export type SpecialGroup = LabelsAndDescriptionAreaSpecialGroup | SparqlSpecialGroup;

export interface LabelsAndDescriptionAreaSpecialGroup {
  key?: string;
  type: 'LabelsAndDescriptionArea';
}

export interface SparqlSpecialGroup {
  key?: string;
  sortBy?: string;
  sparql: string;
  type: 'SparqlPropertyGroup';
}

export type TabDefType = ChildrenContainerDefType & {
  key?: null | string;
  label?: null | string;
  labelEntityId?: null | string;
};
