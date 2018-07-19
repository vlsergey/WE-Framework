import i18n from './i18n';

const editorDescription = {
  id: 'ExternalLinks',
  linkText: i18n.externalLinksLinkText,
  description: i18n.externalLinksDescription,
  dialogTitle: i18n.externalLinksDialogTitle,
  tabs: [
    {
      labelEntityId: 'Q6576792' /* online community */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31 wd:Q30041186 . ' /* Wikidata property related to online communities */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q1415395' /* film industry */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
        + 'WHERE { '
        + '?property wdt:P31/wdt:P279* wd:Q22964274 . ' /* Wikidata property for identification in the film industry */
        + '?property wikibase:propertyType wikibase:ExternalId . '
        + '}' },
      ],
    },
    {
      labelEntityId: 'Q638' /* music */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q27525351 . ' /* Wikidata property related to music */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q7991' /* natural science */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q52425722 . ' /* Wikidata property related to natural science */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q7163' /* politics */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q22984475 . ' /* Wikidata property related to politics */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q349' /* sport */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q21818626 . ' /* Wikidata property related to sport */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q7889' /* video game */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q28147643 . ' /* Wikidata property related to video games */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q5292' /* encyclopedia */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q55452870 . ' /* Wikidata property, related to encyclopedia */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q54919' /* VIAF */,
      fields: [
        { property: 'P214' } /* VIAF ID */,
      ],
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q55586529 . ' /* Wikidata property for authority control by VIAF member */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q36524' /* authority control */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + ' ?property wdt:P31/wdt:P279* wd:Q18614948 . ' /* Wikidata property for authority control, with reciprocal use of Wikidata */
                    + ' ?property wikibase:propertyType wikibase:ExternalId . '
                    /* properties from previous tabs */
                    + ' MINUS { ?property wdt:P31 wd:Q30041186 } . ' /* Wikidata property related to online communities */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q22964274 } . ' /* Wikidata property for identification in the film industry */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q27525351 } . ' /* Wikidata property related to music */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q22984475 } . ' /* Wikidata property related to politics */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q21818626 } . ' /* Wikidata property related to sport */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q52425722 } . ' /* Wikidata property related to natural science */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q28147643 } . ' /* Wikidata property related to video games */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q55452870 } . ' /* Wikidata property, related to encyclopedia */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q55586529 } . ' /* Wikidata property for authority control by VIAF member */
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
