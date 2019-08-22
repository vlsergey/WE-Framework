
export type DataValueType = {
  type : string,
  value? : ?any,
};

export type QuantityValueType = {
  amount? : string,
  lowerBound? : string,
  unit? : string,
  upperBound? : string,
};

export type EntityType = {
  claims? : any,
  id? : string,
  ns? : string,
  title? : string,
  type? : "item" | "property",
};

export type SnakType = {
  datavalue? : DataValueType,
  hash? : string,
  id? : string,
  property? : string,
  rank : 'preferred' | 'normal' | 'deprecated',
  snaktype? : 'value' | 'novalue' | 'somevalue',
  type? : string,
};
