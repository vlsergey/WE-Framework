declare namespace MonolingualTextCssNamespace {
  export interface IMonolingualTextCss {
    wef_monolingualtext: string;
    wef_monolingualtext_language: string;
    wef_monolingualtext_text: string;
  }
}

declare const MonolingualTextCssModule: MonolingualTextCssNamespace.IMonolingualTextCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MonolingualTextCssNamespace.IMonolingualTextCss;
};

export = MonolingualTextCssModule;
