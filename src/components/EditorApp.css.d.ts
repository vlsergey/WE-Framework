declare namespace EditorAppCssNamespace {
  export interface IEditorAppCss {
    importDataButton: string;
    wef_dialog: string;
  }
}

declare const EditorAppCssModule: EditorAppCssNamespace.IEditorAppCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: EditorAppCssNamespace.IEditorAppCss;
};

export = EditorAppCssModule;
