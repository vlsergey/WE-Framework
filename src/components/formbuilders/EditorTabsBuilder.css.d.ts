declare namespace EditorTabsBuilderCssNamespace {
  export interface IEditorTabsBuilderCss {
    tabContent: string;
  }
}

declare const EditorTabsBuilderCssModule: EditorTabsBuilderCssNamespace.IEditorTabsBuilderCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: EditorTabsBuilderCssNamespace.IEditorTabsBuilderCss;
};

export = EditorTabsBuilderCssModule;
