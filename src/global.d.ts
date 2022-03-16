declare global {

  export type AliasesType = Record<string, LabelalikeType[]>;

  interface EditClaimType {
    id?: string;
    mainsnak?: SnakType;
    qualifiers?: QualifiersType;
    rank?: RankType;
    references?: ReferenceType[];
    remove?: '';
    type?: string;
  }

  interface BaseDataValue {
    type: string;
    value?: any | null | undefined;
  }

  interface ClaimType {
    id: string;
    mainsnak: SnakType;
    qualifiers?: QualifiersType;
    'qualifiers-order'?: string[];
    rank?: RankType;
    references?: ReferenceType[];
    type?: string;
  }

  type ClaimsType = Record<string, ClaimType[]>;

  interface CommonsMediaDataValue extends BaseDataValue {
    type: 'string';
    value: string;
  }

  interface DataValueType {
    type: string;
    value?: any | null;
  }

  type DescriptionsType = Record<string, LabelalikeType>;

  interface EntityType {
    aliases?: AliasesType;
    claims?: ClaimsType;
    descriptions?: DescriptionsType;
    // internal structure to hold non-commited aliases
    draftAliases?: Record<string, LabelalikeType> | null | undefined;
    id?: string;
    labels?: LabelsType;
    lastrevid?: number;
    missing?: '';
    modified?: string;
    ns?: number;
    pageid?: number;
    sitelinks?: SiteLinksType;
    // may be missing for new item
    title?: string;
    type?: EntityTypeEnum;
  }

  type EntityTypeEnum = 'item' | 'property';

  interface ItemType extends EntityType {
    id?: string;
    type: 'item';
  }

  export interface LabelalikeType {
    language: string;
    value: string;
  }

  type LabelsType = Record<string, LabelalikeType>;

  interface MonolingualTextDataValue extends BaseDataValue {
    type: 'monolingualtext';
    value: MonolingualTextValue;
  }

  interface MonolingualTextValue {
    language: string;
    text?: string;
  }

  interface PropertyType extends EntityType {
    datatype: string;
    type: 'property';
    id: string;
  }

  type QualifierType = SnakType;

  type QualifiersType = Record<string, QualifierType[]>;

  interface QuantityDataValue extends DataValueType {
    type: 'quantity';
    value?: QuantityValue;
  }

  interface QuantityValue {
    amount?: string;
    lowerBound?: string;
    unit?: string;
    upperBound?: string;
  }

  export type RankType = string & ('preferred' | 'normal' | 'deprecated');

  export interface ReduxState {
    entity: EntityType;
    originalEntity: EntityType;
  }

  export interface ReferenceType {
    hash?: string;
    snaks: SnaksType;
    ['snaks-order']?: string[] | null | undefined;
  }

  interface SiteLinkType {
    badges: string[];
    site: string;
    title: string;
  }

  type SiteLinksType = Record<string, SiteLinkType>;

  type SnaksMap = Record<string, SnakType[]>;

  type SnakTypeType = 'value' | 'novalue' | 'somevalue';

  interface SnakType {
    datatype?: string;
    datavalue?: DataValueType;
    hash?: string;
    id?: string;
    property: string;
    snaktype: SnakTypeType;
    type?: string;
  }

  type SnaksType = Record<string, SnakType[]>;

  interface WikibaseEntityIdDataValue extends BaseDataValue {
    type: 'wikibase-entityid';
    value: null | WikibaseEntityIdValueType;
  }

  interface WikibaseEntityIdValueType {
    'entity-type': EntityTypeEnum;
    'numeric-id': number;
    id?: string | null | undefined;
  }

  const jQuery: any;
  const mw: any;
  const OO: any;
  const ve: any;
}

export {};
