
export interface BaseAction { type: string }

export interface LabelalikeAction extends BaseAction {
  type: 'LABELS_CHANGE' | 'DESCRIPTION_CHANGE' | 'DRAFT_ALIAS_CHANGE' | 'ALIASES_CHANGE';
  language: string;
  newValue: any;
}

export interface ClaimAddAction extends BaseAction {
  type: 'CLAIM_ADD';
  claimData: ClaimType;
  propertyId: string;
  datatype: string;
}

export interface ClaimDeleteAction extends BaseAction {
  type: 'CLAIM_DELETE';
  claim: ClaimType;
}

export interface ClaimUpdateAction extends BaseAction {
  type: 'CLAIM_UPDATE';
  claim: ClaimType;
}

export interface ClaimsFillAction extends BaseAction {
  type: 'CLAIMS_FILL';
  datatype: string;
  datavalue: DataValueType;
  normalizeF: (value: any) => any;
  property: string;
}

export interface ClaimsReorderAction extends BaseAction {
  type: 'CLAIMS_REORDER';
  propertyId: string;
  claimIds: string[];
}

export type AnyAction =
  LabelalikeAction |
  ClaimAddAction |
  ClaimDeleteAction |
  ClaimUpdateAction |
  ClaimsFillAction |
  ClaimsReorderAction;
