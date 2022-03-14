declare namespace CreateNewButtonCellCssNamespace {
  export interface ICreateNewButtonCellCss {
    button: string;
    buttonRecommend: string;
    buttonUsual: string;
  }
}

declare const CreateNewButtonCellCssModule: CreateNewButtonCellCssNamespace.ICreateNewButtonCellCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CreateNewButtonCellCssNamespace.ICreateNewButtonCellCss;
};

export = CreateNewButtonCellCssModule;
