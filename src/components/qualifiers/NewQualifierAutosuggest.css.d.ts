declare namespace NewQualifierAutosuggestCssNamespace {
  export interface INewQualifierAutosuggestCss {
    container: string;
    containerOpen: string;
    property_suggestion: string;
    property_suggestion_description: string;
    property_suggestion_label: string;
    suggestion: string;
    suggestionHighlighted: string;
    suggestionsContainer: string;
    suggestionsList: string;
  }
}

declare const NewQualifierAutosuggestCssModule: NewQualifierAutosuggestCssNamespace.INewQualifierAutosuggestCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NewQualifierAutosuggestCssNamespace.INewQualifierAutosuggestCss;
};

export = NewQualifierAutosuggestCssModule;
