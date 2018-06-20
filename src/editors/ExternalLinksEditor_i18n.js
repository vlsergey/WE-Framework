import * as utils from 'core/utils.js';
import anyEditor_i18n_translations from 'core/AnyEditor_i18n_translations';

const en = {

  buttonMenuLabel: 'WEF: Links',
  buttonNavboxLabel: '[edit links]',
  buttonViafLabel: 'Find and download VIAF data',
  editFormTitle: 'Edit external links and linked sites',

  dialogTitle: 'External links and linked sites — WE-Framework',

  tabOfficialPages: 'Official Pages',
  tabTexts: 'Texts',
  tabMedia: 'Audio, Photo & Video',
  tabTheaterAndMovies: 'Profiles: Theater and Cinema',
  tabMusic: 'Profiles: Music',
  tabLiteratureAndManga: 'Profiles: Literature and Manga',
  tabScience: 'Profiles: Science',
  tabOther: 'Profiles: Other',
  tabEncyclopedias: 'Encyclopedias',
  tabEncyclopediasOnWikisource: 'Wikisource',
  tabAuthorityControlVIAF: 'Authority Control (VIAF)',
  tabAuthorityControlOther: 'Authority Control (etc.)',

  tipDefault: 'ID «{0}» is incorrect. It should match the pattern «{1}»',
  tipOnlyNumbers: 'ID «{0}» should contains only numbers',

  tips: {},
};

const fr = {

  buttonMenuLabel: 'WEF : Liens',
  buttonNavboxLabel: '[modifier les liens]',
  buttonViafLabel: 'Rechercher et importer les données du VIAF',
  editFormTitle: 'Modifier les liens externes et sites liés',

  dialogTitle: 'Liens externes et sites liés — WE-Framework',

  tabOfficialPages: 'Pages officielles',
  tabTexts: 'Textes',
  tabMedia: 'Images, sons et vidéos',
  tabTheaterAndMovies: 'Profil : Théâtre et cinéma',
  tabMusic: 'Profil : Musique',
  tabLiteratureAndManga: 'Profil : Littérature et manga',
  tabScience: 'Profil : Science',
  tabOther: 'Profil : Autres',
  tabEncyclopedias: 'Encyclopédies',
  tabEncyclopediasOnWikisource: 'Wikisource',
  tabAuthorityControlVIAF: 'Données d\'autorité (VIAF)',
  tabAuthorityControlOther: 'Données d\'autorité (autres)',

  tipDefault: 'L\'identifiant « {0} » est incorrect. Il doit respecter la forme « {1} »',
  tipOnlyNumbers: 'L\'identifiant « {0} » ne doit contenir que des chiffres',

  tips: {},
};

const ru = {

  buttonMenuLabel: 'WEF: Ссылки',
  buttonNavboxLabel: '[править ссылки]',
  buttonViafLabel: 'Найти и загрузить данные с сервера VIAF',

  dialogTitle: 'Внешние ссылки и связанные сайты — WE-Framework',

  tabOfficialPages: 'Официальные страницы',
  tabTexts: 'Тексты произведений',
  tabMedia: 'Аудио, фото и видео',
  tabTheaterAndMovies: 'Профили: театр и кино',
  tabMusic: 'Профили: музыка',
  tabLiteratureAndManga: 'Профили: литература и манга',
  tabScience: 'Профили: наука',
  tabOther: 'Профили: остальное',
  tabEncyclopedias: 'Энциклопедии',
  tabEncyclopediasOnWikisource: 'Викитека',
  tabAuthorityControlVIAF: 'Нормативный контроль (VIAF)',
  tabAuthorityControlOther: 'Нормативный контроль (ост.)',

  tipDefault: 'Идентификатор «{0}» содержит ошибки. Правильный должен удовлетворять шаблону {1}',
  tipOnlyNumbers: 'Идентификатор «{0}» должен содержать только цифры',

  tips: {
    'P213': 'Идентификатор ISNI задаётся в виде 4-х групп чисел, разделяемых пробелами',
    'P214': 'Идентификатор VIAF должен содержать только цифры',
    'P227': 'Идентификатор GNF должен тольцо цифры и буквы в определённом формате',
    'P268': 'Идентификатор BFN должен содержать 8 цифр и дополнительные цифру или символ проверочной суммы',
    'P270': 'Идентификатор CALIS должен иметь префикс «n» и содержать 10 цифр',
    'P271': 'Идентификатор CiNii должен иметь префикс «DA», 7 цифр и суффикс «X», либо префикс «DA» и 8 цифр.',
    'P345': 'Идентификатор IMDb для персоны должен начинаться с префикса «ch», «co», «nm» или «tt» и далее содержать 7 цифр',
    'P373': 'Название категории Wikimedia Commons содержит недопустимые символы',
    'P409': 'Идентификатор NLA задаётся в виде числа без ведущих нолей длиной не более 12 цифр',
    'P434': 'Идентификатор MusicBrains содержит недопустимые символы',
    'P496': 'Идентификатор ORCID задаётся в виде 4-х групп чисел, разделяемых тире',
    'P839': 'Идентификатор IMSLP содержит недопустимые символы',
    'P949': 'Идентификатор NLI задаётся в виде 9 цифр',
    'P950': 'Идентификатор BNE должен содержать префикс XX и 6 или 7 цифр',
    'P1003': 'Идентификатор NLC должен содержать 9 цифр',
    'P1017': 'Идентификатор BAV должен содержать префикс «ADV» и 8 цифр',
    'P1153': 'Идентификатор Scopus должен содержать только цифры',
    'P1185': 'Идентификатор записи на Родоводе должен содержать только цифры',
    'P1207': 'Идентификатор NUKAT должен состоять из префикса «n» и цифр',
    'P1213': 'Идентификатор NLC должен содержать от 1 до 9 цифр',
    'P1217': 'Идентификатор IBDb должен содержать только цифры',
    'P1218': 'Идентификатор IBDb должен содержать только цифры',
    'P1219': 'Идентификатор IBDb должен содержать только цифры',
    'P1220': 'Идентификатор IBDb должен содержать только цифры',
    'P1233': 'Идентификатор ISFDb должен содержать только цифры',
    'P1234': 'Идентификатор ISFDb должен содержать только цифры',
    'P1235': 'Идентификатор ISFDb должен содержать только цифры',
    'P1239': 'Идентификатор ISFDb должен содержать только цифры',
    'P1265': 'Идентификатор AlloCiné должен содержать только цифры',
    'P1266': 'Идентификатор AlloCiné должен содержать только цифры',
    'P1267': 'Идентификатор AlloCiné должен содержать только цифры',
    'P1280': 'Идентификатор CONOR должен содержать только цифры',
    'P1258': 'Идентификатор Rotten Tomatoes должен начинаться с префикса «m/» для фильма, «tv/» для сериала или «celebrity/» для персон',
    'P1315': 'Идентификатор NLA Persistent Identifier задаётся в числа до 10 цифр',
    'P1361': 'Идентификатор Anime News Network должен начинаться с префикса «anime/», «company/», «manga/», «releases/» или «people/» и заканчиваться цифровым кодом',
    'P2003': 'Идентификатор «Instagram» содержит недопустимые символы',
    'P2013': 'Идентификатор «Facebook» содержит недопустимые символы',
    'P3185': 'Идентификатор «ВКонтакте» должен иметь форму id+цифры (например «id123456789»), иначе его не пропустит спам-лист',
    'P3192': 'Идентификатор Last FM содержит недопустимые символы',

    'Q866': 'Идентификатор «YouTube» содержит недопустимые символы',
    'Q103204': 'Идентификатор «Flickr» содержит недопустимые символы',
    'Q156376': 'Идентификатор «Vimeo» содержит недопустимые символы',
    'Q171186': 'Идентификатор «Blogger» содержит недопустимые символы',
    'Q219523': 'Идентификатор «Живого журнала» содержит недопустимые символы',
    'Q372827': 'Идентификатор «Rutube» содержит недопустимые символы',
    'Q384060': 'Идентификатор «Tumblr» содержит недопустимые символы',
    'Q568769': 'Идентификатор «SoundCloud» содержит недопустимые символы',
    'Q798490': 'Идентификатор «Я.ру» содержит недопустимые символы',
    'Q1002972': 'Идентификатор «Spring.me» содержит недопустимые символы',
    'Q1123836': 'Идентификатор «Одноклассники» должен задаваться в виде цифр, иначе его не пропустит спам-лист',
    'Q4037665': 'Идентификатор «Dudu» содержит недопустимые символы',
    'Q4101720': 'Идентификатор «В кругу друзей» содержит недопустимые символы',
    'Q4299813': 'Идентификатор «Мой круг» содержит недопустимые символы',
    'Q4299858': 'Идентификатор «Мой мир» должен начинаться с одного из префиксов «bk/», «inbox/», «list/» или «mail/»',
    'Q17117201': 'Идентификатор «PROMODJ» содержит недопустимые символы',
    'Q17329836': 'URL для «Encyclopédie Larousse» должен начинаться с «http://www.larousse.fr/encyclopedie/»',
  },
};

const i18n_prototype = {
  tips: {},

  getTip: function( definition ) {
    let tip = this.tipDefault;
    if ( definition.check.toString() === /^\d+$/.toString() ) {
      tip = this.tipOnlyNumbers;
    }
    if ( typeof this.tips[ definition.code ] !== 'undefined' ) {
      tip = this.tips[ definition.code ];
    }
    if ( jQuery.isFunction( tip ) ) {
      tip = tip();
    }
    tip = tip.replace( '{1}', definition.check.toString() );
    return tip;
  },
};

const translations = { en: en, fr: fr, ru: ru };
let result = utils.localize( i18n_prototype, anyEditor_i18n_translations );
result = utils.localize( result, translations );
export default result;
