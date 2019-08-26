
export type ClaimType = {
  id? : string,
  mainsnak? : SnakType,
  qualifiers? : { [string] : QualifierType[] },
  rank? : string,
  remove? : '',
  type? : string,
};

export type ClaimsType = { [string] : ClaimType[] };

export type DataValueType = {
  type : string,
  value? : ?any,
};

export type EntityType = {
  aliases? : { [string] : any },
  claims? : ClaimsType,
  descriptions? : { [string] : any },
  id? : string,
  labels? : { [string] : any },
  lastrevid? : number,
  missing? : '',
  ns? : string,
  pageid? : number,
  sitelinks? : { [string] : any },
  // may be missing for new item
  title? : string,
  type : 'item',
};

export type PropertyType = {
  aliases? : { [string] : any },
  claims? : { [string] : ClaimType[] },
  datatype : string,
  descriptions? : { [string] : any },
  id : string,
  labels? : { [string] : any },
  lastrevid? : number,
  missing? : '',
  ns? : string,
  pageid? : number,
  title? : string,
  type : 'property',
};

export type QualifierType = SnakType & {
};

export type QuantityValueType = {
  amount? : string,
  lowerBound? : string,
  unit? : string,
  upperBound? : string,
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
