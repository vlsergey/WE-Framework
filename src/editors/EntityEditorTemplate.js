import i18n from './i18n';

const editorDescription = {
  id: 'Entity',
  linkText: 'WEF: Entity',
  dialogTitle: 'Entity',
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fields: [
        { property: 'P31' } /* instance of */,
        { property: 'P279' } /* subclass of */,
      ],
    },
    {
      labelEntityId: 'P1343',
      fields: [
        { property: 'P1343' } /* described by source */,
      ],
    },
  ],
};

export default editorDescription;
