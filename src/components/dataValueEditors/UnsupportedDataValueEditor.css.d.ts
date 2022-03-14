declare namespace UnsupportedDataValueEditorCssNamespace {
  export interface IUnsupportedDataValueEditorCss {
    wef_datavalue_unsupported: string;
  }
}

declare const UnsupportedDataValueEditorCssModule: UnsupportedDataValueEditorCssNamespace.IUnsupportedDataValueEditorCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UnsupportedDataValueEditorCssNamespace.IUnsupportedDataValueEditorCss;
};

export = UnsupportedDataValueEditorCssModule;
