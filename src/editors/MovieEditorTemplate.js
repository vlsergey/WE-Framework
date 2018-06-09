const editorDescription = {
  linkTitle: 'WEF: Movie',
  title: 'Movie',
  tabs: [
    {
      label: 'General',
      key: 'general',
      fields: [
        /* instance of */
        { property: 'P31' },
        /* image */
        { property: 'P18', qualifiers: [ /* moment in time */ 'P585', /* media legend */ 'P2096' ] },
      ]
    },
    {
      labelEntityId: 'Q36524',
      key: 'authoritycontrol',
      fields: [
        { property: 'P1237', flag: 'us' },
        { property: 'P480', flag: 'us' },
        { property: 'P345', flag: 'us' },

        { property: 'P4276', flag: 'ca' },
        { property: 'P4529', flag: 'cn' },
        { property: 'P2529', flag: 'cz' },
        { property: 'P1265', flag: 'fr' },
      ]
    },
  ],
};

export default editorDescription;
