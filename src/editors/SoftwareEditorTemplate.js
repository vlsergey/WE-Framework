import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'Software',
  linkText: i18n.softwareLinkText,
  description: i18n.softwareDescription,
  dialogTitle: i18n.softwareDialogTitle,
  newEntityInstanceOf: 'Q7397',
  recommendedClasses: [ 'Q7397' ],
  tabs: [
    {
      label: i18n.tabGeneral,
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
      labelEntityId: 'P348',
      key: 'versions',
      fields: [
        { property: 'P348' } /* software version */,
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
    {
      labelEntityId: 'Q36524',
      key: 'authoritycontrol',
      fields: [
        { property: 'P3381' } /* File Format Wiki page ID */,
        { property: 'P646' } /* Freebase ID */,
        { property: 'P3417' } /* Quora topic ID */,
        { property: 'P3984' } /* subreddit */,
      ],
    },
  ],
};

export default editorDescription;
