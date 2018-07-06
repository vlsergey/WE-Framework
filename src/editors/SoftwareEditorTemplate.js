const editorDescription = {
  linkTitle: 'WEF: Software',
  title: 'Software',
  tabs: [
    {
      label: 'General',
      key: 'general',
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fieldsets: [
        {
          fields: [
            { property: 'P154' } /* Logo */,
            { property: 'P18' } /* Image */,
            { property: 'P373' } /* Commons category */,
          ],
        },
        {
          fields: [
            { property: 'P31' } /* instance of */,
            { property: 'P112' } /* founder */,
            { property: 'P170' } /* creator */,
            { property: 'P178' } /* developer */,
            { property: 'P275' } /* license */,
            { property: 'P856' } /* site */,
          ],
        },
        {
          fields: [
            { property: 'P400' } /* hardware platform */,
            { property: 'P306' } /* OS */,
            { property: 'P277' } /* programming language */,
            { property: 'P1414' } /* UI */,
            { property: 'P407' } /* Languages */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q235557',
      key: 'fileFormats',
      fieldsets: [
        {
          labelEntityId: 'P1072',
          fields: [
            { property: 'P1072' } /* input formats */,
          ],
        },
        {
          labelEntityId: 'P1073',
          fields: [
            { property: 'P1073' } /* output formats */,
          ],
        },
      ],
    },
  ],
};

export default editorDescription;
