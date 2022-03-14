declare global {

export type AliasesType = { [key: string] : LabelalikeType[] };

  type EditClaimType = {
    id? : string,
    mainsnak? : SnakType,
    qualifiers? : QualifiersType,
    rank? : RankType,
    references? : ReferenceType[],
    remove? : '',
    type? : string,
  };

  type ClaimType = {
    id : string,
    mainsnak : SnakType,
    qualifiers? : QualifiersType,
    'qualifiers-order'? : string[],
    rank? : RankType,
    references? : ReferenceType[],
    type? : string,
  };

  type ClaimsType = { [key : string] : ClaimType[] };

  type DataValueType = {
    type : string,
    value? : any | null | undefined,
  };

  type DescriptionsType = { [key : string] : LabelalikeType };

  type EntityType = {
    aliases? : AliasesType,
    claims? : ClaimsType,
    descriptions? : DescriptionsType,
    // internal structure to hold non-commited aliases
    draftAliases? : { [key : string] : LabelalikeType } | null | undefined,
    id? : string,
    labels? : LabelsType,
    lastrevid? : number,
    missing? : '',
    ns? : string,
    pageid? : number,
    sitelinks? : SiteLinksType,
    // may be missing for new item
    title? : string,
    type? : EntityTypeEnum,
  };

  type EntityTypeEnum = 'item' | 'property';

  type ItemType = EntityType & {
    id? : string,
    type : 'item',
  };

  export type LabelalikeType = {
    language : string,
    value : string,
  };

  type LabelsType = { [key : string] : LabelalikeType };

  type PropertyType = EntityType & {
    datatype : string,
    type : 'property',
  };

  type QualifierType = SnakType & {
  };

  type QualifiersType = { [key : string] : QualifierType[] };

  type QuantityValueType = {
    amount? : string,
    lowerBound? : string,
    unit? : string,
    upperBound? : string,
  };

  export type RankType = string & ('preferred' | 'normal' | 'deprecated');

  export type ReferenceType = {
    hash? : string,
    snaks : SnaksType,
    ['snaks-order']? : string[] | null | undefined,
  };

  type SiteLinkType = {
    badges : string[],
    site : string,
    title : string,
  };

  type SiteLinksType = { [key : string] : SiteLinkType };

  type SnaksMap = { [propertyId : string] : SnakType[] };

  type SnakTypeType = 'value' | 'novalue' | 'somevalue';

  type SnakType = {
    datatype? : string,
    datavalue? : DataValueType,
    hash? : string,
    id? : string,
    property : string,
    snaktype : SnakTypeType,
    type? : string,
  };

  type SnaksType = { [key : string] : SnakType[] };

  type WikibaseEntityIdValueType = {
    'entity-type' : EntityTypeEnum,
    'numeric-id' : number,
    id? : string | null | undefined,
  }

  var jQuery : any;
  var mw : any;
  var OO : any;
  var ve : any;
}

export {}
