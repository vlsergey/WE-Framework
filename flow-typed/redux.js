// @flow

declare type DispatchType = any => void;

declare type GetStateType = void => any;

declare type NextType = ( any ) => void;

declare interface StoreType {
  +dispatch : DispatchType,
  +getState : GetStateType,
}
