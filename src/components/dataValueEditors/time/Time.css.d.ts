declare namespace TimeCssNamespace {
  export interface ITimeCss {
    time: string;
    timeDetails: string;
    timeDetailsPopup: string;
    timeError: string;
    timeRendered: string;
  }
}

declare const TimeCssModule: TimeCssNamespace.ITimeCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TimeCssNamespace.ITimeCss;
};

export = TimeCssModule;
