declare namespace ButtonCellCssNamespace {
  export interface IButtonCellCss {
    buttonCell: string;
    'ui-button': string;
  }
}

declare const ButtonCellCssModule: ButtonCellCssNamespace.IButtonCellCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ButtonCellCssNamespace.IButtonCellCss;
};

export = ButtonCellCssModule;
