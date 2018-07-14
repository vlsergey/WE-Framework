import i18n from './i18n';

const editorDescription = {
  id: 'Movie',
  linkText: 'WEF: Movie',
  dialogTitle: 'Movie',
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fields: [
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
        /* genre */
        { property: 'P136' },
        /* based on */
        { property: 'P144' },
        /* filming location */
        { property: 'P915' },
        /* aspect ratio */
        { property: 'P2061' },
        /* duration */
        { property: 'P2047' },
        /* follows */
        { property: 'P155' },
        /* followed by */
        { property: 'P156' },
        /* list of episodes */
        { property: 'P1811' },
        /* number of episodes */
        { property: 'P1113' },
        /* number of seasons */
        { property: 'P2437' },
        /* original network */
        { property: 'P449' },
        /* official website */
        { property: 'P856' },
        /* Commons category */
        { property: 'P373' },
      ],
    },
    {
      labelEntityId: 'Q3297652',
      fields: [
        /* director */
        { property: 'P57' },
        /* director of photography */
        { property: 'P344' },
        /* screenwriter */
        { property: 'P58' },
        /* producer */
        { property: 'P162' },
        /* executive producer */
        { property: 'P1431' },
        /* composer */
        { property: 'P86' },
        /* production company */
        { property: 'P272' },
        /* distributor */
        { property: 'P750' },
      ],
    },
    {
      labelEntityId: 'P161',
      fields: [
        /* cast member */
        { property: 'P161', columns: [ 'P453' ] },
        /* narrator */
        { property: 'P2438' },
      ],
    },
    {
      labelEntityId: 'P725',
      fields: [
        /* cast member */
        { property: 'P725', columns: [ 'P453' ] },
      ],
    },
    {
      labelEntityId: 'P166',
      fields: [
        /* award received */
        { property: 'P166', columns: [ 'P585', 'P1027' ] },
      ],
    },
    {
      labelEntityId: 'Q36524',
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31 wd:Q29542094 . '
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
