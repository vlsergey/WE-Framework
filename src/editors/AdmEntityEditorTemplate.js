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
      ],
      fieldsets: [
        {
          labelEntityId: 'P1448',
          fields: [
            /* official name */
            { property: 'P1448' },
          ],
        },
        {
          fields: [
            /* official language */
            { property: 'P37' },
            /* currency */
            { property: 'P38' },
            /* official website */
            { property: 'P856' },
          ],
        },
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
            { property: 'P41' },
          ],
        },
        {
          labelEntityId: 'Q14659',
          fields: [
            /* coat of arms */
            { property: 'P237' },
            /* coat of arms image */
            { property: 'P94' },
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
    {
      labelEntityId: 'Q309',
      fieldsets: [
        {
          fields: [
            { property: 'P571' } /* est. date */,
            { property: 'P155' } /* previous */,
            { property: 'P156' } /* next */,
          ],
        },
        {
          labelEntityId: 'P138',
          fields: [
            { property: 'P138' } /* named after */,
          ],
        },
        {
          labelEntityId: 'P793',
          fields: [
            { property: 'P793' } /* named after */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q1071',
      fieldsets: [
        {
          fields: [
            { property: 'P625' } /* coordinate location */,
            { property: 'P30' } /* continent */,
            { property: 'P36' } /* capital */,
            { property: 'P1376' } /* capital of */,
            { property: 'P421' } /* time zone */,
          ],
        },
        {
          labelEntityId: 'P47',
          fields: [
            { property: 'P47' } /* shares border with */,
          ],
        },
        {
          fields: [
            { property: 'P206' } /* located next to body of water */,
            { property: 'P610' } /* highest point */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q7163',
      fieldsets: [
        {
          fields: [
            { property: 'P122' } /* basic form of government */,
            { property: 'P194' } /* legislative body */,
            { property: 'P209' } /* highest judicial authority */,
            { property: 'P6' } /* head of government */,
            { property: 'P1313' } /* office held by head of government */,
            { property: 'P1304' } /* central bank */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P527', /* has part */
      fieldsets: [
        {
          fields: [
            { property: 'P150' } /* contains administrative territorial entity */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q37732', /* demography */
      fieldsets: [
        {
          fields: [
            { property: 'P1125' } /* Gini coefficient */,
            { property: 'P1082', colunns: [ 'P585' ] } /* population */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P190', /* member of */
      fieldsets: [
        {
          fields: [
            { property: 'P190' } /* member of */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q4167836', /* member of */
      fieldsets: [
        {
          fields: [
            { property: 'P910' } /* main category */,
            { property: 'P1464' } /* category for people born here */,
            { property: 'P1465' } /* category for people who died here */,
            { property: 'P1791' } /* category of people buried here */,
            { property: 'P1792' } /* category of associated people */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q106487', /* ISO 3166 */
      fieldsets: [
        {
          fields: [
            { property: 'P297' } /* ISO 3166-1 alpha-2 code */,
            { property: 'P298' } /* ISO 3166-1 alpha-3 code */,
            { property: 'P299' } /* ISO 3166-1 numeric code */,
            { property: 'P300' } /* ISO 3166-2 code */,
            { property: 'P773' } /* ISO 3166-3 */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q36524',
      key: 'authoritycontrol',
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31 wd:Q19829908 . '
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
