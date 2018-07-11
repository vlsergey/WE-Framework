import i18n from './i18n';

const editorDescription = {
  linkText: i18n.externalLinksLinkText,
  dialogTitle: i18n.externalLinksDialogTitle,
  tabs: [
    {
      labelEntityId: 'Q6576792' /* online community */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31 wd:Q30041186 . ' /* Wikidata property related to online communities */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q11424' /* cinema */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT ?property '
        + 'WHERE { '
        + '?property wdt:P31 wd:Q29542094 . '
        + '?property wikibase:propertyType wikibase:ExternalId . '
        + '}' },
      ],
    },
    {
      labelEntityId: 'Q638' /* music */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT ?property '
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
          sparql: 'SELECT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q52425722 . ' /* Wikidata property related to natural science */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q349' /* sport */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT ?property '
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
          sparql: 'SELECT ?property '
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
          sparql: 'SELECT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31/wdt:P279* wd:Q55452870 . ' /* Wikidata property, related to encyclopedia */
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}' },
      ],
    },
    {
      labelEntityId: 'Q36524' /* authority control */,
      specials: [
        { type: 'SparqlPropertyGroup',
          sparql: 'SELECT ?property '
                    + 'WHERE { '
                    + ' ?property wdt:P31/wdt:P279* wd:Q18614948 . ' /* Wikidata property for authority control, with reciprocal use of Wikidata */
                    + ' ?property wikibase:propertyType wikibase:ExternalId . '
                    /* properties from previous tabs */
                    + ' MINUS { ?property wdt:P31 wd:Q30041186 } . ' /* Wikidata property related to online communities */
                    + ' MINUS { ?property wdt:P31 wd:Q29542094 } . '
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q27525351 } . ' /* Wikidata property related to music */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q21818626 } . ' /* Wikidata property related to sport */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q52425722 } . ' /* Wikidata property related to natural science */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q28147643 } . ' /* Wikidata property related to video games */
                    + ' MINUS { ?property wdt:P31/wdt:P279* wd:Q55452870 } . ' /* Wikidata property, related to encyclopedia */
                    + '}' },
      ],
    },
  ],
};

export default editorDescription;
