declare namespace NewQualifierSelectCssNamespace {
  export interface INewQualifierSelectCss {
    alreadypresent: string;
    unsupported: string;
  }
}

declare const NewQualifierSelectCssModule: NewQualifierSelectCssNamespace.INewQualifierSelectCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NewQualifierSelectCssNamespace.INewQualifierSelectCss;
};

export = NewQualifierSelectCssModule;
