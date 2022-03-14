declare namespace SelectSnakTypeButtonCellCssNamespace {
  export interface ISelectSnakTypeButtonCellCss {
    selectSnakTypePopup: string;
    'ui-icon-wef-snaktype-novalue': string;
    'ui-icon-wef-snaktype-somevalue': string;
    'ui-icon-wef-snaktype-value': string;
  }
}

declare const SelectSnakTypeButtonCellCssModule: SelectSnakTypeButtonCellCssNamespace.ISelectSnakTypeButtonCellCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SelectSnakTypeButtonCellCssNamespace.ISelectSnakTypeButtonCellCss;
};

export = SelectSnakTypeButtonCellCssModule;
