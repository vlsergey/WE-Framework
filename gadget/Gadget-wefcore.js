/**
 * Those JavaScript classes are main core of WE-Framework to edit Wikidata using
 * JQuery dialogs. They provide classes to edit snak values, snaks, claims, and
 * claim groups (of the same property). For the examples how to use those
 * classes see "WEF_ExternalLinks.js" and "WEF_PersonEditor.js".
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.wef_Editors_i18n_en = {

	actionAnalyzeChanges: 'Collecting and analyzing changes to entity',
	actionNoChangesPurge: 'No changes found, purge and refresh current page',
	actionObtainCentralAuthToken: 'Get new global auth token',
	actionObtainEditToken: 'Get edit token',
	actionUpdateEntity: 'Saving changes in entity (update and create statements)',
	actionRemoveClaims: 'Saving changes in entity (remove statements)',

	buttonSelectSnakType: 'select snak type',
	buttonAddClaim: 'add claim',
	buttonRemoveClaim: 'remove claim',
	buttonAddQualifier: 'add qualifier',
	buttonRemoveQualifier: 'remove qualifier',
	buttonUrlNavigate: 'open specified URL',
	buttonCreateOrEdit: 'create or edit wikidata item',
	buttonCreateOrEditPrefixCreate: 'create as: ',
	buttonCreateOrEditPrefixEdit: 'edit as: ',
	buttonOnWikidata: 'open specified wikidata item on wikidata website',

	checkboxShowJulian: 'show in Julian calendar?',
	checkboxShowJulianTitle: 'when displaying the date show in julian calendar. This option does not change the input format or the value stored',

	confirmDeleteClaim: 'Remove the value of property «{label}»?',

	dialogAnalyzeChangesTitle: 'Analyze changes...',
	dialogSaveChangesTitle: 'Saving changes to Wikidata...',

	errorAnalyzeChanges: 'Unable to collect and analyze changes',
	errorObtainCentralAuthToken: 'Unable to obtain new global auth token',
	errorObtainEditToken: 'Unable to obtain edit token',
	errorUpdateEntity: 'Unable to update entity',
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

	inputQuantityUnitLabel: 'unit',
	inputQuantityUnitTitle: '',
	inputQuantityLowerBoundLabel: 'lower bound',
	inputQuantityLowerBoundTitle: '',
	inputQuantityAmountLabel: 'amount',
	inputQuantityAmountTitle: '',
	inputQuantityUpperBoundLabel: 'upper bound',
	inputQuantityUpperBoundTitle: '',
	inputQuantityModeExact: 'exact',
	inputQuantityModePlusMinus: 'plus-minus',
	inputQuantityModeOther: 'other',

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

	labelLabels: 'Label, description and aliases',
	labelLabel: 'Label',
	labelDescription: 'Description',
	labelAliases: 'Aliases',

	rankDeprecatedValue: 'deprecated',
	rankDeprecatedTitle: 'used for a statement that contains information that may not be considered reliable or that is known to include errors. (For example, a statement that documents a wrong population figure that was published in some historic document. In this case the statement is not wrong – the historic document that is given as a reference really made the erroneous claim – but the statement should not be used in most cases.)',
	rankNormalValue: 'normal',
	rankNormalTitle: 'used for a statement that contains relevant information that is believed to be correct, but may be too extensive to be shown by default. (For example, historic population figures for Berlin over the course of many years.)',
	rankPreferredValue: 'preferred',
	rankPreferredTitle: 'used for a statement with the most important and most up-to-date information. Such a statement will be shown to all users and will be displayed in Wikipedia infoboxes by default. (For example, the most recent population figures for Berlin.)',

	snakTypeValue: 'custom value',
	snakTypeValueTitle: 'is a marker for when there is a known value for the property that can be specified. '
			+ 'This is the default snak type when creating a snak/claim/statement.',
	snakTypeNoValue: 'no value',
	snakTypeNoValueTitle: 'is a marker for when there certainly is no value for the property (example: if a human has no children, the corresponding item would receive this marker for ребёнок (P40)).'
			+ ' Assigning the "no value" marker is a proper statement and is different to an item lacking a property.'
			+ ' Latter implicates that it is unknown whether the property has no or some value (example: a missing human that may be dead or alive cannot be assigned дата смерти (P570) while, for consistency, a living human should feature дата смерти (P570) with the no value marker applied, clearly denoting that the human is not dead).',
	snakTypeSomeValue: 'unknown value',
	snakTypeSomeValueTitle: ' is a marker for when there is some value but the exact value is not known for the property. '
			+ '"Some value" means that there is nothing known for the value except that it should exist and not imply a negation of the claim (example: if the date of a human\'s death is completely unknown the item would receive this marker for death date (P570), denoting that the human is, in fact, dead — however, with the date of death being unknown).',

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

	sourcesDialogTitle: 'View and edit sources for claim — WE-Framework',
	sourcesButtonUpdateLabelsText: 'Update labels',
	sourcesButtonUpdateLabelsLabel: 'Redownload properties, qualificator and objects labels and descriptions from Wikidata',
	sourcesButtonAddText: 'Add',
	sourcesButtonAddLabel: 'Add new reference to the list',
	sourcesButtonCloseText: 'Close',
	sourcesButtonCloseLabel: 'Close the dialog',
	sourcesLabelAddUsedReferences: 'Quick add recently used sources: ',
};

window.wef_Editors_i18n_ru = {

	actionAnalyzeChanges: 'Сбор и анализ изменений в элементе',
	actionNoChangesPurge: 'Изменения не найдены, перезагрузка текущей страницы',
	actionObtainCentralAuthToken: 'Получение нового токена централизованной аутентификации',
	actionObtainEditToken: 'Получение токена редактирования',
	actionUpdateEntity: 'Сохранение изменений в элемент (обновление и создание утверждений)',
	actionRemoveClaims: 'Сохранение изменений в элемент (удаление утверждений)',

	buttonSelectSnakType: 'выбрать тип значения',
	buttonAddClaim: 'добавить утверждение',
	buttonRemoveClaim: 'удалить утверждение',
	buttonAddQualifier: 'добавить квалификатор',
	buttonRemoveQualifier: 'удалить квалификатор',
	buttonUrlNavigate: 'открыть указанный URL',
	buttonCreateOrEdit: 'создать или редактировать элемент Викиданных',
	buttonCreateOrEditPrefixCreate: 'создать: ',
	buttonCreateOrEditPrefixEdit: 'редактировать: ',
	buttonOnWikidata: 'открыть указанный элемент Викиданных на сайте Викиданных',

	checkboxShowJulian: 'показывать по Юлианскому календарю',
	checkboxShowJulianTitle: 'при отображении даты включать режим отображения по юлинскому календарю. Данная опция не влияет на формат ввода или хранения.',

	confirmDeleteClaim: 'Удалить значение свойства «{label}»?',

	dialogAnalyzeChangesTitle: 'Анализ изменений...',
	dialogSaveChangesTitle: 'Сохранение изменений на Викиданных',

	errorAnalyzeChanges: 'Произошла ошибка при анализе изменений',
	errorObtainCentralAuthToken: 'Произошла ошибка при получении нового токена глобальной аутентификации',
	errorObtainEditToken: 'Произошла ошибка при получении нового токена редактирования',
	errorUpdateEntity: 'Произошла ошибка при сохранении изменений в элемент',
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

	inputQuantityUnitLabel: 'единица',
	inputQuantityUnitTitle: '',
	inputQuantityLowerBoundLabel: 'нижняя граница',
	inputQuantityLowerBoundTitle: '',
	inputQuantityAmountLabel: 'количество',
	inputQuantityAmountTitle: '',
	inputQuantityUpperBoundLabel: 'верхняя граница',
	inputQuantityUpperBoundTitle: '',
	inputQuantityModeExact: 'точно',
	inputQuantityModePlusMinus: 'плюс-минус',
	inputQuantityModeOther: 'другое',

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

	labelLabels: 'Метка, описание и синонимы',
	labelLabel: 'Метка',
	labelDescription: 'Описание',
	labelAliases: 'Также известен как',

	rankDeprecatedValue: 'нерекомендуемый',
	rankDeprecatedTitle: 'используется для утверждений, содержащих информацию, которую нельзя считать надёжной или которая содержит известные ошибки. (Например, утверждение сообщает о неверной численности населения, опубликованной в некоем историческом документе. В этом случае утверждение не является ложным — в историческом документе, указанном в качестве источника, действительно было сделано ошибочное заявление — но такое утверждение в большинстве случаев не стоит использовать.)',
	rankNormalValue: 'нормальный',
	rankNormalTitle: ' используется для утверждений, содержащих релевантную информацию, которая считается верной, но которой, возможно, слишком много для отображения по умолчанию. (Например, измерения исторической численности населения Берлина на протяжении множества лет.)',
	rankPreferredValue: 'предпочтительный',
	rankPreferredTitle: 'используется для утверждений с наиболее важной и наиболее актуальной информацией. Такое утверждение будет показываться всем участникам и будет отображаться в шаблонах-карточках Википедии по умолчанию. (Например, самые последние сведения о численности населения Берлина.)',

	snakTypeValue: 'своё значение',
	snakTypeNoValue: 'значение не задано',
	snakTypeSomeValue: 'неизвестное значение',

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

	sourcesDialogTitle: 'Просмотр и редактирование источников для утверждения — WE-Framework',
	sourcesButtonUpdateLabelsText: 'Обновить названия',
	sourcesButtonUpdateLabelsLabel: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
	sourcesButtonAddText: 'Добавить',
	sourcesButtonAddLabel: 'Добавить новую сноску на источник в список',
	sourcesButtonCloseText: 'Закрыть',
	sourcesButtonCloseLabel: 'Закрыть диалоговое окно',
	sourcesLabelAddUsedReferences: 'Быстрое добавление недавно использованных источников: ',
};

window.WEF_Editors_i18n = function() {

	this.htmlInProgress = '<img alt="⌚" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pictogram_voting_wait.svg/17px-Pictogram_voting_wait.svg.png" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pictogram_voting_wait.svg/26px-Pictogram_voting_wait.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pictogram_voting_wait.svg/34px-Pictogram_voting_wait.svg.png 2x" data-file-width="250" data-file-height="250" height="17" width="17">';
	this.htmlSuccess = '<img alt="✔" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Yes_check.svg/15px-Yes_check.svg.png" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Yes_check.svg/23px-Yes_check.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Yes_check.svg/30px-Yes_check.svg.png 2x" data-file-width="600" data-file-height="600" height="15" width="15">';
	this.htmlFailure = '<img alt="×" src="//upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/16px-Red_x.svg.png" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/24px-Red_x.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/32px-Red_x.svg.png 2x" data-file-width="600" data-file-height="600" height="16" width="16">';
	this.htmlNotNeeded = '<img alt="(=)" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pictogram_voting_neutral.svg/15px-Pictogram_voting_neutral.svg.png" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pictogram_voting_neutral.svg/23px-Pictogram_voting_neutral.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pictogram_voting_neutral.svg/30px-Pictogram_voting_neutral.svg.png 2x" data-file-width="250" data-file-height="250" height="15" width="15">';

	this.summary = 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get( 'wgDBname' );

	WEF_Utils.localize( this, 'wef_Editors_i18n_' );
};

/* Some commons i18n strings for all editors */
window.wef_AnyEditor_i18n_en = {

	dialogButtonUpdateLabelsText: 'Update labels',
	dialogButtonUpdateLabelsLabel: 'Redownload properties, qualificator and objects labels and descriptions from Wikidata',
	dialogButtonSaveText: 'Save',
	dialogButtonSaveLabel: 'Close the dialog and save all changes to Wikidata',
	dialogButtonCancelText: 'Cancel',
	dialogButtonCancelLabel: 'Close the dialog and discard all changes (do not save)',
	dialogTitle: 'WE-Framework',
	dialogTitleNewElement: '(new item)',

	fieldsetGeneral: 'general',
	groupGeneral: 'general',

	errorLoadingWikidata: 'Unable to load element data from Wikidata',

	statusLoadingWikidata: 'Loading element data from Wikidata',
};

window.wef_AnyEditor_i18n_fr = {
	dialogButtonUpdateLabelsText: 'Mettre à jour les libellés',
	dialogButtonUpdateLabelsLabel: 'Recharger les labels et descriptions des propriétés, qualificatifs et objets',
	dialogButtonSaveText: 'Enregistrer',
	dialogButtonSaveLabel: 'Fermer la fenêtre en enregistrant les modifications sur Wikidata',
	dialogButtonCancelText: 'Annuler',
	dialogButtonCancelLabel: 'Fermer la fenêtre sans enregistrer',
	dialogTitle: 'WE-Framework',

	fieldsetGeneral: 'général',
	groupGeneral: 'général',

	errorLoadingWikidata: 'Échec du chargement des données de Wikidata',

	statusLoadingWikidata: 'Chargement des données de Wikidata',
};

window.wef_AnyEditor_i18n_ru = {
	dialogButtonUpdateLabelsText: 'Обновить названия',
	dialogButtonUpdateLabelsLabel: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
	dialogButtonSaveText: 'Сохранить',
	dialogButtonSaveLabel: 'Закрыть окно и сохранить все изменения в Викиданных',
	dialogButtonCancelText: 'Отмена',
	dialogButtonCancelLabel: 'Закрыть окно и отменить все изменения (не сохранять)',
	dialogTitle: 'WE-Framework',
	dialogTitleNewElement: '(новый элемент)',

	fieldsetGeneral: 'основное',
	groupGeneral: 'основное',

	errorLoadingWikidata: 'Невозможно загрузить информацию с Викиданных',

	statusLoadingWikidata: 'Загружаем данные элемента с Викиданных',
};

/** @const */
WEF_RANK_PREFERRED = 'preferred';
/** @const */
WEF_RANK_NORMAL = 'normal';
/** @const */
WEF_RANK_DEPRECATED = 'deprecated';

/**
 * @typedef WEF_Entity
 * @type {object}
 * @property {string} id
 * @property {string} type
 * @property {object} claims
 */

/**
 * @typedef WEF_Claim
 * @type {object}
 * @property {string} id
 * @property {WEF_Snak} mainsnak
 * @property {string} type
 * @property {string} rank
 */

/**
 * @typedef WEF_Snak
 * @type {object}
 * @property {string} snaktype
 * @property {string} property
 * @property {string} datatype
 * @property {object} datavalue
 */

/**
 * @param {WEF_Definition}
 *            args
 * @class
 */
WEF_Definition = function( args ) {
	/** @type {string} */
	this.code = args.code;
	/** @type {string} */
	this.datatype = 'string';
	/** @type {string} */
	this.label = undefined;
	/** @type {string} */
	this.labelPrefix = undefined;
	/** @type {function} */
	this.normalize = undefined;
	/** @type {object} */
	this.check = undefined;
	/** @type {function} */
	this.url = undefined;
	/** @type {WEF_Definition[]} */
	this.qualifiers = undefined;

	$.extend( this, args );
};
window.WEF_Definition = WEF_Definition;

WEF_Utils = function() {
	// no members
};
window.WEF_Utils = WEF_Utils;

WEF_Utils.appendToNamedMap = function( element, mapName, key, obj ) {
	"use strict";
	if ( typeof element === 'undefined' ) {
		throw new Error( 'Illegal argument: element is undefined' );
	}
	if ( typeof element[mapName] === 'undefined' ) {
		element[mapName] = {};
	}
	if ( typeof element[mapName][key] === 'undefined' ) {
		element[mapName][key] = [];
	}
	element[mapName][key].push( obj );
};

WEF_Utils.assertCorrectEntityId = function( entityId ) {
	if ( !WEF_Utils.isCorrectEntityId( entityId ) ) {
		throw new Error( 'Incorrect entity ID: ' + entityId );
	}
};

WEF_Utils.convertGregorianToJulian = function( year, month, day ) {
	"use strict";
	return WEF_Utils._convertJulianDayToJulian( WEF_Utils._convertGregorianToJulianDay( Number( year ), Number( month ), Number( day ), true ) );
};

WEF_Utils._convertGregorianToJulianDay = function( year, month, day, fixNoon ) {
	"use strict";
	var a = ( 1721425.5 - 1 );
	var b = ( 365 * ( year - 1 ) );
	var c = Math.floor( ( year - 1 ) / 4 );
	var d = ( -Math.floor( ( year - 1 ) / 100 ) );
	var e = Math.floor( ( year - 1 ) / 400 );
	var f = Math.floor( ( ( ( 367 * month ) - 362 ) / 12 ) + ( ( month <= 2 ) ? 0 : ( WEF_Utils._isLeapGregorianYear( year ) ? -1 : -2 ) ) + day );
	return a + b + c + d + e + f + ( fixNoon ? 0.5 : 0 );
};

WEF_Utils._convertJulianDayToGregorian = function( julianDay ) {
	"use strict";
	var wjd = Math.floor( julianDay - 0.5 ) + 0.5;
	var depoch = wjd - 1721425.5;
	var quadricent = Math.floor( depoch / 146097 );
	var dqc = WEF_Utils._mod( depoch, 146097 );
	var cent = Math.floor( dqc / 36524 );
	var dcent = WEF_Utils._mod( dqc, 36524 );
	var quad = Math.floor( dcent / 1461 );
	var dquad = WEF_Utils._mod( dcent, 1461 );
	var yindex = Math.floor( dquad / 365 );
	var year = ( quadricent * 400 ) + ( cent * 100 ) + ( quad * 4 ) + yindex;
	if ( !( ( cent == 4 ) || ( yindex == 4 ) ) ) {
		year++;
	}
	var yearday = wjd - WEF_Utils._convertGregorianToJulianDay( year, 1, 1, false );
	var leapadj = ( ( wjd < WEF_Utils._convertGregorianToJulianDay( year, 3, 1, false ) ) ? 0 : ( WEF_Utils._isLeapGregorianYear( year ) ? 1 : 2 ) );
	var month = Math.floor( ( ( ( yearday + leapadj ) * 12 ) + 373 ) / 367 );
	var day = ( wjd - WEF_Utils._convertGregorianToJulianDay( year, month, 1, false ) ) + 1;
	return new Array( year, month, WEF_Utils._floor2( day ) );
};

WEF_Utils._convertJulianDayToJulian = function( julianDay ) {
	"use strict";
	var b = 0;
	var c = julianDay + 32082;
	var d = WEF_Utils._floor2( ( 4 * c + 3 ) / 1461 );
	var e = c - WEF_Utils._floor2( 1461 * d / 4 );
	var m = WEF_Utils._floor2( ( 5 * e + 2 ) / 153 );
	var day = e - WEF_Utils._floor2( ( 153 * m + 2 ) / 5 ) + 1;
	var month = m + 3 - 12 * WEF_Utils._floor2( m / 10 );
	var year = 100 * b + d - 4800 + WEF_Utils._floor2( m / 10 );
	return new Array( year, month, day );
};

WEF_Utils.convertJulianToGregorian = function( year, month, day ) {
	"use strict";
	return WEF_Utils._convertJulianDayToGregorian( WEF_Utils._convertJulianToJulianDay( Number( year ), Number( month ), Number( day ) ) );
};

WEF_Utils._convertJulianToJulianDay = function( year, month, day ) {
	"use strict";
	var a = WEF_Utils._floor2( ( 14 - month ) / 12 );
	var y = year + 4800 - a;
	var m = month + 12 * a - 3;
	return day + WEF_Utils._floor2( ( 153 * m + 2 ) / 5 ) + 365 * y + WEF_Utils._floor2( y / 4 ) - 32083;
};

WEF_Utils.createWikidataItem = function( itemData ) {
	var updates = new WEF_Updates( null );
	updates.data = itemData;
	return WEF_Utils.update( updates );
};

WEF_Utils.fillSelectWithMonthes = function( jSelect ) {
	"use strict";
	for ( var i = 1; i <= 12; i++ ) {
		var option = $( document.createElement( 'option' ) );
		option.attr( 'value', i );
		option.text( mw.config.get( 'wgMonthNames' )[i] );
		jSelect.append( option );
	}
	jSelect.val( -1 );
};

WEF_Utils._floor2 = function( a ) {
	"use strict";
	if ( a >= 0 ) {
		return Math.floor( a );
	} else {
		return Math.ceil( a );
	}
};

/** @returns {string} */
WEF_Utils.formatCentury = function( century ) {
	"use strict";
	return WEF_Utils.formatDate( century * 100 );
};

/** @returns {string} */
WEF_Utils.formatDate = function( year, month, day ) {
	"use strict";
	var time;
	if ( year >= 0 ) {
		time = '+' + year;
	} else {
		time = '-' + ( -year );
	}
	time += '-';
	if ( typeof month !== 'undefined' ) {
		time += ( '00' + month ).substr( -2, 2 );
	} else {
		time += '01';
	}
	time += '-';
	if ( typeof day !== 'undefined' ) {
		time += ( '00' + day ).substr( -2, 2 );
	} else {
		time += '01';
	}
	time += 'T00:00:00Z';
	return time;
};

WEF_Utils.formatQuantity = function( value ) {
	"use strict";
	if ( Number( value ) > 0 ) {
		return '+' + Number( value );
	} else {
		return '' + Number( value );
	}
};

WEF_Utils.formatValueRemotely = function( datatype, datavalue, span ) {
	"use strict";

	var prefix;
	if ( !WEF_Utils.isWikidata() ) {
		prefix = '//www.wikidata.org/w/api.php' //
				+ '?origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) ) //
				+ '&format=json'; //
	} else {
		prefix = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php' //
				+ '?format=json';
	}

	$.ajax( {
		type: 'POST',
		url: prefix // 
				+ '&action=wbformatvalue' //
				+ '&generate=' + encodeURIComponent( "text/html" ),
		data: {
			datatype: datatype,
			datavalue: JSON.stringify( datavalue ),
			uselang: WEF_Utils.getDefaultLanguageCode(),
		},
		error: function( jqXHR, textStatus, errorThrown ) {
			// too bad :-(
			console.log( "Unable to call 'wbformatvalue'" );
			console.log( textStatus );
			console.log( errorThrown );
		},
		success: function( response ) {
			if ( response.error ) {
				console.log( "Unable to call 'wbformatvalue': " + response.error.info );
				return;
			}
			var result = response.result;
			if ( typeof result === 'undefined' ) {
				console.log( "Unable to call 'wbformatvalue': no result" );
				return;
			}

			// we assume Wikidata is trusted source :-)
			span.html( result );
		},
	} );

};

WEF_Utils.getDefaultLanguageCode = ( function() {
	var defaultLanguageCode;
	return function() {
		"use strict";
		if ( WEF_Utils.isEmpty( defaultLanguageCode ) ) {
			defaultLanguageCode = mw.config.get( 'wgUserLanguage' );
			if ( WEF_Utils.isEmpty( defaultLanguageCode ) ) {
				defaultLanguageCode = mw.config.get( 'wgContentLanguage' );
				if ( WEF_Utils.isEmpty( defaultLanguageCode ) ) {
					defaultLanguageCode = 'en';
				}
			}
		}

		return defaultLanguageCode;
	};
} )();

WEF_Utils.getEntityIdFromClaim = function( claim ) {
	if ( typeof claim == 'undefined' )
		return;

	return WEF_Utils.getEntityIdFromSnak( claim.mainsnak );
};

WEF_Utils.getEntityIdFromSnak = function( snak ) {
	if ( typeof snak === 'undefined' )
		return;

	return WEF_Utils.getEntityIdFromDatavalue( snak.datavalue );
};

WEF_Utils.getEntityIdFromDatavalue = function( datavalue ) {
	if ( typeof datavalue === 'undefined' // 
			|| typeof datavalue.value === 'undefined'// 
			|| typeof datavalue.value['entity-type'] === 'undefined'// 
			|| typeof datavalue.value['numeric-id'] === 'undefined'// 
	)
		return;

	var entityType = datavalue.value['entity-type'];
	var numericId = datavalue.value['numeric-id'];

	switch ( entityType ) {
	case 'property':
		return 'P' + numericId;
	case 'item':
		return 'Q' + numericId;
	default:
		throw new Error( "Unknown entity type: " + entityType );
	}
};

/** @return {string} */
WEF_Utils.getEntityId = function() {
	"use strict";
	// TODO: add check
	if ( WEF_Utils.isWikidata() ) {
		return mw.config.get( 'wgTitle' );
	} else {
		return mw.config.get( 'wgWikibaseItemId' );
	}
};

WEF_Utils.getFirstObjectKey = function( obj ) {
	"use strict";
	return Object.keys( obj )[0];
};

WEF_Utils.getFirstObjectValue = function( obj ) {
	"use strict";
	return obj[WEF_Utils.getFirstObjectKey( obj )];
};

/** @returns {string} */
WEF_Utils.getWikidataApiPrefix = function() {
	"use strict";
	if ( mw.config.get( 'wgSiteName' ) === 'Wikidata' ) {
		return mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php' + '?format=json';
	} else {
		return '//www.wikidata.org/w/api.php' + '?origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) ) + '&format=json';
	}
};

WEF_Utils.isCorrectEntityId = function( entityId ) {
	return !WEF_Utils.isEmpty( entityId ) && /^[PQ]\d+$/.test( entityId );
};

WEF_Utils.isEmpty = function( obj ) {
	return ( !obj || $.trim( obj ) === "" );
};

WEF_Utils._isLeapGregorianYear = function( year ) {
	"use strict";
	return ( ( year % 4 ) === 0 ) && ( !( ( ( year % 100 ) === 0 ) && ( ( year % 400 ) !== 0 ) ) );
};

/** @returns {Boolean} */
WEF_Utils.isWikidata = function() {
	"use strict";
	return mw.config.get( 'wgSiteName' ) === 'Wikidata';
};

WEF_Utils.localize = function( targetObject, globalVariablesPrefix ) {
	"use strict";
	var languages = [ 'ru', 'en', mw.config.get( 'wgContentLanguage' ), mw.config.get( 'wgUserLanguage' ) ];
	$.each( languages, function( i, lang ) {
		if ( window[globalVariablesPrefix + lang] ) {
			$.extend( targetObject, window[globalVariablesPrefix + lang] );
		}
	} );
};

WEF_Utils.mockEntityWithType =
/**
 * @param {String}
 *            typeEntityId
 */
function( typeEntityId ) {
	WEF_Utils.assertCorrectEntityId( typeEntityId );

	return {
		"claims": {
			"P31": [ {
				"mainsnak": WEF_Utils.newWikibaseItemSnak( "P31", "item", Number( typeEntityId.substr( 1 ) ) ),
				"type": "statement",
				"rank": "normal",
			} ]
		}
	};
};

WEF_Utils._mod = function( a, b ) {
	"use strict";
	return a - ( b * Math.floor( a / b ) );
};

WEF_Utils.newWikibaseItemSnak =
/**
 * @param {String}
 *            property
 * @param {String}
 *            entityType
 * @param {Number}
 *            numericId
 */
function( property, entityType, numericId ) {
	return {
		snaktype: 'value',
		property: property,
		datatype: 'wikibase-item',
		datavalue: {
			value: {
				'entity-type': entityType,
				'numeric-id': numericId,
			},
			type: 'wikibase-entityid',
		},
	};
};

/**
 * Date.parse with progressive enhancement for ISO 8601
 * <https://github.com/csnover/js-iso8601> © 2011 Colin Snover
 * <http://zetafleet.com>
 * 
 * Released under MIT license.
 * 
 * Some changes by Vlsergey to adapt to Wikidata format
 */
WEF_Utils.parseISO8601 = function( date ) {
	var numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
	var timestamp, struct, minutesOffset = 0;

	// ES5 §15.9.4.2 states that the string should attempt to be parsed as a
	// Date Time String Format string before falling back to any
	// implementation-specific date parsing, so that’s what we do, even if
	// native implementations could be faster

	// 1 YYYY 2 MM 3 DD 4 HH 5 mm 6 ss 7 msec 8 Z 9 ± 10 tzHH 11 tzmm
	if ( ( struct = /^([+\-]\d{1,11})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec( date ) ) ) {
		// avoid NaN timestamps caused by “undefined” values being passed to
		// Date.UTC
		for ( var i = 0, k; ( k = numericKeys[i] ); ++i ) {
			struct[k] = +struct[k] || 0;
		}

		// allow undefined days and months
		struct[2] = ( +struct[2] || 1 ) - 1;
		struct[3] = +struct[3] || 1;

		if ( struct[8] !== 'Z' && struct[9] !== undefined ) {
			minutesOffset = struct[10] * 60 + struct[11];

			if ( struct[9] === '+' ) {
				minutesOffset = 0 - minutesOffset;
			}
		}

		timestamp = Date.UTC( struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7] );
	} else {
		timestamp = Date.parse( date );
	}

	return timestamp;
};

/**
 * Preprocess different aspects of WEF_definition
 * <ul>
 * <li>Analyzes definition.template string and updates definition with new
 * functions like url() and normalize()</li>
 * <li>Create standard url function for commonsMedia datatype</li>
 * <ul>
 * 
 * @param definition
 *            {WEF_Definition}
 */
WEF_Utils.processDefinition = function( definition ) {
	if ( typeof definition.template !== 'undefined' ) {
		var newNormFunctions = [];
		$.each( $.isArray( definition.template ) ? definition.template : [ definition.template ], function( index, template ) {
			if ( template.indexOf( '$1' ) === -1 ) {
				mw.log.warn( 'Template of definition «' + definition.code + '» missing «$1» in «' + template + '»' );
				return;
			}

			var prefix = template.substr( 0, template.indexOf( '$1' ) );
			var suffix = template.substr( template.indexOf( '$1' ) + '$1'.length );

			var rPrefix = WEF_Utils.regexpEscape( prefix );
			var rSuffix = WEF_Utils.regexpEscape( suffix );
			var pattern;

			if ( /^http:/.test( rPrefix ) ) {
				rPrefix = rPrefix.replace( /^http:/, 'https?:' );
			}
			if ( /^https:/.test( rPrefix ) ) {
				rPrefix = rPrefix.replace( /^https:/, 'https?:' );
			}

			pattern = '^' + rPrefix + '(';
			if ( typeof definition.check !== 'undefined' ) {
				var inner = WEF_Utils.regexpGetSource( definition.check );
				inner = inner.replace( /^\^(.*)$/, '$1' ).replace( /^(.*)\$$/, '$1' );
				pattern += inner;
			} else {
				pattern += '.*';
			}
			pattern += ')';

			if ( WEF_Utils.isEmpty( rSuffix ) ) {
				pattern += '$';
			} else {
				pattern += rSuffix + '.*$';
			}
			var regExp = new RegExp( pattern );

			newNormFunctions.push( function( id ) {
				return id.replace( regExp, '$1' );
			} );
		} );
		$.each( newNormFunctions, function( i, func ) {
			var old = definition.normalize;
			if ( typeof old !== 'undefined' ) {
				definition.normalize = function( id ) {
					return func( old( id ) );
				};
			} else {
				definition.normalize = function( id ) {
					return func( id );
				};
			}
		} );
		if ( typeof definition.url === 'undefined' ) {
			var first = $.isArray( definition.template ) ? definition.template[0] : definition.template;
			definition.url = function( id ) {
				return first.replace( '$1', id );
			};
		}
	}
	if ( definition.datatype === 'commonsMedia' && typeof definition.url === 'undefined' ) {
		definition.url = WEF_Utils.urlCommons;
	}
},

WEF_Utils.putOrClearLocalStorage = function( key, value ) {
	if ( typeof window.localStorage === 'undefined' )
		return;

	try {
		localStorage[key] = value;
	} catch ( err ) {
		mw.log.warn( 'Unable to populate local storage: ' + err );
		try {
			localStorage.removeItem( key );
		} catch ( err ) {
			mw.log.warn( 'Unable to remove outdated item from local storage: ' + err );
		}
	}
}

WEF_Utils.purge = function() {
	window.location
			.replace( mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/index.php?action=purge&title=' + encodeURIComponent( mw.config.get( 'wgPageName' ) ) );
};

WEF_Utils.purgeAsync = function() {
	$.ajax( {
		url: mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php?action=purge&titles=' + encodeURIComponent( mw.config.get( 'wgPageName' ) ),
	} );
};

WEF_Utils.queryCentralAuthToken = function() {
	var d = $.Deferred();

	$.ajax( {
		type: 'GET',
		url: mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php' + '?format=json&action=tokens&type=centralauth',
		error: function( jqXHR, textStatus, errorThrown ) {
			d.reject( textStatus );
		},
		success: function( result ) {
			if ( result.error ) {
				d.reject( result.error.info );
				return;
			}
			if ( !result.tokens || !result.tokens.centralauthtoken ) {
				d.reject( 'no centralauthtoken in response' );
				return;
			}

			d.resolve( result.tokens.centralauthtoken );
		},
	} );

	return d.promise();
};

WEF_Utils.queryWikidataToken = function( centralAuthToken, tokenType ) {
	if ( !WEF_Utils.isWikidata() && WEF_Utils.isEmpty( centralAuthToken ) ) {
		throw new Error( "Need to specify centralauthtoken for out-of-wikidata queries" );
	}
	if ( WEF_Utils.isEmpty( tokenType ) ) {
		tokenType = 'csrf';
	}

	var d = $.Deferred();

	var prefix;
	if ( !WEF_Utils.isWikidata() ) {
		prefix = '//www.wikidata.org/w/api.php' //
				+ '?origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) ) //
				+ '&centralauthtoken=' + encodeURIComponent( centralAuthToken ) //
				+ '&format=json'; //
	} else {
		prefix = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php' //
				+ '?format=json';
	}

	$.ajax( {
		type: 'GET',
		url: prefix // 
				+ '&action=query' //
				+ '&meta=tokens' //
				+ '&type=' + encodeURIComponent( tokenType ),
		error: function( jqXHR, textStatus, errorThrown ) {
			d.reject( textStatus );
		},
		success: function( result ) {
			if ( result.error ) {
				d.reject( result.error.info );
				return;
			}

			var token = WEF_Utils.getFirstObjectValue( result.query.tokens );
			if ( typeof token === 'undefined' ) {
				d.reject( 'no token in response' );
				return;
			}

			d.resolve( token );
		},
	} );

	return d.promise();
};

/**
 * @param s
 *            {string} string to escapse
 * @returns {string} safe-to-use regexp pattern string
 */
WEF_Utils.regexpEscape = function( s ) {
	return s.replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' );
};

WEF_Utils.regexpGetHtmlPattern = function( regexp ) {
	var source = WEF_Utils.regexpGetSource( options.check );
	if ( source.substr( 0, 1 ) !== '^' ) {
		source = '.*' + source;
	}
	if ( source.substr( source.lenght - 1, 1 ) !== '$' ) {
		source = source + '.*';
	}
	return source;
};

WEF_Utils.regexpGetSource = function( regexp ) {
	return regexp.toString().replace( /^\/(.*)\/[a-z]*$/, '$1' );
};

WEF_Utils.toRoman = ( function() {
	"use strict";
	var limit = 3999;
	var v = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
	var r = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

	return function( src ) {
		var n = Math.floor( src );
		var val = 0;
		var s = '';
		var i = 0;

		if ( n < 1 || n > limit )
			return '';
		while ( i < 13 ) {
			val = v[i];
			while ( n >= val ) {
				n -= val;
				s += r[i];
			}
			if ( n === 0 )
				return s;
			++i;
		}
		return '';
	};
} )();

WEF_Utils.update = function( updates ) {

	if ( !( updates instanceof WEF_Updates ) ) {
		throw new Error( 'WEF_Updates object is expected' );
	}

	var d = $.Deferred();

	var i18n = wef_Editors_i18n;
	var dialog = $( document.createElement( 'div' ) );
	dialog.attr( 'title', i18n.dialogSaveChangesTitle );

	var progressUl = $( document.createElement( 'ul' ) ).appendTo( dialog );

	var executionContext = {
		centralAuthToken: null,
		editToken: null,
		updates: updates,
		isWikidata: WEF_Utils.isWikidata(),
		localUrlPrefix: mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php' + '?format=json',
		wikidataUrlPrefix: WEF_Utils.getWikidataApiPrefix(),

		getPrefixWithCentralAuthToken: function() {
			if ( this.isWikidata === true ) {
				return this.localUrlPrefix;
			} else {
				return this.wikidataUrlPrefix + '&centralauthtoken=' + encodeURIComponent( this.centralAuthToken );
			}
		}
	};

	var actions = [];
	var actionFinal = function() {
		dialog.dialog( 'close' );
		d.resolve( executionContext.updates.entityId );
	};

	function createObtainCentralAuthTokenAction( onSuccessActionIndex, onFailureActionIndex ) {
		var progressItem = new WEF_ProgressItem( progressUl, i18n.actionObtainCentralAuthToken );
		return function() {
			var onFailureAction = typeof onFailureActionIndex === 'undefined' ? actionFinal : actions[onFailureActionIndex];
			var onSuccessAction = actions[onSuccessActionIndex];
			progressItem.inProgress();

			var d = WEF_Utils.queryCentralAuthToken();
			d.done( function( centralauthtoken ) {
				executionContext.centralAuthToken = centralauthtoken;
				progressItem.success();
				onSuccessAction();
			} );
			d.fail( function( textStatus ) {
				alert( i18n.errorObtainCentralAuthToken + ': ' + textStatus );
				progressItem.failure( textStatus );
				onFailureAction();
			} );
			return d;
		};
	}

	var currentAction = 0;

	if ( !WEF_Utils.isWikidata() ) {
		actions[currentAction] = createObtainCentralAuthTokenAction( currentAction + 1 );
		currentAction++;
	}

	/*
	 * Edit token obtains once for all edit actions on the same element so far
	 */
	( function() {
		var nextAction = currentAction + 1;
		var progressItem = new WEF_ProgressItem( progressUl, i18n.actionObtainEditToken );
		actions[currentAction] = function() {
			var onFailureAction = actionFinal;
			var onSuccessAction = actions[nextAction];
			progressItem.inProgress();

			var d = WEF_Utils.queryWikidataToken( executionContext.centralAuthToken, 'csrf' );
			d.done( function( editToken ) {
				executionContext.editToken = editToken;
				progressItem.success();
				onSuccessAction();
			} );
			d.fail( function( textStatus ) {
				progressItem.failure( textStatus );
				alert( i18n.errorObtainEditToken + ': ' + textStatus );
				onFailureAction();
			} );
		};
		currentAction++;
	} )();

	/* Saving changes in entity, if required */
	if ( !$.isEmptyObject( updates.data ) ) {
		/*
		 * Each action (including obtaining edit token) need separate auth
		 * token, because it's expiring in 10 seconds
		 */
		if ( WEF_Utils.isWikidata() === false ) {
			actions[currentAction] = createObtainCentralAuthTokenAction( currentAction + 1, currentAction + 2 );
			currentAction++;
		}
		( function() {
			var nextAction = currentAction + 1;
			var progressItem = new WEF_ProgressItem( progressUl, i18n.actionUpdateEntity );
			actions[currentAction] = function() {
				var onFailureAction = actions[nextAction];
				var onSuccessAction = actions[nextAction];
				progressItem.inProgress();
				$.ajax( {
					type: 'POST',
					url: executionContext.getPrefixWithCentralAuthToken() // 
							+ '&action=wbeditentity' // 
							+ ( WEF_Utils.isEmpty( executionContext.updates.entityId ) ? '&new=item' : '&id=' + executionContext.updates.entityId ) //
							+ '&summary=' + encodeURIComponent( i18n.summary ) //
					,
					data: {
						data: JSON.stringify( updates.data ),
						token: executionContext.editToken,
					},
					error: function( jqXHR, textStatus, errorThrown ) {
						progressItem.failure( textStatus );
						alert( i18n.errorUpdateEntity + ': ' + textStatus );
						onFailureAction();
						return;
					},
					success: function( result ) {
						if ( result.error ) {
							progressItem.failure( result.error.info );
							alert( i18n.errorUpdateEntity + ': ' + result.error.info );
							onFailureAction();
							return;
						}
						if ( result.entity ) {
							executionContext.updates.entityId = result.entity.id;
						}
						progressItem.success();
						onSuccessAction();
					},
				} );
			};
			currentAction++;
		} )();
	}

	/* Remove claims in separate request */
	if ( updates.removedClaims.length !== 0 ) {
		/*
		 * Each action (including obtaining edit token) need separate auth
		 * token, because it's expiring in 10 seconds
		 */
		if ( !WEF_Utils.isWikidata() ) {
			actions[currentAction] = createObtainCentralAuthTokenAction( currentAction + 1, currentAction + 2 );
			currentAction++;
		}
		( function() {
			var nextAction = currentAction + 1;
			var progressItem = new WEF_ProgressItem( progressUl, i18n.actionRemoveClaims );
			actions[currentAction] = function() {
				var onFailureAction = actions[nextAction];
				var onSuccessAction = actions[nextAction];
				progressItem.inProgress();
				$.ajax( {
					type: 'POST',
					url: executionContext.getPrefixWithCentralAuthToken() // 
							+ '&action=wbremoveclaims' // 
							+ '&summary=' + encodeURIComponent( i18n.summary ) //
					,
					data: {
						claim: updates.removedClaims.join( '|' ),
						token: executionContext.editToken,
					},
					error: function( jqXHR, textStatus, errorThrown ) {
						progressItem.failure( textStatus );
						alert( i18n.errorRemoveClaims + ': ' + textStatus );
						onFailureAction();
						return;
					},
					success: function( result ) {
						if ( result.error ) {
							progressItem.failure( result.error.info );
							alert( i18n.errorRemoveClaims + ': ' + result.error.info );
							onFailureAction();
							return;
						}
						progressItem.success();
						onSuccessAction();
					},
				} );
			};
			currentAction++;
		} )();
	}

	actions[currentAction] = actionFinal;

	dialog.dialog( {
		height: 'auto',
		width: 'auto',
	} );
	actions[0]();

	return d.promise();
};

WEF_Utils.urlCommons = function( value ) {
	return WEF_Utils.urlNice( '//commons.wikimedia.org/wiki/File:' + escape( value ) );
};

/**
 * @type {function}
 * @returns {string}
 */
WEF_Utils.urlNice = ( function() {
	var abc = 'ёйцукенгшщзхъфывапролджэячсмитьбюáñú,';
	abc = abc + abc.toUpperCase();
	var patterns = [];
	var map = {};
	for ( var i = 0; i < abc.length; i++ ) {
		var c = abc.charAt( i );
		var e = encodeURIComponent( c );
		patterns.push( e );
		map[e] = c;
	}

	var pattern = new RegExp( patterns.join( '|' ), 'g' );

	return function( stored ) {
		return stored.replace( pattern, function( match ) {
			return map[match];
		} );
	};
} )();

/**
 * @type {function}
 * @returns {string}
 */
WEF_Utils.urlUnnice = ( function() {
	var abc = 'ёйцукенгшщзхъфывапролджэячсмитьбюáñú,';
	abc = abc + abc.toUpperCase();
	var patterns = [];
	var map = {};
	for ( var i = 0; i < abc.length; i++ ) {
		var c = abc.charAt( i );
		var e = encodeURIComponent( c );
		patterns.push( c );
		map[c] = e;
	}

	var pattern = new RegExp( patterns.join( '|' ), 'g' );

	return function( displayed ) {
		return displayed.replace( pattern, function( match ) {
			return map[match];
		} );
	};
} )();

WEF_Utils.wbGetEntities = function( params ) {
	"use strict";
	var d = $.Deferred();

	$.ajax( {
		type: 'POST',
		url: WEF_Utils.getWikidataApiPrefix() + '&action=wbgetentities&uselang=' + encodeURIComponent( WEF_Utils.getDefaultLanguageCode() ),
		data: params,
		error: function( jqXHR, textStatus, errorThrown ) {
			// too bad :-(
			console.log( "Unable to call 'wbgetentities'" );
			console.log( textStatus );
			console.log( errorThrown );
			d.rejectWith( jqXHR, textStatus, errorThrown );
			return;
		},
		success: function( response ) {
			if ( response.error ) {
				console.log( "Unable to call 'wbgetentities': " + response.error.info );
				d.rejectWith( null, response.error, null );
				return;
			}
			d.resolve( response.entities );
		},
	} );

	return d.promise();
};

window.wef_Editors_i18n = new WEF_Editors_i18n();

/**
 * Wikidata labels and description cache using local user storage (i.e.
 * client-side). Part of WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
WEF_LabelsCache = function() {

	/**
	 * @const
	 * @private
	 */
	var MAX_ITEMS_PER_REQUEST = 50;

	/**
	 * @const
	 * @private
	 */
	var LOCALSTORAGE_PREFIX_LABELS = 'wef-d-label-';
	var LOCALSTORAGE_PREFIX_DESCRIPTIONS = 'wef-d-description-';

	/** @private */
	var cacheLabels = {};
	/** @private */
	var cacheDescriptions = {};
	/** @private */
	var queue = [];

	this.clear = function() {
		cacheLabels = {};
		cacheDescriptions = {};
		$.each( localStorage, function( key, value ) {
			if ( key.substr( 0, LOCALSTORAGE_PREFIX_LABELS.length ) === LOCALSTORAGE_PREFIX_LABELS ) {
				localStorage.removeItem( key );
			}
			if ( key.substr( 0, LOCALSTORAGE_PREFIX_DESCRIPTIONS.length ) === LOCALSTORAGE_PREFIX_DESCRIPTIONS ) {
				localStorage.removeItem( key );
			}
		} );
		onUpdate();
	};

	this.clearCacheAndRequeue = function() {
		$.each( cacheLabels, function( key, item ) {
			localStorage.removeItem( LOCALSTORAGE_PREFIX_LABELS + key );
			delete cacheLabels[key];
			if ( queue.indexOf( key ) === -1 ) {
				queue.push( key );
			}
		} );
		$.each( cacheDescriptions, function( key, item ) {
			localStorage.removeItem( LOCALSTORAGE_PREFIX_DESCRIPTIONS + key );
			delete cacheDescriptions[key];
			if ( queue.indexOf( key ) === -1 ) {
				queue.push( key );
			}
		} );
	};

	/**
	 * Return cached value
	 * 
	 * @param key
	 *            {string}
	 * @param returnKeyIfEmpty
	 *            {boolean}
	 * @returns {string}
	 */
	this.getLabel = function( key, returnKeyIfEmpty ) {
		WEF_Utils.assertCorrectEntityId( key );

		var cached = cacheLabels[key];
		if ( typeof cached !== 'undefined' ) {
			return cached;
		}

		var localCached = localStorage[LOCALSTORAGE_PREFIX_LABELS + key];
		if ( isValid( localCached ) ) {
			cacheLabels[key] = localCached;
			return localCached;
		}

		if ( returnKeyIfEmpty !== false )
			return key;
	};

	/**
	 * Return cached value
	 * 
	 * @param key
	 *            {string}
	 * @param returnKeyIfEmpty
	 *            {boolean}
	 * @returns {string}
	 */
	this.getDescription = function( key, returnKeyIfEmpty ) {
		WEF_Utils.assertCorrectEntityId( key );

		var cached = cacheDescriptions[key];
		if ( typeof cached !== 'undefined' ) {
			return cached;
		}

		var localCached = localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + key];
		if ( isValid( localCached ) ) {
			cacheDescriptions[key] = localCached;
			return localCached;
		}

		if ( returnKeyIfEmpty !== false )
			return key;
	};

	/** @private */
	var isValid = function( value ) {
		return typeof value !== 'undefined' && value !== null;
	};

	/**
	 * Return cached value or queue values to be received from Wikidata
	 * 
	 * @param key
	 *            {string}
	 * @param listener
	 *            {function(string,string)} callback to be called (may be
	 *            several times) after cache or Wikidata retrieve
	 * @return {string} immediatly available value
	 */
	this.getOrQueue = function( key, listener ) {
		WEF_Utils.assertCorrectEntityId( key );
		if ( typeof listener !== 'function' ) {
			throw new Error( 'Listener not specified or not a function' );
		}

		var getLabel = this.getLabel;
		var getDescription = this.getDescription;

		var cachedLabel = getLabel( key );
		var cachedDescription = getDescription( key );
		// call listener even if got from cache
		listener( cachedLabel, cachedDescription );

		// label can be updated later, or user can change language
		$( this ).bind( 'change', function() {
			var label = getLabel( key );
			var description = getDescription( key );
			listener( label, description );
		} );
		if ( !isValid( cachedLabel ) || cachedLabel === key || !isValid( cachedDescription ) || cachedDescription === key ) {
			queue.push( key );
			return key;
		}
		return cachedLabel;
	};

	var _this = this;
	/**
	 * Notify listeners
	 * 
	 * @private
	 */
	var onUpdate = function() {
		$( _this ).change();
	};

	/**
	 * Add key to the queue if his label is missing from cache
	 * 
	 * @param key
	 *            {string}
	 */
	this.queueForLabel = function( key ) {
		if ( !isValid( cacheLabels[key] ) ) {
			queue.push( key );
		}
	};

	/**
	 * Add key to the queue if his description is missing from cache
	 * 
	 * @param key
	 *            {string}
	 */
	this.queueForDescription = function( key ) {
		if ( !isValid( cacheDescriptions[key] ) ) {
			queue.push( key );
		}
	};

	/** Receive values from Wikidata, if any queued */
	this.receiveLabels = function() {
		if ( queue.length === 0 ) {
			return;
		}

		var languages = [ mw.config.get( 'wgUserLanguage' ), mw.config.get( 'wgContentLanguage' ), 'en', 'ru', 'de' ];
		var languagesString = encodeURIComponent( mw.config.get( 'wgUserLanguage' ) + '|' + mw.config.get( 'wgContentLanguage' ) + '|en|ru|de' );

		// remove already known
		queue = jQuery.grep( queue, function( key ) {
			return !isValid( cacheLabels[key] ) || !isValid( cacheDescriptions[key] );
		} );

		var gotFromCache = [];
		var idsToQuery = [];

		$.each( queue, function( index, key ) {
			var cachedLabel = localStorage[LOCALSTORAGE_PREFIX_LABELS + key];
			var cachedDescription = localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + key];

			if ( isValid( cachedLabel ) ) {
				cacheLabels[key] = cachedLabel;
				gotFromCache.push( key );
			}
			if ( isValid( cachedDescription ) ) {
				cacheDescriptions[key] = cachedDescription;
				gotFromCache.push( key );
			}

			if ( !isValid( cachedLabel ) || isValid( cachedDescription ) ) {
				idsToQuery.push( key );
			}
		} );

		function onError( jqXHR, textStatus, errorThrown ) {
			mw.log.warn( 'Unable to load labels and descriptions from Wikidata: ' + textStatus );
		}
		function onSuccess( result ) {
			if ( typeof result.error !== 'undefined' ) {
				mw.log.warn( result.error );
				return;
			}

			$.each( result.entities, function( entityIndex, entity ) {
				var entityId = entity.id;

				if ( typeof entity.labels !== 'undefined' ) {
					for ( var l = 0; l < languages.length; l++ ) {
						var label = entity.labels[languages[l]];
						if ( typeof label !== 'undefined' && !WEF_Utils.isEmpty( label.value ) ) {
							var title = label.value;
							cacheLabels[entityId] = title;
							if ( entityId.substring( 0, 1 ) === 'P' ) {
								WEF_Utils.putOrClearLocalStorage( LOCALSTORAGE_PREFIX_LABELS + entityId, title );
							}
							break;
						}
					}
				}
				if ( WEF_Utils.isEmpty( cacheLabels[entityId] ) ) {
					cacheLabels[entityId] = '';
				}

				if ( typeof entity.descriptions !== 'undefined' ) {
					for ( var l = 0; l < languages.length; l++ ) {
						var description = entity.descriptions[languages[l]];
						if ( typeof description !== 'undefined' && !WEF_Utils.isEmpty( description.value ) ) {
							var title = description.value;
							cacheDescriptions[entityId] = title;
							if ( entityId.substring( 0, 1 ) === 'P' ) {
								WEF_Utils.putOrClearLocalStorage( LOCALSTORAGE_PREFIX_DESCRIPTIONS + entityId, title );
							}
							break;
						}
					}
				}
				if ( WEF_Utils.isEmpty( cacheDescriptions[entityId] ) ) {
					cacheDescriptions[entityId] = '';
				}

			} );
			onUpdate();
		}

		var total = idsToQuery.length;
		for ( var i = 0; i < total; i += MAX_ITEMS_PER_REQUEST ) {
			var idsString = '';
			for ( var k = i; k < i + MAX_ITEMS_PER_REQUEST && k < total; k++ ) {
				if ( k != i ) {
					idsString = idsString + '|';
				}
				idsString = idsString + idsToQuery[k];
			}
			$.ajax( {
				url: WEF_Utils.getWikidataApiPrefix() //
						+ '&action=wbgetentities' //
						+ '&props=' + encodeURIComponent( 'labels|descriptions|aliases' ) // 
						+ '&languages=' + languagesString // 
						+ '&ids=' + encodeURIComponent( idsString ),
				dataType: 'json',
				error: onError,
				success: onSuccess,
			} );
		}
		queue = jQuery.grep( queue, function( value ) {
			return idsToQuery.indexOf( value ) === -1;
		} );
		if ( gotFromCache.length > 0 ) {
			onUpdate();
		}
	};

	// wef_i18n_label / wef_i18n_description support
	$( this ).bind( 'change', function() {
		$( ".wef_i18n_label" ).each( function( index, item ) {
			var jqItem = $( item );
			var entityId = jqItem.data( 'wef_i18n_entityId' );
			if ( !WEF_Utils.isEmpty( entityId ) ) {
				var newLabel = wef_LabelsCache.getLabel( entityId, false );
				if ( !WEF_Utils.isEmpty( newLabel ) ) {
					jqItem.text( newLabel );
				}
			}
		} );
		$( ".wef_i18n_description" ).each( function( index, item ) {
			var jqItem = $( item );
			var entityId = jqItem.data( 'wef_i18n_entityId' );
			if ( !WEF_Utils.isEmpty( entityId ) ) {
				var newDescription = wef_LabelsCache.getDescription( entityId, false );
				if ( !WEF_Utils.isEmpty( newDescription ) ) {
					jqItem.text( newDescription );
				}
			}
		} );
	} );
};

WEF_LabelsCache.prototype.localizeDescription = function( jqElement, entityId ) {
	WEF_Utils.assertCorrectEntityId( entityId );

	jqElement.addClass( 'wef_i18n_description' );
	jqElement.data( 'wef_i18n_entityId', entityId );

	this.queueForDescription( entityId );
	var newDescription = this.getDescription( entityId, WEF_Utils.isEmpty( jqElement.text() ) );
	if ( !WEF_Utils.isEmpty( newDescription ) )
		jqElement.text( newDescription );
};

WEF_LabelsCache.prototype.localizeLabel = function( jqElement, entityId ) {
	WEF_Utils.assertCorrectEntityId( entityId );

	jqElement.addClass( 'wef_i18n_label' );
	jqElement.data( 'wef_i18n_entityId', entityId );

	this.queueForLabel( entityId );
	var newLabel = this.getLabel( entityId, WEF_Utils.isEmpty( jqElement.text() ) );
	if ( !WEF_Utils.isEmpty( newLabel ) )
		jqElement.text( newLabel );
};

var wef_LabelsCache = window.wef_LabelsCache = new WEF_LabelsCache();

/**
 * Caches types of properties. Required because sometimes entity contains the
 * property code and "novalue" mark, but not datatype marker.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
WEF_TypesCache = function() {

	/**
	 * @const
	 * @private
	 */
	var LOCALSTORAGE_PREFIX = 'wef-d-type-';

	/** @private */
	var cacheTypes = {};

	/**
	 * @param propertyId
	 *            {string} property ID to query
	 * @param onSuccess
	 *            {function} callback handler for success
	 * @param onFailure {
	 */
	this.getPropertyType = function( propertyId, onSuccess, onFailure ) {
		if ( !/^[P]\d+$/.test( propertyId ) ) {
			throw new Error( 'Incorrect property ID: ' + propertyId );
		}

		var cached = cacheTypes[propertyId];
		if ( typeof cached !== 'undefined' ) {
			onSuccess( cached );
			return;
		}

		var localCached = localStorage[LOCALSTORAGE_PREFIX + propertyId];
		if ( typeof localCached !== 'undefined' && localCached !== null ) {
			cacheTypes[propertyId] = localCached;
			onSuccess( localCached );
			return;
		}

		// still no luck. Display modal window and ask Wikidata

		// TODO: i18n
		var dialog = $( document.createElement( 'div' ) ).attr( 'title', 'Get Wikidata property type' ).addClass( 'wef_dialog_no_close' );
		var ul = $( document.createElement( 'ul' ) ).appendTo( dialog );
		var progress = new WEF_ProgressItem( ul, 'Request property type from Wikidata' );

		dialog.dialog( {
			width: 'auto',
			height: 'auto',
			resizable: false,
			modal: true,
		} );

		/* We need new handlers to close dialog */
		var onFailureNew = function( reason ) {
			progress.failure( reason );
			dialog.dialog( 'close' );
			onFailure( reason );
		};
		var onSuccessNew = function( datatype ) {
			progress.success();
			dialog.dialog( 'close' );
			onSuccess( datatype );
		};

		progress.inProgress();
		$.ajax( {
			url: WEF_Utils.getWikidataApiPrefix() //
					+ '&action=wbgetentities' //
					+ '&props=' + encodeURIComponent( 'datatype' ) // 
					+ '&ids=' + encodeURIComponent( propertyId ),
			dataType: 'json',
			error: function( jqXHR, textStatus, errorThrown ) {
				onFailure( textStatus );
			},
			success: function( result ) {
				if ( typeof result.error !== 'undefined' ) {
					mw.log.warn( result.error );
					onFailureNew( result.error );
					return;
				}

				$.each( result.entities, function( entityIndex, entity ) {
					var dataType = entity.datatype;
					if ( typeof dataType !== 'undefined' && dataType !== null ) {
						cacheTypes[entity.id] = dataType;
						return;
					}
				} );
				if ( typeof cacheTypes[propertyId] !== 'undefined' ) {
					onSuccessNew( cacheTypes[propertyId] );
				} else {
					onFailureNew( 'no results returned for ' + propertyId );
				}
				return;
			},
		} );

		return;
	};

	this.putInCache = function( propertyId, dataType ) {
		if ( !/^[P]\d+$/.test( propertyId ) ) {
			throw new Error( 'Incorrect property ID: ' + propertyId );
		}

		if ( !WEF_Utils.isEmpty( dataType ) ) {
			cacheTypes[propertyId] = dataType;
			WEF_Utils.putOrClearLocalStorage( LOCALSTORAGE_PREFIX + propertyId, dataType );
		}
	};
};
window.wef_TypesCache = new WEF_TypesCache();

/**
 * @param dataValue
 *            {WEF_Snak} datavalue to initialize editor. If empty, new editor
 *            will be created
 * @class
 */
WEF_SnakValueEditor = function( parent, dataDataType, editorDataType, initialDataValue, options ) {

	if ( typeof dataDataType === 'undefined' ) {
		throw new Error( 'DataType is not specified' );
	}

	var i18n = wef_Editors_i18n;
	var snakValueEditor = this;

	var _jThis = $( this );
	function changeF() {
		_jThis.trigger( 'change' );
	}

	/** @type {string} */
	var WIKIDATA_URI_PREFIX = 'http://www.wikidata.org/entity/';

	/** @type {string} */
	var GLOBE_EARTH = 'Q2';
	/** @type {string[]} */
	var GLOBES = [ //
	'Q308', // MERCURY
	'Q313', // VENUS
	GLOBE_EARTH, // EARTH
	'Q405',// MOON
	'Q111',// MARS
	'Q319',// JUPITER
	];

	/** @type {string} */
	var CALENDAR_GREGORIAN = 'Q1985727';
	/** @type {string} */
	var CALENDAR_JULIAN = 'Q1985786';
	/** @type {string[]} */
	var CALENDAR_MODELS = [ WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN, WIKIDATA_URI_PREFIX + CALENDAR_JULIAN ];
	var PRECISION_DAYS = 11;
	var PRECISION_MONTHS = 10;
	var PRECISION_YEARS = 9;
	var PRECISION_CENTURIES = 7;

	this.mainElement = $( document.createElement( 'span' ) ).appendTo( parent );

	var unsupportedF = function() {
		throw new Error( 'DataType "' + dataDataType + '" is not supported' );
	};

	this.hasValue = unsupportedF;

	this.getDataValue = unsupportedF;
	this.setDataValue = unsupportedF;

	this.getAsLabel = unsupportedF;

	var addTr = function( table, textLabel, textTitle, input ) {
		var tr = $( document.createElement( 'tr' ) ).attr( 'title', textTitle ).appendTo( table );
		if ( typeof textLabel !== 'undefined' ) {
			input.uniqueId();
			var th = $( document.createElement( 'th' ) ).appendTo( tr );
			$( document.createElement( 'label' ) ).text( textLabel + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
		}
		var td = $( document.createElement( 'td' ) ).appendTo( tr );
		if ( typeof textLabel === 'undefined' ) {
			td.attr( 'colspan', 2 );
		}
		td.append( input );
	};

	if ( typeof editorDataType === 'undefined' ) {
		// autodetect enabled
		editorDataType = dataDataType;
		if ( editorDataType === 'time' ) {
			if ( typeof initialDataValue === 'undefined' || typeof initialDataValue.value === 'undefined' || CALENDAR_MODELS.indexOf( initialDataValue.value.calendarmodel ) === -1 ) {
				editorDataType = 'time-days-gregorian';
			} else {
				var initialValue = initialDataValue.value;
				if ( !/^[\\+\\-][0-9]{1,4}\-/.test( initialValue.time ) ) {
					editorDataType = 'time';
				} else if ( !WEF_Utils.isEmpty( initialValue ) && !WEF_Utils.isEmpty( initialValue.precision ) ) {
					var precision = initialValue.precision;
					if ( precision === PRECISION_CENTURIES && initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
						editorDataType = 'time-centuries';
					} else if ( precision === PRECISION_YEARS && initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
						editorDataType = 'time-years';
					} else if ( precision === PRECISION_MONTHS && initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
						editorDataType = 'time-months';
					} else if ( precision === PRECISION_DAYS ) {
						if ( initialValue.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) === CALENDAR_GREGORIAN ) {
							editorDataType = 'time-days-gregorian';
						} else {
							editorDataType = 'time-days';
						}
					}
				}
			}
		}
		if ( editorDataType === 'quantity' ) {
			if ( typeof initialDataValue === 'undefined' || typeof initialDataValue.value === 'undefined' ) {
				editorDataType = 'quantity-exact';
			} else {
				var unit = initialDataValue.value.unit;
				var amount = initialDataValue.value.amount;
				var upperBound = initialDataValue.value.upperBound;
				var lowerBound = initialDataValue.value.lowerBound;

				if ( unit === '1' && amount === upperBound && amount === lowerBound ) {
					editorDataType = 'quantity-exact';
				} else if ( unit === '1' && ( Number( upperBound ) - Number( amount ) ) === ( Number( amount ) - Number( lowerBound ) ) ) {
					editorDataType = 'quantity-plus-minus';
				}
			}
		}
	}

	this.dataDataType = dataDataType;
	this.editorDataType = editorDataType;
	this.mainElement.addClass( 'wef_snak_value_editor_' + editorDataType );

	var switchDataType = function( newEditorDataType, dataValue ) {
		snakValueEditor.mainElement.remove();
		WEF_SnakValueEditor.call( snakValueEditor, parent, snakValueEditor.dataDataType, newEditorDataType, dataValue, options );
	};

	var selectQuantityMode;
	if ( editorDataType.substring( 0, 'quantity-'.length ) === 'quantity-' ) {
		selectQuantityMode = $( document.createElement( 'select' ) ).addClass( 'wef_quantity_mode' );

		selectQuantityMode.append( $( document.createElement( 'option' ) ).attr( 'value', 'quantity-exact' ).text( i18n.inputQuantityModeExact ) );
		selectQuantityMode.append( $( document.createElement( 'option' ) ).attr( 'value', 'quantity-plus-minus' ).text( i18n.inputQuantityModePlusMinus ) );
		selectQuantityMode.append( $( document.createElement( 'option' ) ).attr( 'value', 'quantity' ).text( i18n.inputQuantityModeOther ) );

		selectQuantityMode.val( editorDataType );
		selectQuantityMode.change( function() {
			var newDataType = selectQuantityMode.val();
			if ( newDataType !== editorDataType ) {
				if ( snakValueEditor.hasValue() ) {
					switchDataType( newDataType, snakValueEditor.getDataValue() );
				} else {
					switchDataType( newDataType, undefined );
				}
			}
		} );
	}

	var selectDateTimePrecision;
	if ( editorDataType.substring( 0, 5 ) === 'time-' ) {
		selectDateTimePrecision = $( document.createElement( 'select' ) ).addClass( 'wef_select_date_time_precision' );
		selectDateTimePrecision.attr( 'title', i18n.inputTimePrecisionTitle );
		selectDateTimePrecision.append( $( document.createElement( 'option' ) ) //
		.attr( 'value', 'time-days' ).data( 'precision', PRECISION_DAYS ).text( i18n['timePrecision' + PRECISION_DAYS] ) );
		selectDateTimePrecision.append( $( document.createElement( 'option' ) ) //
		.attr( 'value', 'time-months' ).data( 'precision', PRECISION_MONTHS ).text( i18n['timePrecision' + PRECISION_MONTHS] ) );
		selectDateTimePrecision.append( $( document.createElement( 'option' ) ) //
		.attr( 'value', 'time-years' ).data( 'precision', PRECISION_YEARS ).text( i18n['timePrecision' + PRECISION_YEARS] ) );
		selectDateTimePrecision.append( $( document.createElement( 'option' ) ) //
		.attr( 'value', 'time-centuries' ).data( 'precision', PRECISION_CENTURIES ).text( i18n['timePrecision' + PRECISION_CENTURIES] ) );
		selectDateTimePrecision.append( $( document.createElement( 'option' ) ).attr( 'value', 'time' ).text( i18n.timePrecisionOther ) );
		if ( editorDataType === 'time-days-gregorian' ) {
			selectDateTimePrecision.val( 'time-days' );
		} else {
			selectDateTimePrecision.val( editorDataType );
		}
		selectDateTimePrecision.change( function() {
			var newDataType = selectDateTimePrecision.val();
			if ( newDataType !== editorDataType ) {
				if ( snakValueEditor.hasValue() ) {
					var dataValue = snakValueEditor.getDataValue();
					if ( typeof dataValue.value !== 'undefined' && newDataType !== 'time' ) {
						dataValue.value.precision = Number( selectDateTimePrecision.find( 'option:selected' ).data( 'precision' ) );
					}
					switchDataType( newDataType, dataValue );
				} else {
					switchDataType( newDataType, undefined );
				}
			}
		} );
	}

	if ( editorDataType === 'commonsMedia' ) {
		( function() {
			var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_commonsMedia' ).appendTo( snakValueEditor.mainElement );
			this.setDataValue = function( newDataValue ) {
				input.val( newDataValue.value );
			};
			this.hasValue = function() {
				return input.val() != null && !WEF_Utils.isEmpty( input.val().trim() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'string',
					value: input.val() == null ? null : input.val().trim(),
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'a' ) ).attr( 'href', '//commons.wikimedia.org/wiki/File:' + encodeURI( input.val() ) ).text( input.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'commonsMedia', this.getDataValue(), span );
				return span;
			};

			input.autocomplete( {
				source: function( request, response ) {
					var term = request.term;
					$.ajax(
							{
								type: 'GET',
								dataType: 'json',
								url: '//commons.wikimedia.org/w/api.php?format=json&origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) )
										+ '&action=query&list=prefixsearch&psnamespace=6&pslimit=15&pssearch=' + encodeURIComponent( term ),
							} ).done( function( result ) {
						var list = [];
						$.each( result.query.prefixsearch, function( index, p ) {
							list.push( p.title.substring( 'File:'.length ) );
						} );
						response( list );
					} );
				},
				select: function( event, ui ) {
					input.val( ui.item.value );
					input.change();
				},
			} );

			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'globe-coordinate' ) {
		( function() {

			var table = $( document.createElement( 'table' ) ).addClass( 'wef_globecoordinate_table' ).appendTo( this.mainElement );

			var inputLatitude = $( document.createElement( 'input' ) ) //
			/**/.attr( 'type', 'number' ).attr( 'step', 'any' ) //
			/**/.attr( 'min', '-90' ).attr( 'max', '90' ).attr( 'pattern', '[0-9]{1,2}(\.[0-9]{0,9})?' ) //
			/**/.addClass( 'wef_globecoordinate_latitude' ) //
			/**/.attr( 'placeholder', i18n.inputGlobeLatitudeLabel );
			var inputLongitude = $( document.createElement( 'input' ) ) //
			/**/.attr( 'type', 'number' ).attr( 'step', 'any' ) //
			/**/.attr( 'min', '-180' ).attr( 'max', '180' ).attr( 'pattern', '[0-9]{1,3}(\.[0-9]{0,9})?' ) //
			/**/.addClass( 'wef_globecoordinate_longitude' ) //
			/**/.attr( 'placeholder', i18n.inputGlobeLongitudeLabel );
			var inputAltitude = $( document.createElement( 'input' ) ) //
			/**/.attr( 'type', 'number' ).attr( 'step', 'any' ) //
			/**/.addClass( 'wef_globecoordinate_altitude' ) //
			/**/.attr( 'placeholder', i18n.inputGlobeAltitudeLabel );
			var inputPrecision = $( document.createElement( 'input' ) ) //
			/**/.attr( 'type', 'number' ) //
			/**/.attr( 'step', 'any' ) //
			/**/.addClass( 'wef_globecoordinate_precision' ) //
			/**/.attr( 'placeholder', i18n.inputGlobePrecisionLabel );

			var inputGlobe = new WEF_ItemSelect();
			inputGlobe.select.addClass( 'wef_globecoordinate_globe' );
			$.each( GLOBES, function( index, item ) {
				inputGlobe.addOption( item );
			} );
			inputGlobe.val( GLOBE_EARTH );

			addTr( table, i18n.inputGlobeLatitudeLabel, i18n.inputGlobeLatitudeTitle, inputLatitude );
			addTr( table, i18n.inputGlobeLongitudeLabel, i18n.inputGlobeLongitudeTitle, inputLongitude );
			addTr( table, i18n.inputGlobeAltitudeLabel, i18n.inputGlobeAltitudeTitle, inputAltitude );
			addTr( table, i18n.inputGlobePrecisionLabel, i18n.inputGlobePrecisionTitle, inputPrecision );
			addTr( table, i18n.inputGlobeGlobeLabel, i18n.inputGlobeGlobeTitle, inputGlobe.select );

			this.setDataValue = function( newDataValue ) {
				inputLatitude.val( newDataValue.value.latitude == null ? '' : newDataValue.value.latitude );
				inputLongitude.val( newDataValue.value.longitude == null ? '' : newDataValue.value.longitude );
				inputAltitude.val( newDataValue.value.altitude == null ? '' : newDataValue.value.altitude );
				inputPrecision.val( newDataValue.value.precision == null ? '' : newDataValue.value.precision );
				inputGlobe.val( newDataValue.value.globe.substr( WIKIDATA_URI_PREFIX.length ) );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( inputLatitude.val() ) || !WEF_Utils.isEmpty( inputLongitude.val() ) || !WEF_Utils.isEmpty( inputAltitude.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'globecoordinate',
					value: {
						latitude: !WEF_Utils.isEmpty( inputLatitude.val() ) ? Number( inputLatitude.val() ) : null,
						longitude: !WEF_Utils.isEmpty( inputLongitude.val() ) ? Number( inputLongitude.val() ) : null,
						altitude: !WEF_Utils.isEmpty( inputAltitude.val() ) ? Number( inputAltitude.val() ) : null,
						precision: !WEF_Utils.isEmpty( inputPrecision.val() ) ? Number( inputPrecision.val() ) : 0,
						globe: WIKIDATA_URI_PREFIX + inputGlobe.val(),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_globe' ).text( inputLatitude.val() + "; " + inputLongitude.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'globe-coordinate', this.getDataValue(), span );
				return span;
			};

			inputLatitude.change( changeF );
			inputLatitude.keyup( changeF );
			inputLongitude.change( changeF );
			inputLongitude.keyup( changeF );
			inputAltitude.change( changeF );
			inputAltitude.keyup( changeF );
			inputPrecision.change( changeF );
			inputPrecision.keyup( changeF );
			inputGlobe.select.change( changeF );
			inputGlobe.select.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'monolingualtext' ) {
		( function() {
			var table = $( document.createElement( 'table' ) ).addClass( 'wef_monolingualtext_table' ).appendTo( snakValueEditor.mainElement );
			var tr = $( document.createElement( 'tr' ) ).addClass( 'wef_monolingualtext_tr' ).appendTo( table );

			var langSelect = new WEF_LanguageInput().appendTo( $( document.createElement( 'td' ) ).addClass( 'wef_monolingualtext_td_language' ).appendTo( tr ) );
			var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_monolingualtext_text' ).appendTo(
					$( document.createElement( 'td' ) ).addClass( 'wef_monolingualtext_td_text' ).appendTo( tr ) );

			try {
				if ( typeof options === 'object' && typeof options.check === 'object' ) {
					input.attr( 'pattern', WEF_Utils.regexpGetHtmlPattern( options.check ) );
				}
			} catch ( err ) {
				mw.log.warn( 'Unable to attach check pattern to input: ' + err );
			}

			this.setDataValue = function( newDataValue ) {
				langSelect.val( newDataValue.value.language );
				input.val( newDataValue.value.text );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( input.val().trim() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'monolingualtext',
					value: {
						text: input.val() == null ? null : input.val().trim(),
						language: langSelect.val(),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).text( '(' + langSelect.val() + ') ' + input.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'monolingualtext', this.getDataValue(), span );
				return span;
			};

			langSelect.change( changeF );
			langSelect.keyup( changeF );
			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'quantity' ) {
		( function() {

			var table = $( document.createElement( 'table' ) ).addClass( 'wef_quantity_table' ).appendTo( this.mainElement );

			var inputUnit = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_unit' );
			var inputLowerBound = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_lower_bound' );
			var inputAmount = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_amount' );
			var inputUpperBound = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_upper_bound' );

			addTr( table, i18n.inputQuantityUnitLabel, i18n.inputQuantityUnitTitle, inputUnit );
			addTr( table, i18n.inputQuantityLowerBoundLabel, i18n.inputQuantityLowerBoundTitle, inputLowerBound );
			addTr( table, i18n.inputQuantityAmountLabel, i18n.inputQuantityAmountTitle, inputAmount );
			addTr( table, i18n.inputQuantityUpperBoundLabel, i18n.inputQuantityUpperBoundTitle, inputUpperBound );

			this.setDataValue = function( newDataValue ) {
				inputUnit.val( newDataValue.value.unit );
				inputLowerBound.val( newDataValue.value.lowerBound );
				inputAmount.val( newDataValue.value.amount );
				inputUpperBound.val( newDataValue.value.upperBound );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( inputAmount.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'quantity',
					value: {
						unit: inputUnit.val(),
						lowerBound: WEF_Utils.formatQuantity( inputLowerBound.val() ),
						amount: WEF_Utils.formatQuantity( inputAmount.val() ),
						upperBound: WEF_Utils.formatQuantity( inputUpperBound.val() ),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_quantity' ).text(
						lowerBound.val() + ' / ' + inputAmount.val() + ' / ' + inputUpperBound.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'quantity', this.getDataValue(), span );
				return span;
			};

			inputUnit.change( changeF );
			inputUnit.keyup( changeF );
			inputLowerBound.change( changeF );
			inputLowerBound.keyup( changeF );
			inputAmount.change( changeF );
			inputAmount.keyup( changeF );
			inputUpperBound.change( changeF );
			inputUpperBound.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'quantity-exact' ) {
		( function() {

			selectQuantityMode.appendTo( this.mainElement );
			var inputAmount = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_amount' ).appendTo( this.mainElement );

			this.setDataValue = function( newDataValue ) {
				inputAmount.val( newDataValue.value.amount );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( inputAmount.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'quantity',
					value: {
						unit: '1',
						lowerBound: WEF_Utils.formatQuantity( inputAmount.val() ),
						amount: WEF_Utils.formatQuantity( inputAmount.val() ),
						upperBound: WEF_Utils.formatQuantity( inputAmount.val() ),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_quantity' ).text( inputAmount.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'quantity', this.getDataValue(), span );
				return span;
			};

			inputAmount.change( changeF );
			inputAmount.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'quantity-plus-minus' ) {
		( function() {

			selectQuantityMode.appendTo( this.mainElement );
			var inputAmount = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_amount' ).appendTo( this.mainElement );
			var spanPlusMinus = $( document.createElement( 'span' ) ).text( '±' ).appendTo( this.mainElement );
			var inputDifference = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).addClass( 'wef_quantity_difference' ).appendTo( this.mainElement );

			this.setDataValue = function( newDataValue ) {
				inputDifference.val( Number( newDataValue.value.amount ) - Number( newDataValue.value.lowerBound ) );
				inputAmount.val( newDataValue.value.amount );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( inputAmount.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				var amount = Number( inputAmount.val() );
				var difference = Number( inputDifference.val() );
				return {
					type: 'quantity',
					value: {
						unit: '1',
						lowerBound: WEF_Utils.formatQuantity( amount - difference ),
						amount: WEF_Utils.formatQuantity( inputAmount.val() ),
						upperBound: WEF_Utils.formatQuantity( amount + difference ),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_quantity' ).text( inputAmount.val() + '±' + inputDifference.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'quantity', this.getDataValue(), span );
				return span;
			};

			inputAmount.change( changeF );
			inputAmount.keyup( changeF );
			inputDifference.change( changeF );
			inputDifference.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'string' ) {
		( function() {
			var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_string' ).appendTo( this.mainElement );

			if ( typeof options === 'object' && typeof options.autocomplete === 'object' ) {
				input.autocomplete( options.autocomplete );
				input.on( 'autocompleteselect', function( event, ui ) {
					input.val( ui.item.value );
					input.change();
				} );
			}
			try {
				if ( typeof options === 'object' && typeof options.check === 'object' ) {
					input.attr( 'pattern', WEF_Utils.regexpGetHtmlPattern( options.check ) );
				}
			} catch ( err ) {
				mw.log.warn( 'Unable to attach check pattern to input: ' + err );
			}

			this.setDataValue = function( newDataValue ) {
				input.val( newDataValue.value );
			};
			this.hasValue = function() {
				return input.val() != null && !WEF_Utils.isEmpty( input.val().trim() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'string',
					value: input.val() == null ? null : input.val().trim(),
				};
			};
			this.getAsLabel = function() {
				return $( document.createElement( 'span' ) ).text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time' ) {
		( function() {

			var table = $( document.createElement( 'table' ) ).addClass( 'wef_time_table' ).appendTo( this.mainElement );

			var inputTime = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_time_time' ).attr( 'placeholder', i18n.inputTimeTimeTitle );
			var inputTimeZone = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_time_timezone' ).attr( 'placeholder', i18n.inputTimeTimeZoneTitle );

			var inputPrecision = $( document.createElement( 'select' ) ).addClass( 'wef_time_precision' );
			for ( var i = 0; i < 15; i++ ) {
				var option = $( document.createElement( 'option' ) );
				option.attr( 'value', i );
				option.text( i18n['timePrecision' + i] );
				inputPrecision.append( option );
			}
			inputPrecision.val( 11 );

			var inputCalendarModel = new WEF_ItemSelect();
			inputCalendarModel.select.addClass( 'wef_time_calendarmodel' );
			inputCalendarModel.addOption( CALENDAR_GREGORIAN );
			inputCalendarModel.addOption( CALENDAR_JULIAN );
			inputCalendarModel.val( CALENDAR_GREGORIAN );

			addTr( table, i18n.inputTimeTimeLabel, i18n.inputTimeTimeTitle, inputTime );
			addTr( table, i18n.inputTimeTimeZoneLabel, i18n.inputTimeTimeZoneTitle, inputTimeZone );
			addTr( table, i18n.inputTimePrecisionLabel, i18n.inputTimePrecisionTitle, inputPrecision );
			addTr( table, i18n.inputTimeCalendarModelLabel, i18n.inputTimeCalendarModelTitle, inputCalendarModel.select );

			this.setDataValue = function( newDataValue ) {
				inputTime.val( newDataValue.value.time );
				inputTimeZone.val( newDataValue.value.timezone );
				inputPrecision.val( newDataValue.value.precision );
				inputCalendarModel.val( newDataValue.value.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( inputTime.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'time',
					value: {
						time: inputTime.val(),
						timezone: Number( inputTimeZone.val() ),
						precision: Number( inputPrecision.val() ),
						before: 0,
						after: 0,
						calendarmodel: WIKIDATA_URI_PREFIX + inputCalendarModel.val(),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time' ).text( inputTime.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'time', this.getDataValue(), span );
				return span;
			};

			inputTime.change( changeF );
			inputTime.keyup( changeF );
			inputTimeZone.change( changeF );
			inputTimeZone.keyup( changeF );
			inputPrecision.change( changeF );
			inputPrecision.keyup( changeF );
			inputCalendarModel.select.change( changeF );
			inputCalendarModel.select.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time-days' ) {
		( function() {
			var grDays = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'min', '1' ).attr( 'step', '1' ).attr( 'max', '31' ).addClass( 'wef_time_day' )
					.appendTo( this.mainElement ).val( '' );
			var grMonths = $( document.createElement( 'select' ) ).addClass( 'wef_time_month' ).appendTo( this.mainElement );
			WEF_Utils.fillSelectWithMonthes( grMonths );
			var grYears = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).val( '' ).addClass( 'wef_time_year' ).appendTo( this.mainElement );
			var grSpan = $( document.createElement( 'span' ) ).append( grDays, grMonths, grYears );

			var juDays = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'min', '1' ).attr( 'step', '1' ).attr( 'max', '31' ).addClass( 'wef_time_day' )
					.appendTo( this.mainElement ).val( '' );
			var juMonths = $( document.createElement( 'select' ) ).addClass( 'wef_time_month' ).appendTo( this.mainElement );
			WEF_Utils.fillSelectWithMonthes( juMonths );
			var juYears = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).val( '' ).addClass( 'wef_time_year' ).appendTo( this.mainElement );
			var juSpan = $( document.createElement( 'span' ) ).append( juDays, juMonths, juYears );

			var inputCalendarModel = new WEF_ItemSelect();
			inputCalendarModel.select.addClass( 'wef_time_calendarmodel' );
			inputCalendarModel.addOption( CALENDAR_GREGORIAN );
			inputCalendarModel.addOption( CALENDAR_JULIAN );
			inputCalendarModel.val( CALENDAR_GREGORIAN );

			var table = $( document.createElement( 'table' ) ).addClass( 'wef_time_table' ).appendTo( this.mainElement );
			var addTrExt = function( textLabel, labelQId, textTitle, input ) {
				var tr = $( document.createElement( 'tr' ) ).attr( 'title', textTitle ).appendTo( table );
				if ( typeof textLabel !== 'undefined' ) {
					input.uniqueId();
					var th = $( document.createElement( 'th' ) ).appendTo( tr );
					$( document.createElement( 'label' ) ).text( textLabel + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
				}
				if ( typeof labelQId !== 'undefined' ) {
					input.uniqueId();
					var th = $( document.createElement( 'th' ) ).appendTo( tr );
					var jLabel = $( document.createElement( 'label' ) ).text( labelQId + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
					wef_LabelsCache.getOrQueue( labelQId, function( label, title ) {
						jLabel.text( label + ': ' );
						jLabel.attr( 'title', title );
					} );
				}
				var td = $( document.createElement( 'td' ) ).appendTo( tr );
				if ( typeof textLabel === 'undefined' && typeof labelQId === 'undefined' ) {
					td.attr( 'colspan', 2 );
				}
				td.append( input );
			};

			addTrExt( i18n.inputTimePrecisionLabel, undefined, i18n.inputTimePrecisionTitle, selectDateTimePrecision );
			addTrExt( i18n.inputTimeCalendarModelLabel, undefined, i18n.inputTimeCalendarModelTitle, inputCalendarModel.select );
			addTrExt( undefined, 'Q12138', i18n.inputTimeAsGregorianLabel, grSpan );
			addTrExt( undefined, 'Q11184', i18n.inputTimeAsJulianLabel, juSpan );
			table.appendTo( this.mainElement );

			var inProgress = false;
			var recalculateGregorian = function() {
				if ( inProgress )
					return;
				inProgress = true;
				if ( !ifSpecified( juDays, juMonths, juYears ) ) {
					grDays.val( '' );
					grMonths.val( -1 );
					grYears.val( '' );
				} else {
					var converted = WEF_Utils.convertJulianToGregorian( juYears.val(), juMonths.val(), juDays.val() );
					grDays.val( converted[2] );
					grMonths.val( converted[1] );
					grYears.val( converted[0] );
				}
				inProgress = false;
			};
			var recalculateJulian = function() {
				if ( inProgress )
					return;
				inProgress = true;
				if ( !ifSpecified( grDays, grMonths, grYears ) ) {
					juDays.val( '' );
					juMonths.val( -1 );
					juYears.val( '' );
				} else {
					var converted = WEF_Utils.convertGregorianToJulian( grYears.val(), grMonths.val(), grDays.val() );
					juDays.val( converted[2] );
					juMonths.val( converted[1] );
					juYears.val( converted[0] );
				}
				inProgress = false;
			};

			var ifSpecified = function( days, months, years ) {
				return !WEF_Utils.isEmpty( days.val() ) && Number( days.val() ) !== 0 //
						&& !WEF_Utils.isEmpty( months.val() ) && Number( months.val() ) !== -1 && Number( months.val() ) !== 0 //
						&& !WEF_Utils.isEmpty( years.val() ) && Number( years.val() ) !== 0;
			};

			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}

				inputCalendarModel.val( newDataValue.value.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) );

				var date = WEF_Utils.parseISO8601( newDataValue.value.time );
				if ( isNaN( date ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}
				date = new Date( date );
				grYears.val( date.getUTCFullYear() );
				grMonths.val( date.getUTCMonth() + 1 );
				grDays.val( date.getUTCDate() );
				recalculateJulian();
			};
			this.hasValue = function() {
				"use strict";
				return ifSpecified( grDays, grMonths, grYears );
			};
			this.getDataValue = function() {
				"use strict";
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: WEF_Utils.formatDate( grYears.val(), grMonths.val(), grDays.val() ),
						timezone: 0,
						precision: PRECISION_DAYS,
						before: 0,
						after: 0,
						calendarmodel: WIKIDATA_URI_PREFIX + inputCalendarModel.val(),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_days' ).text(
						juDays.val() + ' ' + mw.config.get( 'wgMonthNames' )[juMonths.val()] + ' ' + juYears.val() + ' ( ' + grDays.val() + ' '
								+ mw.config.get( 'wgMonthNames' )[grMonths.val()] + ' ' + grYears.val() )
						+ ' )';
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'time', this.getDataValue(), span );
				return span;
			};

			grDays.change( changeF );
			grDays.keyup( changeF );
			grMonths.change( changeF );
			grMonths.keyup( changeF );
			grYears.change( changeF );
			grYears.keyup( changeF );
			inputCalendarModel.select.change( changeF );
			inputCalendarModel.select.keyup( changeF );

			grDays.change( recalculateJulian );
			grDays.keyup( recalculateJulian );
			grMonths.change( recalculateJulian );
			grMonths.keyup( recalculateJulian );
			grYears.change( recalculateJulian );
			grYears.keyup( recalculateJulian );

			juDays.change( recalculateGregorian );
			juDays.keyup( recalculateGregorian );
			juMonths.change( recalculateGregorian );
			juMonths.keyup( recalculateGregorian );
			juYears.change( recalculateGregorian );
			juYears.keyup( recalculateGregorian );

		} ).call( this );
	} else if ( editorDataType === 'time-days-gregorian' ) {
		( function() {

			selectDateTimePrecision.appendTo( this.mainElement );

			var days = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'min', '1' ).attr( 'step', '1' ).attr( 'max', '31' ).val( '' ).addClass(
					'wef_time_day' ).appendTo( this.mainElement );

			var months = $( document.createElement( 'select' ) ).addClass( 'wef_time_month' ).appendTo( this.mainElement );
			WEF_Utils.fillSelectWithMonthes( months );

			var years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).val( '' ).addClass( 'wef_time_year' ).appendTo( this.mainElement );

			var showJulianSpan = $( document.createElement( 'span' ) ).addClass( 'wef_time_oldstyle_span' ).appendTo( this.mainElement );

			var showJulianCheckbox = $( document.createElement( 'input' ) ).attr( 'type', 'checkbox' ).addClass( 'wef_time_oldstyle' );
			showJulianCheckbox.attr( 'title', i18n.checkboxShowJulianTitle );
			showJulianCheckbox.uniqueId();
			showJulianCheckbox.change( changeF );
			showJulianCheckbox.keyup( changeF );
			showJulianCheckbox.appendTo( showJulianSpan );

			var afterCalendarModelChange = function() {
				if ( showJulianCheckbox.is( ':checked' ) ) {
					if ( snakValueEditor.hasValue() ) {
						switchDataType( 'time-days', snakValueEditor.getDataValue() );
					} else {
						switchDataType( 'time-days', undefined );
					}
					wef_LabelsCache.receiveLabels();
				}
			};
			showJulianCheckbox.change( afterCalendarModelChange );
			showJulianCheckbox.keyup( afterCalendarModelChange );

			var showJulianCheckboxLabel = $( document.createElement( 'label' ) );
			showJulianCheckboxLabel.attr( 'for', showJulianCheckbox.attr( 'id' ) );
			showJulianCheckboxLabel.attr( 'title', i18n.checkboxShowJulianTitle );
			showJulianCheckboxLabel.text( i18n.checkboxShowJulian );
			showJulianCheckboxLabel.appendTo( showJulianSpan );

			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}

				if ( newDataValue.value.calendarmodel.substr( WIKIDATA_URI_PREFIX.length ) !== CALENDAR_GREGORIAN ) {
					switchDataType( 'time-days', newDataValue );
					return;
				}

				var date = WEF_Utils.parseISO8601( newDataValue.value.time );
				if ( isNaN( date ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}
				date = new Date( date );
				years.val( date.getUTCFullYear() );
				months.val( date.getUTCMonth() + 1 );
				days.val( date.getUTCDate() );

				showJulianCheckbox.attr( 'checked', false );
			};
			this.hasValue = function() {
				"use strict";
				return !WEF_Utils.isEmpty( days.val() ) && Number( days.val() ) !== 0 //
						&& !WEF_Utils.isEmpty( months.val() ) && Number( months.val() ) !== -1 && Number( months.val() ) !== 0 //
						&& !WEF_Utils.isEmpty( years.val() ) && Number( years.val() ) !== 0;
			};
			this.getDataValue = function() {
				"use strict";
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: WEF_Utils.formatDate( years.val(), months.val(), days.val() ),
						timezone: 0,
						precision: PRECISION_DAYS,
						before: 0,
						after: 0,
						calendarmodel: WIKIDATA_URI_PREFIX + ( showJulianCheckbox.is( ':checked' ) ? CALENDAR_JULIAN : CALENDAR_GREGORIAN ),
					},
				};
			};
			this.getAsLabel = function() {
				"use strict";
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_days' ).text(
						days.val() + ' ' + mw.config.get( 'wgMonthNames' )[months.val()] + ' ' + years.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'time', this.getDataValue(), span );
				return span;
			};

			days.change( changeF );
			days.keyup( changeF );
			months.change( changeF );
			months.keyup( changeF );
			years.change( changeF );
			years.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time-months' ) {
		( function() {

			selectDateTimePrecision.appendTo( this.mainElement );

			var months = $( document.createElement( 'select' ) ).addClass( 'wef_time_month' ).appendTo( this.mainElement );
			WEF_Utils.fillSelectWithMonthes( months );

			var years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );
			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}

				var date = WEF_Utils.parseISO8601( newDataValue.value.time );
				if ( isNaN( date ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}
				date = new Date( date );
				months.val( date.getMonth() + 1 );
				years.val( date.getFullYear() );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( months.val() ) || !WEF_Utils.isEmpty( years.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: WEF_Utils.formatDate( years.val(), months.val() ),
						timezone: 0,
						precision: PRECISION_MONTHS,
						before: 0,
						after: 0,
						calendarmodel: WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN,
					},
				};
			};
			this.getAsLabel = function() {
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_months' ).text(
						mw.config.get( 'wgMonthNames' )[months.val()] + ' ' + years.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'time', this.getDataValue(), span );
				return span;
			};

			months.change( changeF );
			months.keyup( changeF );
			years.change( changeF );
			years.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time-years' ) {
		( function() {

			selectDateTimePrecision.appendTo( this.mainElement );

			var years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );

			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}

				var date = WEF_Utils.parseISO8601( newDataValue.value.time );
				if ( isNaN( date ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}
				date = new Date( date );
				years.val( date.getFullYear() );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( years.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: WEF_Utils.formatDate( years.val() ),
						timezone: 0,
						precision: PRECISION_YEARS,
						before: 0,
						after: 0,
						calendarmodel: WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN,
					},
				};
			};
			this.getAsLabel = function() {
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_years' ).text( years.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'time', this.getDataValue(), span );
				return span;
			};

			years.change( changeF );
			years.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time-centuries' ) {
		( function() {

			selectDateTimePrecision.appendTo( this.mainElement );

			var centuries = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );

			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-][0-9]{1,4}\-/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}

				var date = WEF_Utils.parseISO8601( newDataValue.value.time );
				if ( isNaN( date ) ) {
					switchDataType( 'time', newDataValue );
					return;
				}
				date = new Date( date );
				var year = date.getUTCFullYear();
				var century;
				if ( date.getUTCFullYear() < 0 ) {
					century = Math.floor( ( Math.abs( year ) - 1 ) / 100 ) + 1;
				} else {
					century = Math.floor( ( year - 1 ) / 100 ) + 1;
				}
				centuries.val( century );
			};
			this.hasValue = function() {
				return !WEF_Utils.isEmpty( centuries.val() );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: WEF_Utils.formatCentury( centuries.val() ),
						timezone: 0,
						precision: PRECISION_CENTURIES,
						before: 0,
						after: 0,
						calendarmodel: WIKIDATA_URI_PREFIX + CALENDAR_GREGORIAN,
					},
				};
			};
			this.getAsLabel = function() {
				var century = centuries.val();
				var str;
				if ( century === 0 ) {
					str = '0';
				} else {
					if ( century < 0 ) {
						str = WEF_Utils.toRoman( Math.abs( century ) ) + " BC";
					} else {
						str = WEF_Utils.toRoman( century ) + " AD";
					}
				}
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_centuries' ).text( str );
			};

			centuries.change( changeF );
			centuries.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'url' ) {
		( function() {

			var input = $( document.createElement( 'input' ) ).attr( 'type', 'url' ).addClass( 'wef_url' ).appendTo( this.mainElement );
			this.setDataValue = function( newDataValue ) {
				input.val( WEF_Utils.urlNice( newDataValue.value ) );
			};

			try {
				if ( typeof options === 'object' && typeof options.check === 'object' ) {
					input.attr( 'pattern', WEF_Utils.regexpGetHtmlPattern( options.check ) );
				}
			} catch ( err ) {
				mw.log.warn( 'Unable to attach check pattern to input: ' + err );
			}

			this.hasValue = function() {
				return !WEF_Utils.isEmpty( input.val() );
			};

			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'string',
					value: WEF_Utils.urlUnnice( input.val() ),
				};
			};
			this.getAsLabel = function() {
				var span = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_url' ).text( input.val() );
				if ( this.hasValue() )
					WEF_Utils.formatValueRemotely( 'url', this.getDataValue(), span );
				return span;
			};

			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'wikibase-item' ) {
		( function() {
			var inputClass = ( WEF_Utils.isEmpty( options ) || !$.isFunction( options.inputClass ) ) ? WEF_ItemInput : options.inputClass;

			var table = $( document.createElement( 'table' ) ).addClass( 'wef_wikibase-item_table' ).appendTo( snakValueEditor.mainElement );
			var tr = $( document.createElement( 'tr' ) ).addClass( 'wef_wikibase-item_tr' ).appendTo( table );
			var input = new inputClass().appendTo( $( document.createElement( 'td' ) ).addClass( 'wef_wikibase-item_td_input' ).appendTo( tr ) );

			this.setDataValue = function( newDataValue ) {
				this.setDataValueImpl( WEF_Utils.getEntityIdFromDatavalue( newDataValue ) );
			};
			this.setDataValueImpl = function( entityId ) {
				input.val( entityId );
			};

			this.hasValue = function() {
				return !WEF_Utils.isEmpty( input.val() );
			};

			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				var dataValue = {};
				if ( !WEF_Utils.isEmpty( input.val() ) ) {
					dataValue.value = {
						'entity-type': 'item',
						'numeric-id': Number( input.val().substr( 1 ) ),
					};
				}
				dataValue.type = 'wikibase-entityid';
				return dataValue;
			};
			this.getAsLabel = function() {
				var entityId = input.val();
				if ( WEF_Utils.isEmpty( entityId ) ) {
					return $( document.createElement( 'span' ) );
				}

				var result = $( document.createElement( 'span' ) );
				result.text( '(' + entityId + ')' );
				wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
					result.text( label + ' (' + entityId + ')' );
					result.attr( 'title', description );
				} );
				return result;
			};

			/** @type {WEF_SelectEditor} */
			var selectCreateEditor = null;
			var selectEditEditor = null;

			var createOrEditButton = $( document.createElement( 'div' ) ).css( 'cursor', 'pointer' ).addClass( 'wef_wikibase-item_button' ).appendTo(
					$( document.createElement( 'td' ) ).addClass( 'wef_wikibase-item_td_button wef_button_cell' ).appendTo( tr ) );
			createOrEditButton.button( {
				icons: {
					primary: 'ui-icon-pencil'
				},
				text: false,
				label: wef_Editors_i18n.buttonCreateOrEdit,
			} );
			$( this ).on( 'change', function() {
				if ( selectCreateEditor != null )
					selectCreateEditor.hide();
				if ( selectEditEditor != null )
					selectEditEditor.hide();
			} );

			createOrEditButton.click( function() {
				var entityId = input.val();
				if ( WEF_Utils.isEmpty( entityId ) ) {
					if ( selectCreateEditor == null ) {
						selectCreateEditor = new WEF_SelectEditor( createOrEditButton, wef_Editors_i18n.buttonCreateOrEditPrefixCreate, function( id, editor ) {
							var d = editor.edit( false, null );
							d.done( function( newEntityId ) {
								if ( !WEF_Utils.isEmpty( newEntityId ) ) {
									snakValueEditor.setDataValueImpl( newEntityId );
									wef_LabelsCache.receiveLabels();
								}
								WEF_Utils.purgeAsync();
							} );
						} );
						selectCreateEditor.show();
					} else {
						selectCreateEditor.toggle();
					}
				} else {
					if ( selectEditEditor == null ) {
						selectEditEditor = new WEF_SelectEditor( createOrEditButton, wef_Editors_i18n.buttonCreateOrEditPrefixEdit, function( id, editor ) {
							var d = editor.edit( false, entityId );
							d.done( function() {
								WEF_Utils.purgeAsync();
							} );
						} );
						selectEditEditor.show();
					} else {
						selectEditEditor.toggle();
					}
				}
			} );

			var onWikidata = $( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).attr( 'target', '_blank' ).addClass( 'wef_wikibase-item_button' ).appendTo(
					$( document.createElement( 'td' ) ).addClass( 'wef_wikibase-item_td_button wef_button_cell' ).appendTo( tr ) );
			onWikidata.button( {
				icons: {
					primary: 'ui-icon-extlink'
				},
				text: false,
				label: wef_Editors_i18n.buttonOnWikidata,
			} );
			$( this ).on( 'change', function() {
				var entityId = input.val();
				if ( !WEF_Utils.isEmpty( entityId ) ) {
					onWikidata.attr( 'href', '//www.wikidata.org/wiki/' + entityId );
					onWikidata.button( 'enable' );
				} else {
					onWikidata.attr( 'href', '' );
					onWikidata.button( 'disable' );
				}
			} );

			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else {
		throw new Error( 'Unsupported data type: ' + editorDataType );
	}

	if ( typeof initialDataValue !== 'undefined' ) {
		this.setDataValue( initialDataValue );
	} else {
		changeF();
	}
};
WEF_SnakValueEditor.prototype.hide = function() {
	this.mainElement.hide();
};
WEF_SnakValueEditor.prototype.show = function() {
	this.mainElement.show();
};

/**
 * Creates input field that used to display or input Wikidata items
 */
WEF_ItemInput = function( options ) {
	var DATA_ENTITY_ID = 'value-entity-id';
	var DATA_ENTITY_LABEL = 'value-entity-label';

	var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_item_input' );

	this.val = function( entityId ) {
		if ( typeof entityId === 'undefined' ) {
			// return current value
			return input.data( DATA_ENTITY_ID );
		}

		// or set value
		input.data( DATA_ENTITY_ID, entityId );
		input.data( DATA_ENTITY_LABEL, '' );
		input.val( '(' + entityId + ')' );

		wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
			if ( input.data( DATA_ENTITY_ID ) === entityId ) {
				// we need to be sure user didn't start to edit field
				if ( input.val() === '(' + entityId + ')' || input.val() === input.data( DATA_ENTITY_LABEL ) + ' (' + entityId + ')' ) {
					input.data( DATA_ENTITY_LABEL, label );
					input.val( label + ' (' + entityId + ')' );
					input.attr( 'title', description );
				}
			}
		} );

		input.change();
	};

	input.autocomplete( {
		source: function( request, response ) {
			var term = request.term;
			$.ajax( {
				dataType: 'json',
				url: WEF_Utils.getWikidataApiPrefix() // 
						+ '&action=wbsearchentities' //
						+ '&language=' + encodeURIComponent( mw.config.get( 'wgUserLanguage' ) ) // 
						+ '&limit=15' //
						+ '&search=' + encodeURIComponent( term ),
			} ).done( function( result ) {
				var list = [];
				$.each( result.search, function( index, entity ) {
					var item = new WEF_ItemInput_Item( entity.id, entity.label );
					list.push( item );
				} );

				response( list );

				// just in case everything in cache already
				wef_LabelsCache.receiveLabels();
			} );
		},
		select: function( event, ui ) {
			/** @type {WEF_ItemInput_Item} */
			var item = ui.item;
			var input = $( event.target );

			var entityId = item.entityId;
			var label = wef_LabelsCache.getLabel( entityId, true );
			var description = wef_LabelsCache.getDescription( entityId, false );

			input.data( DATA_ENTITY_ID, entityId );
			input.data( DATA_ENTITY_LABEL, label );
			input.val( label );

			if ( !WEF_Utils.isEmpty( description ) ) {
				input.attr( 'title', description );
			} else {
				input.removeAttr( 'title' );
			}

			input.change();
			return false;
		},
	} );

	input.data( 'autocomplete' )._renderItem =
	/**
	 * @param ul
	 * @param {WEF_ItemInput_Item}
	 *            item
	 */
	function( ul, item ) {
		return $( document.createElement( 'li' ) ).append( item.a ).data( 'item.autocomplete', item ).appendTo( ul );
	};

	input.focus( function() {
		var id = input.data( DATA_ENTITY_ID );
		var label = input.data( DATA_ENTITY_LABEL );

		if ( typeof id === 'undefined' || typeof label === 'undefined' ) {
			input.val( '' );
			input.removeData( DATA_ENTITY_ID );
			input.removeData( DATA_ENTITY_LABEL );
		} else {
			input.val( label );
		}

		input.change();
	} );

	input.blur( function() {
		var id = input.data( DATA_ENTITY_ID );
		var label = input.data( DATA_ENTITY_LABEL );
		var currentVal = input.val();
		if ( currentVal === label ) {
			input.val( label + ' (' + id + ')' );
		} else {
			input.val( '' );
			input.removeData( DATA_ENTITY_ID );
			input.removeData( DATA_ENTITY_LABEL );
		}

		input.change();
	} );

	this.addClass = function() {
		input.addClass.apply( input, arguments );
		return this;
	};
	this.appendTo = function() {
		input.appendTo.apply( input, arguments );
		return this;
	};
	this.change = input.change.bind( input );
	this.keyup = input.keyup.bind( input );
};

WEF_ItemInput_Item = function( entityId, label ) {
	this.entityId = entityId;

	var labelWrapper = $( '<strong></strong>' );
	wef_LabelsCache.localizeLabel( labelWrapper, entityId );

	var entityIdWrapper = $( '<span style="color: darkgray;">' + entityId + '</span>' );

	var descriptionWrapper = $( '<span></span>' );
	wef_LabelsCache.localizeDescription( descriptionWrapper, entityId );

	var space = $( '<span> </span>' );
	var br = $( '<br>' );

	var a = this.a = $( '<a></a>' );
	a.append( labelWrapper );
	a.append( space );
	a.append( entityIdWrapper );
	a.append( br );
	a.append( descriptionWrapper );
};

/**
 * Creates select field that has predefined number of values, but also support
 * extending values based on load external values. Uses {@link WEF_LabelsCache}
 * and JQuery autoselect
 */
WEF_ItemSelect = function() {
	var select = $( document.createElement( 'select' ) ).addClass( 'wef_item_select' );
	this.select = select;

	this.addOption = function( entityId ) {
		if ( typeof entityId === 'undefined' || entityId === null ) {
			throw new Error( 'incorrect entity ID: ' + entityId );
		}

		var option = $( document.createElement( 'option' ) ).appendTo( select );
		option.attr( 'value', entityId );
		option.text( entityId );
		wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
			option.text( label );
			option.attr( 'title', description );
		} );
		return option;
	};

	this.val = function( value ) {
		if ( typeof value === 'undefined' ) {
			return select.val();
		} else if ( value === null ) {
			select.prop( 'selectedIndex', -1 );
		} else {
			select.val( value );
			var option = select.find( ':selected' );
			if ( option.length !== 0 ) {
				return option;
			}
			var newOption = this.addOption( value );
			select.val( value );
			return newOption;
		}
	};
};

/**
 * Creates input field to input language code based on $.uls.data.languages list
 */
WEF_LanguageInput = ( function() {
	var availableLanguagesCache;
	var getAvailableLanguages = function() {
		if ( typeof availableLanguagesCache === 'undefined' ) {
			var availableLanguagesCache = [];
			$.each( $.uls.data.languages, function( languageCode, languageOptions ) {
				var languageTitle = languageOptions[2];
				var auctocompleteObject = {
					label: languageCode + ' — ' + languageTitle,
					value: languageCode,
				};
				availableLanguagesCache.push( auctocompleteObject );
			} );
		}
		return availableLanguagesCache;
	}

	return function() {
		var input = $( document.createElement( 'input' ) ).addClass( 'wef_language_select' );

		input.autocomplete( {
			source: getAvailableLanguages(),
		} );

		this.appendTo = input.appendTo.bind( input );
		this.change = input.change.bind( input );
		this.val = input.val.bind( input );
	};
} )();

/** @class */
var WEF_SelectSnakType = function() {
	var i18n = wef_Editors_i18n;

	var select = $( document.createElement( 'select' ) ).addClass( 'wef-snaktypeselector-menu' ).attr( 'size', 3 );
	select.hide();
	$( document.body ).append( select );

	var _this = this;
	function changeF() {
		var value = _this.val();
		if ( value !== null ) {
			_this.hide();
			_this.listener( value );
		}
	}

	$( document.createElement( 'option' ) ).attr( 'value', 'value' ).text( i18n.snakTypeValue ).attr( 'title', i18n.snakTypeValueTitle ).appendTo( select );
	$( document.createElement( 'option' ) ).attr( 'value', 'novalue' ).text( i18n.snakTypeNoValue ).attr( 'title', i18n.snakTypeNoValueTitle ).appendTo( select );
	$( document.createElement( 'option' ) ).attr( 'value', 'somevalue' ).text( i18n.snakTypeSomeValue ).attr( 'title', i18n.snakTypeSomeValueTitle ).appendTo( select );

	select.click( changeF );
	select.change( changeF );

	this.listener = function( value ) {
		// no ops
	};

	this.val = function( value ) {
		if ( typeof value === 'undefined' ) {
			return select.val();
		}

		select.val( value );
	};

	this.text = function() {
		var option = select.find( ':selected' );
		if ( option.length !== 0 ) {
			return option.text();
		}
		return null;
	};

	this.visible = false;

	this.hide = function() {
		this.visible = false;
		select.hide();
	};

	this.show = function( anchor, value, listener ) {
		this.val( value );
		anchor.after( select );
		select.show().position( {
			my: 'left top',
			at: 'right top',
			of: anchor,
		} );
		this.listener = listener;
		this.visible = true;
	};
};
window.wef_selectSnakType = new WEF_SelectSnakType();

WEF_SnakEditor = function( parent, options ) {
	if ( WEF_Utils.isEmpty( parent ) ) {
		throw new Error( 'parent is empty or not specified' );
	}

	this.options = options;
	var snakEditor = this;

	this.snakTypeMode = null;
	this.valueEditor = null;
	this.propertyId = null;

	this._butttonSelectSnakType = $( document.createElement( 'button' ) ).addClass( 'wef_select_snak_type_button' );
	this._butttonSelectSnakType.button( {
		icons: {
			primary: 'ui-icon-triangle-1-e'
		},
		text: false,
		label: wef_Editors_i18n.buttonSelectSnakType,
	} ).click( function() {
		if ( wef_selectSnakType.visible && wef_selectSnakType.initiator === this ) {
			wef_selectSnakType.hide();
		} else {
			wef_selectSnakType.initiator = this;
			wef_selectSnakType.show( snakEditor._butttonSelectSnakType, snakEditor.snakTypeMode, function( value ) {
				snakEditor.switchToSnakType( value );
			} );
		}
	} );

	// JQuery parent element
	this.table = $( document.createElement( 'table' ) ).addClass( 'wef_snak_table' ).appendTo( parent );
	this._tr = $( document.createElement( 'tr' ) ).appendTo( this.table );
	this._td1 = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( this._tr );
	this._td2 = $( document.createElement( 'td' ) ).addClass( 'wef_snak_table_value_editor_cell' ).appendTo( this._tr );
	this._snakTypeLabel = $( document.createElement( 'span' ) ).addClass( 'wef_snak_type_label' ).appendTo( this._td2 ).hide();

	this._td1.append( this._butttonSelectSnakType );

	this.hiddenBehindLabel = false;
	this._jThis = $( this );
};

WEF_SnakEditor.prototype._change = function() {
	this._jThis.trigger( 'change' );
};

WEF_SnakEditor.prototype.hasData = function() {
	return this.snakTypeMode !== 'value' || this.valueEditor.hasValue();
};

WEF_SnakEditor.prototype.hasValue = function() {
	return this.snakTypeMode === 'value' && this.valueEditor.hasValue();
};

WEF_SnakEditor.prototype.hideBehindLabel = function() {
	var label = $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label' );
	label.css( 'cursor', 'pointer' );

	if ( this.snakTypeMode === 'value' ) {
		label.append( this.valueEditor.getAsLabel() );
	} else {
		label.text( wef_selectSnakType.text() );
	}

	this.table.before( label );
	this.table.hide();

	var snakEditor = this;
	snakEditor.hiddenBehindLabel = true;
	label.click( function() {
		label.remove();
		snakEditor.table.show();
		snakEditor.hiddenBehindLabel = false;
	} );

	return label;
};

WEF_SnakEditor.prototype.initEmptyWithDataType = function( propertyId, dataType, editorDataType ) {
	this.propertyId = propertyId;
	this.snakTypeMode = 'value';
	this.valueEditor = new WEF_SnakValueEditor( this._td2, dataType, editorDataType, undefined, this.options );
	this._initValueEditor();
};

WEF_SnakEditor.prototype.initEmptyWithPropertyId = function( propertyId ) {
	this.propertyId = propertyId;
	this.snakTypeMode = 'novalue';
	this.switchToSnakType( 'value' );
};

WEF_SnakEditor.prototype._initValueEditor = function() {
	var snakEditor = this;
	$( this.valueEditor ).change( function() {
		snakEditor._change();
	} );
};

WEF_SnakEditor.prototype.initWithValue = function( snak ) {
	if ( typeof snak.property === 'undefined' ) {
		throw new Error( 'Snak does not specify property ID' );
	}
	if ( typeof snak.snaktype === 'snaktype' ) {
		throw new Error( 'Snak does not specify snak type' );
	}
	this.propertyId = snak.property;
	this.snakTypeMode = snak.snaktype;

	if ( snak.snaktype === 'value' ) {
		if ( typeof snak.datatype === 'undefined' ) {
			throw new Error( 'Snak contains value, but does not specify data type' );
		}
		if ( typeof snak.datavalue === 'undefined' ) {
			throw new Error( 'Snak type is value, but value does not present' );
		}
		this.valueEditor = new WEF_SnakValueEditor( this._td2, snak.datatype, undefined, snak.datavalue, this.options );
		this._initValueEditor();
	} else {
		this._showSnakTypeLabel( snak.snaktype );
	}

	this._change();
};

/** @return {string} */
WEF_SnakEditor.prototype.getDataType = function() {
	if ( this.snakTypeMode !== 'value' ) {
		throw new Error( 'data type make sence only when snak type is "value"' );
	}
	return this.valueEditor.dataDataType;
};

WEF_SnakEditor.prototype.getDataValue = function() {
	return this.valueEditor.getDataValue();
};

WEF_SnakEditor.prototype.remove = function() {
	this.table.remove();
	this.valueEditor = null;
	this.parent = null;
};

WEF_SnakEditor.prototype.setSnakValue = function( snak ) {
	if ( typeof snak.property === 'undefined' ) {
		throw new Error( 'Snak does not specify property ID' );
	}
	if ( typeof snak.snaktype === 'snaktype' ) {
		throw new Error( 'Snak does not specify snak type' );
	}
	this.propertyId = snak.property;
	this.switchToSnakType( snak.snaktype );
	if ( snak.snaktype === 'value' ) {
		this.valueEditor.setDataValue( snak.datavalue );
	}
	this._change();
};

WEF_SnakEditor.prototype._showSnakTypeLabel = function( snakType ) {
	if ( snakType === 'novalue' ) {
		this._snakTypeLabel.text( wef_Editors_i18n.snakTypeNoValue ).attr( 'title', wef_Editors_i18n.snakTypeNoValueTitle );
	} else if ( snakType === 'somevalue' ) {
		this._snakTypeLabel.text( wef_Editors_i18n.snakTypeSomeValue ).attr( 'title', wef_Editors_i18n.snakTypeSomeValueTitle );
	} else {
		this._snakTypeLabel.text( '' ).attr( 'title', '' );
	}
	this._snakTypeLabel.show();
};

WEF_SnakEditor.prototype.switchToSnakType = function( snakType ) {
	var oldSnakType = this.snakTypeMode;
	if ( oldSnakType === snakType ) {
		return;
	}

	this.snakTypeMode = snakType;
	if ( this.valueEditor !== null ) {
		this.valueEditor.hide();
	}

	var snakEditor = this;
	if ( snakType === 'value' ) {
		if ( this.valueEditor === null ) {
			wef_TypesCache.getPropertyType( snakEditor.propertyId, function( dataType ) {
				snakEditor._snakTypeLabel.hide();
				snakEditor.valueEditor = new WEF_SnakValueEditor( snakEditor._td2, dataType, undefined, undefined, snakEditor.options );
				snakEditor._initValueEditor();
				snakEditor._change();
			}, function( failureReason ) {
				alert( "Can't change snak value type bacause property data type is unknown: " + failureReason );
				snakEditor.snakTypeMode = oldSnakType;
			} );
		} else {
			this._snakTypeLabel.hide();
			this.valueEditor.show();
		}
	} else {
		this._showSnakTypeLabel( snakType );
		this._change();
	}
};

/**
 * Returns the array of claims for specified definition from entity
 * 
 * @param definition
 *            {WEF_Definition}
 * @param claims
 *            Wikidata entity JSON
 * @returns {WEF_Claim[]}
 */
window.WEF_filterClaims = function( definition, claims ) {
	var isPropertyEditor = /^P\d+$/i.test( definition.code );
	var isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

	/* Main property ID */
	/** @type {string} */
	var propertyId;
	/* Required property value */
	var propertyValue;

	if ( isPropertyEditor ) {
		var test = definition.code.match( /^P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = undefined;
	} else if ( isQualifierEditor ) {
		var test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = 'Q' + test[2];
	} else {
		throw new Error( 'Unsupported code: ' + definition.code );
	}

	if ( typeof claims === 'undefined' || typeof claims[propertyId] === 'undefined' ) {
		return [];
	}

	/** @type {WEF_Claim[]} */
	var byPropertyId = claims[propertyId];

	if ( isPropertyEditor ) {
		return byPropertyId;
	}

	if ( isQualifierEditor ) {
		var result = [];
		$.each( byPropertyId, function( index, claim ) {
			var entityId = WEF_Utils.getEntityIdFromClaim( claim );
			if ( typeof entityId != 'undefined' && entityId === propertyValue ) {
				result.push( claim );
			}
		} );
		return result;
	}

	throw new Error( 'Illegal state' );
};

WEF_QualifierEditor = function( parent, propertyId, onRemove ) {
	/** @type {string} */
	this.propertyId = null;
	/** @type {WEF_SnakEditor} */
	this.snakEditor = null;
	/** @type {WEF_Snak} */
	this.wikidataSnak = null;
	/** @type {string} */
	this.wikidataOldValue = null;

	this.qualifierRow = $( document.createElement( 'tr' ) ).appendTo( parent );
	this.qualifierEditCell = $( document.createElement( 'td' ) ).addClass( 'wef_qualifiers_edit_cell' ).appendTo( this.qualifierRow );
	this.qualifierRemoveCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( this.qualifierRow );

	this._addRemoveButton( this.qualifierRemoveCell );
	this._onRemove = onRemove;
};

/**
 * @param claimData
 *            {WEF_Claim}
 * @return {Boolean}
 */
WEF_QualifierEditor.prototype.collectUpdates = function( claimData ) {
	if ( this.hasData() ) {
		var snakValue = this.getSnakValue();
		WEF_Utils.appendToNamedMap( claimData, 'qualifiers', this.propertyId, snakValue );
		return JSON.stringify( snakValue ) !== this.wikidataOldValue;
	} else {
		/*
		 * just ignore it and do not add to claim -- it will be removed as
		 * "missing" one
		 */
		return this.wikidataOldValue !== null;
	}
};

WEF_QualifierEditor.prototype.hasData = function() {
	return this.propertyId != null && this.snakEditor.hasData();
};

WEF_QualifierEditor.prototype.initWithValue = function( qualifierSnak ) {
	this.wikidataSnak = qualifierSnak;
	this.propertyId = qualifierSnak.property;
	this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
	this.snakEditor.initWithValue( qualifierSnak );
	this.wikidataOldValue = this.hasData() ? JSON.stringify( this.getSnakValue() ) : null;

	var qualifierEditor = this;
	var label = this.snakEditor.hideBehindLabel();
	label.click( function() {
		$( qualifierEditor ).trigger( 'afterShow' );
	} );
	$( qualifierEditor ).trigger( 'afterHide' );
};

/** Create empty editor but hide it behind replacement label as well */
WEF_QualifierEditor.prototype.initWithEmpty = function( propertyId, dataType, editorDataType ) {
	this.wikidataSnak = null;
	this.propertyId = propertyId;
	this.wikidataOldValue = null;
	this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
	this.snakEditor.initEmptyWithDataType( propertyId, dataType, editorDataType );
};

/** @return {string} */
WEF_QualifierEditor.prototype.getHash = function() {
	return this.wikidataSnak != null ? this.wikidataSnak.hash : null;
};

WEF_QualifierEditor.prototype.getSnakValue = function() {
	if ( !this.hasData() ) {
		throw new Error( 'no data' );
	}

	var snak = {};
	if ( this.wikidataSnak !== null ) {
		snak.hash = this.wikidataSnak.hash;
	}
	snak.snaktype = this.snakEditor.snakTypeMode;
	snak.property = this.propertyId;
	if ( this.snakEditor.snakTypeMode === 'value' ) {
		snak.datatype = this.snakEditor.getDataType();
		snak.datavalue = this.snakEditor.getDataValue();
	}
	return snak;
};

WEF_QualifierEditor.prototype.clear = function() {
	this.propertyId = null;
	this.snakEditor = null;
	this.qualifierRow.remove();
};

WEF_QualifierEditor.prototype._addRemoveButton = function( target ) {
	var qualifierEditor = this;
	var button = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).button( {
		icons: {
			primary: 'ui-icon-trash'
		},
		text: false,
		label: wef_Editors_i18n.buttonRemoveQualifier,
	} ).click( function() {
		qualifierEditor._onRemove( qualifierEditor );
	} ).addClass( 'wef_qualifier_button' ).appendTo( target );

	$( this ).on( 'afterHide', function() {
		button.hide();
	} );
	$( this ).on( 'afterShow', function() {
		button.show();
	} );
};

WEF_SelectableQualifierEditor = function( parent, qualifierDefinitions, onRemove ) {

	/** @type {string} */
	this.propertyId = null;
	/** @type {WEF_SnakEditor} */
	this.snakEditor = null;
	/** @type {WEF_Snak} */
	this.wikidataSnak = null;
	/** @type {string} */
	this.wikidataOldValue = null;

	var qualifiedEditor = this;

	this.qualifierRow = $( document.createElement( 'tr' ) ).appendTo( parent );
	/** @type {WEF_ItemSelect} */
	var qualifierSelect = this.qualifierSelect = new WEF_ItemSelect();
	qualifierSelect.select.appendTo( $( document.createElement( 'td' ) ).addClass( 'wef_qualifiers_select_cell' ).appendTo( this.qualifierRow ) );
	this.qualifierEditCell = $( document.createElement( 'td' ) ).addClass( 'wef_qualifiers_edit_cell' ).appendTo( this.qualifierRow );
	this.qualifierRemoveCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( this.qualifierRow );

	if ( $.isArray( qualifierDefinitions ) ) {
		$.each( qualifierDefinitions, function( index, qualifierDefinition ) {
			var code = qualifierDefinition.code;
			qualifierSelect.addOption( code );

			if ( !WEF_Utils.isEmpty( qualifierDefinition.datatype ) ) {
				wef_TypesCache.putInCache( code, qualifierDefinition.datatype );
			}
		} );
	}

	// do not select the first
	qualifierSelect.val( null );

	qualifierSelect.hideBehindLabel = function() {
		var label = $( document.createElement( 'span' ) );
		label.css( 'cursor', 'pointer' );

		var code = qualifierSelect.val();
		label.text( '(' + qualifierSelect.val() + '): ' );
		wef_LabelsCache.getOrQueue( code, function( newLabel, newDescription ) {
			label.text( newLabel + ': ' );
			label.attr( 'title', newDescription );
		} );

		qualifierSelect.select.before( label );
		qualifierSelect.select.hide();

		label.click( function() {
			label.remove();
			qualifierSelect.select.show();
		} );
		return label;
	};

	qualifierSelect.select.change( function() {
		var newPropertyId = qualifierSelect.val();
		if ( newPropertyId != null && qualifiedEditor.propertyId != newPropertyId ) {
			qualifiedEditor._onPropertySelect( newPropertyId );
		}
	} );

	/** @type {function} */
	this._onRemove = onRemove;
	this._addRemoveButton( this.qualifierRemoveCell );
};

WEF_SelectableQualifierEditor.prototype = Object.create( WEF_QualifierEditor.prototype );

WEF_SelectableQualifierEditor.prototype.initWithValue = function( qualifierSnak ) {
	var qualifierEditor = this;

	this.wikidataSnak = qualifierSnak;
	this.propertyId = qualifierSnak.property;
	this.qualifierSelect.val( qualifierSnak.property );
	this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
	this.snakEditor.initWithValue( qualifierSnak );

	// remember old value
	this.wikidataOldValue = this.hasData() ? JSON.stringify( this.getSnakValue() ) : null;

	var selectLabel = this.qualifierSelect.hideBehindLabel();
	var editorLabel = this.snakEditor.hideBehindLabel();
	this.qualifierRemoveCell.css( 'visibility', 'hidden' );
	$( qualifierEditor ).trigger( 'afterHide' );

	var firstTime = true;
	this.qualifierRow.click( function( evt ) {
		if ( firstTime ) {
			firstTime = false;
			qualifierEditor.qualifierRemoveCell.css( 'visibility', 'inherit' );

			var target = $( evt.target );
			if ( !selectLabel.is( target ) && !$.contains( selectLabel[0], target ) ) {
				selectLabel.click();
			}
			if ( !editorLabel.is( target ) && !$.contains( editorLabel[0], target ) ) {
				editorLabel.click();
			}
			$( qualifierEditor ).trigger( 'afterShow' );
		}
	} );
};

/* Called from drop-down select */
WEF_SelectableQualifierEditor.prototype._onPropertySelect = function( newPropertyId ) {
	this.propertyId = newPropertyId;

	// do we have qualifier input already?
	if ( this.snakEditor == null ) {
		this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
		this.snakEditor.initEmptyWithPropertyId( newPropertyId );
	} else {
		if ( this.snakEditor.propertyId === newPropertyId ) {
			// leave as it is
		} else {
			this.snakEditor.remove();
			this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
			this.snakEditor.initEmptyWithPropertyId( newPropertyId );
		}
	}
};

/** @const */
var PROPERTIES_OF_REFERENCE = [];
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P248', // specified in
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P50', // author
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P1476', // title
	datatype: 'monolingualtext',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P1680', // subtitle
	datatype: 'monolingualtext',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P393', // editor
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P1433', // publication
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P123', // publisher
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P478', // volume
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P433', // issue
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P792', // chapter
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P958', // section
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P304', // pages
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P143', // imported from
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P813', // date retrieved
	datatype: 'time',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P854', // URL
	datatype: 'url',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P1065', // archive URL
	datatype: 'url',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P212', // ISBN 13
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P957', // ISBN 10
	datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P1480', // sourcing circumstances
	datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
	code: 'P387', // citation
	datatype: 'string',
} ) );

/** @class */
WEF_ClaimReferenceEditor = function( parentTableElement ) {
	"use strict";

	var claimReferenceEditor = this;
	this.parentTableElement = parentTableElement;
	this.snaksEditors = [];
	this.wikidataHash = null;
	this.wikidataOldSnaksStr = null;

	this.lastRow = $( document.createElement( 'tr' ) ).appendTo( parentTableElement );

	var newSnakTypeSelect = new WEF_ItemSelect();
	$.each( PROPERTIES_OF_REFERENCE, function( index, propertyDefinition ) {
		var code = propertyDefinition.code;
		newSnakTypeSelect.addOption( code );
		wef_TypesCache.putInCache( code, propertyDefinition.datatype );
	} );
	newSnakTypeSelect.val( null );
	newSnakTypeSelect.select.appendTo( $( document.createElement( 'td' ) ).addClass( 'wef_reference_select_cell' ).appendTo( this.lastRow ) );

	newSnakTypeSelect.select.change( function() {
		var newPropertyId = newSnakTypeSelect.val();

		if ( newPropertyId != null ) {
			var snakEditor = new WEF_SelectableQualifierEditor( claimReferenceEditor.parentTableElement, PROPERTIES_OF_REFERENCE, function( removedEditor ) {
				claimReferenceEditor._onSnakEditorRemove( removedEditor );
			} );
			snakEditor.qualifierSelect.val( newPropertyId );
			snakEditor._onPropertySelect( newPropertyId );
			claimReferenceEditor.snaksEditors.push( snakEditor );

			newSnakTypeSelect.val( null );
			claimReferenceEditor.moveSelectToLastRow();
		}
	} );
};

/**
 * Reappend empty row with only-for-select drop-down list to the end of the
 * table
 */
WEF_ClaimReferenceEditor.prototype.moveSelectToLastRow = function() {
	"use strict";
	this.lastRow.detach();
	this.lastRow.appendTo( this.parentTableElement );
};

WEF_ClaimReferenceEditor.prototype.load = function( reference ) {
	"use strict";
	this.wikidataHash = typeof reference.hash !== 'undefined' ? reference.hash : null;
	this.wikidataOldSnaksStr = typeof reference.snaks !== 'undefined' ? JSON.stringify( reference.snaks ) : null;

	var claimReferenceEditor = this;
	$.each( reference.snaks, function( propertyId, propertySnaks ) {
		$.each( propertySnaks, function( i, snak ) {
			var snakEditor = new WEF_SelectableQualifierEditor( claimReferenceEditor.parentTableElement, PROPERTIES_OF_REFERENCE, function( removedEditor ) {
				claimReferenceEditor._onSnakEditorRemove( removedEditor );
			} );
			snakEditor.initWithValue( snak );
			claimReferenceEditor.snaksEditors.push( snakEditor );
		} );
	} );
	this.moveSelectToLastRow();
};
WEF_ClaimReferenceEditor.prototype.collect = function() {
	"use strict";
	var newReference = {};
	var snaksOrder = [];

	if ( this.wikidataHash !== null ) {
		newReference.hash = this.wikidataHash;
	}

	$.each( this.snaksEditors, function( i, snakEditor ) {
		if ( snakEditor.hasData() ) {
			var propertyId = snakEditor.propertyId;
			WEF_Utils.appendToNamedMap( newReference, 'snaks', propertyId, snakEditor.getSnakValue() );
			if ( $.inArray( propertyId, snaksOrder ) === -1 ) {
				snaksOrder.push( propertyId );
			}
		}
	} );

	if ( !WEF_Utils.isEmpty( newReference.snaks ) ) {
		newReference["snaks-order"] = snaksOrder;
		return newReference;
	}
	return;
};
WEF_ClaimReferenceEditor.prototype._onSnakEditorRemove = function( removedEditor ) {
	"use strict";
	removedEditor.qualifierRow.remove();
	this.snaksEditors = $.grep( this.snaksEditors, function( value ) {
		return value != removedEditor;
	} );
};

/** @class */
WEF_ClaimReferencesEditor = function() {
	"use strict";
	var claimReferencesEditor = this;
	var i18n = wef_Editors_i18n;

	this.parent = $( document.createElement( 'div' ) ).addClass( 'wef_references_editor' );
	this.referencesHolder = $( document.createElement( 'div' ) ).appendTo( this.parent );

	var referencesTable = $( document.createElement( 'div' ) ).addClass( 'wef_reference_editor_table' ).appendTo( this.parent );
	var part1 = $( document.createElement( 'div' ) ).addClass( 'wef_reference_editor_column' ).appendTo( referencesTable );
	$( document.createElement( 'span' ) ).text( i18n.sourcesLabelAddUsedReferences ).appendTo( part1 );
	this.addReferenceHolder = $( document.createElement( 'ul' ) ).addClass( 'wef_reference_editor_list' ).appendTo( part1 );

	this.editors = [];
	this.parent.dialog( {
		dialogClass: 'wef_references_editor_dialog',
		title: i18n.sourcesDialogTitle,
		autoOpen: false,
		width: 'auto',
		maxWidth: 1000,
		height: 'auto',
		resizable: true,
		modal: true,
		buttons: [ {
			text: i18n.sourcesButtonAddText,
			label: i18n.sourcesButtonAddLabel,
			click: function() {
				claimReferencesEditor.add();
			},
			style: 'float: left;',
		}, {
			text: i18n.sourcesButtonUpdateLabelsText,
			label: i18n.sourcesButtonUpdateLabelsLabel,
			click: function() {
				wef_LabelsCache.clearCacheAndRequeue();
				wef_LabelsCache.receiveLabels();
			},
			style: 'float: left;',
		}, {
			text: i18n.sourcesButtonCloseText,
			label: i18n.sourcesButtonCloseLabel,
			click: function() {
				claimReferencesEditor.parent.dialog( 'close' );
				claimReferencesEditor.rememberUsedSources();
			},
			style: 'float: right;',
		} ],
	} );
};

WEF_ClaimReferencesEditor.prototype.add = function() {
	"use strict";
	var div = $( document.createElement( 'table' ) ).addClass( 'wef_reference_editor' ).appendTo( this.referencesHolder );
	var claimReferenceEditor = new WEF_ClaimReferenceEditor( div );
	// TODO: something like "init with empty?"
	// claimReferenceEditor.load( reference );
	this.editors.push( claimReferenceEditor );
};

WEF_ClaimReferencesEditor.prototype.collect = function() {
	"use strict";
	var result = [];
	$.each( this.editors, function( i, editor ) {
		/** @type WEF_ClaimReferenceEditor */
		var claimReferenceEditor = editor;
		var reference = claimReferenceEditor.collect();
		if ( !WEF_Utils.isEmpty( reference ) ) {
			result.push( reference );
		}
	} );
	return result;
};

WEF_ClaimReferencesEditor.prototype.initAsEmpty = function() {
	"use strict";
	this.loadUsedSources();
	wef_LabelsCache.receiveLabels();
};

WEF_ClaimReferencesEditor.prototype.load = function( references ) {
	"use strict";
	var claimReferencesEditor = this;
	$.each( references, function( i, reference ) {
		claimReferencesEditor.addReference( reference );
	} );
	this.loadUsedSources();
	wef_LabelsCache.receiveLabels();
};

WEF_ClaimReferencesEditor.prototype.addReference = function( reference ) {
	var div = $( document.createElement( 'table' ) ).addClass( 'wef_reference_editor' ).appendTo( this.referencesHolder );
	var claimReferenceEditor = new WEF_ClaimReferenceEditor( div );
	claimReferenceEditor.load( reference );
	this.editors.push( claimReferenceEditor );
};

WEF_ClaimReferencesEditor.prototype.loadUsedSources = function() {
	"use strict";

	if ( typeof window.localStorage === 'undefined' || typeof window.localStorage['wef-latest-sources-refs'] === 'undefined' )
		return;

	var claimReferencesEditor = this;
	try {
		var remembered = JSON.parse( window.localStorage['wef-latest-sources-refs'] ).slice( 0 );
		$.each( remembered, function( i, record ) {
			var property = 'P' + record[0];
			var itemId = Number( record[1] );
			var item = 'Q' + itemId;

			var propertyName = property;
			var itemName = item;

			var li = $( document.createElement( 'li' ) ).appendTo( claimReferencesEditor.addReferenceHolder );
			var reflink = $( document.createElement( 'a' ) ).addClass( 'wef_reference_editor_ref' ).text( propertyName + ': ' + itemName ).appendTo( li );
			wef_LabelsCache.getOrQueue( property, function( label ) {
				propertyName = label;
				reflink.text( propertyName + ': ' + itemName );
			} );
			wef_LabelsCache.getOrQueue( item, function( label ) {
				itemName = label;
				reflink.text( propertyName + ': ' + itemName );
			} );
			reflink.click( function() {
				li.remove();
				var reference = {
					snaks: {},
				};
				reference.snaks[property] = [ WEF_Utils.newWikibaseItemSnak( property, 'item', itemId ) ];
				claimReferencesEditor.addReference( reference );
			} );
		} );
	} catch ( e ) {
		mw.log( 'Unable to load latest sources refs from local storage: ' + e );
	}
};

WEF_ClaimReferencesEditor.prototype.rememberUsedSources = function() {
	"use strict";

	if ( typeof window.localStorage === 'undefined' )
		return;

	var claimReferencesEditor = this;
	try {
		var usedSources = [];
		$.each( this.editors, function( i, claimReferenceEditor ) {
			var reference = claimReferenceEditor.collect();
			claimReferencesEditor._collectSourceRef( reference.snaks, 248, usedSources );
			claimReferencesEditor._collectSourceRef( reference.snaks, 143, usedSources );
		} );

		var remembered = [];
		try {
			var stored = window.localStorage['wef-latest-sources-refs'];
			if ( typeof stored !== 'undefined' ) {
				remembered = JSON.parse( stored ).slice( 0 );
			}
		} catch ( e ) {
			mw.log( 'Unknown error trying to restore latest sources refs from local storage: ' + e );
		}

		var newToRemember = usedSources.concat( remembered ).slice( 0, 10 );
		// leave unique only
		var stringified = $.map( newToRemember, function( x ) {
			return JSON.stringify( x );
		} );
		newToRemember = $.grep( newToRemember, function( item, i ) {
			return $.inArray( JSON.stringify( item ), stringified ) === i // /
					&& typeof $.isArray( item ) //
					&& item.length === 2 //
					&& typeof item[0] === 'number' //
					&& typeof item[1] === 'number';
		} );
		window.localStorage['wef-latest-sources-refs'] = JSON.stringify( newToRemember );
	} catch ( e ) {
		mw.log( 'Unable to update latest sources refs in local storage: ' + e );
	}
};

WEF_ClaimReferencesEditor.prototype._collectSourceRef = function( snaks, propertyNumberId, usedSources ) {
	"use strict";
	var value = this._getItemId( snaks, 'P' + propertyNumberId );
	if ( typeof value !== 'undefined' ) {
		usedSources.push( [ propertyNumberId, value ] );
	}
};
WEF_ClaimReferencesEditor.prototype._getItemId = function( snaks, propertyId ) {

	"use strict";
	var hasValue = typeof snaks[propertyId] !== 'undefined' //
			&& snaks[propertyId].length === 1 //
			&& typeof snaks[propertyId][0].datavalue !== 'undefined' //
			&& typeof snaks[propertyId][0].datavalue.value !== 'undefined' //
			&& snaks[propertyId][0].datavalue.value['entity-type'] === 'item';
	if ( hasValue ) {
		var value = Number( snaks[propertyId][0].datavalue.value['numeric-id'] );
		if ( !Number.isNaN( value ) ) {
			return value;
		}
	}
	return undefined;
};

WEF_ClaimReferencesEditor.prototype.show = function() {
	"use strict";
	this.parent.dialog( 'open' );
};

/** @class */
WEF_SelectRank = function() {
	var i18n = wef_Editors_i18n;

	var select = $( document.createElement( 'select' ) ).addClass( 'wef-claimrankselector-menu' ).attr( 'size', 3 );
	select.hide();
	$( document.body ).append( select );

	var _this = this;
	function changeF() {
		var value = _this.val();
		if ( value !== null ) {
			_this.hide();
			_this.listener( value );
		}
	}

	$( document.createElement( 'option' ) ).attr( 'value', WEF_RANK_PREFERRED ).text( i18n.rankPreferredValue ).attr( 'title', i18n.rankPreferredTitle ).appendTo( select );
	$( document.createElement( 'option' ) ).attr( 'value', WEF_RANK_NORMAL ).text( i18n.rankNormalValue ).attr( 'title', i18n.rankNormalTitle ).appendTo( select );
	$( document.createElement( 'option' ) ).attr( 'value', WEF_RANK_DEPRECATED ).text( i18n.rankDeprecatedValue ).attr( 'title', i18n.rankDeprecatedTitle ).appendTo( select );

	select.click( changeF );
	select.change( changeF );

	this.listener = function( value ) {
		// no ops
	};

	this.val = function( value ) {
		if ( typeof value === 'undefined' ) {
			return select.val();
		}

		select.val( value );
	};

	this.text = function() {
		var option = select.find( ':selected' );
		if ( option.length !== 0 ) {
			return option.text();
		}
		return null;
	};

	this.visible = false;

	this.hide = function() {
		this.visible = false;
		select.hide();
	};

	this.show = function( anchor, value, listener ) {
		this.val( value );
		anchor.after( select );
		select.show().position( {
			my: 'left top',
			at: 'right top',
			of: anchor,
		} );
		this.listener = listener;
		this.visible = true;
	};
};
window.wef_selectRank = new WEF_SelectRank();

/** @class */
var WEF_LabelsEditor = function() {
	"use strict";

	var i18n = wef_Editors_i18n;
	this.placed = false;
	var labelsEditor = this;

	this.oldLabels = {};
	this.oldDescriptions = {};
	// this.oldAliases = {};

	// key is language
	this.dataLabels = {};
	this.dataDescriptions = {};
	// this.dataAliases = {};

	this.currentLanguage = null;

	this.fieldset = $( document.createElement( 'fieldset' ) ).addClass( 'wef_fieldset' ).addClass( 'wef-labels-editor' );
	this.legend = $( document.createElement( 'legend' ) ).text( i18n.labelLabels + ':\u00A0\u00A0\u00A0' ).appendTo( this.fieldset );
	this.langSelect = $( document.createElement( 'select' ) ).appendTo( this.legend );
	var table = $( document.createElement( 'table' ) ).addClass( 'wef-table' ).addClass( 'wef-labels-editor-table' ).appendTo( this.fieldset );

	var tr1 = $( document.createElement( 'tr' ) ).appendTo( table );
	$( document.createElement( 'th' ) ).addClass( 'wef-labels-editor-th' ).text( i18n.labelLabel ).appendTo( tr1 );
	this.inputLabel = $( document.createElement( 'input' ) ).addClass( 'wef-labels-editor-label-input' ).appendTo(
			$( document.createElement( 'td' ) ).addClass( 'wef-labels-editor-label-td' ).appendTo( tr1 ) );

	var tr2 = $( document.createElement( 'tr' ) ).appendTo( table );
	$( document.createElement( 'th' ) ).addClass( 'wef-labels-editor-th' ).text( i18n.labelDescription ).appendTo( tr2 );
	this.inputDescription = $( document.createElement( 'input' ) ).addClass( 'wef-labels-editor-description-input' ).appendTo(
			$( document.createElement( 'td' ) ).addClass( 'wef-labels-editor-description-td' ).appendTo( tr2 ) );

	// var tr3 = $( document.createElement( 'tr' ) ).appendTo( table );
	// $( document.createElement( 'th' ) ).text( i18n.labelAliases ).appendTo(
	// tr3 );
	// this.inputAliases = $( document.createElement( 'ul' ) ).appendTo( $(
	// document.createElement( 'td' ) ).appendTo( tr3 ) );

	this.langSelect.change( function() {
		labelsEditor.switchLanguage();
	} );
	this.langSelect.change( function() {
		labelsEditor.switchLanguage();
	} );
};

WEF_LabelsEditor.prototype.replaceAll = function( target ) {
	"use strict";

	if ( this.placed === true ) {
		throw new Error( 'Claims edit table is already placed on the form' );
	}
	this.placed = true;

	this.fieldset.replaceAll( target );
};

WEF_LabelsEditor.prototype.initAsEmpty = function( currentPageItem ) {
	"use strict";
	var labelsEditor = this;

	this.oldLabels = {};
	this.oldDescriptions = {};
	this.dataLabels = {};
	this.dataDescriptions = {};
	this.currentLanguage = null;

	var contentLang = mw.config.get( 'wgContentLanguage' );
	var userLang = mw.config.get( 'wgUserLanguage' );

	if ( currentPageItem && !WEF_Utils.isWikidata() ) {
		this.dataLabels[contentLang] = mw.config.get( 'wgPageName' );
	}

	var languages = [];
	if ( contentLang === userLang ) {
		languages.push( contentLang );
	} else {
		languages.push( userLang );
		languages.push( contentLang );
	}
	$.each( languages, function( i, language ) {
		$( document.createElement( 'option' ) ).attr( 'value', language ).text( language ).appendTo( labelsEditor.langSelect );
	} );

	this.currentLanguage = null;
	if ( WEF_Utils.isWikidata() ) {
		this.langSelect.val( userLang );
	} else {
		this.langSelect.val( contentLang );
	}
	this.switchLanguage();
};

WEF_LabelsEditor.prototype.load = function( entity ) {
	"use strict";
	var labelsEditor = this;

	// holder for all used laguages
	var languages = [];

	if ( typeof entity.labels !== 'undefined' ) {
		$.each( entity.labels, function( language, label ) {
			if ( languages.indexOf( language ) === -1 ) {
				languages.push( language );
			}
			labelsEditor.dataLabels[language] = label.value;
		} );
	}
	if ( typeof entity.descriptions !== 'undefined' ) {
		$.each( entity.descriptions, function( language, description ) {
			if ( languages.indexOf( language ) === -1 ) {
				languages.push( language );
			}
			labelsEditor.dataDescriptions[language] = description.value;
		} );
	}
	// if ( typeof entity.aliases !== 'undefined' ) {
	// $.each( entity.aliases, function( language, langAliases ) {
	// if ( languages.indexOf( language ) === -1 ) {
	// languages.push( language );
	// }
	// labelsEditor.dataAliases[language] = $.map( langAliases, function(
	// langAlias ) {
	// return langAlias.value;
	// } );
	// } );
	// }
	this.oldLabels = $.extend( {}, this.dataLabels );
	this.oldDescriptions = $.extend( {}, this.dataDescriptions );

	languages.sort();

	var contentLang = mw.config.get( 'wgContentLanguage' );
	var userLang = mw.config.get( 'wgUserLanguage' );
	languages = $.grep( languages, function( item ) {
		return item !== contentLang && item !== userLang;
	} );

	languages.splice( 0, 0, contentLang );
	if ( contentLang !== userLang ) {
		languages.splice( 0, 0, userLang );
	}

	$.each( languages, function( i, language ) {
		$( document.createElement( 'option' ) ).attr( 'value', language ).text( language ).appendTo( labelsEditor.langSelect );
	} );

	this.currentLanguage = null;
	if ( WEF_Utils.isWikidata() ) {
		this.langSelect.val( userLang );
	} else {
		this.langSelect.val( contentLang );
	}
	this.switchLanguage();
};

WEF_LabelsEditor.prototype.switchLanguage = function() {
	"use strict";
	var selectedLanguage = this.langSelect.val();

	if ( selectedLanguage == this.currentLanguage ) {
		return;
	}

	this._storeCurrentData();
	this.currentLanguage = selectedLanguage;

	if ( this.dataLabels[this.currentLanguage] !== 'undefined' ) {
		this.inputLabel.val( this.dataLabels[this.currentLanguage] );
	} else {
		this.inputLabel.val( '' );
	}
	if ( this.dataDescriptions[this.currentLanguage] !== 'undefined' ) {
		this.inputDescription.val( this.dataDescriptions[this.currentLanguage] );
	} else {
		this.inputDescription.val( '' );
	}
};

WEF_LabelsEditor.prototype._storeCurrentData = function() {
	"use strict";
	if ( this.currentLanguage !== null ) {
		this.dataLabels[this.currentLanguage] = ( "" + this.inputLabel.val() ).trim();
		this.dataDescriptions[this.currentLanguage] = ( "" + this.inputDescription.val() ).trim();
	}
};

/**
 * @param {WEF_Updates}
 *            updates
 */
WEF_LabelsEditor.prototype.collectUpdates = function( updates ) {
	"use strict";
	var labelsEditor = this;

	this._storeCurrentData();

	$.each( this.dataLabels, function( language, label ) {
		if ( !WEF_Utils.isEmpty( label ) ) {
			if ( labelsEditor.oldLabels[language] !== label ) {
				updates.setLabel( language, label );
			}
		}
	} );
	$.each( this.dataDescriptions, function( language, description ) {
		if ( !WEF_Utils.isEmpty( description ) ) {
			if ( labelsEditor.oldDescriptions[language] !== description ) {
				updates.setDescription( language, description );
			}
		}
	} );
};

/**
 * Creates editor from definition. Definition includes:
 * <ul>
 * <li><tt>code</tt> -- expression like <tt>P123</tt> to edit property
 * value or expression like
 * <tt>P234[Q456]/P567<tt> to edit qualifier value under specified property with specified value
 * <li><tt>datatype</tt> -- property datatype. Currently supported:
 * <ul>
 * <li><tt>string</tt>
 * <li><tt>url</tt>
 * <li><tt>wikibase-item</tt>
 * </ul>
 * <li><tt>flag</tt> -- Flag code to show before label
 * <li><tt>label</tt> -- Wikidata code to load label from
 * <li><tt>labelPrefix</tt> -- Text to add to label (no i18n)
 * <li><tt>labelQualifier</tt> -- An array of Wikidata items to additionally qualify property label
 * <li><tt>qualifiers</tt> -- An array of Wikidata property ID that will be added to qualifiers list by default
 * <li><tt>check</tt> -- function to check value correctness
 * <li><tt>normalize</tt> -- function to normalize value (including loaded one)
 * </ul>
 * The following events (using JQuery wrapper) are supported:
 * <ul>
 * <li><tt>change</tt>
 * </ul>
 * 
 * On exit there is an editor structure:
 * <ul>
 * <li><tt>tbody</tt> -- jQuery HTML TBODY element of editor
 * <li><tt>collectUpdates( updates )</tt> -- updates special structure:
 * <ul>
 * <li><tt>data</tt> -- JSON structure to be sent to <tt>wgeditclaims</tt> to update Wikidata claim
 * <li><tt>removedClaims</tt> -- list of claims ID to be removed
 * </ul>
 * <li><tt>hide( )</tt> -- method to hide editor  
 * <li><tt>show( )</tt> -- method to show editor  
 * <li><tt>hideLabel( placeholderText )</tt> -- hide label (optionally replace with placeholder)  
 * <li><tt>showLabel(  )</tt> -- show original label  
 * <li><tt>load( value )</tt> -- load stored value into editor. The whole claim shall be loaded   
 * <li><tt>getDataValue( )</tt> -- return current value JSON  
 * <li><tt>setDataValue( value )</tt> -- updates current value JSON  
 * </ul>
 * @param definition {WEP_Definition} property definition
 * @class
 */
var WEF_ClaimEditor = function( definition ) {

	this.definition = definition;
	var i18n = wef_Editors_i18n;
	var claimEditor = this;
	/** @type WEF_ClaimReferencesEditor */
	this.referencesEditor = null;

	this.isPropertyEditor = /^P\d+$/i.test( definition.code );
	this.isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

	/**
	 * Main property ID
	 * 
	 * @type {string}
	 */
	this.propertyId;

	/**
	 * Required property value
	 * 
	 * @type {string}
	 */
	this.propertyValue;

	/**
	 * Qualifier property to edit
	 * 
	 * @type {string}
	 */
	this.qualifierPropertyId;

	if ( this.isPropertyEditor ) {
		var test = definition.code.match( /^P(\d+)$/i );
		this.propertyId = 'P' + test[1];
		this.propertyValue = undefined;
		this.qualifierPropertyId = undefined;
	} else if ( this.isQualifierEditor ) {
		var test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
		this.propertyId = 'P' + test[1];
		this.propertyValue = 'Q' + test[2];
		this.qualifierPropertyId = 'P' + test[3];
	} else {
		throw new Error( 'Unsupported code: ' + definition.code );
	}

	this.tbody = $( document.createElement( 'tbody' ) ).addClass( 'wef_property_editor_tbody' ).addClass( 'wef_property_editor_' + this.propertyId );
	var row1 = this.row1 = $( document.createElement( 'tr' ) ).addClass( 'wef_property_editor_row' ).appendTo( this.tbody );
	var rankCell = $( document.createElement( 'td' ) ).addClass( 'wef_property_editor_rank wef_button_cell' ).appendTo( row1 );
	var flagCell = $( document.createElement( 'td' ) ).addClass( 'wef_property_editor_flag' ).appendTo( row1 );
	var labelCell = $( document.createElement( 'th' ) ).addClass( 'wef_property_editor_label' ).appendTo( row1 );
	var beforeInputCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( row1 );
	var inputCell = $( document.createElement( 'td' ) ).addClass( 'wef_property_editor_input' ).appendTo( row1 );
	var sourcesButtonCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( row1 );

	var columnTables = this._columnTables = {};
	if ( !WEF_Utils.isEmpty( definition.columns ) ) {
		$.each( definition.columns, function( i, columnDefinition ) {
			if ( !WEF_Utils.isEmpty( columnDefinition.code ) ) {
				var addColumnQualifierCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).addClass( 'wef_button_cell_addColumnQualifier' ).appendTo( row1 );
				$( document.createElement( 'button' ) ).attr( 'type', 'button' ).button( {
					icons: {
						primary: 'ui-icon-plus'
					},
					text: false,
					label: i18n.buttonAddQualifier,
				} ).click( function() {
					var qualifierEditor = claimEditor.addQualifier( columnDefinition.code );
					qualifierEditor.initWithEmpty( columnDefinition.code, columnDefinition.datatype, columnDefinition.editordatatype );
				} ).addClass( 'wef_property_button' ).appendTo( addColumnQualifierCell );

				var columnCell = $( document.createElement( 'td' ) ).addClass( 'wef_property_editor_column_cell' ).appendTo( row1 );
				wef_LabelsCache.getOrQueue( columnDefinition.code, function( label, description ) {
					columnCell.attr( 'title', description );
				} );

				var columnTable = $( document.createElement( 'table' ) ).addClass( 'wef_property_editor_column_table' ).appendTo( columnCell );
				columnTables[columnDefinition.code] = columnTable;
			}
		} );
	}

	if ( this.isPropertyEditor ) {
		wef_LabelsCache.getOrQueue( this.propertyId, function( label, description ) {
			if ( !WEF_Utils.isEmpty( description ) && description !== this.propertyId )
				row1.attr( 'title', description );
		} );
	}

	this.snakEditor = new WEF_SnakEditor( inputCell, definition );

	/* Rank */
	this.rankButton = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).addClass( 'wef_button_rank_normal' ).button( {
		icons: {
			primary: 'ui-icon-arrowthick-2-n-s'
		},
		text: false,
		label: i18n.rankNormalValue,
	} ).appendTo( rankCell );
	this.rankButton.click( function() {
		if ( wef_selectRank.visible && wef_selectRank.initiator === this ) {
			wef_selectRank.hide();
		} else {
			wef_selectRank.initiator = this;
			wef_selectRank.show( claimEditor.rankButton, claimEditor.rank, function( value ) {
				claimEditor.setRank( value );
			} );
		}
	} );

	/* Flag */
	if ( definition.flag !== 'undefined' && typeof ruWikiFlagsHtml !== 'undefined' && typeof ruWikiFlagsHtml[definition.flag] !== 'undefined' ) {
		flagCell.html( ruWikiFlagsHtml[definition.flag] );
	}

	/* Label */
	this._labelToDisplay = WEF_ClaimEditor._getLabel( definition );
	this._labelPlaceholder = $( document.createElement( 'label' ) );

	labelCell.empty();
	labelCell.append( this._labelToDisplay );
	labelCell.append( this._labelPlaceholder );

	/* Sources */
	this.sourcesButton = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).addClass( 'wef_button_sources' ).button( {
		text: true,
		label: '[0]',
	} ).appendTo( sourcesButtonCell );
	this.sourcesButton.click( function() {
		if ( claimEditor.referencesEditor == null ) {
			claimEditor.referencesEditor = new WEF_ClaimReferencesEditor( parent );
			claimEditor.referencesEditor.load( claimEditor.references );
		}
		claimEditor.referencesEditor.show();
	} );

	var row2 = $( document.createElement( 'tr' ) ).addClass( 'wef_property_editor_row' ).appendTo( this.tbody );
	$( document.createElement( 'td' ) ).addClass( 'wef_property_editor_cell_emtpy' ).appendTo( row2 );
	var bottomContentCell = $( document.createElement( 'td' ) ).addClass( 'wef_property_editor_bottom_content' ).attr( 'colspan', '100' ).appendTo( row2 );
	this._bottomContentTable = $( document.createElement( 'table' ) ).addClass( 'wef_qualifiers' ).appendTo( bottomContentCell );

	this.disabled = false;

	/** @type {WEF_Definition} */
	this.definition = definition;
	this.wikidataClaim = null;
	this.wikidataSnak = null;
	this.wikidataOldValue = null;
	this.rank = WEF_RANK_NORMAL;
	this.references = null;

	$( this.snakEditor ).change( function() {
		$( claimEditor ).change();
	} );

	/* Qualifiers support */

	/** @type {WEF_QualifierEditor[]} */
	this.qualifiers = [];
	/** @type {string[]} */
	this.removedQualifiersHashes = [];

	/* Add qualifier button */
	if ( typeof definition.qualifiers !== 'undefined' && definition.qualifiers.length > 0 ) {
		$( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).button( {
			icons: {
				primary: 'ui-icon-tag'
			},
			text: false,
			label: i18n.buttonAddQualifier,
		} ).click( function() {
			claimEditor.addQualifier();
		} ).appendTo( beforeInputCell );
	}
};

WEF_ClaimEditor._getLabel = function( definition ) {
	var label = $( document.createElement( 'label' ) );

	var updateLabel = function() {
		var newLabel = '';

		if ( typeof definition.labelPrefix !== 'undefined' ) {
			newLabel += definition.labelPrefix;
		}

		if ( typeof definition.label !== 'undefined' ) {
			newLabel += wef_LabelsCache.getLabel( definition.label );
		}

		if ( typeof definition.labelQualifier !== 'undefined' ) {
			if ( $.isArray( definition.labelQualifier ) ) {
				newLabel += ' (';
				$.each( definition.labelQualifier, function( index, qualifier ) {
					if ( index !== 0 ) {
						newLabel += ', ';
					}
					newLabel += wef_LabelsCache.getLabel( qualifier );
				} );
				newLabel += ')';
			} else {
				newLabel += ' (' + wef_LabelsCache.getLabel( definition.labelQualifier ) + ')';
			}
		}

		label.text( newLabel );
		label.attr( 'title', wef_LabelsCache.getDescription( definition.label ) );
	};

	if ( typeof definition.label !== 'undefined' ) {
		wef_LabelsCache.getOrQueue( definition.label, updateLabel );
	}
	if ( typeof definition.labelQualifier !== 'undefined' ) {
		if ( $.isArray( definition.labelQualifier ) ) {
			$.each( definition.labelQualifier, function( index, qualifier ) {
				wef_LabelsCache.getOrQueue( qualifier, updateLabel );
			} );
		} else {
			wef_LabelsCache.getOrQueue( definition.labelQualifier, updateLabel );
		}
	}

	updateLabel();
	return label;
};

WEF_ClaimEditor.prototype.hideLabel = function( placeholderText ) {
	if ( typeof placeholderText === 'string' ) {
		this._labelPlaceholder.text( placeholderText );
	}
	this._labelToDisplay.hide();
	this._labelPlaceholder.show();
};
WEF_ClaimEditor.prototype.showLabel = function() {
	this._labelToDisplay.show();
	this._labelPlaceholder.hide();
};

WEF_ClaimEditor.prototype.hasData = function() {
	return this.snakEditor.hasData();
};

WEF_ClaimEditor.prototype.hasValue = function() {
	return this.snakEditor.hasValue();
};

WEF_ClaimEditor.prototype.remove = function() {
	this.tbody.remove();
};

WEF_ClaimEditor.prototype.getDataValue = function() {
	return this.snakEditor.getDataValue();
};

WEF_ClaimEditor.prototype.getSnakValue = function() {
	if ( !this.hasData() ) {
		throw new Error( 'no data' );
	}

	var snak = {};
	snak.snaktype = this.snakEditor.snakTypeMode;

	if ( this.isPropertyEditor ) {
		snak.property = this.propertyId;
	}
	if ( this.isQualifierEditor ) {
		snak.property = this.qualifierPropertyId;
		if ( this.wikidataSnak !== null ) {
			snak.hash = this.wikidataSnak.hash;
		}
	}

	snak.datatype = this.definition.datatype;
	if ( this.snakEditor.snakTypeMode === 'value' ) {
		snak.datavalue = this.getDataValue();
	}

	return snak;
};

WEF_ClaimEditor.prototype.initEmpty = function() {
	// we have definition only
	this.rank = WEF_RANK_NORMAL;
	this.snakEditor.initEmptyWithDataType( this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId, this.definition.datatype );
	this.references = [];

	this.wikidataClaim = null;
	this.wikidataOldValue = null;
	this.wikidataOldReferences = null;
};

WEF_ClaimEditor.prototype.initWithValue = function( claim ) {

	this.wikidataClaim = claim;
	if ( typeof claim.rank === 'undefined' ) {
		this.setRank( WEF_RANK_NORMAL );
	} else {
		this.setRank( claim.rank );
	}
	this.references = typeof claim.references !== 'undefined' && claim.references !== null ? claim.references : [];
	this.sourcesButton.button( "option", "label", "[" + this.references.length + "]" );

	if ( this.isPropertyEditor ) {
		// load property main snak
		this.wikidataSnak = claim.mainsnak;
		if ( claim.mainsnak ) {
			this.snakEditor.initWithValue( claim.mainsnak );
		} else {
			// WTF?
			this.snakEditor.initEmptyWithDataType( this.propertyId, definition.datatype );
		}
	} else if ( this.isQualifierEditor ) {
		/*
		 * since it's loading time, we assume there is qualifier with specified
		 * value
		 */
		var qualifiers = claim.qualifiers[this.qualifierPropertyId];
		if ( !$.isArray( qualifiers ) ) {
			throw new Error( 'Qualifiers «' + this.qualifierPropertyId + '» of ' + this.propertyId + '[' + this.propertyValue + '] not found or not an array' );
		}
		if ( qualifiers.length != 1 ) {
			throw new Error( 'Length of qualifiers «' + this.qualifierPropertyId + '» of ' + this.propertyId + '[' + this.propertyValue + '] is not 1 as expected' );
		}

		var qualifier = qualifiers[0];
		this.wikidataSnak = qualifier;
		this.snakEditor.initWithValue( qualifier );
	} else {
		throw new Error( 'Unsupported code: ' + definition.code );
	}

	/*
	 * Remember the values to compare them later with future ones to check if
	 * update in Wikidata required
	 */
	this.wikidataOldRank = this.rank;
	this.wikidataOldValue = this.hasData() ? JSON.stringify( this.getSnakValue() ) : null;
	this.wikidataOldReferences = JSON.stringify( this.references );

	var claimEditor = this;
	if ( typeof claim.qualifiers !== 'undefined' ) {
		$.each( claim.qualifiers, function( property, qualifiers ) {
			if ( claimEditor.isQualifierEditor && property === claimEditor.qualifierPropertyId ) {
				return;
			}
			$.each( qualifiers, function( index, qualifier ) {
				var qualifierEditor = claimEditor.addQualifier( qualifier.property );
				qualifierEditor.initWithValue( qualifier );
			} );
		} );
	}
};

WEF_ClaimEditor.prototype.initWithStringValue = function( strValue ) {
	this.rank = WEF_RANK_NORMAL;
	this.references = [];
	this.sourcesButton.button( "option", "label", "[0]" );

	this.wikidataClaim = null;
	this.wikidataOldValue = null;
	this.wikidataOldReferences = null;

	this.snakEditor.initWithValue( {
		snaktype: 'value',
		property: this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId,
		datatype: 'string',
		datavalue: {
			value: strValue,
			type: 'string'
		}
	} );
};

WEF_ClaimEditor.prototype.setDataValue = function( newDataValue ) {
	this.snakEditor.setDataValue( newDataValue );
};

WEF_ClaimEditor.prototype.setRank = function( newRank ) {
	this.rank = newRank;
	switch ( newRank ) {
	case WEF_RANK_PREFERRED:
		this.rankButton.button( 'option', 'label', wef_Editors_i18n.rankPreferredValue );
		this.rankButton.button( 'option', 'icons', {
			primary: 'ui-icon-arrowthickstop-1-n'
		} );
		break;
	case WEF_RANK_NORMAL:
		this.rankButton.button( 'option', 'label', wef_Editors_i18n.rankNormalValue );
		this.rankButton.button( 'option', 'icons', {
			primary: 'ui-icon-arrowthick-2-n-s'
		} );
		break;
	case WEF_RANK_DEPRECATED:
		this.rankButton.button( 'option', 'label', wef_Editors_i18n.rankDeprecatedValue );
		this.rankButton.button( 'option', 'icons', {
			primary: 'ui-icon-arrowthickstop-1-s'
		} );
		break;
	}
};

WEF_ClaimEditor.prototype.setStringValue = function( strValue ) {
	this.snakEditor.setSnakValue( {
		snaktype: 'value',
		property: this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId,
		datatype: 'string',
		datavalue: {
			value: strValue,
			type: 'string'
		}
	} );
};

/**
 * @param updates
 *            {WEF_Updates}
 */
WEF_ClaimEditor.prototype.collectUpdates = function( updates ) {
	if ( this.disabled === true ) {
		return;
	}

	// check if we have any changes
	var hasData = this.snakEditor.hasData();
	var newSnak = hasData ? this.getSnakValue() : null;

	var oldClaim = this.wikidataClaim;
	var oldSnak = this.wikidataSnak;
	var oldSnakStr = this.wikidataOldValue;
	var oldRank = this.wikidataOldRank;
	var oldReferencesStr = this.wikidataOldReferences;

	if ( hasData === false ) {
		if ( oldClaim !== null ) {
			updates.removedClaims.push( oldClaim.id );
		}
	} else {
		var claim = {};
		if ( oldClaim !== null ) {
			$.extend( claim, oldClaim );
			// qualifiers we will refill by ourselfs
			delete claim.qualifiers;
			delete claim['qualifiers-order'];
			delete claim.rank;
			delete claim.references;
		} else {
			claim.type = 'statement';
		}
		claim.rank = this.rank;
		if ( this.referencesEditor !== null ) {
			this.references = this.referencesEditor.collect();
		}
		claim.references = this.references;

		if ( this.isPropertyEditor === true ) {
			claim.mainsnak = newSnak;
		} else if ( this.isQualifierEditor === true ) {
			if ( oldClaim === null ) {
				claim.mainsnak = WEF_Utils.newWikibaseItemSnak( this.propertyId, 'item', Number( this.propertyValue.substr( 1 ) ) );
			}
			var qualifier = newSnak;
			if ( oldSnak !== null ) {
				qualifier.hash = oldSnak.hash;
			}
			WEF_Utils.appendToNamedMap( claim, 'qualifiers', this.qualifierPropertyId, qualifier );
		} else {
			throw new Error( 'Unsupported code: ' + definition.code );
		}

		var needToUpdateClaim = this.rank !== oldRank || JSON.stringify( newSnak ) !== oldSnakStr || JSON.stringify( this.references ) !== oldReferencesStr;

		// save qualifiers
		$.each( this.qualifiers, function( index, qualifierEditor ) {
			needToUpdateClaim = qualifierEditor.collectUpdates( claim ) || needToUpdateClaim;
		} );

		needToUpdateClaim = needToUpdateClaim || ( this.removedQualifiersHashes.length > 0 );

		if ( needToUpdateClaim === true ) {
			WEF_Utils.appendToNamedMap( updates.data, 'claims', this.propertyId, claim );
		}
	}
};

WEF_ClaimEditor.prototype.addQualifier = function( qualifierId ) {
	var claimEditor = this;

	if ( WEF_Utils.isEmpty( qualifierId ) || typeof this._columnTables[qualifierId] === 'undefined' ) {
		var qualifierEditor = new WEF_SelectableQualifierEditor( this._bottomContentTable, this.definition.qualifiers, function( removedQualifierEditor ) {
			var hash = removedQualifierEditor.getHash();
			if ( hash !== null ) {
				claimEditor.removedQualifiersHashes.push( hash );
			}
		} );
		this.qualifiers.push( qualifierEditor );
		return qualifierEditor;
	}

	var targetCell = this._columnTables[qualifierId];
	var qualifierEditor = new WEF_QualifierEditor( targetCell, qualifierId, function( removedQualifierEditor ) {
		var hash = removedQualifierEditor.getHash();
		if ( hash !== null ) {
			claimEditor.removedQualifiersHashes.push( hash );
		}
	} );
	this.qualifiers.push( qualifierEditor );
	return qualifierEditor;
};

/**
 * Organize multiple claim edit rows into single structure
 * 
 * @param {WEF_Definition}
 *            definition
 * @class
 */
WEF_ClaimEditorsTable = function( definition ) {
	this.definition = definition;

	var propertyEditorsTable = this;
	var i18n = wef_Editors_i18n;

	/** @type {WEF_ClaimEditor[]} */
	var claimEditors = [];
	/** @type {string[]} */
	var removedClaims = [];
	var placed = false;
	var temporaryHolder = null;

	var changeF = function() {
		$( propertyEditorsTable ).change();
	};

	/** @returns {WEF_ClaimEditor} */
	this.add = function() {
		if ( placed === false ) {
			throw new Error( 'Claims edit table is not placed on the form yet' );
		}

		var claimEditor = new WEF_ClaimEditor( definition );

		var buttonAddClaim = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).button( {
			icons: {
				primary: 'ui-icon-plus'
			},
			text: false,
			label: i18n.buttonAddClaim,
		} ).click( function() {
			var editor = propertyEditorsTable.add();
			editor.initEmpty();
		} );

		var buttonRemoveClaim = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( 'wef_property_button' ).button( {
			icons: {
				primary: 'ui-icon-trash'
			},
			text: false,
			label: i18n.buttonRemoveClaim,
		} ).click( function() {

			var question = i18n.confirmDeleteClaim //
			.replace( '{code}', definition.label ) //
			.replace( '{label}', wef_LabelsCache.getLabel( definition.label ) );

			var r = !claimEditor.hasData() || confirm( question );
			if ( r === true ) {
				/*
				 * add before removing to insert immediately after last existing
				 */
				if ( claimEditors.length === 1 ) {
					var editor = propertyEditorsTable.add();
					editor.initEmpty();
				}

				claimEditors = jQuery.grep( claimEditors, function( value ) {
					return value != claimEditor;
				} );

				if ( claimEditor.wikidataClaim != null && !WEF_Utils.isEmpty( claimEditor.wikidataClaim.id ) ) {
					removedClaims.push( claimEditor.wikidataClaim.id );
				}
				claimEditor.remove();
			}
		} );

		/** @type {function} */
		var normalizeF = definition.normalize;
		/** @type {function} */
		var urlF = definition.url;

		// append before URL and after input cell
		var buttonsCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
		{
			try {
				if ( definition.datatype === 'url' ) {
					var newButton = $( document.createElement( 'button' ) ).addClass( 'wef_property_button' ).attr( 'type', 'button' );
					newButton.button( {
						icons: {
							primary: 'ui-icon-extlink'
						},
						disabled: true,
						text: false,
						label: i18n.buttonUrlNavigate,
					} ).click( function() {
						if ( claimEditor.hasValue() ) {
							window.open( claimEditor.getDataValue().value, '_blank' );
						}
					} );
					$( claimEditor ).change( function() {
						if ( claimEditor.hasValue() ) {
							newButton.button( 'option', 'disabled', false );
							newButton.button( 'enable' );
						} else {
							newButton.button( 'option', 'disabled', true );
							newButton.button( 'disable' );
						}
					} );
					buttonsCell.append( newButton );
				}
			} catch ( err ) {
				mw.log.warn( 'Unable to attach URL button: ' + err );
			}
			if ( typeof definition.buttons !== 'undefined' ) {
				$.each( definition.buttons, function( index, buttonDefinition ) {
					var newButton = $( document.createElement( 'button' ) ).addClass( 'wef_property_button' ).attr( 'type', 'button' );
					newButton.button( buttonDefinition );
					if ( $.isFunction( buttonDefinition.click ) ) {
						newButton.click( function() {
							buttonDefinition.click( claimEditor );
						} );
					}
					if ( $.isFunction( buttonDefinition.init ) ) {
						buttonDefinition.init( claimEditor );
					}
					buttonsCell.append( newButton );
				} );
			}
		}

		if ( $.isFunction( urlF ) ) {
			claimEditor.row1.find( 'td.wef_property_editor_input' ).addClass( 'wef_external_links_before_url_cell' );
			var urlCell = $( document.createElement( 'td' ) ).addClass( 'wef_external_links_url_cell' ).appendTo( claimEditor.row1 );
			var div = $( '<div>&nbsp;</div>' ).addClass( 'wef_external_links_url_div' ).appendTo( urlCell );
			var a = $( document.createElement( 'a' ) ).addClass( 'wef_external_links_url_a' ).appendTo( div ).attr( 'target', '_blank' );

			var updateLinkImplF = function( newValue ) {
				if ( $.isFunction( normalizeF ) ) {
					var newValueNormalized = normalizeF( newValue );
					if ( newValue !== newValueNormalized ) {
						claimEditor.setStringValue( newValueNormalized );
						return;
					}
				}
				if ( newValue ) {
					var newUrl = urlF( newValue );
					a.attr( 'href', newUrl );
					a.text( newUrl );
					// if ( typeof definition.check !== 'undefined' ) {
					// var result = definition.check.exec( newValue );
					// if ( result == null ) {
					// var tip = i18n.getTip( definition );
					// var shortLabel = getLabelTextShort( definition );
					// tip = tip.replace( '{0}', shortLabel );

					// statusAndTips.text( tip );
					// statusAndTips.addClass( 'ui-state-error' );
					// } else {
					// statusAndTips.text( '' );
					// statusAndTips.removeClass( 'ui-state-error' );
					// }
					// }
				} else {
					a.attr( 'href', '' );
					a.text( '' );
					// statusAndTips.text( '' );
					// statusAndTips.removeClass( 'ui-state-error' );
				}
			};
			var updateLinkF = function() {
				if ( claimEditor.hasValue() ) {
					updateLinkImplF( claimEditor.getDataValue().value );
				} else {
					updateLinkImplF( '' );
				}
			};
			$( claimEditor ).change( updateLinkF );

			// additional placeholders to align buttons after URL fields
			$( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
			$( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
		} else {
			claimEditor.row1.find( 'td.wef_property_editor_input' ).attr( 'colspan', 4 );
		}

		var beforeCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).prependTo( claimEditor.row1 );
		beforeCell.append( buttonAddClaim );

		var afterCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
		afterCell.append( buttonRemoveClaim );

		claimEditors.push( claimEditor );

		if ( temporaryHolder !== null ) {
			claimEditor.tbody.replaceAll( temporaryHolder );
			temporaryHolder = null;
		} else {
			var prev = claimEditors[claimEditors.length - 2].tbody;
			var curr = claimEditors[claimEditors.length - 1].tbody;
			curr.insertAfter( prev );
		}

		$( claimEditor ).change( function() {
			changeF();
		} );

		return claimEditor;
	};

	/**
	 * Init editor with values. Must be called after placement on the form.
	 * 
	 * @param entity
	 *            {WEF_Entity}
	 */
	this.init = function( entity ) {
		if ( placed === false ) {
			throw new Error( 'Claims edit table is not placed on the form yet' );
		}

		/** @type {WEF_Claim[]} */
		var claims = WEF_filterClaims( definition, entity.claims );

		$.each( claims, function( i, claim ) {
			/** @type {WEF_ClaimEditor} */
			var editor = propertyEditorsTable.add();
			editor.initWithValue( claim );
		} );

		if ( this.size() === 0 ) {
			/** @type {WEF_ClaimEditor} */
			var editor = this.add();
			editor.initEmpty();
		}
	};

	/**
	 * Init editor with values. Must be called after placement on the form.
	 * 
	 * @param entity
	 *            {WEF_Entity}
	 */
	this.initAsEmpty = function() {
		if ( placed === false ) {
			throw new Error( 'Claims edit table is not placed on the form yet' );
		}

		/** @type {WEF_ClaimEditor} */
		var editor = this.add();
		editor.initEmpty();
	};

	function createPlaceholder( target ) {
		if ( WEF_Utils.isEmpty( definition.columns ) ) {
			temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + definition.code + ' -->' );
			return temporaryHolder;
		}

		var container = $( document.createElement( 'tbody' ) );
		var columnsTable = $( document.createElement( 'table' ) ).addClass( 'wef_columns_table' ).appendTo( container );
		var columnsHeader = $( document.createElement( 'tr' ) ).addClass( 'wef_columns_header' ).appendTo( columnsTable );

		// empty cell for adding claim button
		columnsHeader.append( $( document.createElement( 'th' ) ).addClass( 'wef_column_th_empty' ) );

		var propertyName = $( document.createElement( 'th' ) ).addClass( 'wef_column_th' ).attr( 'colspan', '8' ).appendTo( columnsHeader );
		if ( typeof definition.label !== 'undefined' ) {
			wef_LabelsCache.getOrQueue( definition.label, function( label, description ) {
				propertyName.text( label );
				propertyName.attr( 'title', description );
			} );
		}
		$.each( definition.columns, function( i, columnDefinition ) {
			if ( !WEF_Utils.isEmpty( columnDefinition.code ) ) {
				var columnName = $( document.createElement( 'th' ) ).addClass( 'wef_column_th' ).attr( 'colspan', '2' ).appendTo( columnsHeader );
				if ( typeof columnDefinition.label !== 'undefined' ) {
					wef_LabelsCache.getOrQueue( columnDefinition.label, function( label, description ) {
						columnName.text( label );
						columnName.attr( 'title', description );
					} );
				}
			}
		} );

		temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + definition.code + ' -->' );
		temporaryHolder.appendTo( columnsTable );
		return container;
	}

	this.appendTo = function( target ) {
		if ( placed === true ) {
			throw new Error( 'Claims edit table is already placed on the form' );
		}
		placed = true;

		createPlaceholder().appendTo( target );
		return;
	};

	/** Replace each target element with the set of matched elements. */
	this.replaceAll = function( target ) {
		if ( placed === true ) {
			throw new Error( 'Claims edit table is already placed on the form' );
		}
		placed = true;

		createPlaceholder().replaceAll( target );
		return;
	};

	/**
	 * @param {WEF_Updates}
	 *            updates
	 */
	this.collectUpdates = function( updates ) {
		$.each( claimEditors, function( i, claimEditor ) {
			claimEditor.collectUpdates( updates );
		} );
		for ( var index = 0; index < removedClaims.length; index++ ) {
			updates.removedClaims.push( removedClaims[index] );
		}
	};

	/**
	 * Looking for equals value and mark it as foung (light-green) or create new
	 * item and mark it as new
	 */
	this.onFoundValue = function( strValue ) {
		function hasStringValue( claimEditor, lookupValue ) {
			if ( !claimEditor.hasValue() ) {
				return false;
			}
			var dataValue = claimEditor.getDataValue();
			return typeof dataValue === 'object' && dataValue.type === 'string' && typeof dataValue.value === 'string' && dataValue.value === lookupValue;
		}

		var found = false;
		$.each( claimEditors, function( i, claimEditor ) {
			if ( hasStringValue( claimEditor, strValue ) ) {
				claimEditor.tbody.addClass( 'wef-lookup-found' );
				found = true;
			}
		} );

		if ( found === false ) {
			var withEmpty = $.grep( claimEditors, function( claimEditor ) {
				return !claimEditor.hasValue();
			} );

			if ( withEmpty.length === 0 ) {
				var newClaimEditor = this.add();
				newClaimEditor.initWithStringValue( strValue );
				newClaimEditor.tbody.addClass( 'wef-lookup-found-new' );
			} else {
				var newClaimEditor = withEmpty[0];
				newClaimEditor.setStringValue( strValue );
				newClaimEditor.tbody.addClass( 'wef-lookup-found-new' );
			}
		}
	};

	/**
	 * @returns {number} the number of values, including no-value and some-value
	 *          snaks
	 */
	this.getHasDataSize = function() {
		var counter = 0;
		$.each( claimEditors, function( index, claimEditor ) {
			if ( claimEditor.hasData() ) {
				counter++;
			}
		} );
		return counter;
	};

	this.size = function() {
		return claimEditors.length;
	};

};
window.WEF_ClaimEditorsTable = WEF_ClaimEditorsTable;

WEF_ClaimEditorsTable.removeFoundValueClasses = function() {
	$( '.wef-lookup-found' ).removeClass( 'wef-lookup-found' );
	$( '.wef-lookup-found-new' ).removeClass( 'wef-lookup-found-new' );
};

WEF_ProgressItem = function( parentUl, text ) {
	this._span1 = $( document.createElement( 'span' ) );
	this._span2 = $( document.createElement( 'span' ) ).text( text );

	this._li = $( document.createElement( 'li' ) ).addClass( 'wef_progress_item' ).append( this._span1 ).append( '&nbsp;' ).append( this._span2 ).appendTo( parentUl );
};

WEF_ProgressItem.prototype.inProgress = function() {
	this._span1.html( wef_Editors_i18n.htmlInProgress );
};

WEF_ProgressItem.prototype.success = function() {
	this._span1.html( wef_Editors_i18n.htmlSuccess );
};

WEF_ProgressItem.prototype.failure = function( failureReason ) {
	this._span1.html( wef_Editors_i18n.htmlFailure );
	if ( failureReason ) {
		this._span2.append( ': ' + failureReason );
	}
};

WEF_ProgressItem.prototype.notNeeded = function() {
	this._span1.html( wef_Editors_i18n.htmlNotNeeded );
};

/**
 * @param {string}
 *            entityId
 * @class
 */
var WEF_Updates = function( entityId ) {
	/** {string} */
	this.entityId = entityId;
	this.data = {};
	this.removedClaims = [];
};
WEF_Updates.prototype.setLabel = function( language, value ) {
	"use strict";

	if ( typeof this.data.labels === 'undefined' ) {
		this.data.labels = {};
	}
	this.data.labels[language] = {
		language: language,
		value: value
	};
};
WEF_Updates.prototype.setDescription = function( language, value ) {
	"use strict";

	if ( typeof this.data.descriptions === 'undefined' ) {
		this.data.descriptions = {};
	}
	this.data.descriptions[language] = {
		language: language,
		value: value
	};
};
WEF_Updates.prototype.setSitelink = function( site, title ) {
	"use strict";

	if ( typeof this.data.sitelinks === 'undefined' ) {
		this.data.sitelinks = {};
	}
	this.data.sitelinks[site] = {
		site: site,
		title: title
	};
};

window.WEF_Updates = WEF_Updates;

/**
 * @param {boolean}
 *            currentPageItem
 * @param {String}
 *            entityId
 * @param {WEF_LabelsEditor}
 *            labelsEditor
 * @param {WEF_ClaimEditorsTable[]}
 *            claimEditorTables
 */
window.wef_analyze_and_save = function( currentPageItem, entityId, labelsEditor, claimEditorTables ) {
	var i18n = wef_Editors_i18n;
	var d = $.Deferred();

	var dialog = $( document.createElement( 'div' ) );
	dialog.attr( 'title', i18n.dialogAnalyzeChangesTitle );
	var analyzeProgressUl = $( document.createElement( 'ul' ) ).appendTo( dialog );
	var analyzeProgress = new WEF_ProgressItem( analyzeProgressUl, i18n.actionAnalyzeChanges );
	analyzeProgress.inProgress();
	dialog.dialog( {
		height: 'auto',
		width: 'auto'
	} );

	var updates = new WEF_Updates( entityId );
	try {
		if ( currentPageItem && WEF_Utils.isEmpty( entityId ) && !WEF_Utils.isWikidata() ) {
			// set label in current content language
			updates.setLabel( mw.config.get( 'wgContentLanguage' ), mw.config.get( 'wgPageName' ) );

			// TODO: check documentation about using wgDBname
			// attach current site
			updates.setSitelink( mw.config.get( 'wgDBname' ), mw.config.get( 'wgPageName' ) );
		}

		if ( labelsEditor != null ) {
			labelsEditor.collectUpdates( updates );
		}
		$.each( claimEditorTables, function( i, claimEditorTable ) {
			claimEditorTable.collectUpdates( updates );
		} );

		if ( $.isEmptyObject( updates.data ) && updates.removedClaims.length === 0 ) {
			var purgeProgress = new WEF_ProgressItem( analyzeProgressUl, i18n.actionNoChangesPurge );
			analyzeProgress.success();
			purgeProgress.inProgress();
			d.resolve( updates.entityId );
			dialog.dialog( 'close' );
			return d;
		}

		analyzeProgress.success();
	} catch ( error ) {
		mw.log.warn( i18n.errorAnalyzeChanges + ': ' + error );
		analyzeProgress.failure( '' + error );
		alert( i18n.errorAnalyzeChanges + ': ' + error );
		d.reject( error );
		return d;
	}
	dialog.dialog( 'close' );

	var d2 = WEF_Utils.update( updates );
	d2.done( function() {
		d.resolve( updates.entityId );
	} );
	d2.fail( function( arg ) {
		d.reject( arg );
	} );

	return d;
};

WEF_EditorForm = function( originalTitle, html, i18n, currentPageItem, editDeferred ) {

	this.currentPageItem = currentPageItem;
	this.editDeferred = editDeferred;
	var editorForm = this;

	/** @type {WEF_LabelsEditor} */
	var labelsEditor = null;

	/** @type {WEF_ClaimEditorsTable[]} */
	var claimEditorsTables = [];

	var dialog = $( html );

	/**
	 * @type {string}
	 * @const
	 */
	var DATAKEY_ANCHOR_EDITOR_TABLES = 'wef-achor-editors';
	var DATAKEY_ANCHOR_ORIGINAL_TEXT = 'wef-original-text';
	var enableAnchorCounterUpdate = false;

	dialog.find( '.wef_i18n_text' ).each( function( i, htmlItem ) {
		try {
			var item = $( htmlItem );
			var code = item.text();
			var translated = i18n[code];
			if ( typeof translated !== 'undefined' ) {
				item.text( translated );
				item.removeClass( 'wef_i18n_text' );
			}
		} catch ( err ) {
			mw.log.warn( 'Unable to translate element text: ' + err );
		}
	} );
	dialog.find( '.wef_i18n_label' ).each( function( i, htmlItem ) {
		try {
			var item = $( htmlItem );
			var code = item.text();
			wef_LabelsCache.getOrQueue( code, function( label, description ) {
				if ( !WEF_Utils.isEmpty( label ) ) {
					item.text( label );
				}
				if ( !WEF_Utils.isEmpty( description ) ) {
					item.attr( 'title', description );
				}
				item.removeClass( 'wef_i18n_label' );

				if ( item.hasClass( 'wef_editor_tab_anchor' ) ) {
					item.data( DATAKEY_ANCHOR_ORIGINAL_TEXT, label );
					updateAnchorCounter( item );
				}
			} );
		} catch ( err ) {
			mw.log.warn( 'Unable to translate element text: ' + err );
		}
	} );

	function updateLinkedAnchorCounter() {
		if ( enableAnchorCounterUpdate === false )
			return;

		try {
			/** @type {WEF_ClaimEditorsTable} */
			var currentClaimEditorTable = this;
			if ( typeof currentClaimEditorTable.wefTabAnchor === 'undefined' ) {
				return;
			}
			var anchor = currentClaimEditorTable.wefTabAnchor;
			updateAnchorCounter( anchor );
		} catch ( err ) {
			mw.log.warn( 'Unable to update editors count on tab: ' + err );
		}
	}

	function updateAnchorCounter( anchor ) {
		if ( enableAnchorCounterUpdate === false )
			return;

		try {
			var claimEditorTables = anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES );
			if ( typeof claimEditorTables === 'undefined' ) {
				return;
			}
			var counter = 0;
			$.each( claimEditorTables, function( index, claimEditorTable ) {
				counter += claimEditorTable.getHasDataSize();
			} );

			var newText = anchor.data( DATAKEY_ANCHOR_ORIGINAL_TEXT ) + ' (' + counter + ')';
			anchor.text( newText );
		} catch ( err ) {
			mw.log.warn( 'Unable to update editors count on tab: ' + err );
		}
	}

	dialog.find( '.wef_editor_tab_anchor' ).each( function( i, anchor ) {
		var jAnchor = $( anchor );
		jAnchor.data( DATAKEY_ANCHOR_ORIGINAL_TEXT, jAnchor.text() );
	} );

	dialog.find( '.wef_labels_editor' ).each( function( i, htmlItem ) {
		var item = $( htmlItem );

		labelsEditor = new WEF_LabelsEditor();
		labelsEditor.replaceAll( item );
	} );

	dialog.find( '.wef_claim_editors' ).each( function( i, htmlItem ) {
		var item = $( htmlItem );

		var check = WEF_Utils.isEmpty( item.data( 'check' ) ) ? undefined : new RegExp( item.data( 'check' ) );
		var code = item.data( 'code' );
		var datatype = item.data( 'datatype' );
		var flag = item.data( 'flag' );
		var label = item.data( 'label' );
		var template = WEF_Utils.isEmpty( item.data( 'template' ) ) ? undefined : item.data( 'template' );

		if ( typeof label === 'undefined' ) {
			label = code;
		}

		var definition = new WEF_Definition( {
			check: check,
			code: code,
			datatype: datatype,
			flag: flag,
			label: label,
			columns: [],
			qualifiers: [],
			template: template,
		} );

		item.find( 'tr' ).each( function( k, qItem ) {
			var qualifier = $( qItem );
			var qDefinition = new WEF_Definition( {
				code: qualifier.data( 'code' ),
				editordatatype: qualifier.data( 'editordatatype' ),
				datatype: qualifier.data( 'datatype' ),
				label: qualifier.data( 'label' ),
			} );
			if ( WEF_Utils.isEmpty( qDefinition.label ) ) {
				qDefinition.label = qualifier.data( 'code' );
			}
			if ( qualifier.data( 'as-column' ) === true ) {
				definition.columns.push( qDefinition );
			} else {
				definition.qualifiers.push( qDefinition );
			}
		} );

		WEF_Utils.processDefinition( definition );

		var claimEditorTable = new WEF_ClaimEditorsTable( definition );
		claimEditorsTables.push( claimEditorTable );

		try {
			// find corresponding anchor to future tab label update
			var tab = item.parents( '.wef_editor_tab' );
			var anchor = dialog.find( 'a.wef_editor_tab_anchor[href="#' + tab.attr( 'id' ) + '"]' );
			if ( anchor.length > 0 ) {
				claimEditorTable.wefTabAnchor = anchor;
				if ( anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES ) == null ) {
					anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES, [] );
				}
				anchor.data( DATAKEY_ANCHOR_EDITOR_TABLES ).push( claimEditorTable );
			}
			$( claimEditorTable ).change( updateLinkedAnchorCounter );
		} catch ( err ) {
			mw.log.warn( 'Unable to attach updateAnchorCounter() listener to claimEditorTable: ' + err );
		}

		claimEditorTable.replaceAll( item );
	} );

	dialog.find( '.wef_tabs' ).tabs();
	dialog.dialog( {
		autoOpen: false,
		width: 1000,
		title: originalTitle,
		buttons: [ {
			text: i18n.dialogButtonUpdateLabelsText,
			label: i18n.dialogButtonUpdateLabelsLabel,
			click: function() {
				wef_LabelsCache.clearCacheAndRequeue();
				wef_LabelsCache.receiveLabels();
			},
			style: 'position: absolute; left: 1em;',
		}, {
			text: i18n.dialogButtonSaveText,
			label: i18n.dialogButtonSaveLabel,
			click: function() {
				dialog.dialog( 'close' );
				var saveD = wef_analyze_and_save( editorForm.currentPageItem, editorForm.entityId, labelsEditor, claimEditorsTables );
				saveD.done( function( entityId ) {
					editDeferred.resolve( entityId );
				} );
				saveD.fail( function() {
					editDeferred.reject();
				} );
			},
		}, {
			text: i18n.dialogButtonCancelText,
			label: i18n.dialogButtonCancelLabel,
			click: function() {
				$( this ).dialog( 'close' );
				editDeferred.reject();
			}
		} ],
	} );

	this.load = function( entity ) {
		this.entityId = entity.id.toUpperCase();

		wef_LabelsCache.getOrQueue( this.entityId, function( label ) {
			dialog.dialog( 'option', 'title', '«' + label + '» — ' + originalTitle );
		} );

		if ( labelsEditor != null ) {
			labelsEditor.load( entity );
		}
		$.each( claimEditorsTables, function( i, claimEditorsTable ) {
			claimEditorsTable.init( entity );
		} );
		enableAnchorCounterUpdate = true;
		dialog.find( 'a.wef_editor_tab_anchor' ).each( function( i, anchor ) {
			updateAnchorCounter( $( anchor ) );
		} );
	};

	this.initAsEmpty =
	/**
	 * @param {Boolean}
	 *            currentPageItem
	 * @param {?String}
	 *            initTypeId
	 */
	function( currentPageItem, initTypeId ) {
		if ( !WEF_Utils.isEmpty( initTypeId ) )
			WEF_Utils.assertCorrectEntityId( initTypeId );

		this.entityId = null;

		var newTitle = i18n.dialogTitleNewElement + ' — ' + originalTitle;
		dialog.attr( 'title', newTitle );
		dialog.dialog( 'option', 'title', newTitle );

		if ( labelsEditor != null ) {
			labelsEditor.initAsEmpty( currentPageItem );
		}
		$.each( claimEditorsTables,
		/**
		 * @param {number}
		 *            i
		 * @param {WEF_ClaimEditorsTable}
		 *            claimEditorsTable
		 */
		function( i, claimEditorsTable ) {
			if ( !WEF_Utils.isEmpty( initTypeId ) && claimEditorsTable.definition.code == 'P31' ) {
				claimEditorsTable.init( WEF_Utils.mockEntityWithType( initTypeId ) );
			} else {
				claimEditorsTable.initAsEmpty( currentPageItem );
			}
		} );
		enableAnchorCounterUpdate = true;
		dialog.find( 'a.wef_editor_tab_anchor' ).each( function( i, anchor ) {
			updateAnchorCounter( $( anchor ) );
		} );
	};

	this.open = function() {
		dialog.dialog( 'open' );
	};
};
window.WEF_EditorForm = WEF_EditorForm;

/**
 * @class
 */
WEF_Editor = function( dialogHtml ) {
	"use strict";

	if ( typeof dialogHtml === 'undefined' ) {
		throw new Error( 'Dialog HTML is not specified' );
	}

	this.i18n = {};
	this.dialogHtml = dialogHtml;
};
window.WEF_Editor = WEF_Editor;

WEF_Editor.prototype.addEditButtons =
/**
 * @param {?String}
 *            initTypeId
 */
function( initTypeId ) {
	"use strict";

	var editor = this;
	var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
	$( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).click( function() {
		var editDeferred = editor.edit( true, undefined, initTypeId );
		editDeferred.done( function() {
			WEF_Utils.purge();
		} );
	} ).text( this.i18n.menuButton ).appendTo( li );
	$( '#p-tb div ul' ).append( li );
};

WEF_Editor.prototype.edit =
/**
 * @param {!Boolean}
 *            currentPageItem
 * @param {?String}
 *            entityId
 * @param {?String}
 *            entityTypeId
 */
function( currentPageItem, entityId, entityTypeId ) {
	"use strict";

	if ( !WEF_Utils.isEmpty( entityId ) )
		WEF_Utils.assertCorrectEntityId( entityId );
	if ( !WEF_Utils.isEmpty( entityTypeId ) )
		WEF_Utils.assertCorrectEntityId( entityTypeId );

	var editDeferred = $.Deferred();

	if ( currentPageItem ) {
		entityId = WEF_Utils.getEntityId();
	}

	var editor = this;
	var i18n = this.i18n;

	if ( entityId === null ) {
		// empty item
		var editorForm = new WEF_EditorForm( editor.i18n.dialogTitle, editor.dialogHtml, editor.i18n, currentPageItem, editDeferred );
		editorForm.initAsEmpty( currentPageItem, entityTypeId );
		wef_LabelsCache.receiveLabels();
		editorForm.open();
		return editDeferred;
	}

	var statusDialog = $( document.createElement( 'div' ) );
	statusDialog.attr( 'title', this.i18n.dialogTitle );
	statusDialog.append( $( document.createElement( 'p' ) ).text( this.i18n.statusLoadingWikidata ) );
	statusDialog.dialog();

	$.ajax( {
		type: 'GET',
		url: WEF_Utils.getWikidataApiPrefix() + '&action=wbgetentities&ids=' + entityId,
		dataType: 'json',
		success: function( result ) {
			var editorForm = new WEF_EditorForm( editor.i18n.dialogTitle, editor.dialogHtml, editor.i18n, currentPageItem, editDeferred );
			editorForm.load( result.entities[entityId] );
			wef_LabelsCache.receiveLabels();
			editorForm.open();
		},
		complete: function() {
			statusDialog.dialog( 'close' );
		},
		fail: function() {
			alert( i18n.errorLoadingWikidata );
			editDeferred.reject( 'Unable to load from Wikidata' );
		},
	} );

	return editDeferred;
};

WEF_Editor.prototype.localize = function( i18n_prefix ) {
	"use strict";

	WEF_Utils.localize( this.i18n, 'wef_AnyEditor_i18n_' );
	WEF_Utils.localize( this.i18n, i18n_prefix );
};

WEF_Editors_Registry = function() {
	"use strict";

	/** @type {WEF_Editor[]} */
	this.registry = {};
	this.registryLength = 0;
};

WEF_Editors_Registry.prototype.registerEditor = function( classEntityId, wef_editor ) {
	if ( WEF_Utils.isEmpty( classEntityId ) ) {
		throw new Error( 'Illegal argument: classEntityId not provided' );
	}
	if ( !( wef_editor instanceof WEF_Editor ) ) {
		throw new Error( 'Illegal argument: ' + wef_editor + ' is not instanceof WEF_Editor' );
	}
	this.registry[classEntityId] = wef_editor;
	this.registryLength++;
};
var wef_editors_registry = window.wef_editors_registry = new WEF_Editors_Registry();

/** @class */
var WEF_SelectEditor = function( anchor, optionPrefix, listener ) {
	var select = $( document.createElement( 'select' ) ).addClass( 'wef-editor-menu' ).attr( 'size', wef_editors_registry.registryLength );
	select.hide();
	$( document.body ).append( select );

	var called = false;
	var _this = this;
	function changeF() {
		var value = _this.val();
		if ( value !== null ) {
			if ( called ) {
				return;
			}
			called = true;
			_this.hide();
			listener( value, wef_editors_registry.registry[value] );
		}
	}

	$.each( wef_editors_registry.registry, function( id, editor ) {
		var jOption = $( document.createElement( 'option' ) ).attr( 'value', id ).text( optionPrefix + id ).appendTo( select );
		wef_LabelsCache.getOrQueue( id, function( label, description ) {
			jOption.text( optionPrefix + label );
			jOption.attr( 'title', description );
		} );
	} );
	wef_LabelsCache.receiveLabels();

	select.click( changeF );
	select.change( changeF );

	this.val = function( value ) {
		if ( typeof value === 'undefined' ) {
			return select.val();
		}

		select.val( value );
	};

	this.text = function() {
		var option = select.find( ':selected' );
		if ( option.length !== 0 ) {
			return option.text();
		}
		return null;
	};

	this.visible = false;

	this.hide = function() {
		this.visible = false;
		select.hide();
	};

	this.show = function() {
		called = false;
		anchor.after( select );
		select.show().position( {
			my: 'left top',
			at: 'left bottom',
			of: anchor,
		} );
		this.listener = listener;
		this.visible = true;
	};

	this.toggle = function() {
		if ( this.visible ) {
			this.hide();
		} else {
			this.show();
		}
	};
};
