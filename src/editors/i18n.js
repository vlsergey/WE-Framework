import { localize } from 'utils/I18nUtils';

const en = {

  tabGeneral: 'general',
  tabBirthAndDeath: 'birth & death',
  tabEducationAndScience: 'education & science',
  tabMedia: 'media',

  admEntityLinkText: 'AdmEntity',
  admEntityDescription: 'Administrative entities: countries, states, cities',
  admEntityDialogTitle: 'Administrative entity — WE-Framework',

  articleLinkText: 'Article',
  articleDescription: 'Scientific and newspapers articles',
  articleDialogTitle: 'Scientific or newspaper article — WE-Framework',

  awardLinkText: 'Award',
  awardDescription: 'Awards',
  awardDialogTitle: 'Scientific or newspaper article — WE-Framework',

  bookLinkText: 'Book / Journal',
  bookDescription: 'Printed and electronic books and journals',
  bookDialogTitle: 'Book or journal — WE-Framework',

  entityLinkText: 'Entity',
  entityDescription: 'Generic and simple editor',
  entityDialogTitle: 'Entity — WE-Framework',

  externalLinksLinkText: 'External IDs',
  externalLinksDescription: 'External IDs and authoritative control',
  externalLinksDialogTitle: 'External IDs and links — WE-Framework',

  frbrEditionLinkText: 'FRBR Edition',
  frbrEditionDialogTitle: 'FRBR Edition data — WE-Framework',

  frbrWorkLinkText: 'FRBR Work',
  frbrWorkDialogTitle: 'FRBR Work data — WE-Framework',

  legalInstrumentLinkText: 'Legal Act',
  legalInstrumentDescription: 'Legal Instrument: executive orders, laws, court acts, etc.',
  legalInstrumentDialogTitle: 'Legal Instrument — WE-Framework',

  movieLinkText: 'Movie',
  movieDescription: 'Animations and movies',
  movieDialogTitle: 'Animation and Movie  — WE-Framework',

  personLinkText: 'Person',
  personDialogTitle: 'Person data — WE-Framework',

  softwareLinkText: 'Software',
  softwareDescription: 'Software, including games and operation systems',
  softwareDialogTitle: 'Software — WE-Framework',

  taxonLinkText: 'Taxon',
  taxonDialogTitle: 'Taxon data — WE-Framework',

  transInfraLinkText: 'Trans. Infra',
  transInfraDescription: 'Transport Infrastructure',
  transInfraDialogTitle: 'Transport Infrastructure — WE-Framework',

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

  admEntityLinkText: 'Адм. единица',
  admEntityDescription: 'Административные единицы: страны, штаты, области, города',
  admEntityDialogTitle: 'Административная единица — WE-Framework',

  articleLinkText: 'Статья',
  articleDescription: 'Научные, газетные или журналные статьи',
  articleDialogTitle: 'Статья — WE-Framework',

  awardLinkText: 'Награда',
  awardDescription: 'Награды, звания, титулы',
  awardDialogTitle: 'Награда или звание — WE-Framework',

  bookLinkText: 'Книга / журнал',
  bookDescription: 'Печатные и электронные книги, сборники и журналы',
  bookDialogTitle: 'Книга или журнал — WE-Framework',

  entityLinkText: 'Сущность',
  entityDescription: 'Простой редактор',
  entityDialogTitle: 'Сущность — WE-Framework',

  externalLinksLinkText: 'Коды и ссылки',
  externalLinksDescription: 'Внешние ссылки, идентификаторы и нормативный контроль',
  externalLinksDialogTitle: 'Внешние идентификаторы и ссылки — WE-Framework',

  frbrEditionLinkText: 'FRBR издание',
  frbrEditionDialogTitle: 'Свойства издания (FRBR) — WE-Framework',

  frbrWorkLinkText: 'FRBR работа',
  frbrWorkDialogTitle: 'Свойства работы (FRBR) — WE-Framework',

  legalInstrumentLinkText: 'Норм. акт',
  legalInstrumentDescription: 'Нормативные акты: указы, законы, постановления, судебные решения и пр.',
  legalInstrumentDialogTitle: 'Нормативный акт — WE-Framework',

  movieLinkText: 'Фильм',
  movieDescription: 'Анимация и фильмы',
  movieDialogTitle: 'Анимация и фильм  — WE-Framework',

  personLinkText: 'Персона',
  personDialogTitle: 'Свойства персоны — WE-Framework',

  softwareLinkText: 'ПО',
  softwareDescription: 'Программное обеспечение, включая игры и операционные системы',
  softwareDialogTitle: 'Программное обеспечение — WE-Framework',

  taxonLinkText: 'Таксон',
  taxonDialogTitle: 'Свойства таксона — WE-Framework',

  transInfraLinkText: 'Трансп. инфр.',
  transInfraDescription: 'Транспортная инфраструктура (аэропорты, вокзалы)',
  transInfraDialogTitle: 'Транспортная инфраструктура — WE-Framework',

};

const translations = { en, fr, ru };
const result = localize( {}, translations );
export default result;
