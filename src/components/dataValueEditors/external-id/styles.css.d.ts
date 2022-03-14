declare namespace StylesCssNamespace {
  export interface IStylesCss {
    container: string;
    externalIdInput: string;
    externalIdTableCell: string;
    urlLink: string;
    urlTableCell: string;
  }
}

declare const StylesCssModule: StylesCssNamespace.IStylesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesCssNamespace.IStylesCss;
};

export = StylesCssModule;
