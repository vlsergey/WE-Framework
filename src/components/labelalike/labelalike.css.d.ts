declare namespace LabelalikeCssNamespace {
  export interface ILabelalikeCss {
    'react-tagsinput': string;
    'react-tagsinput--focused': string;
    'react-tagsinput-input': string;
    'react-tagsinput-remove': string;
    'react-tagsinput-tag': string;
  }
}

declare const LabelalikeCssModule: LabelalikeCssNamespace.ILabelalikeCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LabelalikeCssNamespace.ILabelalikeCss;
};

export = LabelalikeCssModule;
