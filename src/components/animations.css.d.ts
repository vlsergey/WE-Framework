declare namespace AnimationsCssNamespace {
  export interface IAnimationsCss {
    animatedFateIn: string;
    fadeIn: string;
  }
}

declare const AnimationsCssModule: AnimationsCssNamespace.IAnimationsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AnimationsCssNamespace.IAnimationsCss;
};

export = AnimationsCssModule;
