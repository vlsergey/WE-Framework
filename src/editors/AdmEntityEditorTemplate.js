const editorDescription = {
  linkTitle: 'WEF: AdmEntity',
  title: 'Administrative Entity',
  tabs: [
    {
      label: 'General',
      key: 'general',
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fields: [
        /* official name */
        { property: 'P1448' },
        /* instance of */
        { property: 'P31' },
        /* located in the administrative territorial entity */
        { property: 'P131' },
        /* part of */
        { property: 'P361' },
        /* country */
        { property: 'P17' },
        /* territory claimed by */
        { property: 'P1336' },
        /* official language */
        { property: 'P37' },
        /* currency */
        { property: 'P38' },
        /* official website */
        { property: 'P856' },
      ],
    },
    {
      label: 'Media',
      key: 'media',
      fieldsets: [
        {
          labelEntityId: 'Q14660',
          fields: [
            /* flag */
            { property: 'P163' },
            /* flag image */
            { property: 'P41', columns: [ 'P580', 'P582' ] },
          ],
        },
        {
          labelEntityId: 'Q14659',
          fields: [
            /* coat of arms */
            { property: 'P237' },
            /* coat of arms image */
            { property: 'P94', columns: [ 'P580', 'P582' ] },
          ],
        },
      ],
      fields: [
        /* Image */
        { property: 'P18' },
        /* song */
        { property: 'P85' },
        /* commons */
        { property: 'P373' },
      ],
    },
  ],
};

export default editorDescription;
