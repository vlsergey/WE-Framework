const editorDescription = {
  linkTitle: 'WEF: Movie',
  title: 'Movie',
  tabs: [
    {
      label: 'General',
      key: 'general',
      fields: [
        /* instance of */
        { code: 'P31' },
        /* image */
        { code: 'P18', qualifiers: [ /* moment in time */ 'P585', /* media legend */ 'P2096' ] },
      ]
    },
    {
      labelEntityId: 'Q36524',
      key: 'authoritycontrol',
      fields: [
        { code: 'P1237', flag: 'us' },
        { code: 'P480', flag: 'us' },
        { code: 'P345', flag: 'us' },

        { code: 'P4276', flag: 'ca' },
        { code: 'P4529', flag: 'cn' },
        { code: 'P2529', flag: 'cz' },
        { code: 'P1265', flag: 'fr' },
      ]
    },
  ],
};

export default editorDescription;
