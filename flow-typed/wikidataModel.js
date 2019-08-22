
export type DataValueType = {
  type : string,
  value? : ?any,
};

export type ClaimType = {
  id? : string,
  mainsnak? : SnakType,
  qualifiers? : { [string] : QualifierType[] },
  rank? : string,
  type? : string,
};

export type EntityType = {
  claims? : any,
  id? : string,
  ns? : string,
  title? : string,
  type? : "item" | "property",
};

export type SnakType = {
  datatype? : string,
  datavalue? : DataValueType,
  hash? : string,
  id? : string,
  property? : string,
  snaktype? : 'value' | 'novalue' | 'somevalue',
  type? : string,
};

export type QualifierType = {
  datavalue? : DataValueType,
};

export type QuantityValueType = {
  amount? : string,
  lowerBound? : string,
  unit? : string,
  upperBound? : string,
};
