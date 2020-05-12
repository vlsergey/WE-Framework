
export type AliasesType = {| [string] : LabelalikeType[] |};

export type EditClaimType = {
  id? : string,
  mainsnak? : SnakType,
  qualifiers? : QualifiersType,
  rank? : RankType,
  references? : ReferenceType[],
  remove? : '',
  type? : string,
};

export type ClaimType = {
  id : string,
  mainsnak? : SnakType,
  qualifiers? : QualifiersType,
  rank? : RankType,
  references? : ReferenceType[],
  type? : string,
};

export type ClaimsType = { [string] : ClaimType[] };

export type DataValueType = {
  type : string,
  value? : ?any,
};

export type DescriptionsType = {| [string] : LabelalikeType |};

export type EntityType = {
  aliases? : AliasesType,
  claims? : ClaimsType,
  descriptions? : DescriptionsType,
  // internal structure to hold non-commited aliases
  draftAliases? : ?{| [string] : LabelalikeType |},
  id? : string,
  labels? : LabelsType,
  lastrevid? : number,
  missing? : '',
  ns? : string,
  pageid? : number,
  sitelinks? : SiteLinksType,
  // may be missing for new item
  title? : string,
};

export type EntityTypeEnum = 'item' | 'property';

export type ItemType = EntityType & {
  id? : string,
  type : 'item',
};

export type LabelalikeType = {
  language : string,
  value : string,
};

export type LabelsType = {| [string] : LabelalikeType |};

export type PropertyType = EntityType & {
  datatype : string,
  type : 'property',
};

export type QualifierType = SnakType & {
};

export type QualifiersType = { [string] : QualifierType[] };

export type QuantityValueType = {
  amount? : string,
  lowerBound? : string,
  unit? : string,
  upperBound? : string,
};

export type RankType = 'preferred' | 'normal' | 'deprecated';

export type ReferenceType = {
  hash? : string,
  snaks : SnaksType,
  ['snaks-order'] : ?string[],
};

export type SiteLinkType = {
  badges : string[],
  site : string,
  title : string,
};

export type SiteLinksType = {| [string] : SiteLinkType |};

export type SnakTypeType = 'value' | 'novalue' | 'somevalue';

export type SnakType = {
  datatype? : string,
  datavalue? : DataValueType,
  hash? : string,
  id? : string,
  property? : string,
  snaktype? : SnakTypeType,
  type? : string,
};

export type SnaksType = {| [string] : SnakType[] |};

export type WikibaseEntityIdValueType = {
  'entity-type' : EntityTypeEnum,
  'numeric-id' : number,
  id? : ?string,
};
