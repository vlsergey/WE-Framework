declare namespace ClaimQualifiersTableCssNamespace {
  export interface IClaimQualifiersTableCss {
    wef_claim_new_qualifier: string;
    wef_claim_qualifiers_table: string;
  }
}

declare const ClaimQualifiersTableCssModule: ClaimQualifiersTableCssNamespace.IClaimQualifiersTableCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ClaimQualifiersTableCssNamespace.IClaimQualifiersTableCss;
};

export = ClaimQualifiersTableCssModule;
