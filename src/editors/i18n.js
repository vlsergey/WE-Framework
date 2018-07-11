import { localize } from 'utils/I18nUtils';

const en = {

  tabGeneral: 'general',
  tabBirthAndDeath: 'birth & death',
  tabEducationAndScience: 'education & science',
  tabMedia: 'media',

  externalLinksLinkText: 'WEF: External IDs',
  externalLinksDialogTitle: 'External IDs and links — WE-Framework',

  frbrEditionLinkText: 'WEF: FRBR Edition',
  frbrEditionDialogTitle: 'FRBR Edition data — WE-Framework',

  frbrWorkLinkText: 'WEF: FRBR Work',
  frbrWorkDialogTitle: 'FRBR Work data — WE-Framework',

  personLinkText: 'WEF: Person',
  personDialogTitle: 'Person data — WE-Framework',

  taxonLinkText: 'WEF: Taxon',
  taxonDialogTitle: 'Taxon data — WE-Framework',

};

const fr = {
  tabGeneral: 'général',
  tabBirthAndDeath: 'naissance et mort',
  tabEducationAndScience: 'scolarité et science',
  tabMedia: 'images, sons et vidéos',

  personLinkText: 'WEF : Biographie',
  personDialogTitle: 'Données biographiques — WE-Framework',
};

const ru = {
  tabGeneral: 'основное',
  tabBirthAndDeath: 'рождение и смерть',
  tabEducationAndScience: 'образование и наука',
  tabMedia: 'медиа',

  externalLinksLinkText: 'WEF: Коды и cсылки',
  externalLinksDialogTitle: 'Внешние идентификаторы и ссылки — WE-Framework',

  frbrEditionLinkText: 'WEF: FRBR издание',
  frbrEditionDialogTitle: 'Свойства издания (FRBR) — WE-Framework',

  frbrWorkLinkText: 'WEF: FRBR работа',
  frbrWorkDialogTitle: 'Свойства работы (FRBR) — WE-Framework',

  personLinkText: 'WEF: Персона',
  personDialogTitle: 'Свойства персоны — WE-Framework',

  taxonLinkText: 'WEF: Таксон',
  taxonDialogTitle: 'Свойства таксона — WE-Framework',

};

const translations = { en, fr, ru };
const result = localize( {}, translations );
export default result;
