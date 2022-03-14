import {EditorDefType} from './EditorDefModel';
import i18n from './i18n';

const editorDescription: EditorDefType = {
  id: 'Movie',
  linkText: i18n.movieLinkText,
  description: i18n.movieDescription,
  dialogTitle: i18n.movieDialogTitle,
  newEntityInstanceOf: 'Q11424',
  recommendedClasses: ['Q2431196'],
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        {type: 'LabelsAndDescriptionArea'},
      ],
      fields: [
        {property: 'P31'} /* instance of */,
        {property: 'P18'} /* image */,
        {property: 'P1476'} /* name */,
        {property: 'P495'} /* country */,
        {property: 'P364'} /* language */,
        {property: 'P577'} /* publication date */,
        {property: 'P915'} /* filming location */,
        {property: 'P2130'} /* cost */,
        {property: 'P2142'} /* box office */,
        {property: 'P449'} /* original network */,
        {property: 'P856'} /* official website */,
        {property: 'P373'} /* Commons category */,
      ],
    },
    {
      labelEntityId: 'Q1260632' /* content */,
      fields: [
        {property: 'P136'} /* genre */,
        {property: 'P144'} /* based on */,
        {property: 'P2061'} /* aspect ratio */,
        {property: 'P2047'} /* duration */,
        {property: 'P155'} /* follows */,
        {property: 'P156'} /* followed by */,
        {property: 'P1811'} /* list of episodes */,
        {property: 'P1113'} /* number of episodes */,
        {property: 'P2437'} /* number of seasons */,
      ],
    },
    {
      labelEntityId: 'Q3297652' /* cast member */,
      fields: [
        {property: 'P170'} /* creator */,
        {property: 'P57'} /* director */,
        {property: 'P344'} /* director of photography */,
        {property: 'P58'} /* screenwriter */,
        {property: 'P162'} /* producer */,
        {property: 'P1431'} /* executive producer */,
        {property: 'P86'} /* composer */,
        {property: 'P1809'} /* choreographer */,
        {property: 'P272'} /* production company */,
        {property: 'P750'} /* distributor */,
      ],
    },
    {
      labelEntityId: 'P161' /* cast member */,
      fields: [
        {property: 'P161'} /* cast member */,
        {property: 'P2438'} /* narrator */,
      ],
    },
    {
      labelEntityId: 'P725' /* voice actor */,
      fields: [
        {property: 'P725'} /* voice actor */,
      ],
    },
    {
      labelEntityId: 'P166' /* award received */,
      fields: [
        {property: 'P166'} /* award received */,
      ],
    },
    {
      labelEntityId: 'Q36524' /* authority control */,
      specials: [
        {type: 'SparqlPropertyGroup',
          sparql: 'SELECT DISTINCT ?property '
                    + 'WHERE { '
                    + '?property wdt:P31 wd:Q29542094 . '
                    + '?property wikibase:propertyType wikibase:ExternalId . '
                    + '}'},
      ],
    },
  ],
};

export default editorDescription;
