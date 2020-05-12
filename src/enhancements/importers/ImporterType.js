// @flow

export interface ImporterType {
  +canImport : ( any ) => boolean,
  +key : string,
  +label : string,
  +process : ( DispatchType, any ) => any,
}
