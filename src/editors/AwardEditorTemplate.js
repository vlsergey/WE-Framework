import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'Award',
  linkText: i18n.awardLinkText,
  description: i18n.awardDescription,
  dialogTitle: i18n.awardDialogTitle,
  newEntityInstanceOf: 'Q618779',
  recommendedClasses: [ 'Q4189293', 'Q618779' ],
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
            { property: 'P279' } /* subclass of */,
            { property: 'P361' } /* part of */,
          ],
        },
        {
          fields: [
            { property: 'P1705' } /* native label */,
            { property: 'P17' } /* country */,
            { property: 'P571' } /* inception */,
            { property: 'P3729' } /* next lower rank */,
            { property: 'P3730' } /* next higher rank */,
          ],
        },
        {
          fields: [
            { property: 'P1451' } /* motto text */,
            { property: 'P18' } /* image */,
            { property: 'P2425' } /* service ribbon image */,
            { property: 'P2910' } /* icon */,
            { property: 'P1114' } /* quantity */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P527',
      fields: [
        { property: 'P527' } /* has part */,
      ],
    },
    {
      labelEntityId: 'Q3568028',
      fields: [
        { property: 'P373' } /* Commons category */,
        { property: 'P1424' } /* topic's main template */,
        { property: 'P2517' } /* category for recipients of this award */,
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
