import PropertyDescription from 'core/PropertyDescription';

export type BaseEditorPropsTypes = {
  datavalue? : ?DataValueType,
  onDataValueChange : any => any,
  propertyDescription? : ?PropertyDescription,
  readOnly? : ?boolean,
};
