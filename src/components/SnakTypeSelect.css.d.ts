declare namespace SnakTypeSelectCssNamespace {
  export interface ISnakTypeSelectCss {
    select: string;
  }
}

declare const SnakTypeSelectCssModule: SnakTypeSelectCssNamespace.ISnakTypeSelectCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SnakTypeSelectCssNamespace.ISnakTypeSelectCss;
};

export = SnakTypeSelectCssModule;
