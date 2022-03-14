declare namespace StylesCssNamespace {
  export interface IStylesCss {
    additionalArgumentsDialog: string;
    entityClasses: string;
    entityId: string;
    newSourceTab: string;
    searchTermInput: string;
    sourceItem: string;
    sourceLookupTab: string;
    sourcePreview: string;
  }
}

declare const StylesCssModule: StylesCssNamespace.IStylesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesCssNamespace.IStylesCss;
};

export = StylesCssModule;
