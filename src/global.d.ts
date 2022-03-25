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
    value: null | unknown;
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

  type DataValueType =
    | GlobeCoordinateDataValue
    | MonolingualTextDataValue
    | QuantityDataValue
    | StringDataValue
    | TimeDataValue
    | WikibaseEntityIdDataValue;

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

  interface GlobeCoordinateDataValue extends BaseDataValue {
    type: 'globecoordinate';
    value: null | GlobeCoordinateValue;
  }

  interface GlobeCoordinateValue {
    latitude: null | number;
    longitude: null | number;
    altitude: null | number;
    precision: null | number;
    globe: null | string;
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
    language: null | string;
    text: null | string;
  }

  interface PropertyType extends EntityType {
    datatype: string;
    type: 'property';
    id: string;
  }

  type QualifierType = SnakType;

  type QualifiersType = Record<string, QualifierType[]>;

  interface QuantityDataValue extends BaseDataValue {
    type: 'quantity';
    value: null | QuantityValue;
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

  interface StringDataValue extends BaseDataValue {
    type: 'string';
    value: null | string;
  }

  interface TimeDataValue extends BaseDataValue {
    type: 'time';
    value: null | TimeValue;
  }

  interface TimeValue {
    time: string;
    timezone: number;
    before: number;
    after: number;
    precision: number;
    calendarmodel: string;
  }

  interface WikibaseEntityIdDataValue extends BaseDataValue {
    type: 'wikibase-entityid';
    value: null | WikibaseEntityIdValue;
  }

  interface WikibaseEntityIdValue {
    'entity-type': EntityTypeEnum;
    'numeric-id': number;
    id?: string | null | undefined;
  }
}

export {};
