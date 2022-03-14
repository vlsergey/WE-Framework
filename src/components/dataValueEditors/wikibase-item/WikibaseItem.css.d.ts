declare namespace WikibaseItemCssNamespace {
  export interface IWikibaseItemCss {
    "wef_datavalue_wikibase-item": string;
    "wef_datavalue_wikibase-item_readonly": string;
  }
}

declare const WikibaseItemCssModule: WikibaseItemCssNamespace.IWikibaseItemCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: WikibaseItemCssNamespace.IWikibaseItemCss;
};

export = WikibaseItemCssModule;
