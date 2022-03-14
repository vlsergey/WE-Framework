declare namespace SelectRankButtonCellCssNamespace {
  export interface ISelectRankButtonCellCss {
    selectRankPopup: string;
  }
}

declare const SelectRankButtonCellCssModule: SelectRankButtonCellCssNamespace.ISelectRankButtonCellCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SelectRankButtonCellCssNamespace.ISelectRankButtonCellCss;
};

export = SelectRankButtonCellCssModule;
