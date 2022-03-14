import {EditorDefType} from './EditorDefModel';
import i18n from './i18n';

const editorDescription: EditorDefType = {
  id: 'Article',
  linkText: i18n.articleLinkText,
  description: i18n.articleDescription,
  dialogTitle: i18n.articleDialogTitle,
  newEntityInstanceOf: 'Q191067',
  recommendedClasses: ['Q191067'],
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        {type: 'LabelsAndDescriptionArea'},
      ],
      fieldsets: [
        {
          fields: [
            {property: 'P31'} /* instance of */,
          ],
        },
        {
          fields: [
            {property: 'P50'} /* author */,
            {property: 'P767'} /* collaborator */,
          ],
        },
        {
          fields: [
            {property: 'P1476'} /* title */,
            {property: 'P1680'} /* subtitle */,
            {property: 'P407'} /* language */,
            {property: 'P571'} /* date of foundation or creation */,
            {property: 'P921'} /* main subject */,
          ],
        },
        {
          fields: [
            {property: 'P1433'} /* published in */,
            {property: 'P953'} /* URL */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q36524' /* authority control */,
      specials: [
        {type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q29548341 . ' /* Wikidata property to identify books */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}'},
      ],
    },

  ],
};

export default editorDescription;
