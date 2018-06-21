const editorDescription = {
  linkTitle: 'WEF: AdmEntity',
  title: 'Administrative Entity',
  tabs: [
    {
      label: 'General',
      key: 'general',
      fields: [
        { type: 'LabelsAndDescriptionArea' },
        /* official name */
        { property: 'P1448' },

        /* instance of */
        { property: 'P31' },
        /* instance of */
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
      fields: [
        /* Image */
        { property: 'P18' },
        /* song */
        { property: 'P85' },
        /* flag image */
        { property: 'P41' },
        /* flag */
        { property: 'P163' },
        /* coat of arms image */
        { property: 'P94' },
        /* coat of arms */
        { property: 'P237' },
        /* commons */
        { property: 'P373' },
      ],
    },
  ],
};

export default editorDescription;
