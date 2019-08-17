import * as I18nUtils from 'utils/I18nUtils';

const en = {

  buttonAddClaim: 'add claim',
  buttonRemoveClaim: 'remove claim',
  buttonCreateOrEdit: 'create or edit wikidata item',
  buttonCreateOrEditPrefixCreate: 'create as: ',
  buttonCreateOrEditPrefixEdit: 'edit as: ',
  buttonOnWikidata: 'open specified wikidata item on wikidata website',

  checkboxShowJulian: 'show in Julian calendar?',
  checkboxShowJulianTitle: 'when displaying the date show in julian calendar. This option does not change the input format or the value stored',

  confirmDeleteClaim: 'Remove the value of property «{label}»?',

  dialogButtonUpdateLabelsText: 'Update labels',
  dialogButtonUpdateLabelsTitle: 'Re-download properties, qualifiers, and object labels and descriptions from Wikidata',
  dialogButtonImportDataText: 'Import data…',
  dialogButtonImportDataTitle: 'Try different utils to load data from article text or external sources',
  dialogButtonSaveText: 'Save',
  dialogButtonSaveTitle: 'Close the dialog and save all changes to Wikidata',
  dialogButtonCancelText: 'Cancel',
  dialogButtonCancelTitle: 'Close the dialog and discard all changes (do not save)',

  dialogAnalyzeChangesTitle: 'Analyze changes...',
  dialogSaveChangesTitle: 'Saving changes to Wikidata...',

  errorAnalyzeChanges: 'Unable to collect and analyze changes',
  errorRemoveClaims: 'Unable to remove outdated statements from entity',

  inputGlobeLatitudeLabel: 'Latitude',
  inputGlobeLatitudeTitle: 'a latitude (decimal, no default, 9 digits after the dot and two before, signed)',
  inputGlobeLongitudeLabel: 'Longitude',
  inputGlobeLongitudeTitle: 'a longitude (decimal, no default, 9 digits after the dot and three before, signed)',
  inputGlobeAltitudeLabel: 'Altitude',
  inputGlobeAltitudeTitle: '',
  inputGlobePrecisionLabel: 'Precision',
  inputGlobePrecisionTitle: 'a precision (decimal, representing degrees of distance, defaults to 0, 9 digits after the dot and three before, unsigned, used to save the precision of the representation)',
  inputGlobeGlobeLabel: 'Globe',
  inputGlobeGlobeTitle: 'a coordinate system or globe (identified by an URI, defaults to the Earth, which means WGS84). Any such geodesic system must imply the globe for which it is used (and should be displayed as simply the globe in most cases)',

  inputTimeAsGregorianLabel: 'Date in Gregorian calendar model',
  inputTimeAsJulianLabel: 'Date in Julian calendar model',
  inputTimeTimeLabel: 'Time (ISO notation)',
  inputTimeTimeTitle: 'Date and time in ISO notation, including. E.g. "+1994-01-01T00:00:00Z"',
  inputTimeTimeZoneLabel: 'Timezone (minutes)',
  inputTimeTimeZoneTitle: 'The time zone offset against UTC, in minutes. May be given as an integer or string literal.',
  inputTimeCalendarModelLabel: 'Calendar model',
  inputTimeCalendarModelTitle: 'A calendar model, such as gregorian or julian',
  inputTimePrecisionLabel: 'Precision',
  inputTimePrecisionTitle: 'To what unit is the given date/time significant?',

  labelLabels: 'Label and description',
  labelLabel: 'Label',
  labelDescription: 'Description',
  labelAliases: 'Aliases',
  placeholderAliases: 'Add “also known as”',

  rank: {
    deprecated: 'deprecated',
    normal: 'normal',
    preferred: 'preferred',
  },

  rankTitle: {
    deprecated: 'used for a statement that contains information that may not be considered reliable or that is known to include errors. (For example, a statement that documents a wrong population figure that was published in some historic document. In this case the statement is not wrong – the historic document that is given as a reference really made the erroneous claim – but the statement should not be used in most cases.)',
    normal: 'used for a statement that contains relevant information that is believed to be correct, but may be too extensive to be shown by default. (For example, historic population figures for Berlin over the course of many years.)',
    preferred: 'used for a statement with the most important and most up-to-date information. Such a statement will be shown to all users and will be displayed in Wikipedia infoboxes by default. (For example, the most recent population figures for Berlin.)',
  },

  snakType: {
    value: 'custom value',
    novalue: 'no value',
    somevalue: 'unknown value',
  },
  snakTypeTitle: {
    value: 'is a marker for when there is a known value for the property that can be specified. '
            + 'This is the default snak type when creating a snak/claim/statement.',
    novalue: 'is a marker for when there certainly is no value for the property (example: if a human has no children, the corresponding item would receive this marker for ребёнок (P40)).'
            + ' Assigning the "no value" marker is a proper statement and is different to an item lacking a property.'
            + ' Latter implicates that it is unknown whether the property has no or some value (example: a missing human that may be dead or alive cannot be assigned дата смерти (P570) while, for consistency, a living human should feature дата смерти (P570) with the no value marker applied, clearly denoting that the human is not dead).',
    somevalue: ' is a marker for when there is some value but the exact value is not known for the property. '
            + '"Some value" means that there is nothing known for the value except that it should exist and not imply a negation of the claim (example: if the date of a human\'s death is completely unknown the item would receive this marker for death date (P570), denoting that the human is, in fact, dead — however, with the date of death being unknown).',
  },

  timePrecision0: '1 Gigayear',
  timePrecision1: '100 Megayears',
  timePrecision2: '10 Megayears',
  timePrecision3: 'Megayear',
  timePrecision4: '100 Kiloyears',
  timePrecision5: '10 Kiloyears',
  timePrecision6: 'Kiloyear',
  timePrecision7: '100 years',
  timePrecision8: '10 years',
  timePrecision9: 'year',
  timePrecision10: 'month',
  timePrecision11: 'day',
  timePrecision12: 'hour',
  timePrecision13: 'minute',
  timePrecision14: 'second',
  timePrecisionOther: 'other',
};

const fr = {
  dialogButtonUpdateLabelsText: 'Mettre à jour les libellés',
  dialogButtonUpdateLabelsLabel: 'Recharger les labels et descriptions des propriétés, qualificatifs et objets',
  dialogButtonSaveText: 'Enregistrer',
  dialogButtonSaveLabel: 'Fermer la fenêtre en enregistrant les modifications sur Wikidata',
  dialogButtonCancelText: 'Annuler',
  dialogButtonCancelLabel: 'Fermer la fenêtre sans enregistrer',
};

const ru = {

  buttonAddClaim: 'добавить утверждение',
  buttonRemoveClaim: 'удалить утверждение',
  buttonCreateOrEdit: 'создать или редактировать элемент Викиданных',
  buttonCreateOrEditPrefixCreate: 'создать: ',
  buttonCreateOrEditPrefixEdit: 'редактировать: ',
  buttonOnWikidata: 'открыть указанный элемент Викиданных на сайте Викиданных',

  checkboxShowJulian: 'показывать по Юлианскому календарю',
  checkboxShowJulianTitle: 'при отображении даты включать режим отображения по Юлианскому календарю. Данная опция не влияет на формат ввода или хранения.',

  confirmDeleteClaim: 'Удалить значение свойства «{label}»?',

  dialogButtonUpdateLabelsText: 'Обновить названия',
  dialogButtonUpdateLabelsTitle: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
  dialogButtonImportDataText: 'Импортировать…',
  dialogButtonImportDataTitle: 'Попробовать различные утилиты для импортирования данных из текста статьи или из внешних источников',
  dialogButtonSaveText: 'Сохранить',
  dialogButtonSaveTitle: 'Закрыть окно и сохранить все изменения в Викиданных',
  dialogButtonCancelText: 'Отмена',
  dialogButtonCancelTitle: 'Закрыть окно и отменить все изменения (не сохранять)',

  dialogAnalyzeChangesTitle: 'Анализ изменений...',
  dialogSaveChangesTitle: 'Сохранение изменений на Викиданных',

  errorAnalyzeChanges: 'Произошла ошибка при анализе изменений',
  errorRemoveClaims: 'Произошла ошибка при удалении устаревших утверждений из элемента',

  inputGlobeLatitudeLabel: 'Широта',
  inputGlobeLatitudeTitle: 'широта (десятичное число, значение по умолчанию не задано, 9 цифр после запятой и два до; знаковое)',
  inputGlobeLongitudeLabel: 'Долгота',
  inputGlobeLongitudeTitle: 'долгота (десятичное число, значение по умолчанию не задано, 9 цифр после запятой и три до; знаковое)',
  inputGlobeAltitudeLabel: 'Высота',
  inputGlobeAltitudeTitle: 'Высота (десятичное число, значение по умолчанию не задано, 9 цифр после запятой и два до; знаковое)',
  inputGlobePrecisionLabel: 'Точность',
  inputGlobePrecisionTitle: 'точность (десятичное число, representing degrees of distance, значение по умолчанию 0, 9 цифр после запятой и три до; знаковое, используется для указания точности представления георафической координаты)',
  inputGlobeGlobeLabel: 'Глобус',
  inputGlobeGlobeTitle: 'координатная система или глобус (указывается идентификатором, по умолчанию Земля, т. е. WGS84)',

  inputTimeAsGregorianLabel: 'дата по григорианскому календарю (новый стиль)',
  inputTimeAsJulianLabel: 'дата по юлианскому календарю (старый стиль)',
  inputTimeTimeLabel: 'Дата и время (ISO-нотация)',
  inputTimeTimeTitle: 'Дата и время в ISO-нотации, т. е. «+1994-01-01T00:00:00Z» по григорианскому календарю',
  inputTimeTimeZoneLabel: 'Часовой пояс (в минутах)',
  inputTimeTimeZoneTitle: 'Сдвиг часового пояса относительно UTC, в минутах',
  inputTimePrecisionLabel: 'Точность',
  inputTimePrecisionTitle: 'Какая наиболее точная значая единица для данного значения?',
  inputTimeCalendarModelLabel: 'Календарь для отображения',
  inputTimeCalendarModelTitle: 'Календарь, например,  юлианский или григорианский',

  labelLabels: 'Метка и описание',
  labelLabel: 'Метка',
  labelDescription: 'Описание',
  labelAliases: 'Также известен как',
  placeholderAliases: 'Добавить «также известен как»',

  rank: {
    deprecated: 'нерекомендуемый',
    normal: 'нормальный',
    preferred: 'предпочтительный',
  },

  rankTitle: {
    deprecated: 'используется для утверждений, содержащих информацию, которую нельзя считать надёжной или которая содержит известные ошибки. (Например, утверждение сообщает о неверной численности населения, опубликованной в некоем историческом документе. В этом случае утверждение не является ложным — в историческом документе, указанном в качестве источника, действительно было сделано ошибочное заявление — но такое утверждение в большинстве случаев не стоит использовать.)',
    normal: ' используется для утверждений, содержащих релевантную информацию, которая считается верной, но которой, возможно, слишком много для отображения по умолчанию. (Например, измерения исторической численности населения Берлина на протяжении множества лет.)',
    preferred: 'используется для утверждений с наиболее важной и наиболее актуальной информацией. Такое утверждение будет показываться всем участникам и будет отображаться в шаблонах-карточках Википедии по умолчанию. (Например, самые последние сведения о численности населения Берлина.)',
  },

  snakType: {
    value: 'своё значение',
    novalue: 'значение не задано',
    somevalue: 'неизвестное значение',
  },

  timePrecision0: 'гигагод',
  timePrecision1: '100 мегалет',
  timePrecision2: '10 мегалет',
  timePrecision3: 'мегагод',
  timePrecision4: '100 килолет',
  timePrecision5: '10 килолет',
  timePrecision6: 'килогод',
  timePrecision7: 'век',
  timePrecision8: '10 лет',
  timePrecision9: 'год',
  timePrecision10: 'месяц',
  timePrecision11: 'день',
  timePrecision12: 'час',
  timePrecision13: 'минута',
  timePrecision14: 'секунда',
  timePrecisionOther: 'другое',
};

const translations = { en, fr, ru };
const result = I18nUtils.localize( {}, translations );
export default result;
