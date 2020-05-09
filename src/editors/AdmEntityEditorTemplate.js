// @flow

import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'AdmEntity',
  linkText: i18n.admEntityLinkText,
  description: i18n.admEntityDescription,
  dialogTitle: i18n.admEntityDialogTitle,
  newEntityInstanceOf: 'Q486972',
  recommendedClasses: [ 'Q486972', 'Q1048835' ],
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
        { property: 'P18' } /* image (image of relevant illustration of the subject) */,
        { property: 'P85' } /* anthem (subject's official anthem) */,
        { property: 'P242' } /* locator map image (geographic map image which highlights the location of the subject within some larger entity) */,
        { property: 'P373' } /* Commons category (name of the Wikimedia Commons category containing files related to this item (without the prefix "Category:")) */,
      ],
    },
    {
      labelEntityId: 'Q309' /* history */,
      fieldsets: [
        {
          fields: [
            { property: 'P571' } /* est. date */,
            { property: 'P1365' } /* replaces */,
            { property: 'P1366' } /* replaced by */,
          ],
        },
        {
          labelEntityId: 'P138' /* named after */,
          fields: [
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
            { property: 'P2046' } /* area (area occupied by an object) */,
            { property: 'P2044' } /* elevation above sea level (height of the item (geographical object) as measured relative to sea level) */,
            { property: 'P610' } /* highest point (point with highest elevation in a region, on a path, of a race) */,
          ],
        },
        {
          fields: [
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
            { property: 'P1082' } /* population */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P190' /* twinned administrative body */,
      fieldsets: [
        {
          fields: [
            { property: 'P190' } /* twinned administrative body */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P463', /* member of */
      fieldsets: [
        {
          fields: [
            { property: 'P463' } /* member of */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q4167836', /* categories */
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
      labelEntityId: 'Q853614', /* identifier */
      fieldsets: [
        {
          fields: [
            { property: 'P281' } /* postal code */,
            { property: 'P395' } /* licence plate code */,
            { property: 'P473' } /* local dialing code */,
          ],
        },
        {
          labelEntityId: 'Q106487',
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
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q55977691 . ' /* Wikidata property for authority control for administrative subdivisions */
                    + '{?property wikibase:propertyType wikibase:ExternalId} UNION {?property wikibase:propertyType wikibase:String} . '
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
