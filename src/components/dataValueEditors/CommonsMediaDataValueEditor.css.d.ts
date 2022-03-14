declare namespace CommonsMediaDataValueEditorCssNamespace {
  export interface ICommonsMediaDataValueEditorCss {
    container: string;
    containerOpen: string;
    highlight: string;
    suggestion: string;
    suggestionContent: string;
    suggestionContentPreviewInner: string;
    suggestionContentPreviewOuter: string;
    suggestionContentText: string;
    suggestionHighlighted: string;
    suggestionsContainer: string;
    suggestionsList: string;
    wef_datavalue_commonsMedia: string;
  }
}

declare const CommonsMediaDataValueEditorCssModule: CommonsMediaDataValueEditorCssNamespace.ICommonsMediaDataValueEditorCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CommonsMediaDataValueEditorCssNamespace.ICommonsMediaDataValueEditorCss;
};

export = CommonsMediaDataValueEditorCssModule;
