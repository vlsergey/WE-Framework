import i18n from './i18n';

const editorDescription = {
  id: 'Taxon',
  linkText: i18n.taxonLinkText,
  dialogTitle: i18n.taxonDialogTitle,
  newEntityInstanceOf: 'Q16521',
  recommendedClasses: [ 'Q16521' ],
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
          ],
        },
        {
          fields: [
            { property: 'P225' } /* taxon name */,
            { property: 'P566' } /* basionym */,
            { property: 'P1403' } /* original combination */,
            { property: 'P694' } /* replaced synonym (for nom. nov.) */,
            { property: 'P1420' } /* taxon synonym */,
            { property: 'P697' } /* ex taxon author */,
            { property: 'P944' } /* Code of nomenclature */,
          ],
        },
        {
          fields: [
            { property: 'P18' } /* instance of */,
          ],
        },
      ],
    },
    {
      labelEntityId: 'Q420' /* biology */,
      fieldsets: [
        {
          fields: [
            { property: 'P105' } /* taxon rank */,
            { property: 'P171' } /* parent taxon */,
          ],
        },
        {
          fields: [
            { property: 'P141' } /* IUCN conservation status */,
          ],
        },
        {
          fields: [
            { property: 'P181' } /* range map image */,
            { property: 'P183' } /* endemic to */,
            { property: 'P1425' } /* ecoregion (WWF) */,
            { property: 'P523' } /* temporal range start */,
            { property: 'P524' } /* temporal range end */,
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
                    + '?property wdt:P31 wd:Q42396390 . '
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
