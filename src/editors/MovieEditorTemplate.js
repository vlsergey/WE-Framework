const editorDescription = {
  linkTitle: 'WEF: Movie',
  title: 'Movie',
  tabs: [
    {
      label: 'General',
      key: 'general',
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fieldsets: [
        { fields: [
          /* instance of */
          { property: 'P31' },
          /* image */
          { property: 'P18' },
          /* name */
          { property: 'P1476' },
          /* country */
          { property: 'P495' },
          /* language */
          { property: 'P364' },
          /* time */
          { property: 'P577' },
        ] },
        { labelEntityId: 'Q3297652',
          fields: [
            /* director */
            { property: 'P57' },
            /* director of photography */
            { property: 'P344' },
            /* screenwriter */
            { property: 'P58' },
            /* producer */
            { property: 'P162' },
            /* production company */
            { property: 'P272' },
            /* composer */
            { property: 'P86' },
          ] },
      ],
    },
    {
      labelEntityId: 'Q36524',
      key: 'authoritycontrol',
      fields: [
        { property: 'P1237' },
        { property: 'P480' },
        { property: 'P345' },

        { property: 'P4276' },
        { property: 'P4529' },
        { property: 'P2529' },
        { property: 'P1265' },
      ],
    },
  ],
};

export default editorDescription;
