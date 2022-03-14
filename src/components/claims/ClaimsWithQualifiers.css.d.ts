declare namespace ClaimsWithQualifiersCssNamespace {
  export interface IClaimsWithQualifiersCss {
    claims_with_qualifiers: string;
    qualifier_table: string;
  }
}

declare const ClaimsWithQualifiersCssModule: ClaimsWithQualifiersCssNamespace.IClaimsWithQualifiersCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ClaimsWithQualifiersCssNamespace.IClaimsWithQualifiersCss;
};

export = ClaimsWithQualifiersCssModule;
