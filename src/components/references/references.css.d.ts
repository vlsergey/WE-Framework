declare namespace ReferencesCssNamespace {
  export interface IReferencesCss {
    claimReferenceEditor: string;
    lruButton: string;
    lruLabel: string;
    referenceCounter: string;
    referencePropertyAlreadyPresent: string;
    referencePropertyUnsupported: string;
    referencesButton: string;
    referencesButtonCell: string;
    referencesEditorTable: string;
  }
}

declare const ReferencesCssModule: ReferencesCssNamespace.IReferencesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ReferencesCssNamespace.IReferencesCss;
};

export = ReferencesCssModule;
