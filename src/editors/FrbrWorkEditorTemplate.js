import i18n from './i18n';

const editorDescription : EditorDefType = {
  id: 'FrbrWork',
  linkText: i18n.frbrWorkLinkText,
  dialogTitle: i18n.frbrWorkDialogTitle,
  newEntityInstanceOf: 'Q386724',
  recommendedClasses: [ 'Q386724' ],
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
            { property: 'P50' } /* author */,
            { property: 'P767' } /* collaborator */,
            { property: 'P98' } /* editor */,
          ],
        },
        {
          fields: [
            { property: 'P1476' } /* title */,
            { property: 'P1680' } /* subtitle */,
            { property: 'P407' } /* language of work or name */,
            { property: 'P571' } /* date of foundation or creation */,
            { property: 'P577' } /* date of publication */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q1260632' /* content */,
      fieldsets: [
        {
          fields: [
            { property: 'P135' } /* movement */,
            { property: 'P136' } /* genre */,
            { property: 'P921' } /* subject heading */,
            { property: 'P1922' } /* first line */,
          ],
        },
        {
          fields: [
            { property: 'P155' } /* follows */,
            { property: 'P156' } /* followed by */,
            { property: 'P179' } /* series */,
          ],
        },
        {
          fields: [
            { property: 'P144' } /* based on */,
            { property: 'P941' } /* inspired by */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P674' /* characters */,
      fieldsets: [
        {
          labelEntityId: 'P674' /* characters */,
          fields: [
            { property: 'P674' } /* characters */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P166' /* award received */,
      fieldsets: [
        {
          labelEntityId: 'P166' /* award received */,
          fields: [
            { property: 'P166' } /* award received */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'P747' /* edition */,
      fieldsets: [
        {
          labelEntityId: 'P747' /* edition */,
          fields: [
            { property: 'P747' } /* edition */,
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
                    + '?property wdt:P31 wd:Q19833377 . '
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },

  ],
};

export default editorDescription;
