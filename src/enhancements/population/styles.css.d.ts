declare namespace StylesCssNamespace {
  export interface IStylesCss {
    cellPopulation: string;
    cellYear: string;
    entry: string;
    entryTerm: string;
    queryStateDiv: string;
    resultTableRow: string;
  }
}

declare const StylesCssModule: StylesCssNamespace.IStylesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesCssNamespace.IStylesCss;
};

export = StylesCssModule;
