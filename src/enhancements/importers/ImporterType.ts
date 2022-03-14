export interface ImporterType {
  canImport : ( _ : any ) => boolean,
  key : string,
  label : string,
  process : ( _ : any, __ : any ) => any,
}
