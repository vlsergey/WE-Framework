declare namespace SparqlPropertyGroupCssNamespace {
  export interface ISparqlPropertyGroupCss {
    sparql_property_group: string;
  }
}

declare const SparqlPropertyGroupCssModule: SparqlPropertyGroupCssNamespace.ISparqlPropertyGroupCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SparqlPropertyGroupCssNamespace.ISparqlPropertyGroupCss;
};

export = SparqlPropertyGroupCssModule;
