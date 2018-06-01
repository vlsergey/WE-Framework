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
        /* IMDB title */
        { code: 'P345' },
      ]
    }
  ],
};

export default editorDescription;
