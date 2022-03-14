declare namespace FormCssNamespace {
  export interface IFormCss {
    quickSearchTable: string;
    wef_table: string;
  }
}

declare const FormCssModule: FormCssNamespace.IFormCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FormCssNamespace.IFormCss;
};

export = FormCssModule;
