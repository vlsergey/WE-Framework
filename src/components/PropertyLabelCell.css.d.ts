declare namespace PropertyLabelCellCssNamespace {
  export interface IPropertyLabelCellCss {
    wef_property_label: string;
  }
}

declare const PropertyLabelCellCssModule: PropertyLabelCellCssNamespace.IPropertyLabelCellCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PropertyLabelCellCssNamespace.IPropertyLabelCellCss;
};

export = PropertyLabelCellCssModule;
