declare namespace LanguageAutocompleteCssNamespace {
  export interface ILanguageAutocompleteCss {
    container: string;
    containerOpen: string;
    highlight: string;
    provided: string;
    suggestion: string;
    suggestionContent: string;
    suggestionContentText: string;
    suggestionHighlighted: string;
    suggestionsContainer: string;
    suggestionsList: string;
  }
}

declare const LanguageAutocompleteCssModule: LanguageAutocompleteCssNamespace.ILanguageAutocompleteCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LanguageAutocompleteCssNamespace.ILanguageAutocompleteCss;
};

export = LanguageAutocompleteCssModule;
