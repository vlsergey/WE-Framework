declare namespace CoreCssNamespace {
  export interface ICoreCss {
    'wef-rankselector-menu': string;
    wef_columns_table: string;
    wef_editor_dialog: string;
    wef_editor_menu: string;
    wef_fieldset: string;
    wef_globecoordinate_table: string;
    wef_i18n_description: string;
    wef_i18n_description_as_title: string;
    wef_i18n_label: string;
    wef_labels_description_area: string;
    wef_property_editor_column_cell: string;
    wef_property_editor_column_table: string;
    wef_qualifiers: string;
    wef_qualifiers_select_cell: string;
    wef_quantity_table: string;
    wef_reference_editor: string;
    wef_reference_editor_ref: string;
    wef_reference_editor_table: string;
    wef_references_editor_dialog: string;
    wef_snak_table: string;
    wef_snak_table_value_editor_cell: string;
    wef_snak_type_label: string;
    wef_snak_value_editor_time: string;
    'wef_snak_value_editor_time-days': string;
    'wef_snak_value_editor_time-months': string;
    'wef_snak_value_editor_time-years': string;
    wef_string: string;
    wef_time_day: string;
    wef_time_oldstyle_span: string;
    wef_time_table: string;
    wef_time_year: string;
    wef_url: string;
  }
}

declare const CoreCssModule: CoreCssNamespace.ICoreCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CoreCssNamespace.ICoreCss;
};

export = CoreCssModule;
