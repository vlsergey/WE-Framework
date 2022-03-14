declare namespace UrlDataValueEditorCssNamespace {
  export interface IUrlDataValueEditorCss {
    wef_datavalue_url: string;
    wef_datavalue_url_readonly: string;
  }
}

declare const UrlDataValueEditorCssModule: UrlDataValueEditorCssNamespace.IUrlDataValueEditorCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: UrlDataValueEditorCssNamespace.IUrlDataValueEditorCss;
};

export = UrlDataValueEditorCssModule;
