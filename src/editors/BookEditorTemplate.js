// @flow

import type { EditorDefType } from 'editors/EditorDefModel';
import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'Book',
  linkText: i18n.bookLinkText,
  description: i18n.bookDescription,
  dialogTitle: i18n.bookDialogTitle,
  newEntityInstanceOf: 'Q571',
  recommendedClasses: [ 'Q571', 'Q41298' ],
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        { type: 'LabelsAndDescriptionArea' },
      ],
      fieldsets: [
        {
          fields: [
            { property: 'P31' } /* instance of */,
            { property: 'P1476' } /* title */,
            { property: 'P1680' } /* subtitle */,
            { property: 'P1160' } /* ISO 4 abbreviation */,
            { property: 'P407' } /* language */,
            { property: 'P571' } /* date of foundation or creation */,
            { property: 'P393' } /* edition number */,
          ],
        },
        {
          fields: [
            { property: 'P50' } /* author */,
            { property: 'P767' } /* collaborator */,
            { property: 'P98' } /* editor */,
            { property: 'P110' } /* illustrator */,
            { property: 'P655' } /* translator */,
          ],
        },
        {
          fields: [
            { property: 'P361' } /* part of */,
            { property: 'P478' } /* volume */,
            { property: 'P433' } /* issue */,
            { property: 'P1104' } /* total pages */,
          ],
        },
      ],
    },
    {
      label: i18n.tabGeneral,
      fieldsets: [
        {
          fields: [
            { property: 'P291' } /* place of publication */,
            { property: 'P123' } /* publisher */,
            { property: 'P577' } /* date of publication */,
            { property: 'P872' } /* printed by */,
          ],
        },
        {
          fields: [
            { property: 'P953' } /* URL */,
            { property: 'P996' } /* scan file */,
            { property: 'P1957' } /* Wikisource index page */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q36524' /* authority control */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q29547399 . ' /* Wikidata property to identify books */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },

  ],
};

export default editorDescription;
