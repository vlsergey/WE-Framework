/**
 * Those JavaScript classes are main core of WE-Framework to edit Wikidata
 * using JQuery dialogs. They provide classes to edit snak values, snaks,
 * claims, and claim groups (of the same property). For the examples how to use
 * those classes see "WEF_ExternalLinks.js" and "WEF_PersonEditor.js".
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
	buttonOnWikidata: 'open specified wikidata item',

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

	inputQuantityUnitLabel: 'unit',
	inputQuantityUnitTitle: '',
	inputQuantityLowerBoundLabel: 'lower bound',
	inputQuantityLowerBoundTitle: '',
	inputQuantityAmountLabel: 'amount',
	inputQuantityAmountTitle: '',
	inputQuantityUpperBoundLabel: 'upper bound',
	inputQuantityUpperBoundTitle: '',
	inputQuantityModeExact: 'exact',
	inputQuantityModeOther: 'other',

	inputTimeTimeLabel: 'Time (ISO notation)',
	inputTimeTimeTitle: 'Date and time in ISO notation, including. E.g. "+00000001994-01-01T00:00:00Z"',
	inputTimeTimeZoneLabel: 'Timezone (minutes)',
	inputTimeTimeZoneTitle: 'The time zone offset against UTC, in minutes. May be given as an integer or string literal.',
	inputTimeCalendarModelLabel: 'Calendar model',
	inputTimeCalendarModelTitle: 'A calendar model, such as gregorian or julian',
	inputTimePrecisionLabel: 'Precision',
	inputTimePrecisionTitle: 'To what unit is the given date/time significant?',

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
	buttonOnWikidata: 'открыть указанный элемент Викиданных',

	checkboxShowJulian: 'показывать по старому стилю',
	checkboxShowJulianTitle: 'при отображении даты включать режим отображения по юлинскому календарю. Данная опция не влияет на формат ввода или хранения.',

	confirmDeleteClaim: 'Удалить значение свойства «{label}»?',

	dialogAnalyzeChangesTitle: 'Анализ изменений...',
	dialogSaveChangesTitle: 'Сохранение изменений на Викиданных',

	errorAnalyzeChanges: 'Произошла ошибка при анализе изменений',
	errorObtainCentralAuthToken: 'Произошла ошибка при получении нового токена глобальной аутентификации',
	errorObtainEditToken: 'Произошла ошибка при получении нового токена редактирования',
	errorUpdateEntity: 'Произошла ошибка при сохранении изменений в элемент',
	errorRemoveClaims: 'Произошла ошибка при удалении устаревших утверждений из элемента',

	inputQuantityUnitLabel: 'единица',
	inputQuantityUnitTitle: '',
	inputQuantityLowerBoundLabel: 'нижняя граница',
	inputQuantityLowerBoundTitle: '',
	inputQuantityAmountLabel: 'количество',
	inputQuantityAmountTitle: '',
	inputQuantityUpperBoundLabel: 'верхняя граница',
	inputQuantityUpperBoundTitle: '',
	inputQuantityModeExact: 'точно',
	inputQuantityModeOther: 'другое',

	inputTimeTimeLabel: 'Дата и время (ISO-нотация)',
	inputTimeTimeTitle: 'Дата и время в ISO-нотации, т. е. «+00000001994-01-01T00:00:00Z» по григорианскому календарю',
	inputTimeTimeZoneLabel: 'Часовой пояс (в минутах)',
	inputTimeTimeZoneTitle: 'Сдвиг часового пояса относительно UTC, в минутах',
	inputTimePrecisionLabel: 'Точность',
	inputTimePrecisionTitle: 'Какая наиболее точная значая единица для данного значения?',
	inputTimeCalendarModelLabel: 'Календарь для отображения',
	inputTimeCalendarModelTitle: 'Календарь, например,  юлианский или григорианский',

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
	dialogButtonCloseText: 'Cancel',
	dialogButtonCloseLabel: 'Close the dialog and discard all changes (do not save)',
	dialogTitle: 'WE-Framework',

	fieldsetGeneral: 'general',
	groupGeneral: 'General',

	errorLoadingWikidata: 'Unable to load element data from Wikidata',

	statusLoadingWikidata: 'Loading element data from Wikidata',
};

window.wef_AnyEditor_i18n_fr = {
	dialogButtonUpdateLabelsText: 'Mettre à jour les libellés',
	dialogButtonUpdateLabelsLabel: 'Recharger les labels et descriptions des propriétés, qualificatifs et objets',
	dialogButtonSaveText: 'Enregistrer',
	dialogButtonSaveLabel: 'Fermer la fenêtre en enregistrant les modifications sur Wikidata',
	dialogButtonCloseText: 'Annuler',
	dialogButtonCloseLabel: 'Fermer la fenêtre sans enregistrer',
	dialogTitle: 'WE-Framework',

	fieldsetGeneral: 'Général',
	groupGeneral: 'Général',

	errorLoadingWikidata: 'Échec du chargement des données de Wikidata',

	statusLoadingWikidata: 'Chargement des données de Wikidata',
};

window.wef_AnyEditor_i18n_ru = {
	dialogButtonUpdateLabelsText: 'Обновить названия',
	dialogButtonUpdateLabelsLabel: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
	dialogButtonSaveText: 'Сохранить',
	dialogButtonSaveLabel: 'Закрыть окно и сохранить все изменения в Викиданных',
	dialogButtonCloseText: 'Отмена',
	dialogButtonCloseLabel: 'Закрыть окно и отменить все изменения (не сохранять)',
	dialogTitle: 'WE-Framework',

	fieldsetGeneral: 'основное',
	groupGeneral: 'Основное',

	errorLoadingWikidata: 'Невозможно загрузить информацию с Викиданных',

	statusLoadingWikidata: 'Загружаем данные элемента с Викиданных',
};

/** @const */
window.WEF_RANK_PREFERRED = 'preferred';
/** @const */
window.WEF_RANK_NORMAL = 'normal';
/** @const */
window.WEF_RANK_DEPRECATED = 'deprecated';

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
 * @param args
 *            {WEF_Definition}
 * @class
 */
window.WEF_Definition = function( args ) {
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

window.WEF_Utils = {

	appendToNamedMap: function( element, mapName, key, obj ) {
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
	},

	/** @returns {string} */
	formatDate: function( year, month, day ) {
		var time;
		if ( year >= 0 ) {
			time = '+' + ( '00000000000' + year ).substr( -11, 11 );
		} else {
			time = '-' + ( '00000000000' + ( -year ) ).substr( -11, 11 );
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
	},

	formatQuantity: function( value ) {
		if ( Number( value ) > 0 ) {
			return '+' + Number( value );
		} else {
			return '' + Number( value );
		}
	},

	getEntityId: function() {
		// TODO: add check
		if ( WEF_Utils.isWikidata() ) {
			return mw.config.get( 'wgTitle' );
		} else {
			return mw.config.get( 'wgWikibaseItemId' );
		}
	},

	getFirstObjectValue: function( obj ) {
		return obj[Object.keys( obj )[0]];
	},

	/** @returns {string} */
	getWikidataApiPrefix: function() {
		if ( wgSiteName === 'Wikidata' ) {
			return wgServer + wgScriptPath + '/api.php' + '?format=json';
		} else {
			return '//www.wikidata.org/w/api.php' + '?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
		}
	},

	/** @returns {Boolean} */
	isWikidata: function() {
		return wgSiteName === 'Wikidata';
	},

	localize: function( targetObject, globalVariablesPrefix ) {
		var languages = [ 'ru', 'en', wgContentLanguage, wgUserLanguage ];
		$.each( languages, function( i, lang ) {
			if ( window[globalVariablesPrefix + lang] ) {
				$.extend( targetObject, window[globalVariablesPrefix + lang] );
			}
		} );
	},

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
	processDefinition: function( definition ) {
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

				if ( $.isEmpty( rSuffix ) ) {
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

	purge: function() {
		window.location.replace( wgServer + wgScriptPath + '/index.php?action=purge&title=' + encodeURIComponent( wgPageName ) );
	},

	purgeAsync: function() {
		$.ajax( {
			url: wgServer + wgScriptPath + '/api.php?action=purge&titles=' + encodeURIComponent( wgPageName ),
		} );
	},

	/**
	 * @param s
	 *            {string} string to escapse
	 * @returns {string} safe-to-use regexp pattern string
	 */
	regexpEscape: function( s ) {
		return s.replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' );
	},

	regexpGetHtmlPattern: function( regexp ) {
		var source = WEF_Utils.regexpGetSource( options.check );
		if ( source.substr( 0, 1 ) !== '^' ) {
			source = '.*' + source;
		}
		if ( source.substr( source.lenght - 1, 1 ) !== '$' ) {
			source = source + '.*';
		}
		return source;
	},

	regexpGetSource: function( regexp ) {
		return regexp.toString().replace( /^\/(.*)\/[a-z]*$/, '$1' );
	},

	urlCommons: function( value ) {
		return WEF_Utils.urlNice( '//commons.wikimedia.org/wiki/File:' + escape( value ) );
	},

	/**
	 * @returns {string}
	 */
	urlNice: ( function() {
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
	} )(),

	/**
	 * @returns {string}
	 */
	urlUnnice: ( function() {
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
	} )(),
};

window.wef_Editors_i18n = new WEF_Editors_i18n();

/**
 * Wikidata labels and description cache using local user storage (i.e.
 * client-side). Part of WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.WEF_LabelsCache = function() {

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
	 * @param key
	 *            {string} key to check
	 */
	var assertKeyCorrect = function( key ) {
		if ( !/^[PQ]\d+$/.test( key ) ) {
			throw new Error( 'Incorrect key: ' + key );
		}
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
		assertKeyCorrect( key );

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
		assertKeyCorrect( key );

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
	 *            {function(string,string)}callback to be called (may be several
	 *            times) after cache or Wikidata retrieve
	 * @return {string} immediatly available value
	 */
	this.getOrQueue = function( key, listener ) {
		assertKeyCorrect( key );
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

		var languages = [ wgUserLanguage, wgContentLanguage, 'en', 'ru' ];
		var languagesString = encodeURIComponent( wgUserLanguage + '|' + wgContentLanguage + '|en|ru' );

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
						if ( typeof label !== 'undefined' && !$.isEmpty( label.value ) ) {
							var title = label.value;
							cacheLabels[entityId] = title;
							localStorage[LOCALSTORAGE_PREFIX_LABELS + entityId] = title;
							break;
						}
					}
				}
				if ( $.isEmpty( cacheLabels[entityId] ) ) {
					cacheLabels[entityId] = '';
				}

				if ( typeof entity.descriptions !== 'undefined' ) {
					for ( var l = 0; l < languages.length; l++ ) {
						var description = entity.descriptions[languages[l]];
						if ( typeof description !== 'undefined' && !$.isEmpty( description.value ) ) {
							var title = description.value;
							cacheDescriptions[entityId] = title;
							localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + entityId] = title;
							break;
						}
					}
				}
				if ( $.isEmpty( cacheDescriptions[entityId] ) ) {
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
						+ '&props=' + encodeURIComponent( 'labels|descriptions' ) // 
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
};
window.wef_LabelsCache = new WEF_LabelsCache();

/**
 * Caches types of properties. Required because sometimes entity contains the
 * property code and "novalue" mark, but not datatype marker.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.WEF_TypesCache = function() {

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
					if ( propertyId === entity.id ) {
						var dataType = entity.datatype;
						if ( typeof datatype !== 'undefined' && dataType !== null ) {
							localStorage[LOCALSTORAGE_PREFIX + propertyId] = dataType;
							cacheTypes[propertyId] = dataType;
							onSuccessNew( dataType );
							return;
						}
					}
				} );
				onFailureNew( 'no results returned for ' + propertyId );
				return;
			},
		} );

		return;
	};

	this.putInCache = function( propertyId, dataType ) {
		if ( !/^[P]\d+$/.test( propertyId ) ) {
			throw new Error( 'Incorrect property ID: ' + propertyId );
		}

		if ( !$.isEmpty( dataType ) ) {
			cacheTypes[propertyId] = dataType;
			localStorage[LOCALSTORAGE_PREFIX + propertyId] = dataType;
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
window.WEF_SnakValueEditor = function( parent, dataDataType, editorDataType, initialDataValue, options ) {

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
	var CALENDAR_GREGORIAN = 'Q1985727';
	/** @type {string} */
	var CALENDAR_JULIAN = 'Q1985786';
	/** @type {string} */
	var PREFIX_CALENDAR_MODEL = 'http://www.wikidata.org/entity/';
	/** @type {string[]} */
	var CALENDAR_MODELS = [ PREFIX_CALENDAR_MODEL + CALENDAR_GREGORIAN, PREFIX_CALENDAR_MODEL + CALENDAR_JULIAN ];
	var PRECISION_DAYS = 11;
	var PRECISION_MONTHS = 10;
	var PRECISION_YEARS = 9;

	this.mainElement = $( document.createElement( 'span' ) ).appendTo( parent );

	var unsupportedF = function() {
		throw new Error( 'DataType "' + dataDataType + '" is not supported' );
	};

	this.hasValue = unsupportedF;
	this.removeValue = unsupportedF;

	this.getDataValue = unsupportedF;
	this.setDataValue = unsupportedF;

	this.getAsLabel = unsupportedF;

	if ( typeof editorDataType === 'undefined' ) {
		// autodetect enabled
		editorDataType = dataDataType;
		if ( editorDataType === 'time' ) {
			if ( typeof initialDataValue === 'undefined' || typeof initialDataValue.value === 'undefined' || CALENDAR_MODELS.indexOf( initialDataValue.value.calendarmodel ) === -1 ) {
				editorDataType = 'time-days';
			} else {
				var initialValue = initialDataValue.value;
				if ( !/^[\\+\\-]00000/.test( initialValue.time ) ) {
					editorDataType = 'time';
				} else if ( !$.isEmpty( initialValue ) && !$.isEmpty( initialValue.precision ) ) {
					var precision = initialValue.precision;
					if ( precision === PRECISION_YEARS && initialValue.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) === CALENDAR_GREGORIAN ) {
						editorDataType = 'time-years';
					} else if ( precision === PRECISION_MONTHS && initialValue.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) === CALENDAR_GREGORIAN ) {
						editorDataType = 'time-months';
					} else if ( precision === PRECISION_DAYS ) {
						editorDataType = 'time-days';
					}
				}
			}
		}
		if ( editorDataType === 'quantity' ) {
			if ( typeof initialDataValue === 'undefined' || typeof initialDataValue.value === 'undefined' ) {
				editorDataType = 'quantity-exact';
			} else {
				if ( initialDataValue.value.unit === '1' // 
						&& initialDataValue.value.amount === initialDataValue.value.upperBound //
						&& initialDataValue.value.amount === initialDataValue.value.lowerBound ) {
					editorDataType = 'quantity-exact';
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
		selectDateTimePrecision.append( $( document.createElement( 'option' ) ).attr( 'value', 'time' ).text( i18n.timePrecisionOther ) );
		selectDateTimePrecision.val( editorDataType );
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
			var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_commonsMedia' ).appendTo( this.mainElement );
			this.setDataValue = function( newDataValue ) {
				input.val( newDataValue.value );
			};
			this.hasValue = function() {
				return !$.isEmpty( input.val() );
			};
			this.removeValue = function() {
				input.val( '' );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'string',
					value: input.val(),
				};
			};
			this.getAsLabel = function() {
				return $( document.createElement( 'a' ) ) //
				.attr( 'href', '//commons.wikimedia.org/wiki/File:' + encodeURI( input.val() ) ) //
				.text( input.val() );
			};

			input.autocomplete( {
				source: function( request, response ) {
					var term = request.term;
					$.ajax(
							{
								type: 'GET',
								dataType: 'json',
								url: '//commons.wikimedia.org/w/api.php?format=json&origin=' + encodeURIComponent( location.protocol + wgServer )
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
				return !$.isEmpty( input.val() );
			};
			this.removeValue = function() {
				input.val( '' );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'string',
					value: input.val(),
				};
			};
			this.getAsLabel = function() {
				return $( document.createElement( 'span' ) ).text( input.val() );
			};

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

			var addTr = function( textLabel, textTitle, input ) {
				input.uniqueId();

				var tr = $( document.createElement( 'tr' ) ).attr( 'title', textTitle ).appendTo( table );
				var th = $( document.createElement( 'th' ) ).appendTo( tr );
				var label = $( document.createElement( 'label' ) ).text( textLabel + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
				var td = $( document.createElement( 'td' ) ).appendTo( tr );
				td.append( input );
			};

			addTr( i18n.inputQuantityUnitLabel, i18n.inputQuantityUnitTitle, inputUnit );
			addTr( i18n.inputQuantityLowerBoundLabel, i18n.inputQuantityLowerBoundTitle, inputLowerBound );
			addTr( i18n.inputQuantityAmountLabel, i18n.inputQuantityAmountTitle, inputAmount );
			addTr( i18n.inputQuantityUpperBoundLabel, i18n.inputQuantityUpperBoundTitle, inputUpperBound );

			this.setDataValue = function( newDataValue ) {
				inputUnit.val( newDataValue.value.unit );
				inputLowerBound.val( newDataValue.value.lowerBound );
				inputAmount.val( newDataValue.value.amount );
				inputUpperBound.val( newDataValue.value.upperBound );
			};
			this.hasValue = function() {
				return !$.isEmpty( inputAmount.val() );
			};
			this.removeValue = function() {
				inputLowerBound.val( '' );
				inputAmount.val( '' );
				inputUpperBound.val( '' );
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
				// TODO: format value using server ?
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time' ).text(
						lowerBound.val() + ' / ' + inputAmount.val() + ' / ' + inputUpperBound.val() );
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
				return !$.isEmpty( inputAmount.val() );
			};
			this.removeValue = function() {
				inputAmount.val( '' );
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
				// TODO: format value using server ?
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time' ).text( inputAmount.val() );
			};

			inputAmount.change( changeF );
			inputAmount.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time' ) {
		( function() {

			var table = $( document.createElement( 'table' ) ).addClass( 'wef_time_table' ).appendTo( this.mainElement );

			var inputTime = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_time_time' );
			var inputTimeZone = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_time_timezone' );

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

			var addTr = function( textLabel, textTitle, input ) {
				input.uniqueId();

				var tr = $( document.createElement( 'tr' ) ).attr( 'title', textTitle ).appendTo( table );
				var th = $( document.createElement( 'th' ) ).appendTo( tr );
				var label = $( document.createElement( 'label' ) ).text( textLabel + ': ' ).attr( 'id', input.attr( 'id' ) ).appendTo( th );
				var td = $( document.createElement( 'td' ) ).appendTo( tr );
				td.append( input );
			};

			addTr( i18n.inputTimeTimeLabel, i18n.inputTimeTimeTitle, inputTime );
			addTr( i18n.inputTimeTimeZoneLabel, i18n.inputTimeTimeZoneTitle, inputTimeZone );
			addTr( i18n.inputTimePrecisionLabel, i18n.inputTimePrecisionTitle, inputPrecision );
			addTr( i18n.inputTimeCalendarModelLabel, i18n.inputTimeCalendarModelTitle, inputCalendarModel.select );

			this.setDataValue = function( newDataValue ) {
				inputTime.val( newDataValue.value.time );
				inputTimeZone.val( newDataValue.value.timezone );
				inputPrecision.val( newDataValue.value.precision );
				inputCalendarModel.val( newDataValue.value.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) );
			};
			this.hasValue = function() {
				return !$.isEmpty( inputTime.val() );
			};
			this.removeValue = function() {
				inputTime.val( '' );
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
						calendarmodel: PREFIX_CALENDAR_MODEL + inputCalendarModel.val(),
					},
				};
			};
			this.getAsLabel = function() {
				// TODO: format value using server ?
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time' ).text( inputTime.val() );
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

			selectDateTimePrecision.appendTo( this.mainElement );

			var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_time_date' ).appendTo( this.mainElement );
			input.datepicker( {
				dateFormat: 'd MM yy',
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true,
			} );

			var showJulianSpan = $( document.createElement( 'span' ) ).addClass( 'wef_time_oldstyle_span' ).appendTo( this.mainElement );

			var showJulianCheckbox = $( document.createElement( 'input' ) ).attr( 'type', 'checkbox' ).addClass( 'wef_time_oldstyle' );
			showJulianCheckbox.attr( 'title', i18n.checkboxShowJulianTitle );
			showJulianCheckbox.uniqueId();
			showJulianCheckbox.change( changeF );
			showJulianCheckbox.keyup( changeF );
			showJulianCheckbox.appendTo( showJulianSpan );

			var showJulianCheckboxLabel = $( document.createElement( 'label' ) );
			showJulianCheckboxLabel.attr( 'for', showJulianCheckbox.attr( 'id' ) );
			showJulianCheckboxLabel.attr( 'title', i18n.checkboxShowJulianTitle );
			showJulianCheckboxLabel.text( i18n.checkboxShowJulian );
			showJulianCheckboxLabel.appendTo( showJulianSpan );

			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-]00000/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
				}

				var parseable = newDataValue.value.time.replace( /^([\\+\\-])00000/, '$1' );
				if ( isNaN( Date.parse( parseable ) ) ) {
					switchDataType( 'time', newDataValue );
				}

				input.datepicker( 'setDate', new Date( parseable ) );
				showJulianCheckbox.attr( 'checked', newDataValue.value.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) === CALENDAR_JULIAN );
			};
			this.hasValue = function() {
				return !$.isEmpty( input.val() );
			};
			this.removeValue = function() {
				input.val( '' );
			};
			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				/** @type {Date} */
				var date = input.datepicker( 'getDate' );
				return {
					type: 'time',
					value: {
						time: WEF_Utils.formatDate( date.getFullYear(), date.getMonth() + 1, date.getDate() ),
						timezone: 0,
						precision: PRECISION_DAYS,
						before: 0,
						after: 0,
						calendarmodel: PREFIX_CALENDAR_MODEL + ( showJulianCheckbox.is( ':checked' ) ? CALENDAR_JULIAN : CALENDAR_GREGORIAN ),
					},
				};
			};
			this.getAsLabel = function() {
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_days' ).text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'time-months' ) {
		( function() {

			selectDateTimePrecision.appendTo( this.mainElement );

			var months = $( document.createElement( 'select' ) ).addClass( 'wef_time_month' ).appendTo( this.mainElement );
			for ( var i = 1; i <= 12; i++ ) {
				var option = $( document.createElement( 'option' ) );
				option.attr( 'value', i );
				option.text( wgMonthNames[i] );
				months.append( option );
			}

			var years = $( document.createElement( 'input' ) ).attr( 'type', 'number' ).attr( 'step', '1' ).appendTo( this.mainElement );
			this.setDataValue = function( newDataValue ) {
				if ( !/^[\\+\\-]00000/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
				}
				var parseable = newDataValue.value.time.replace( /^([\\+\\-])00000/, '$1' );
				if ( isNaN( Date.parse( parseable ) ) ) {
					switchDataType( 'time', newDataValue );
				}
				var date = new Date( parseable );
				months.val( date.getMonth() + 1 );
				years.val( date.getFullYear() );
			};
			this.hasValue = function() {
				return !$.isEmpty( months.val() ) || !$.isEmpty( years.val() );
			};
			this.removeValue = function() {
				months.prop( 'selectedIndex', -1 );
				years.val( '' );
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
						calendarmodel: PREFIX_CALENDAR_MODEL + CALENDAR_GREGORIAN,
					},
				};
			};
			this.getAsLabel = function() {
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_months' ).text( wgMonthNames[months.val()] + ' ' + years.val() );
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
				if ( !/^[\\+\\-]00000/.test( newDataValue.value.time ) ) {
					switchDataType( 'time', newDataValue );
				}
				var parseable = newDataValue.value.time.replace( /^([\\+\\-])00000/, '$1' );
				if ( isNaN( Date.parse( parseable ) ) ) {
					switchDataType( 'time', newDataValue );
				}
				var date = new Date( parseable );
				years.val( date.getFullYear() );
			};
			this.hasValue = function() {
				return !$.isEmpty( years.val() );
			};
			this.removeValue = function() {
				years.val( '' );
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
						calendarmodel: PREFIX_CALENDAR_MODEL + CALENDAR_GREGORIAN,
					},
				};
			};
			this.getAsLabel = function() {
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_time_years' ).text( years.val() );
			};

			years.change( changeF );
			years.keyup( changeF );
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
				return !$.isEmpty( input.val() );
			};
			this.removeValue = function() {
				input.val( '' );
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
				return $( document.createElement( 'span' ) ).addClass( 'wef_snak_replacement_label_url' ).text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} ).call( this );
	} else if ( editorDataType === 'wikibase-item' ) {
		( function() {
			var table = $( document.createElement( 'table' ) ).addClass( 'wef_wikibase-item_table' ).appendTo( snakValueEditor.mainElement );
			var tr = $( document.createElement( 'tr' ) ).addClass( 'wef_wikibase-item_tr' ).appendTo( table );
			var input = $( document.createElement( 'input' ) ).attr( 'type', 'text' ).addClass( 'wef_wikibase-item' ).appendTo(
					$( document.createElement( 'td' ) ).addClass( 'wef_wikibase-item_td_input' ).appendTo( tr ) );

			this.setDataValue = function( newDataValue ) {
				var entityId = 'Q' + newDataValue.value['numeric-id'];
				input.data( 'value-entity-id', entityId );
				input.data( 'value-entity-label', '' );
				input.val( '(' + entityId + ')' );

				wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
					if ( input.data( 'value-entity-id' ) === entityId ) {
						// we need to be sure user didn't start to edit field
						if ( input.val() === '(' + entityId + ')' || input.val() === input.data( 'value-entity-label' ) + ' (' + entityId + ')' ) {
							input.data( 'value-entity-label', label );
							input.val( label + ' (' + entityId + ')' );
							input.attr( 'title', description );
						}
					}
				} );

				changeF();
			};

			this.hasValue = function() {
				return !$.isEmpty( input.data( 'value-entity-id' ) );
			};
			this.removeValue = function() {
				input.val( '' );
				input.data( 'value-entity-id', '' );
				input.data( 'value-entity-label', '' );
			};

			this.getDataValue = function() {
				if ( !this.hasValue() ) {
					throw new Error( 'No value' );
				}

				var dataValue = {};
				if ( typeof input.data( 'value-entity-id' ) !== 'undefined' ) {
					dataValue.value = {
						'entity-type': 'item',
						'numeric-id': input.data( 'value-entity-id' ).substr( 1 ),
					};
				}
				dataValue.type = 'wikibase-entityid';
				return dataValue;
			};
			this.getAsLabel = function() {
				var entityId = input.data( 'value-entity-id' );
				if ( $.isEmpty( entityId ) ) {
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

			var translatableDesciptions = [];
			function labelsCacheListener() {
				$.each( translatableDesciptions, function( index, desc ) {
					var id = desc.data( 'entity-id' );
					if ( !$.isEmpty( id ) ) {
						var text = wef_LabelsCache.getDescription( id, false );
						if ( !$.isEmpty( id ) ) {
							desc.text( text );
						}
					}
				} );
			}

			input.autocomplete( {
				source: function( request, response ) {
					var term = request.term;
					$.ajax( {
						dataType: 'json',
						url: WEF_Utils.getWikidataApiPrefix() // 
								+ '&action=wbsearchentities' //
								+ '&language=' + encodeURIComponent( wgUserLanguage ) // 
								+ '&limit=15' //
								+ '&search=' + encodeURIComponent( term ),
					} ).done( function( result ) {
						var list = [];
						$.each( result.search, function( index, entity ) {
							var item = {
								label: entity.label,
								value: entity.id,
							};
							if ( typeof entity.description !== 'undefined' ) {
								item.desc = entity.description;
							} else if ( $.isArray( entity.aliases ) ) {
								item.desc = 'a.k.a.: ' + entity.aliases.join( '; ' );
							}
							list.push( item );
						} );

						// clear before render
						translatableDesciptions = [];

						response( list );

						// just in case everything in cache already
						labelsCacheListener();
						wef_LabelsCache.receiveLabels();
					} );
				},
				close: function() {
					$( wef_LabelsCache ).unbind( 'change', labelsCacheListener );
				},
				open: function() {
					$( wef_LabelsCache ).bind( 'change', labelsCacheListener );
				},
				select: function( event, ui ) {
					var item = ui.item;
					var input = $( event.target );
					input.data( 'value-entity-id', item.value );
					input.data( 'value-entity-label', item.label );
					input.val( item.label );

					if ( typeof item.desc !== 'undefined' ) {
						input.attr( 'title', item.desc );
					} else {
						input.removeAttr( 'title' );
					}

					input.change();
					return false;
				},
			} );

			input.focus( function() {
				var id = input.data( 'value-entity-id' );
				var label = input.data( 'value-entity-label' );

				if ( typeof id === 'undefined' || typeof label === 'undefined' ) {
					input.val( '' );
					input.removeData( 'value-entity-id' );
					input.removeData( 'value-entity-label' );
				} else {
					input.val( label );
				}
				changeF();
			} );

			input.blur( function() {
				var id = input.data( 'value-entity-id' );
				var label = input.data( 'value-entity-label' );
				var currentVal = input.val();
				if ( currentVal === label ) {
					input.val( label + ' (' + id + ')' );
				} else {
					input.val( '' );
					input.removeData( 'value-entity-id' );
					input.removeData( 'value-entity-label' );
				}
				changeF();
			} );

			input.data( 'autocomplete' )._renderItem = function( ul, item ) {
				var a = $( '<a><strong>' + item.label + '</strong> <span style="color: darkgray;">' + item.value + '</span><br>' + '</a>' );
				var desc = $( document.createElement( 'span' ) ).appendTo( a );
				if ( !$.isEmpty( item.desc ) ) {
					desc.text( item.desc );
				} else {
					desc.data( 'entity-id', item.value );
					wef_LabelsCache.queueForDescription( item.value );
					translatableDesciptions.push( desc );
				}
				return $( document.createElement( 'li' ) ).append( a ).data( 'item.autocomplete', item ).appendTo( ul );
			};

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
				var entityId = input.data( 'value-entity-id' );
				if ( !$.isEmpty( entityId ) ) {
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
 * Creates select field that has predefined number of values, but also support
 * extending values based on load external values. Uses {@link WEF_LabelsCache}
 * and JQuery autoselect
 */
window.WEF_ItemSelect = function() {
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

/** @type {WEF_SelectSnakType} */
addOnloadHook( function() {
	window.wef_selectSnakType = new WEF_SelectSnakType();
} );

window.WEF_SnakEditor = function( parent, options ) {
	if ( $.isEmpty( parent ) ) {
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
	if ( this.valueEditor !== null ) {
		$.each( this.valueEditor.elements, function( index, item ) {
			item.remove();
		} );
	}
	this._butttonSelectSnakType.remove();
	this.valueEditor = null;
	this.parent = null;
};

WEF_SnakEditor.prototype.removeValue = function() {
	this.valueEditor.removeValue();
	this._change();
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
			if ( typeof claim === 'undefined' // 
					|| typeof claim.mainsnak === 'undefined' // 
					|| typeof claim.mainsnak.datavalue === 'undefined' // 
					|| typeof claim.mainsnak.datavalue.value === 'undefined'// 
					|| typeof claim.mainsnak.datavalue.value['entity-type'] === 'undefined'// 
					|| typeof claim.mainsnak.datavalue.value['numeric-id'] === 'undefined'// 
			)
				return;

			var entityType = claim.mainsnak.datavalue.value['entity-type'];
			var numericId = claim.mainsnak.datavalue.value['numeric-id'];

			if ( entityType === 'item' && ( 'Q' + numericId ) === propertyValue ) {
				result.push( claim );
			}
		} );
		return result;
	}

	throw new Error( 'Illegal state' );
};

window.WEF_QualifierEditor = function( parent, propertyId, onRemove ) {
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

window.WEF_SelectableQualifierEditor = function( parent, qualifierDefinitions, onRemove ) {

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

			if ( !$.isEmpty( qualifierDefinition.datatype ) ) {
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

/** @class */
window.WEF_SelectRank = function() {
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

/** @type {WEF_SelectRank} */
addOnloadHook( function() {
	window.wef_selectRank = new WEF_SelectRank();
} );

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
	var columnTables = this._columnTables = {};
	if ( !$.isEmpty( definition.columns ) ) {
		$.each( definition.columns, function( i, columnDefinition ) {
			if ( !$.isEmpty( columnDefinition.code ) ) {
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
			if ( !$.isEmpty( description ) && description !== this.propertyId )
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

/* TBODY */
WEF_ClaimEditor.prototype.hide = function() {
	this.tbody.hide();
};
WEF_ClaimEditor.prototype.show = function() {
	this.tbody.show();
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

WEF_ClaimEditor.prototype.removeValue = function() {
	this.snakEditor.removeValue();
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
	this.snakEditor.initEmptyWithDataType( this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId, this.definition.datatype );
};

WEF_ClaimEditor.prototype.initWithValue = function( claim ) {

	this.wikidataClaim = claim;
	if ( typeof claim.rank === 'undefined' ) {
		this.setRank( WEF_RANK_NORMAL );
	} else {
		this.setRank( claim.rank );
	}

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

	this.wikidataOldRank = this.rank;
	this.wikidataOldValue = this.hasData() ? JSON.stringify( this.getSnakValue() ) : null;

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
	this.wikidataClaim = null;
	this.wikidataOldValue = null;
	this.rank = WEF_RANK_NORMAL;
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
		} else {
			claim.type = 'statement';
		}
		claim.rank = this.rank;

		if ( this.isPropertyEditor === true ) {
			claim.mainsnak = newSnak;
		} else if ( this.isQualifierEditor === true ) {
			if ( oldClaim === null ) {
				claim.mainsnak = {
					snaktype: 'value',
					property: this.propertyId,
					datatype: 'wikibase-item',
					datavalue: {
						value: {
							'entity-type': 'item',
							'numeric-id': this.propertyValue.substr( 1 ),
						},
						type: 'wikibase-entityid',
					}
				};
			}
			var qualifier = newSnak;
			if ( oldSnak !== null ) {
				qualifier.hash = oldSnak.hash;
			}
			WEF_Utils.appendToNamedMap( claim, 'qualifiers', this.qualifierPropertyId, qualifier );
		} else {
			throw new Error( 'Unsupported code: ' + definition.code );
		}

		var needToUpdateClaim = this.rank !== oldRank || JSON.stringify( newSnak ) !== oldSnakStr;

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

	if ( $.isEmpty( qualifierId ) || typeof this._columnTables[qualifierId] === 'undefined' ) {
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
 * @param definition
 *            {WEF_Definition}
 * @class
 */
window.WEF_ClaimEditorsTable = function( definition, options ) {

	var propertyEditorsTable = this;
	var i18n = wef_Editors_i18n;

	/** @type {WEF_ClaimEditor[]} */
	var allClaimEditors = [];
	/** @type {WEF_ClaimEditor[]} */
	var visibleDefinitionRows = [];
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
				claimEditor.removeValue();
				claimEditor.hide();

				/*
				 * add before removing to insert immediately after last existing
				 */
				if ( visibleDefinitionRows.length === 1 ) {
					var editor = propertyEditorsTable.add();
					editor.initEmpty();
				}

				visibleDefinitionRows = jQuery.grep( visibleDefinitionRows, function( value ) {
					return value != claimEditor;
				} );
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
						newButton.click( buttonDefinition.click );
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

			// additional placeholder to align buttons after URL fields
			$( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
		} else {
			claimEditor.row1.find( 'td.wef_property_editor_input' ).attr( 'colspan', 3 );
		}

		var beforeCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).prependTo( claimEditor.row1 );
		beforeCell.append( buttonAddClaim );

		var afterCell = $( document.createElement( 'td' ) ).addClass( 'wef_button_cell' ).appendTo( claimEditor.row1 );
		afterCell.append( buttonRemoveClaim );

		visibleDefinitionRows.push( claimEditor );
		allClaimEditors.push( claimEditor );

		if ( temporaryHolder !== null ) {
			claimEditor.tbody.replaceAll( temporaryHolder );
			temporaryHolder = null;
		} else {
			var prev = visibleDefinitionRows[visibleDefinitionRows.length - 2].tbody;
			var curr = visibleDefinitionRows[visibleDefinitionRows.length - 1].tbody;
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

	function createPlaceholder( target ) {
		if ( $.isEmpty( definition.columns ) ) {
			temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + definition.code + ' -->' );
			return temporaryHolder;
		}

		var container = $( document.createElement( 'tbody' ) );
		var columnsTable = $( document.createElement( 'table' ) ).addClass( 'wef_columns_table' ).appendTo( container );
		var columnsHeader = $( document.createElement( 'tr' ) ).addClass( 'wef_columns_header' ).appendTo( columnsTable );

		// empty cell for adding claim button
		columnsHeader.append( $( document.createElement( 'th' ) ).addClass( 'wef_column_th_empty' ) );

		var propertyName = $( document.createElement( 'th' ) ).addClass( 'wef_column_th' ).attr( 'colspan', '6' ).appendTo( columnsHeader );
		if ( typeof definition.label !== 'undefined' ) {
			wef_LabelsCache.getOrQueue( definition.label, function( label, description ) {
				propertyName.text( label );
				propertyName.attr( 'title', description );
			} );
		}
		$.each( definition.columns, function( i, columnDefinition ) {
			if ( !$.isEmpty( columnDefinition.code ) ) {
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

	this.collectUpdates = function( updates ) {
		$.each( allClaimEditors, function( i, claimEditor ) {
			claimEditor.collectUpdates( updates );
		} );
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
		$.each( visibleDefinitionRows, function( i, claimEditor ) {
			if ( hasStringValue( claimEditor, strValue ) ) {
				claimEditor.tbody.addClass( 'wef-lookup-found' );
				found = true;
			}
		} );

		if ( found === false ) {
			var withEmpty = $.grep( visibleDefinitionRows, function( claimEditor ) {
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
		$.each( visibleDefinitionRows, function( index, claimEditor ) {
			if ( claimEditor.hasData() ) {
				counter++;
			}
		} );
		return counter;
	};

	this.size = function() {
		return visibleDefinitionRows.length;
	};

};

WEF_ClaimEditorsTable.removeFoundValueClasses = function() {
	$( '.wef-lookup-found' ).removeClass( 'wef-lookup-found' );
	$( '.wef-lookup-found-new' ).removeClass( 'wef-lookup-found-new' );
};

window.WEF_ProgressItem = function( parentUl, text ) {
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

window.WEF_Updates = function() {
	this.data = {};
	this.removedClaims = [];
};

window.wef_analyze_and_save = function( claimEditorTables ) {
	var i18n = wef_Editors_i18n;

	var dialog = $( document.createElement( 'div' ) );
	dialog.attr( 'title', i18n.dialogAnalyzeChangesTitle );
	var analyzeProgressUl = $( document.createElement( 'ul' ) ).appendTo( dialog );
	var analyzeProgress = new WEF_ProgressItem( analyzeProgressUl, i18n.actionAnalyzeChanges );
	analyzeProgress.inProgress();
	dialog.dialog( {
		height: 'auto',
		width: 'auto'
	} );

	var updates = new WEF_Updates();
	try {
		$.each( claimEditorTables, function( i, claimEditorTable ) {
			claimEditorTable.collectUpdates( updates );
		} );

		if ( $.isEmptyObject( updates.data ) && updates.removedClaims.length === 0 ) {
			var purgeProgress = new WEF_ProgressItem( analyzeProgressUl, i18n.actionNoChangesPurge );
			analyzeProgress.success();
			purgeProgress.inProgress();
			WEF_Utils.purge();
			return;
		}

		analyzeProgress.success();
	} catch ( error ) {
		mw.log.warn( i18n.errorAnalyzeChanges + ': ' + error );
		analyzeProgress.failure( '' + error );
		alert( i18n.errorAnalyzeChanges + ': ' + error );
		return;
	}
	dialog.dialog( 'close' );

	wef_save( updates, function() {
		WEF_Utils.purge();
	} );
};

window.wef_save = function( updates, onComplete ) {

	if ( !( updates instanceof WEF_Updates ) ) {
		throw new Error( 'WEF_Updates object is expected' );
	}

	var i18n = wef_Editors_i18n;

	var dialog = $( document.createElement( 'div' ) );
	dialog.attr( 'title', i18n.dialogSaveChangesTitle );

	var progressUl = $( document.createElement( 'ul' ) ).appendTo( dialog );

	var executionContext = {
		centralAuthToken: null,
		editToken: null,
		entityId: WEF_Utils.getEntityId(),
		isWikidata: WEF_Utils.isWikidata(),
		localUrlPrefix: wgServer + wgScriptPath + '/api.php' + '?format=json',
		wikidataUrlPrefix: '//www.wikidata.org/w/api.php' + '?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json',

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
		if ( wgAction === 'view' ) {
			if ( typeof onComplete === 'function' ) {
				onComplete();
			}
		}
	};

	function createObtainCentralAuthTokenAction( onSuccessActionIndex, onFailureActionIndex ) {
		var progressItem = new WEF_ProgressItem( progressUl, i18n.actionObtainCentralAuthToken );
		return function() {
			var onFailureAction = typeof onFailureActionIndex === 'undefined' ? actionFinal : actions[onFailureActionIndex];
			var onSuccessAction = actions[onSuccessActionIndex];
			progressItem.inProgress();
			$.ajax( {
				type: 'GET',
				url: executionContext.localUrlPrefix + '&action=tokens&type=centralauth',
				error: function( jqXHR, textStatus, errorThrown ) {
					alert( i18n.errorObtainCentralAuthToken + ': ' + textStatus );
					progressItem.failure( textStatus );
					onFailureAction();
					return;
				},
				success: function( result ) {
					if ( result.error ) {
						progressItem.failure( result.error.info );
						alert( i18n.errorObtainCentralAuthToken + ': ' + result.error.info );
						onFailureAction();
						return;
					}
					if ( !result.tokens || !result.tokens.centralauthtoken ) {
						progressItem.failure();
						alert( i18n.errorObtainCentralAuthToken );
						onFailureAction();
						return;
					}
					executionContext.centralAuthToken = result.tokens.centralauthtoken;
					progressItem.success();
					onSuccessAction();
				},
			} );
		};
	}

	var currentAction = 0;

	if ( WEF_Utils.isWikidata() === false ) {
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
			$.ajax( {
				type: 'GET',
				url: executionContext.getPrefixWithCentralAuthToken() // 
						+ '&action=query' //
						+ '&prop=info' //
						+ '&intoken=edit' // 
						+ '&titles=' + executionContext.entityId,
				error: function( jqXHR, textStatus, errorThrown ) {
					progressItem.failure( textStatus );
					alert( i18n.errorObtainEditToken + ': ' + textStatus );
					onFailureAction();
					return;
				},
				success: function( result ) {
					if ( result.error ) {
						progressItem.failure( result.error.info );
						alert( i18n.errorObtainEditToken + ': ' + result.error.info );
						onFailureAction();
						return;
					}

					var pageInfo = WEF_Utils.getFirstObjectValue( result.query.pages );
					executionContext.editToken = pageInfo.edittoken;
					if ( !executionContext.editToken ) {
						progressItem.failure();
						alert( i18n.errorObtainEditToken );
						onFailureAction();
						return;
					}
					progressItem.success();
					onSuccessAction();
				}
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
							+ '&token=' + encodeURIComponent( executionContext.editToken ) // 
							+ '&action=wbeditentity' // 
							+ '&id=' + executionContext.entityId //
							+ '&summary=' + encodeURIComponent( i18n.summary ) //
					,
					data: {
						data: JSON.stringify( updates.data ),
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
		if ( WEF_Utils.isWikidata() === false ) {
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
							+ '&token=' + encodeURIComponent( executionContext.editToken ) // 
							+ '&action=wbremoveclaims' // 
							+ '&claim=' + encodeURIComponent( updates.removedClaims.join( '|' ) ) //
							+ '&summary=' + encodeURIComponent( i18n.summary ) //
					,
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
};

window.WEF_EditorForm = function( title, html, i18n ) {

	/** @type {WEF_ClaimEditorsTable[]} */
	var claimEditorsTables = [];

	var dialog = $( html );
	dialog.attr( 'title', title );

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
				if ( !$.isEmpty( label ) ) {
					item.text( label );
				}
				if ( !$.isEmpty( description ) ) {
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

	dialog.find( '.wef_claim_editors' ).each( function( i, htmlItem ) {
		var item = $( htmlItem );

		var check = $.isEmpty( item.data( 'check' ) ) ? undefined : new RegExp( item.data( 'check' ) );
		var code = item.data( 'code' );
		var datatype = item.data( 'datatype' );
		var flag = item.data( 'flag' );
		var label = item.data( 'label' );
		var template = $.isEmpty( item.data( 'template' ) ) ? undefined : item.data( 'template' );

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
			if ( $.isEmpty( qDefinition.label ) ) {
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
		width: 900,
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
				wef_analyze_and_save( claimEditorsTables );
			},
		}, {
			text: i18n.dialogButtonCloseText,
			label: i18n.dialogButtonCloseLabel,
			click: function() {
				$( this ).dialog( 'close' );
			}
		} ],
	} );

	this.load = function( entity ) {
		$.each( claimEditorsTables, function( i, claimEditorsTable ) {
			claimEditorsTable.init( entity );
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

/**
 * @class
 */
window.WEF_Editor = function( dialogHtml ) {

	if ( typeof dialogHtml === 'undefined' ) {
		throw new Error( 'Dialog HTML is not specified' );
	}

	this.i18n = {};
	this.dialogHtml = dialogHtml;

	if ( WEF_Utils.isWikidata() ) {
		this.entityId = mw.config.get( 'wgTitle' );
	} else {
		this.entityId = mw.config.get( 'wgWikibaseItemId' );
	}

	this.enabled = /^Q\d+$/.test( this.entityId );
	this.dialogForm = null;
};

WEF_Editor.prototype.addEditButtons = function() {
	if ( !this.enabled ) {
		return;
	}

	var editor = this;
	var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
	$( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).click( function() {
		editor.edit();
	} ).text( this.i18n.menuButton ).appendTo( li );
	$( '#p-tb div ul' ).append( li );
};

WEF_Editor.prototype.edit = function() {
	if ( this.dialogForm === null ) {

		var statusDialog = $( '<div></div>' );
		statusDialog.attr( 'title', this.i18n.dialogTitle );
		statusDialog.append( $( document.createElement( 'p' ) ).text( this.i18n.statusLoadingWikidata ) );
		statusDialog.dialog();

		var dialogHtml = this.dialogHtml;
		var entityId = this.entityId;
		var i18n = this.i18n;
		$.ajax( {
			type: 'GET',
			url: WEF_Utils.getWikidataApiPrefix() + '&action=wbgetentities&ids=' + entityId,
			dataType: 'json',
			success: function( result ) {
				var dialogForm = new WEF_EditorForm( i18n.dialogTitle, dialogHtml, i18n );
				dialogForm.load( result.entities[entityId] );
				wef_LabelsCache.receiveLabels();
				dialogForm.open();
			},
			complete: function() {
				statusDialog.dialog( 'close' );
			},
			fail: function() {
				alert( i18n.errorLoadingWikidata );
			},
		} );
	} else {
		dialogForm.dialog( 'open' );
	}
};

WEF_Editor.prototype.localize = function( i18n_prefix ) {
	WEF_Utils.localize( this.i18n, 'wef_AnyEditor_i18n_' );
	WEF_Utils.localize( this.i18n, i18n_prefix );
};
