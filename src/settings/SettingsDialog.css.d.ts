declare namespace SettingsDialogCssNamespace {
  export interface ISettingsDialogCss {
    editorItem: string;
  }
}

declare const SettingsDialogCssModule: SettingsDialogCssNamespace.ISettingsDialogCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsDialogCssNamespace.ISettingsDialogCss;
};

export = SettingsDialogCssModule;
