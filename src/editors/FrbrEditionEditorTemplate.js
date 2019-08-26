import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'FrbrEdition',
  linkText: i18n.frbrEditionLinkText,
  dialogTitle: i18n.frbrEditionDialogTitle,
  // version, edition, or translation
  newEntityInstanceOf: 'Q3331189',
  recommendedClasses: [ 'Q3331189' ],
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
            { property: 'P18' } /* image */,
          ],
        },
        {
          fields: [
            { property: 'P629' } /* edition or translation of */,
            { property: 'P393' } /* edition number */,
            { property: 'P291' } /* place of publication */,
            { property: 'P123' } /* publisher */,
            { property: 'P577' } /* date of publication */,
            { property: 'P872' } /* printed by */,
          ],
        },
        {
          fields: [
            { property: 'P407' } /* language */,
            { property: 'P1476' } /* title */,
            { property: 'P1680' } /* subtitle */,
          ],
        },
        {
          fields: [
            { property: 'P361' } /* part of */,
            { property: 'P1433' } /* published in */,
            { property: 'P155' } /* follows */,
            { property: 'P156' } /* followed by */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q1260632' /* content */,
      fieldsets: [
        {
          fields: [
            { property: 'P50' } /* author */,
            { property: 'P655' } /* translator */,
            { property: 'P98' } /* editor */,
            { property: 'P110' } /* illustrator */,
            { property: 'P767' } /* collaborator */,
          ],
        },
        {
          fields: [
            { property: 'P1104' } /* movement */,
            { property: 'P1922' } /* first line */,
            { property: 'P996' } /* scan file */,
            { property: 'P953' } /* full text available at */,
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
                    + '?property wdt:P31 wd:Q29547399 . ' /* Wikidata property to identify books */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },

  ],
};

export default editorDescription;
