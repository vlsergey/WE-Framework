import { localize } from 'utils/I18nUtils';

const en = {

  tabGeneral: 'general',
  tabBirthAndDeath: 'birth & death',
  tabEducationAndScience: 'education & science',
  tabMedia: 'media',

  linkLabel: 'WEF: Person',
  dialogTitle: 'Person data — WE-Framework',

};

const fr = {
  tabGeneral: 'général',
  tabBirthAndDeath: 'naissance et mort',
  tabEducationAndScience: 'scolarité et science',
  tabMedia: 'images, sons et vidéos',

  linkLabel: 'WEF : Biographie',
  dialogTitle: 'Données biographiques — WE-Framework',
};

const ru = {
  tabGeneral: 'основное',
  tabBirthAndDeath: 'рождение и смерть',
  tabEducationAndScience: 'образование и наука',
  tabMedia: 'медиа',

  linkLabel: 'WEF: Персона',
  dialogTitle: 'Свойства персоны — WE-Framework',
};

const translations = { en, fr, ru };
const result = localize( {}, translations );
export default result;
