/**
 * This JavaScrtipt classes are main core of WE-Framework to edit Wikidata using
 * JQuery dialogs. They provide classes to edit to edit snak values, snaks,
 * claims, and claim groups (of the same property)
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */

var wef_Editors_i18n_en = {

	buttonSelectSnakType: 'select snak type',
	buttonAddClaim: 'add claim',
	buttonRemoveClaim: 'remove claim',
	buttonAddQualifier: 'add qualifier',
	buttonRemoveQualifier: 'remove qualifier',

	checkboxOldstyle: 'show with old-style?',
	checkboxOldstyleTitle: 'when displaying the date show with old-style format (julian calendar)',

	confirmDeleteClaim: 'Remove the value of property «{label}»?',

	inputTimeTimeLabel: 'Time (ISO notation)',
	inputTimeTimeTitle: 'Date and time in ISO notation, including. E.g. "+00000001994-01-01T00:00:00Z". '
			+ 'Note: the format and interpretation of this string may vary based on the calendar model. '
			+ 'Currently, only julian and gregorian dates are supported, which use the ISO format.',
	inputTimeTimeZoneLabel: 'Timezone (minutes)',
	inputTimeTimeZoneTitle: 'The time zone offset against UTC, in minutes. May be given as an integer or string literal.',
	inputTimeCalendarModelLabel: 'Calendar model',
	inputTimeCalendarModelTitle: 'A calendar model, such as gregorian or julian',
	inputTimePrecisionLabel: 'Precision',
	inputTimePrecisionTitle: 'To what unit is the given date/time significant?',

	snakTypeValue: 'custom value ',
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
	timePrecision9: 'years',
	timePrecision10: 'months',
	timePrecision11: 'days',
	timePrecision12: 'hours',
	timePrecision13: 'minutes',
	timePrecision14: 'seconds',
	timePrecisionOther: 'other',
};

var wef_Editors_i18n_ru = {

	buttonSelectSnakType: 'выбрать тип значения',
	buttonAddClaim: 'добавить утверждение',
	buttonRemoveClaim: 'удалить утверждение',
	buttonAddQualifier: 'добавить квалификатор',
	buttonRemoveQualifier: 'удалить квалификатор',

	checkboxOldstyle: 'показывать старый стиль?',
	checkboxOldstyleTitle: 'при отображении даты включать режим отображения со старым стилем (по юлинскому календарю)',

	confirmDeleteClaim: 'Удалить значение свойства «{label}»?',

	inputTimeTimeLabel: 'Дата и время (ISO-нотация)',
	inputTimeTimeTitle: 'Дата и время в ISO-нотации, т. е. «+00000001994-01-01T00:00:00Z». ' + 'Примечание: формат и интерпретация данной строки зависит от календаря. '
			+ 'В данный момент поддерживаются даты по юлианскому и григорианскому календарям, которые используют ISO-формат.',
	inputTimeTimeZoneLabel: 'Часовой пояс (в минутах)',
	inputTimeTimeZoneTitle: 'Сдвиг часового пояса относительно UTC, в минутах',
	inputTimeCalendarModelLabel: 'Календарь',
	inputTimeCalendarModelTitle: 'Календарь, например,  юлианский или григорианский',
	inputTimePrecisionLabel: 'Точность',
	inputTimePrecisionTitle: 'Какая наиболее точная значая единица для данного значения?',

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

var WEF_Editors_i18n = function() {

	this.buttonAddClaim = '{buttonAddClaim}';
	this.buttonRemoveClaim = '{buttonRemoveClaim}';

	this.confirmDeleteClaim = '{confirmDeleteClaim}',

	this.snakTypeValue = '{snakTypeValue}';
	this.snakTypeNoValue = '{snakTypeNoValue}';
	this.snakTypeSomeValue = '{snakTypeSomeValue}';

	this.timePrecision0 = '{timePrecision0}';
	this.timePrecision1 = '{timePrecision1}';
	this.timePrecision2 = '{timePrecision2}';
	this.timePrecision3 = '{timePrecision3}';
	this.timePrecision4 = '{timePrecision4}';
	this.timePrecision5 = '{timePrecision5}';
	this.timePrecision6 = '{timePrecision6}';
	this.timePrecision7 = '{timePrecision7}';
	this.timePrecision8 = '{timePrecision8}';
	this.timePrecision9 = '{timePrecision9}';
	this.timePrecision10 = '{timePrecision10}';
	this.timePrecision11 = '{timePrecision11}';
	this.timePrecision12 = '{timePrecision12}';
	this.timePrecision13 = '{timePrecision13}';
	this.timePrecision14 = '{timePrecision14}';
	this.timePrecisionOther = '{timePrecisionOther}';

	var i18n = this;
	var languages = [ 'ru', 'en', wgContentLanguage, wgUserLanguage ];
	$.each( languages, function( i, lang ) {
		if ( window['wef_Editors_i18n_' + lang] ) {
			$.extend( i18n, window['wef_Editors_i18n_' + lang] );
		}
	} );
};

var wef_Editors_i18n = new WEF_Editors_i18n();

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
var WEF_Definition = function( args ) {
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

/**
 * @class
 */
var WEF_SnakValueEditor = function( dataType, allowToSimplify ) {

	allowToSimplify = typeof allowToSimplify === 'undefined' || allowToSimplify === null ? true : allowToSimplify;

	if ( typeof dataType === 'undefined' ) {
		throw new Error( 'DataType is not specified' );
	}

	var i18n = wef_Editors_i18n;
	var snakValueEditor = this;

	var CALENDAR_GREGORIAN = 'Q1985727';
	var CALENDAR_JULIAN = 'Q11184';
	var PREFIX_CALENDAR_MODEL = 'http://www.wikidata.org/entity/';
	var PRECISION_DAYS = 11;
	var PRECISION_MONTHS = 10;
	var PRECISION_YEARS = 9;

	this.elements = [];

	this.hide = function() {
		$.each( this.elements, function( index, item ) {
			item.hide();
		} );
	};
	this.show = function() {
		$.each( this.elements, function( index, item ) {
			item.show();
		} );
	};

	var unsupportedF = function() {
		throw new Error( 'DataType "' + dataType + '" is not supported' );
	};

	this.hasValue = unsupportedF;
	this.removeValue = unsupportedF;

	this.getDataValue = unsupportedF;
	this.setDataValue = unsupportedF;

	this.getAsLabel = unsupportedF;

	var changeF = function() {
		$( snakValueEditor ).change();
	};

	if ( allowToSimplify ) {
		// defaults and simplifies
		if ( dataType === 'time' ) {
			dataType = 'time-days';
		}
	}

	this.switchDataType = function( newDataType, datavalue ) {
		var elements = this.elements;

		// replace all current variables with new type
		WEF_SnakValueEditor.call( this, newDataType, false );

		// set value
		if ( typeof datavalue !== 'undefined' ) {
			this.setDataValue( datavalue );
		}

		// replace elements with new ones
		elements[elements.length - 1].after( this.elements );

		// remove old elements
		$.each( elements, function( i, item ) {
			item.remove();
		} );
	};

	var selectDateTimePrecision = $( '<select class="wef_select_date_time_precision">' );
	selectDateTimePrecision.attr( 'title', i18n.inputTimePrecisionTitle );
	selectDateTimePrecision.append( $( '<option value="time-days">' ).data( 'precision', PRECISION_DAYS ).text( i18n['timePrecision' + PRECISION_DAYS] ) );
	selectDateTimePrecision.append( $( '<option value="time-months">' ).data( 'precision', PRECISION_MONTHS ).text( i18n['timePrecision' + PRECISION_MONTHS] ) );
	selectDateTimePrecision.append( $( '<option value="time-years">' ).data( 'precision', PRECISION_YEARS ).text( i18n['timePrecision' + PRECISION_YEARS] ) );
	selectDateTimePrecision.append( $( '<option value="time">' ).text( i18n.timePrecisionOther ) );
	selectDateTimePrecision.val( dataType );
	selectDateTimePrecision.change( function() {
		var newDataType = selectDateTimePrecision.val();
		if ( newDataType !== dataType ) {
			if ( snakValueEditor.hasValue() ) {
				var dataValue = snakValueEditor.getDataValue();
				if ( typeof dataValue.value !== 'undefined' ) {
					dataValue.value.precision = Number( selectDateTimePrecision.find( 'option:selected' ).data( 'precision' ) );
				}
				snakValueEditor.switchDataType( newDataType, dataValue );
			} else {
				snakValueEditor.switchDataType( newDataType, undefined );
			}
		}
	} );

	var oldStyleCheckbox = $( '<input type="checkbox" class="wef_time_oldstyle">' );
	oldStyleCheckbox.attr( 'title', i18n.checkboxOldstyleTitle );
	oldStyleCheckbox.uniqueId();
	oldStyleCheckbox.change( changeF );
	oldStyleCheckbox.keyup( changeF );

	var oldStyleCheckboxLabel = $( '<label>' );
	oldStyleCheckboxLabel.attr( 'for', oldStyleCheckbox.attr( 'id' ) );
	oldStyleCheckboxLabel.attr( 'title', i18n.checkboxOldstyleTitle );
	oldStyleCheckboxLabel.text( i18n.checkboxOldstyle );

	function formatDate( year, month, day ) {
		var time;
		if ( year >= 0 ) {
			time = "+" + ( "00000000000" + year ).substr( -11, 11 );
		} else {
			time = "-" + ( "00000000000" + ( -year ) ).substr( -11, 11 );
		}
		time += "-";
		if ( typeof month !== 'undefined' ) {
			time += ( "00" + month ).substr( -2, 2 );
		} else {
			time += "01";
		}
		time += "-";
		if ( typeof day !== 'undefined' ) {
			time += ( "00" + day ).substr( -2, 2 );
		} else {
			time += "01";
		}
		time += "T00:00:00Z";
		return time;
	}

	if ( dataType === 'string' ) {
		( function() {
			var input = $( '<input type="text" class="wef_string">' );
			snakValueEditor.elements.push( input );
			snakValueEditor.setDataValue = function( datavalue ) {
				input.val( datavalue.value );
			};
			snakValueEditor.hasValue = function() {
				return !$.isEmpty( input.val() );
			};
			snakValueEditor.removeValue = function() {
				input.val( '' );
			};
			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'string',
					value: input.val(),
				};
			};
			snakValueEditor.getAsLabel = function() {
				return $( '<span></span>' ).text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} )();
	} else if ( dataType === 'commonsMedia' ) {
		( function() {
			var input = $( '<input type="text" class="wef_commonsMedia">' );
			snakValueEditor.elements.push( input );
			snakValueEditor.setDataValue = function( datavalue ) {
				input.val( datavalue.value );
			};
			snakValueEditor.hasValue = function() {
				return !$.isEmpty( input.val() );
			};
			snakValueEditor.removeValue = function() {
				input.val( '' );
			};
			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}
				return {
					type: 'string',
					value: input.val(),
				};
			};
			snakValueEditor.getAsLabel = function() {
				return $( '<a></a>' ) //
				.attr( 'href', '//commons.wikimedia.org/wiki/File:' + encodeURI( input.val() ) ) //
				.text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} )();
	} else if ( dataType === 'url' ) {
		( function() {
			function decode( stored ) {
				var abc = 'ёйцукенгшщзхъфывапролджэячсмитьбю';
				abc = abc + abc.toUpperCase();
				var patterns = [];
				var map = {};
				for ( var i = 0; i < abc.length; i++ ) {
					var c = abc.charAt( i );
					var e = encodeURIComponent( c );
					patterns.push( e );
					map[e] = c;
				}

				patterns.push( '%20' );
				map['%20'] = '+';

				var pattern = new RegExp( patterns.join( '|' ), 'g' );
				return stored.replace( pattern, function( match ) {
					return map[match];
				} );
			}
			function encode( displayed ) {
				var abc = 'ёйцукенгшщзхъфывапролджэячсмитьбю';
				abc = abc + abc.toUpperCase();
				var patterns = [];
				var map = {};
				for ( var i = 0; i < abc.length; i++ ) {
					var c = abc.charAt( i );
					var e = encodeURIComponent( c );
					patterns.push( c );
					map[c] = e;
				}
				patterns.push( '\\+' );
				map['+'] = '%20';

				var pattern = new RegExp( patterns.join( '|' ), 'g' );
				return displayed.replace( pattern, function( match ) {
					return map[match];
				} );
			}

			var input = $( '<input type="url" class="wef_url">' );
			snakValueEditor.elements.push( input );
			snakValueEditor.setDataValue = function( datavalue ) {
				input.val( decode( datavalue.value ) );
			};

			snakValueEditor.hasValue = function() {
				return !$.isEmpty( input.val() );
			};
			snakValueEditor.removeValue = function() {
				input.val( '' );
			};

			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'string',
					value: encode( input.val() ),
				};
			};
			snakValueEditor.getAsLabel = function() {
				return $( '<span></span>' ).text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} )();
	} else if ( dataType === 'time' ) {
		( function() {

			var table = $( '<table class="wef_time_table"></table>' );
			snakValueEditor.elements.push( table );

			var inputTime = $( '<input type="text" class="wef_time_time">' );
			var inputTimeZone = $( '<input type="text" class="wef_time_timezone">' );

			var inputPrecision = $( '<select class="wef_time_precision">' );
			for ( var i = 0; i < 15; i++ ) {
				var option = $( '<option></option>' );
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

				var tr = $( '<tr></tr>' );
				tr.attr( 'title', textTitle );
				table.append( tr );

				var th = $( '<th></th>' );
				tr.append( th );

				var label = $( '<label></label>' );
				label.text( textLabel + ': ' );
				label.attr( 'id', input.attr( 'id' ) );
				th.append( label );

				var td = $( '<td></td>' );
				td.append( input );
				tr.append( td );
			};

			addTr( i18n.inputTimeTimeLabel, i18n.inputTimeTimeTitle, inputTime );
			addTr( i18n.inputTimeTimeZoneLabel, i18n.inputTimeTimeZoneTitle, inputTimeZone );
			addTr( i18n.inputTimePrecisionLabel, i18n.inputTimePrecisionTitle, inputPrecision );
			addTr( i18n.inputTimeCalendarModelLabel, i18n.inputTimeCalendarModelTitle, inputCalendarModel.select );

			snakValueEditor.setDataValue = function( datavalue ) {
				inputTime.val( datavalue.value.time );
				inputTimeZone.val( datavalue.value.timezone );
				inputPrecision.val( datavalue.value.precision );
				inputCalendarModel.val( datavalue.value.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) );
			};
			snakValueEditor.hasValue = function() {
				return !$.isEmpty( inputTime.val() );
			};
			snakValueEditor.removeValue = function() {
				inputTime.val( '' );
			};
			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
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
			snakValueEditor.getAsLabel = function() {
				// TODO: format value using server
				return $( '<span></span>' ).text( inputTime.val() );
			};

			inputTime.change( changeF );
			inputTime.keyup( changeF );
			inputTimeZone.change( changeF );
			inputTimeZone.keyup( changeF );
			inputPrecision.change( changeF );
			inputPrecision.keyup( changeF );
			inputCalendarModel.select.change( changeF );
			inputCalendarModel.select.keyup( changeF );
		} )();
	} else if ( dataType === 'time-days' ) {
		( function() {

			snakValueEditor.elements.push( selectDateTimePrecision );

			var input = $( '<input type="date" class="wef_time_date">' );
			input.datepicker( {
				dateFormat: 'd MM yy',
				changeMonth: true,
				changeYear: true,
				showButtonPanel: true,
			} );
			snakValueEditor.elements.push( input );

			snakValueEditor.elements.push( oldStyleCheckbox );
			snakValueEditor.elements.push( oldStyleCheckboxLabel );

			snakValueEditor.setDataValue = function( datavalue ) {
				if ( !/^[\\+\\-]00000/.test( datavalue.value.time ) ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}

				if ( datavalue.value.precision === PRECISION_YEARS ) {
					snakValueEditor.switchDataType( 'time-years', datavalue );
				} else if ( datavalue.value.precision === PRECISION_MONTHS ) {
					snakValueEditor.switchDataType( 'time-month', datavalue );
				} else if ( datavalue.value.precision !== PRECISION_DAYS ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}

				var parseable = datavalue.value.time.replace( /^([\\+\\-])00000/, '$1' );
				if ( isNaN( Date.parse( parseable ) ) ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}

				input.datepicker( 'setDate', new Date( parseable ) );
				oldStyleCheckbox.val( datavalue.value.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) === CALENDAR_JULIAN );
			};
			snakValueEditor.hasValue = function() {
				return !$.isEmpty( input.val() );
			};
			snakValueEditor.removeValue = function() {
				input.val( '' );
			};
			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}

				/** @type {Date} */
				var date = input.datepicker( 'getDate' );
				return {
					type: 'time',
					value: {
						time: formatDate( date.getFullYear(), date.getMonth() + 1, date.getDate() ),
						timezone: 0,
						precision: PRECISION_DAYS,
						before: 0,
						after: 0,
						calendarmodel: PREFIX_CALENDAR_MODEL + ( oldStyleCheckbox.val() ? CALENDAR_GREGORIAN : CALENDAR_JULIAN ),
					},
				};
			};
			snakValueEditor.getAsLabel = function() {
				return $( '<span></span>' ).text( input.val() );
			};

			input.change( changeF );
			input.keyup( changeF );
		} )();
	} else if ( dataType === 'time-months' ) {
		( function() {

			snakValueEditor.elements.push( selectDateTimePrecision );

			var months = $( '<select class="wef_time_month">' );
			for ( var i = 1; i <= 12; i++ ) {
				var option = $( '<option>' );
				option.attr( 'value', i );
				option.text( wgMonthNames[i] );
				months.append( option );
			}
			snakValueEditor.elements.push( months );

			var years = $( '<input type="number" step="1" />' );
			snakValueEditor.elements.push( years );

			snakValueEditor.elements.push( oldStyleCheckbox );
			snakValueEditor.elements.push( oldStyleCheckboxLabel );

			snakValueEditor.setDataValue = function( datavalue ) {
				if ( !/^[\\+\\-]00000/.test( datavalue.value.time ) ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}
				var parseable = datavalue.value.time.replace( /^([\\+\\-])00000/, '$1' );
				if ( isNaN( Date.parse( parseable ) ) ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}
				var date = new Date( parseable );
				months.val( date.getMonth() + 1 );
				years.val( date.getFullYear() );

				oldStyleCheckbox.val( datavalue.value.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) === CALENDAR_JULIAN );
			};
			snakValueEditor.hasValue = function() {
				return !$.isEmpty( months.val() ) || !$.isEmpty( years.val() );
			};
			snakValueEditor.removeValue = function() {
				months.prop( 'selectedIndex', -1 );
				years.val( '' );
			};
			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: formatDate( years.val(), months.val() ),
						timezone: 0,
						precision: PRECISION_MONTHS,
						before: 0,
						after: 0,
						calendarmodel: PREFIX_CALENDAR_MODEL + ( oldStyleCheckbox.val() ? CALENDAR_GREGORIAN : CALENDAR_JULIAN ),
					},
				};
			};
			snakValueEditor.getAsLabel = function() {
				return $( '<span></span>' ).text( wgMonthNames[months.val()] + " " + years.val() );
			};

			months.change( changeF );
			months.keyup( changeF );
			years.change( changeF );
			years.keyup( changeF );
		} )();
	} else if ( dataType === 'time-years' ) {
		( function() {

			snakValueEditor.elements.push( selectDateTimePrecision );

			var years = $( '<input type="number" step="1" />' );
			snakValueEditor.elements.push( years );

			snakValueEditor.elements.push( oldStyleCheckbox );
			snakValueEditor.elements.push( oldStyleCheckboxLabel );

			snakValueEditor.setDataValue = function( datavalue ) {
				if ( !/^[\\+\\-]00000/.test( datavalue.value.time ) ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}
				var parseable = datavalue.value.time.replace( /^([\\+\\-])00000/, '$1' );
				if ( isNaN( Date.parse( parseable ) ) ) {
					snakValueEditor.switchDataType( 'time', datavalue );
				}
				var date = new Date( parseable );
				years.val( date.getFullYear() );

				oldStyleCheckbox.val( datavalue.value.calendarmodel.substr( PREFIX_CALENDAR_MODEL.length ) === CALENDAR_JULIAN );
			};
			snakValueEditor.hasValue = function() {
				return !$.isEmpty( years.val() );
			};
			snakValueEditor.removeValue = function() {
				years.val( '' );
			};
			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}

				return {
					type: 'time',
					value: {
						time: formatDate( years.val() ),
						timezone: 0,
						precision: PRECISION_YEARS,
						before: 0,
						after: 0,
						calendarmodel: PREFIX_CALENDAR_MODEL + ( oldStyleCheckbox.val() ? CALENDAR_GREGORIAN : CALENDAR_JULIAN ),
					},
				};
			};
			snakValueEditor.getAsLabel = function() {
				return $( '<span></span>' ).text( years.val() );
			};

			years.change( changeF );
			years.keyup( changeF );
		} )();
	} else if ( dataType === 'wikibase-item' ) {
		( function() {
			var input = $( '<input type="text" class="wef_wikibase-item">' );
			snakValueEditor.elements.push( input );
			snakValueEditor.setDataValue = function( datavalue ) {
				var entityId = 'Q' + datavalue.value['numeric-id'];
				input.data( 'value-entity-id', entityId );
				input.data( 'value-entity-label', '' );
				input.data( 'value-entity-description', '' );
				input.val( '(' + entityId + ')' );

				wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
					if ( input.data( 'value-entity-id' ) === entityId ) {
						input.data( 'value-entity-label', label );
						input.data( 'value-entity-description', description );
						input.val( label + ' (' + entityId + ')' );
						input.attr( 'title', description );
					}
				} );
			};

			snakValueEditor.hasValue = function() {
				return !$.isEmpty( input.data( 'value-entity-id' ) );
			};
			snakValueEditor.removeValue = function() {
				input.val( '' );
				input.data( 'value-entity-id', '' );
				input.data( 'value-entity-label', '' );
				input.data( 'value-entity-description', '' );
			};

			snakValueEditor.getDataValue = function() {
				if ( !snakValueEditor.hasValue() ) {
					throw new Error( 'No value' );
				}

				var datavalue = {};
				if ( typeof ( input.data( 'value-entity-id' ) ) !== 'undefined' ) {
					datavalue.value = {
						"entity-type": "item",
						"numeric-id": input.data( 'value-entity-id' ).substr( 1 ),
					};
				}
				datavalue.type = 'wikibase-entityid';
				return datavalue;
			};
			snakValueEditor.getAsLabel = function() {
				var entityId = input.data( 'value-entity-id' );
				if ( $.isEmpty( entityId ) ) {
					return $( '<span></span>' );
				}

				var result = $( '<span></span>' );
				result.text( '(' + entityId + ')' );
				wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
					result.text( label + ' (' + entityId + ')' );
					result.attr( 'title', description );
				} );
				return result;
			};

			input.autocomplete( {
				source: function( request, response ) {
					var term = request.term;
					$.ajax( {
						dataType: 'json',
						url: '//www.wikidata.org/w/api.php' //
								+ '?origin=' + encodeURIComponent( location.protocol + wgServer ) // 
								+ '&format=json' // 
								+ '&action=wbsearchentities' //
								+ '&language=' + encodeURIComponent( wgContentLanguage ) // 
								+ '&limit=15' //
								+ '&search=' + encodeURIComponent( term ),
					} ).done( function( result ) {
						var list = [];
						$.each( result.search, function( index, entity ) {
							var item = {
								label: entity.label,
								value: entity.id,
							};
							if ( typeof entity.description !== "undefined" ) {
								item.desc = entity.description;
							}
							list.push( item );
						} );
						response( list );
					} );
				},
				select: function( event, ui ) {
					var item = ui.item;
					var input = $( event.target );
					input.data( 'value-entity-id', item.value );
					input.data( 'value-entity-label', item.label );
					input.val( item.label );

					if ( typeof item.desc !== 'undefined' ) {
						input.data( 'value-entity-description', item.desc );
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

				if ( typeof id === "undefined" || typeof label === "undefined" ) {
					input.val( '' );
					input.removeData( 'value-entity-id' );
					input.removeData( 'value-entity-label' );
				} else {
					input.val( label );
				}
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
			} );

			input.data( "autocomplete" )._renderItem = function( ul, item ) {
				return $( '<li>' ).append(
						'<a><strong>' + item.label + '</strong> <span style="color: darkgray;">' + item.value + '</span><br>'
								+ ( typeof ( item.desc ) === 'undefined' ? '' : item.desc ) + '</a>' ).data( 'item.autocomplete', item ).appendTo( ul );
			};

			input.change( changeF );
			input.keyup( changeF );
		} )();
	} else {
		snakValueEditor.elements.push( $( '<b>Unknown type: ' + dataType + '</b>' ) );
		snakValueEditor.getAsLabel = function() {
			return $( '<i>Unknown type: ' + dataType + '</i>' );
		};
	}
};

/**
 * Creates select field that has predefined number of values, but also support
 * extending values based on load external values. Uses {@link WEF_LabelsCache}
 * and JQuery autoselect
 */
var WEF_ItemSelect = function() {
	var select = $( '<select class="wef_item_select">' );
	this.select = select;

	this.addOption = function( entityId ) {
		if ( typeof entityId === 'undefined' || entityId === null ) {
			throw new Error( 'incorrect entity ID: ' + entityId );
		}

		var option = $( '<option></option>' ).appendTo( select );
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
			var option = select.find( ":selected" );
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

	var select = $( '<select class="wef-snaktypeselector-menu" size="3" />' );
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

	$( '<option value="value">' ).appendTo( select ).text( i18n.snakTypeValue );
	$( '<option value="novalue">' ).appendTo( select ).text( i18n.snakTypeNoValue );
	$( '<option value="somevalue">' ).appendTo( select ).text( i18n.snakTypeSomeValue );

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
		var option = select.find( ":selected" );
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
			my: "left top",
			at: "right top",
			of: anchor,
		} );
		this.listener = listener;
		this.visible = true;
	};
};

/** @type {WEF_SelectSnakType} */
var wef_selectSnakType;
mediaWiki.loader.using( [ 'jquery.ui.button' ], function() {
	addOnloadHook( function() {
		wef_selectSnakType = new WEF_SelectSnakType();
	} );
} );

var WEF_SnakEditor = function( dataType ) {
	if ( typeof dataType === 'undefined' ) {
		throw new Error( "DataType is not specified" );
	}

	var i18n = wef_Editors_i18n;
	var snakEditor = this;

	this.snakTypeMode = null;
	this.valueEditor = null;

	var butttonSelectSnakType = $( '<button >' );
	butttonSelectSnakType.button( {
		icons: {
			primary: 'ui-icon-triangle-1-e'
		},
		text: false,
		label: i18n.buttonSelectSnakType,
	} ).click( function() {
		if ( wef_selectSnakType.visible && wef_selectSnakType.initiator === this ) {
			wef_selectSnakType.hide();
		} else {
			wef_selectSnakType.initiator = this;
			wef_selectSnakType.show( butttonSelectSnakType, snakEditor.snakTypeMode, function( value ) {
				snakEditor.switchToSnakType( value );
			} );
		}
	} ).addClass( 'wef_select_snak_type_button' );

	// JQuery parent element
	this.parent = null;
	this.table = $( '<table class="wef_snak_table">' );
	var tr = $( '<tr></tr>' ).appendTo( this.table );
	this.hiddenBehindLabel = false;

	this.appendTo = function( parent ) {
		this.parent = parent;
		this.table.appendTo( this.parent );
		tr.append( $( '<td class="wef_button_cell">' ).append( butttonSelectSnakType ) );
		if ( this.valueEditor !== null ) {
			var td2 = $( '<td class="wef_snak_table_value_editor_cell">' ).appendTo( tr );
			$.each( this.valueEditor.elements, function( index, item ) {
				td2.append( item );
			} );
		}
	};

	this.hideBehindLabel = function() {
		// assuming valueEditor is not null and parent is set
		if ( this.parent === null )
			throw new Error( "parent is not set yet to hide behind label" );
		if ( this.valueEditor === null )
			throw new Error( "valueEditor is not set yet to hide behind label" );

		var label = $( '<span></span>' );
		label.css( 'cursor', 'pointer' );

		if ( this.snakTypeMode === 'value' ) {
			label.append( this.valueEditor.getAsLabel() );
		} else {
			label.text( wef_selectSnakType.text() );
		}

		this.table.before( label );
		this.table.hide();
		this.valueEditor.hide();

		snakEditor.hiddenBehindLabel = true;
		label.click( function() {
			label.remove();
			snakEditor.table.show();
			if ( snakEditor.snakTypeMode === 'value' ) {
				snakEditor.valueEditor.show();
			}
			snakEditor.hiddenBehindLabel = false;
		} );

		return label;
	};

	this.switchToSnakType = function( snakType ) {
		if ( this.snakTypeMode === snakType ) {
			return;
		}

		if ( this.valueEditor !== null ) {
			this.valueEditor.hide();
		}
		this.elements = [];
		this.snakTypeMode = snakType;

		var _this = this;
		if ( snakType === 'value' ) {
			if ( this.valueEditor === null ) {
				this.valueEditor = new WEF_SnakValueEditor( dataType );
				if ( this.parent !== null ) {
					var parent = this.parent;
					$.each( this.valueEditor.elements, function( index, item ) {
						parent.append( item );
					} );
				}
				$( this.valueEditor ).change( function() {
					$( _this ).change();
				} );
			}
			this.valueEditor.show();
		}
		$( this ).change();
	};

	this.hasValue = function() {
		return this.valueEditor.hasValue();
	};

	this.getDataValue = function() {
		return this.valueEditor.getDataValue();
	};

	this.removeValue = function() {
		this.valueEditor.removeValue();
	};

	this.setDataValue = function( datavalue ) {
		this.valueEditor.setDataValue( datavalue );
		$( this ).change();
	};

	this.load = function( snak ) {
		this.switchToSnakType( snak.snaktype );
		if ( snak.snaktype === 'value' ) {
			this.setDataValue( snak.datavalue );
		}
	};

	this.remove = function() {
		if ( this.valueEditor !== null ) {
			$.each( this.valueEditor.elements, function( index, item ) {
				item.remove();
			} );
		}
		butttonSelectSnakType.remove();
		this.valueEditor = null;
		this.parent = null;
	};

	this.switchToSnakType( 'value' );
};

/**
 * Returns the array of claims for specified definition from entity
 * 
 * @param definition
 *            see #WEF_ClaimEditor
 * @param claims
 *            Wikidata entity JSON
 * @returns {WEF_Claim[]}
 */
function WEF_filterClaims( definition, claims ) {
	var isPropertyEditor = /^P\d+$/i.test( definition.code );
	var isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

	if ( !isPropertyEditor && !isQualifierEditor ) {
		throw new Error( "Unsupported code: " + definition.code );
	}

	/* Main property ID */
	/** @type {string} */
	var propertyId;
	/* Required property value */
	var propertyValue;

	if ( isPropertyEditor ) {
		var test = definition.code.match( /^P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = undefined;
	}
	if ( isQualifierEditor ) {
		var test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = 'Q' + test[2];
	}

	if ( typeof claims === 'undefined' || typeof claims[propertyId] === 'undefined' ) {
		return [];
	}

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

	throw new Error( "Illegal state" );
}

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
 * <li><tt>updates( updates )</tt> -- updates special structure:
 * <ul>
 * <li><tt>data</tt> -- JSON structure to be sent to <tt>wgeditclaims</tt> to update Wikidata claim
 * <li><tt>removedClaims</tt> -- list of claims ID to be removed
 * </ul>
 * <li><tt>afterAppend( )</tt> -- method must be called after element placement
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

	var i18n = wef_Editors_i18n;
	var claimEditor = this;

	var getLabel = function() {
		var label = $( '<label></label>' );

		var updateLabel = function() {
			var newLabel = '';

			if ( typeof ( definition.labelPrefix ) !== "undefined" ) {
				newLabel += definition.labelPrefix;
			}

			if ( typeof ( definition.label ) !== "undefined" ) {
				newLabel += wef_LabelsCache.getLabel( definition.label );
			}

			if ( typeof ( definition.labelQualifier ) !== "undefined" ) {
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

		if ( typeof ( definition.label ) !== "undefined" ) {
			wef_LabelsCache.getOrQueue( definition.label, updateLabel );
		}
		if ( typeof ( definition.labelQualifier ) !== "undefined" ) {
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

	var isPropertyEditor = /^P\d+$/i.test( definition.code );
	var isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

	/* Main property ID */
	var propertyId;
	/* Required property value */
	var propertyValue;
	/* Qualifier property to edit */
	var qualifierPropertyId;

	if ( isPropertyEditor ) {
		var test = definition.code.match( /^P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = undefined;
		qualifierPropertyId = undefined;
	} else if ( isQualifierEditor ) {
		var test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = 'Q' + test[2];
		qualifierPropertyId = 'P' + test[3];
	} else {
		throw new Error( "Unsupported code: " + definition.code );
	}

	this.tbody = $( '<tbody class="wef_property_editor_tbody wef_property_editor_' + propertyId + '"></tbody>' );
	var row1 = $( '<tr class="wef_property_editor_row"></tr>' ).appendTo( this.tbody );
	var flagCell = $( '<td class="wef_property_editor_flag"></td>' ).appendTo( row1 );
	var labelCell = $( '<th class="wef_property_editor_label"></th>' ).appendTo( row1 );
	var beforeInputCell = $( '<td class="wef_button_cell"></td>' ).appendTo( row1 );
	var inputCell = $( '<td class="wef_property_editor_input"></td>' ).appendTo( row1 );

	if ( isPropertyEditor ) {
		wef_LabelsCache.getOrQueue( propertyId, function( label, description ) {
			if ( !$.isEmpty( description ) && description !== propertyId )
				row1.attr( 'title', description );
		} );
	}

	var snakEditor = new WEF_SnakEditor( definition.datatype );

	/* TBODY */
	this.hide = function() {
		this.tbody.hide();
	};
	this.show = function() {
		this.tbody.show();
	};
	this.afterAppend = function() {
		snakEditor.appendTo( inputCell );

		// set aucomplete if defined
		if ( definition.datatype === 'string' && typeof ( definition.autocomplete ) === "object" ) {
			var input = snakEditor.valueEditor.elements[0];
			input.autocomplete( definition.autocomplete );
			input.on( "autocompleteselect", function( event, ui ) {
				input.val( ui.item.value );
				input.change();
			} );
		}
	};

	this.hideBehindLabel = function() {
		snakEditor.hideBehindLabel();
	};

	/* Flag */
	if ( definition.flag !== "undefined" && typeof ruWikiFlagsHtml !== 'undefined' && typeof ruWikiFlagsHtml[definition.flag] !== "undefined" ) {
		flagCell.html( ruWikiFlagsHtml[definition.flag] );
	}

	/* Label */
	var labelToDisplay = getLabel( definition );
	var labelPlaceholder = $( '<label></label>' );

	labelCell.empty();
	labelCell.append( labelToDisplay );
	labelCell.append( labelPlaceholder );

	this.hideLabel = function( placeholderText ) {
		if ( typeof placeholderText === 'string' ) {
			labelPlaceholder.text( placeholderText );
		}
		labelToDisplay.hide();
		labelPlaceholder.show();
	};
	this.showLabel = function() {
		labelToDisplay.show();
		labelPlaceholder.hide();
	};

	var row2 = $( '<tr class="wef_property_editor_row"></tr>' ).appendTo( this.tbody );
	$( '<td class="wef_property_editor_cell_emtpy"></td>' ).appendTo( row2 );
	var bottomContentCell = $( '<td colspan="100" class="wef_property_editor_bottom_content"></td>' ).appendTo( row2 );
	var bottomContentTable = $( '<table class="wef_qualifiers"></table>' ).appendTo( bottomContentCell );

	this.disabled = false;

	this.definition = definition;
	this.wikidataClaim = null;
	this.wikidataSnak = null;
	this.wikidataOldValue = null;

	this.hasValue = function() {
		return snakEditor.hasValue();
	};
	this.removeValue = function() {
		snakEditor.removeValue();
	};
	this.getDataValue = function() {
		return snakEditor.getDataValue();
	};
	this.setDataValue = function( datavalue ) {
		snakEditor.setDataValue( datavalue );
	};

	this.getSnakValue = function() {
		if ( snakEditor.snakTypeMode === 'value' && !this.hasValue() ) {
			throw new Error( 'no value' );
		}

		var snak = {};
		snak.snaktype = snakEditor.snakTypeMode;

		if ( isPropertyEditor ) {
			snak.property = propertyId;
		}
		if ( isQualifierEditor ) {
			snak.property = qualifierPropertyId;
			if ( this.wikidataSnak !== null ) {
				snak.hash = this.wikidataSnak.hash;
			}
		}

		snak.datatype = definition.datatype;
		if ( snakEditor.snakTypeMode === 'value' ) {
			snak.datavalue = this.getDataValue();
		}

		return snak;
	};

	$( snakEditor ).change( function() {
		$( claimEditor ).change();
	} );

	this.load = function( claim ) {

		claimEditor.wikidataClaim = claim;

		if ( isPropertyEditor ) {
			// load property main snak
			claimEditor.wikidataSnak = claim.mainsnak;
			if ( claim.mainsnak ) {
				snakEditor.load( claim.mainsnak );
			}
		} else if ( isQualifierEditor ) {
			/*
			 * since it's loading time, we assume there is qualifier with
			 * specified value
			 */
			var qualifiers = claim.qualifiers[qualifierPropertyId];
			if ( !$.isArray( qualifiers ) ) {
				throw new Error( 'Qualifiers «' + qualifierPropertyId + '» of ' + propertyId + '[' + propertyValue + '] not found or not an array' );
			}
			if ( qualifiers.length != 1 ) {
				throw new Error( 'Length of qualifiers «' + qualifierPropertyId + '» of ' + propertyId + '[' + propertyValue + '] is not 1 as expected' );
			}

			var qualifier = qualifiers[0];
			claimEditor.wikidataSnak = qualifier;
			snakEditor.load( qualifier );
		} else {
			throw new Error( "Unsupported code: " + definition.code );
		}

		claimEditor.wikidataOldValue = this.hasValue() ? JSON.stringify( this.getSnakValue() ) : null;

		if ( typeof claim.qualifiers !== 'undefined' ) {
			$.each( claim.qualifiers, function( property, qualifiers ) {
				if ( isQualifierEditor && property === qualifierPropertyId ) {
					return;
				}
				$.each( qualifiers, function( index, qualifier ) {
					var qualifierHolder = claimEditor.addQualifier();
					qualifierHolder.load( qualifier );
				} );
			} );
		}
	};

	this.updates = function( updates ) {
		if ( this.disabled ) {
			return;
		}

		// util functions
		var appendToNamedMap = function( element, mapName, key, obj ) {
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

		// check if we have any changes
		var hasValue = snakEditor.snakTypeMode !== 'value' || snakEditor.hasValue();
		var newSnak = hasValue ? this.getSnakValue() : null;

		var oldClaim = this.wikidataClaim;
		var oldSnak = this.wikidataSnak;
		var oldSnakStr = this.wikidataOldValue;

		if ( !hasValue ) {
			if ( oldClaim != null ) {
				updates.removedClaims.push( oldClaim.id );
			}
		} else {

			var claim;
			var needToUpdate = false;

			if ( isPropertyEditor ) {
				// do we have claim?
				if ( oldClaim === null ) {
					claim = {
						type: 'statement',
						mainsnak: newSnak,
						rank: 'normal',
					};
				} else {
					claim = {
						id: oldClaim.id,
						mainsnak: newSnak,
						rank: oldClaim.rank,
					}
				}
			} else if ( isQualifierEditor ) {
				var claim = {};

				if ( oldClaim !== null ) {
					claim.type = oldClaim.type;
					claim.id = oldClaim.id;
					claim.mainsnak = oldClaim.mainsnak;
					claim.rank = oldClaim.rank;
				} else {
					claim.type = 'statement';
					claim.mainsnak = {
						snaktype: "value",
						property: propertyId,
						datatype: "wikibase-item",
						datavalue: {
							value: {
								"entity-type": "item",
								"numeric-id": propertyValue.substr( 1 ),
							},
							type: "wikibase-entityid",
						}
					};
					claim.rank = 'normal';
				}

				var qualifier = newSnak;
				if ( oldSnak !== null ) {
					qualifier.hash = oldSnak.hash;
				}
				appendToNamedMap( claim, 'qualifiers', qualifierPropertyId, qualifier );
			} else {
				throw new Error( "Unsupported code: " + definition.code );
			}

			needToUpdate = needToUpdate || ( JSON.stringify( newSnak ) !== oldSnakStr );

			// save qualifiers
			$.each( claimEditor.qualifiers, function( index, qualifierHolder ) {
				if ( claimEditor.editor === null ) {
					// we didn't select property type yet
					return;
				}

				var qHasValue = qualifierHolder.editor.snakTypeMode !== 'value' || qualifierHolder.editor.hasValue();
				var qNewSnak = qHasValue ? qualifierHolder.getSnakValue() : null;

				var qOldSnakStr = qualifierHolder.wikidataOldValue;

				if ( !qHasValue ) {
					// remove qualifier from table and add it hash to
					// this.removedQualifiersHashes
					qualifierHolder.onRemove();
				} else {
					// always add qualifier, otherwise it will be removed!
					appendToNamedMap( claim, 'qualifiers', qualifierHolder.property, qNewSnak );

					needToUpdate = needToUpdate || ( JSON.stringify( qNewSnak ) !== qOldSnakStr );
				}
			} );

			needToUpdate = needToUpdate || ( claimEditor.removedQualifiersHashes.length > 0 );

			if ( needToUpdate ) {
				appendToNamedMap( updates.data, 'claims', propertyId, claim );
			}
		}
	};

	/* Qualifiers support */

	this.qualifiers = [];
	this.removedQualifiersHashes = [];

	/* Add qualifier button */
	if ( typeof ( definition.qualifiers ) !== 'undefined' && definition.qualifiers.length > 0 ) {
		var newButton = $( '<button type="button"></button>' );
		newButton.button( {
			icons: {
				primary: 'ui-icon-tag'
			},
			text: false,
			label: i18n.buttonAddQualifier,
		} ).click( function() {
			claimEditor.addQualifier();
		} ).addClass( 'wef_property_button' );
		beforeInputCell.append( newButton );
	}

	this.addQualifier = function() {
		var qualifierRow = $( '<tr></tr>' ).appendTo( bottomContentTable );
		/** @type {WEF_ItemSelect} */
		var qualifierSelect = new WEF_ItemSelect();
		qualifierSelect.select.appendTo( $( '<td class="wef_qualifiers_select_cell" ></td>' ).appendTo( qualifierRow ) );
		var qualifierEditCell = $( '<td  class="wef_qualifiers_edit_cell"></td>' ).appendTo( qualifierRow );
		var qualifierRemoveCell = $( '<td class="wef_button_cell"></td>' ).appendTo( qualifierRow );

		if ( $.isArray( definition.qualifiers ) ) {
			$.each( definition.qualifiers, function( index, qualifierDefinition ) {
				var code = qualifierDefinition.code;
				var option = qualifierSelect.addOption( code );
				option.data( 'property', code );
				option.data( 'datatype', qualifierDefinition.datatype );
			} );
		}

		// do not select the first
		qualifierSelect.val( null );

		qualifierSelect.hideBehindLabel = function() {
			var select = this.select;
			var label = $( '<span></span>' );
			label.css( 'cursor', 'pointer' );

			var code = select.val();
			label.text( '(' + select.val() + '): ' );
			wef_LabelsCache.getOrQueue( code, function( newLabel, newDescription ) {
				label.text( newLabel + ': ' );
				label.attr( 'title', newDescription );
			} );

			select.before( label );
			select.hide();

			label.click( function() {
				label.remove();
				select.show();
			} );
			return label;
		};

		var qualifierHolder = {
			tbody: qualifierRow,
			select: qualifierSelect,

			property: null,
			datatype: null,
			editor: null,
			wikidataSnak: null,

			setProperty: function( qProperty, qDatatype ) {
				this.property = qProperty;
				this.datatype = qDatatype;

				// do we have qualifier input already?
				if ( this.editor == null ) {
					this.editor = new WEF_SnakEditor( qDatatype );
					this.editor.property = qProperty;
					this.editor.appendTo( qualifierEditCell );
				} else {
					if ( this.editor.property === qProperty ) {
						// leave as it is
					} else {
						this.editor.remove();
						this.editor = new WEF_SnakEditor( qDatatype );
						this.editor.property == qProperty;
						this.editor.appendTo( qualifierEditCell );
					}
				}
				qualifierSelect.val( qProperty );
			},

			hasValue: function() {
				return this.editor.hasValue();
			},

			getSnakValue: function() {
				if ( this.editor.snakTypeMode === 'value' && !this.hasValue() ) {
					throw new Error( 'no value' );
				}

				var snak = {};
				if ( this.wikidataSnak !== null ) {
					snak.hash = this.wikidataSnak.hash;
				}
				snak.snaktype = snakEditor.snakTypeMode;
				snak.property = this.property;
				snak.datatype = this.datatype;
				if ( this.editor.snakTypeMode === 'value' ) {
					snak.datavalue = this.editor.getDataValue();
				}
				return snak;
			},

			load: function( qualifier ) {

				var option = qualifierSelect.val( qualifier.property );
				option.data( 'property', qualifier.property );
				option.data( 'datatype', qualifier.datatype );

				this.wikidataSnak = qualifier;
				var property = qualifier.property;
				var datatype = qualifier.datatype;
				this.setProperty( property, datatype );

				// must present now
				this.editor.load( qualifier );
				// remember old value
				this.wikidataOldValue = this.hasValue() ? JSON.stringify( this.getSnakValue() ) : null;

				var selectLabel = qualifierSelect.hideBehindLabel();
				var editorLabel = this.editor.hideBehindLabel();
				qualifierRemoveCell.css( 'visibility', 'hidden' );

				var firstTime = true;
				qualifierRow.click( function( evt ) {
					if ( firstTime ) {
						firstTime = false;
						qualifierRemoveCell.css( 'visibility', 'inherit' );

						var target = $( evt.target );
						if ( !selectLabel.is( target ) && !$.contains( selectLabel[0], target ) ) {
							selectLabel.click();
						}
						if ( !editorLabel.is( target ) && !$.contains( editorLabel[0], target ) ) {
							editorLabel.click();
						}
					}
				} );
			}
		};
		qualifierHolder.onRemove = function() {
			var index = claimEditor.qualifiers.indexOf( qualifierHolder );
			if ( index !== -1 ) {
				claimEditor.qualifiers.splice( index, 1 );
				var snak = qualifierHolder.wikidataSnak;
				if ( snak !== null && typeof ( snak.hash ) !== 'undefined' && snak.hash !== null ) {
					claimEditor.removedQualifiersHashes.push( snak.hash );
				}
				qualifierRow.remove();
			}
		};

		var removeButton = $( '<button type="button"></button>' );
		removeButton.button( {
			icons: {
				primary: 'ui-icon-trash'
			},
			text: false,
			label: i18n.buttonRemoveQualifier,
		} ).click( function() {
			qualifierHolder.onRemove();
		} ).addClass( 'wef_qualifier_button' );
		qualifierRemoveCell.append( removeButton );

		qualifierSelect.select.change( function() {
			var option = qualifierSelect.select.find( ":selected" );
			if ( option.length > 0 ) {
				var property = option.data( 'property' );
				var datatype = option.data( 'datatype' );
				qualifierHolder.setProperty( property, datatype );
			}
		} );

		claimEditor.qualifiers.push( qualifierHolder );
		return qualifierHolder;
	};
};

/**
 * Organize multiple claim edit rows into single structure
 * 
 * @param definition
 *            {WEF_Definition}
 * @class
 */
var WEF_ClaimEditorsTable = function( definition ) {

	var propertyEditorsTable = this;
	var i18n = wef_Editors_i18n;

	/** @type {WEF_ClaimEditor} */
	var visibleDefinitionRows = [];
	var placed = false;
	var temporaryHolder = null;

	var changeF = function() {
		$( propertyEditorsTable ).change();
	};

	/** @returns {WEF_ClaimEditor} */
	this.add = function() {
		var claimEditor = new WEF_ClaimEditor( definition );

		var beforeCell = $( '<td class="wef_button_cell"></td>' ).prependTo( claimEditor.tbody.find( 'tr' ).first() );
		var afterCell = $( '<td class="wef_button_cell"></td>' ).appendTo( claimEditor.tbody.find( 'tr' ).first() );

		{
			var newButton = $( '<button type="button"></button>' );
			newButton.button( {
				icons: {
					primary: 'ui-icon-plus'
				},
				text: false,
				label: i18n.buttonAddClaim,
			} ).click( function() {
				propertyEditorsTable.add();
			} ).addClass( 'wef_property_button' );
			beforeCell.append( newButton );
		}
		{
			var newButton = $( '<button type="button"></button>' );
			newButton.button( {
				icons: {
					primary: 'ui-icon-trash'
				},
				text: false,
				label: i18n.buttonRemoveClaim,
			} ).click( function() {

				var question = i18n.confirmDeleteClaim //
				.replace( '{code}', definition.label ) //
				.replace( '{label}', wef_LabelsCache.getLabel( definition.label ) );

				var r = !claimEditor.hasValue() || confirm( question );
				if ( r ) {
					claimEditor.removeValue();
					claimEditor.hide();

					/*
					 * add before removing to insert immediately after last
					 * existing
					 */
					if ( visibleDefinitionRows.length === 1 ) {
						propertyEditorsTable.add();
					}

					visibleDefinitionRows = jQuery.grep( visibleDefinitionRows, function( value ) {
						return value != claimEditor;
					} );
				}

			} ).addClass( 'wef_property_button' );
			afterCell.append( newButton );
		}

		visibleDefinitionRows.push( claimEditor );

		if ( placed ) {
			// replaceAll already called
			if ( temporaryHolder !== null ) {
				claimEditor.tbody.replaceAll( temporaryHolder );
				temporaryHolder = null;
			} else {
				var prev = visibleDefinitionRows[visibleDefinitionRows.length - 2].tbody;
				var curr = visibleDefinitionRows[visibleDefinitionRows.length - 1].tbody;
				curr.insertAfter( prev );
			}
			claimEditor.afterAppend();
		}

		$( claimEditor ).change( function() {
			changeF();
		} );

		return claimEditor;
	};

	/**
	 * Hide all input boxes behind labels, so interface looks much cleaner and
	 * simpler
	 */
	this.hideBehindLabels = function() {
		$.each( visibleDefinitionRows, function( i, editor ) {
			editor.hideBehindLabel();
		} );
	};

	this.load = function( entity ) {
		/** @type {WEF_Claim[]} */
		var claims = WEF_filterClaims( definition, entity.claims );

		$.each( claims, function( i, claim ) {
			/** @type {WEF_ClaimEditor} */
			var editor = propertyEditorsTable.add();
			editor.load( claim );
		} );
		if ( this.size() === 0 ) {
			propertyEditorsTable.add();
		}
	};

	/** Replace each target element with the set of matched elements. */
	this.replaceAll = function( target ) {
		if ( placed ) {
			throw new Error( "Claims edit table is already placed on the form" );
		}
		placed = true;

		if ( visibleDefinitionRows.length < 1 ) {
			// nothing loaded or created yet
			temporaryHolder = $( '<tbody><!-- Temporary holder for ' + definition.code + ' --></tbody>' );
			temporaryHolder.replaceAll( target );
			return;
		}

		for ( var i = 0; i < visibleDefinitionRows.length; i++ ) {
			var claimEditor = visibleDefinitionRows[i];
			if ( i === 0 ) {
				claimEditor.tbody.replaceAll( target );
			} else {
				claimEditor.tbody.insertAfter( visibleDefinitionRows[i - 1].tbody );
			}
			claimEditor.afterAppend();
		}
	};

	this.size = function() {
		return visibleDefinitionRows.length;
	};

};