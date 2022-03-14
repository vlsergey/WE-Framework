declare namespace ModeSelectCssNamespace {
  export interface IModeSelectCss {
    compatible: string;
    incompatible: string;
  }
}

declare const ModeSelectCssModule: ModeSelectCssNamespace.IModeSelectCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModeSelectCssNamespace.IModeSelectCss;
};

export = ModeSelectCssModule;
