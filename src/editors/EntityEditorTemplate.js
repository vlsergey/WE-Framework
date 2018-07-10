const editorDescription = {
  linkText: 'WEF: Entity',
  dialogTitle: 'Entity',
  tabs: [
    {
      label: 'General',
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
