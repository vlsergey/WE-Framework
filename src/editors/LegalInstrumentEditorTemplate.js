import i18n from './i18n';

const editorDescription = {
  id: 'LegalInstrument',
  linkText: i18n.legalInstrumentLinkText,
  description: i18n.legalInstrumentDescription,
  dialogTitle: i18n.legalInstrumentDialogTitle,
  newEntityInstanceOf: 'Q1428955',
  recommendedClasses: [ 'Q1428955' ],
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fieldsets: [
        {
          fields: [
            { property: 'P31' } /* instance of */,
            { property: 'P1476' } /* title */,
            { property: 'P1680' } /* subtitle */,
            { property: 'P571' } /* date of foundation or creation */,
            { property: 'P1545' } /* series ordinal */,
            { property: 'P407' } /* language of work or name */,
            { property: 'P577' } /* date of publication */,
          ],
        },
        {
          fields: [
            { property: 'P50' } /* author */,
            { property: 'P767' } /* collaborator */,
            { property: 'P98' } /* editor */,
          ],
        },
        {
          fields: [
            { property: 'P155' } /* follows */,
            { property: 'P156' } /* followed by */,
          ],
        },
        {
          fields: [
            { property: 'P1433' } /* published in */,
            { property: 'P996' } /* scan file */,
            { property: 'P953' } /* full text available at */,
          ],
        },
      ],
    },
  ],
};

export default editorDescription;
