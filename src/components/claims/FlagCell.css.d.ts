declare namespace FlagCellCssNamespace {
  export interface IFlagCellCss {
    wef_flag_cell: string;
  }
}

declare const FlagCellCssModule: FlagCellCssNamespace.IFlagCellCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FlagCellCssNamespace.IFlagCellCss;
};

export = FlagCellCssModule;
