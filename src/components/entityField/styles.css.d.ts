declare namespace StylesCssNamespace {
  export interface IStylesCss {
    container: string;
    containerOpen: string;
    highlight: string;
    suggestion: string;
    suggestionContainer: string;
    suggestionDescription: string;
    suggestionHighlighted: string;
    suggestionImage: string;
    suggestionLabel: string;
    suggestionText: string;
    suggestionsContainer: string;
    suggestionsList: string;
  }
}

declare const StylesCssModule: StylesCssNamespace.IStylesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesCssNamespace.IStylesCss;
};

export = StylesCssModule;
