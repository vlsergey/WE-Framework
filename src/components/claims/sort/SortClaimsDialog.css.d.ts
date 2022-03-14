declare namespace SortClaimsDialogCssNamespace {
  export interface ISortClaimsDialogCss {
    dialogTable: string;
  }
}

declare const SortClaimsDialogCssModule: SortClaimsDialogCssNamespace.ISortClaimsDialogCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SortClaimsDialogCssNamespace.ISortClaimsDialogCss;
};

export = SortClaimsDialogCssModule;
