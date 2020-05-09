// @flow

import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'TransInfra',
  linkText: i18n.transInfraLinkText,
  description: i18n.transInfraDescription,
  dialogTitle: i18n.transInfraDialogTitle,
  newEntityInstanceOf: 'Q376799',
  recommendedClasses: [ 'Q719456' ],
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fields: [
        /* instance of */
        { property: 'P31' },
        /* located in the administrative territorial entity */
        { property: 'P131' },
        /* place served by transport hub */
        { property: 'P931' },
        /* part of */
        { property: 'P361' },
        /* country */
        { property: 'P17' },
        /* located in time zone */
        { property: 'P421' },
        /* owned by */
        { property: 'P127' },
        /* operator */
        { property: 'P137' },
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
            /* phone number */
            { property: 'P1329' },
            /* official website */
            { property: 'P856' },
          ],
        },
      ],
    },
    {
      label: 'media',
      fields: [
        { property: 'P154' } /* logo image */,
        { property: 'P18' } /* image (image of relevant illustration of the subject) */,
        { property: 'P242' } /* locator map image (geographic map image which highlights the location of the subject within some larger entity) */,
        { property: 'P15' } /* route map; image of route map at Wikimedia Commons */,
        { property: 'P373' } /* Commons category; name of the Wikimedia Commons category containing files related to this item (without the prefix "Category:") */,
        { property: 'P935' } /* Commons gallery; name of the Wikimedia Commons gallery page(s) related to this item (is suitable to allow multiple link to more gallery pages) */,
        { property: 'P948' } /* page banner; lead image about the topic, mainly used by Wikivoyages and Women in Red */,
      ],
    },
    {
      labelEntityId: 'Q309' /* history */,
      fieldsets: [
        {
          fields: [
            { property: 'P571' } /* est. date */,
            { property: 'P1619' } /* date of official opening */,
            { property: 'P84' } /* architect */,
            { property: 'P138' } /* named after */,
          ],
        },
        {
          labelEntityId: 'P793' /* significant event */,
          fields: [
            { property: 'P793' } /* significant event */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q1071' /* geography */,
      fieldsets: [
        {
          fields: [
            { property: 'P625' } /* coordinate location */,
            { property: 'P242' } /* locator map image (geographic map image which highlights the location of the subject within some larger entity) */,
            { property: 'P30' } /* continent */,
            { property: 'P206' } /* located next to body of water */,
            { property: 'P610' } /* highest point */,
            { property: 'P2046' } /* area (area occupied by an object) */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q1757562',
      fields: [
        { property: 'P529' } /* runway */,
      ],
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q61052867 . ' /* Wikidata property related to airports */
                    + '?property wikibase:propertyType wikibase:ExternalId. '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'P527', /* has part */
      fieldsets: [
        {
          fields: [
            { property: 'P527' } /* has part */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q11369842', /* passengers */
      fieldsets: [
        {
          fields: [
            { property: 'P1373' } /* daily patronage */,
            { property: 'P3872' } /* patronage */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q36524',
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q22984363 . ' /* Wikidata property related to transport */
                    + '?property wikibase:propertyType wikibase:ExternalId. '
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
