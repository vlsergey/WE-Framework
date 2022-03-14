declare namespace QuantityCssNamespace {
  export interface IQuantityCss {
    modeselect: string;
    unitselect: string;
    wef_datavalue_quantity: string;
  }
}

declare const QuantityCssModule: QuantityCssNamespace.IQuantityCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: QuantityCssNamespace.IQuantityCss;
};

export = QuantityCssModule;
