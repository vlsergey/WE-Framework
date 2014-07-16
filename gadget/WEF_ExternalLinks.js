/**
 * Gadget based on WE-Framework to edit external links and linked sites
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */

wef_ExternalLinks_i18n_en = {

	buttonMenuLabel: 'WEF: Links',
	buttonNavboxLabel: '[edit links]',
	buttonViafLabel: 'Find and download VIAF data',
	editFormTitle: 'Edit external links and linked sites',

	dialogButtonUpdateLabelsText: 'Update labels',
	dialogButtonUpdateLabelsLabel: 'Redownload properties, qualificator and objects labels and descriptions from Wikidata',
	dialogButtonSaveText: 'Save',
	dialogButtonSaveLabel: 'Close the dialog and save all changes to Wikidata',
	dialogButtonCloseText: 'Cancel',
	dialogButtonCloseLabel: 'Close the dialog and discard all changes (do not save)',
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
	tabAuthorityControlVIAF: 'Authority Control (VIAF)',
	tabAuthorityControlOther: 'Authority Control (etc.)',

	tipDefault: 'ID «{0}» is incorrect. It should match the pattern «{1}»',
	tipOnlyNumbers: 'ID «{0}» should contains only numbers',

	tips: {},

	getTip: function( definition ) {
		var tip = this.tipDefault;
		if ( definition.check.toString() === /^\d+$/.toString() ) {
			tip = this.tipOnlyNumbers;
		}
		if ( typeof ( this.tips[definition.code] ) !== "undefined" ) {
			tip = this.tips[definition.code];
		}
		if ( $.isFunction( tip ) ) {
			tip = tip();
		}
		tip = tip.replace( '{1}', definition.check.toString() );
		return tip;
	},
};

wef_ExternalLinks_i18n_ru = {

	buttonMenuLabel: 'WEF: Ссылки',
	buttonNavboxLabel: '[править ссылки]',
	buttonViafLabel: 'Найти и загрузить данные с сервера VIAF',

	dialogButtonUpdateLabelsText: 'Обновить названия',
	dialogButtonUpdateLabelsLabel: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
	dialogButtonSaveText: 'Сохранить',
	dialogButtonSaveLabel: 'Закрыть окно и сохранить все изменения в Викиданных',
	dialogButtonCloseText: 'Отмена',
	dialogButtonCloseLabel: 'Закрыть окно и отменить все изменения (не сохранять)',
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

		'Q355': 'Идентификатор «Facebook» содержит недопустимые символы',
		'Q866': 'Идентификатор «YouTube» содержит недопустимые символы',
		'Q103204': 'Идентификатор «Flickr» содержит недопустимые символы',
		'Q116933': 'Идентификатор «ВКонтакте» должен иметь форму id+цифры (например «id123456789»), иначе его не пропустит спам-лист',
		'Q156376': 'Идентификатор «Vimeo» содержит недопустимые символы',
		'Q171186': 'Идентификатор «Blogger» содержит недопустимые символы',
		'Q183718': 'Идентификатор Last FM содержит недопустимые символы',
		'Q209330': 'Идентификатор «Instagram» содержит недопустимые символы',
		'Q219523': 'Идентификатор «Живого журнала» содержит недопустимые символы',
		'Q234535': 'URL для «БСЭ» должен начинаться с «http://slovari.yandex.ru/~%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8/%D0%91%D0%A1%D0%AD/» или с «http://slovari.yandex.ru/~книги/БСЭ/»',
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

	getTip: function( definition ) {
		var tip = this.tipDefault;
		if ( definition.check.toString() === /^\d+$/.toString() ) {
			tip = this.tipOnlyNumbers;
		}
		if ( typeof ( this.tips[definition.code] ) !== "undefined" ) {
			tip = this.tips[definition.code];
		}
		if ( $.isFunction( tip ) ) {
			tip = tip();
		}
		tip = tip.replace( '{1}', definition.check.toString() );
		return tip;
	},
};

var wef_ExternalLinks_i18n = {
	buttonMenuLabel: '{buttonMenuLabel}',
	buttonNavboxLabel: '{buttonMenuLabel}',
	buttonViafLabel: '{buttonViafLabel}',
	editFormTitle: '{editFormTitle}',

	dialogButtonUpdateLabelsText: '{dialogButtonUpdateLabelsText}',
	dialogButtonUpdateLabelsLabel: '{dialogButtonUpdateLabelsLabel}',
	dialogButtonSaveText: '{dialogButtonSaveText}',
	dialogButtonSaveLabel: '{dialogButtonSaveLabel}',
	dialogButtonCloseText: '{dialogButtonCloseText}',
	dialogButtonCloseLabel: '{dialogButtonCloseLabel}',
	dialogTitle: '{dialogTitle}',

	tabOfficialPages: '{tabOfficialPages}',
	tabTexts: '{tabTexts}',
	tabMedia: '{tabMedia}',
	tabTheaterAndMovies: '{tabTheaterAndMovies}',
	tabMusic: '{tabMusic}',
	tabLiteratureAndManga: '{tabLiteratureAndManga}',
	tabScience: '{tabScience}',
	tabOther: '{tabOther}',
	tabEncyclopedias: '{tabEncyclopedias}',
	tabAuthorityControlVIAF: '{tabAuthorityControlVIAF}',
	tabAuthorityControlOther: '{tabAuthorityControlOther}',

	tipDefault: '{tipDefault}',
	tipOnlyNumbers: '{tipOnlyNumbers}',

	tips: {},

	getTip: function( definition ) {
		return '{tip}';
	},
};

/** @class */
WEF_ExternalLinks = function() {
	var externalLinksEdit = this;

	var URI_PREFIX;
	var entityId;

	if ( WEF_Utils.isWikidata() ) {
		entityId = mw.config.get( 'wgTitle' );
		URI_PREFIX = '//www.wikidata.org/w/api.php?format=json';
	} else {
		entityId = mw.config.get( 'wgWikibaseItemId' );
		URI_PREFIX = '//www.wikidata.org/w/api.php?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
	}

	this.i18n = wef_ExternalLinks_i18n;
	var i18n = this.i18n;

	this.enabled = /^Q\d+$/.test( entityId );

	this.init = function() {
		WEF_Utils.localize( i18n, 'wef_ExternalLinks_i18n_' );
	};

	this.dialogWidth = $( window ).width() * 0.66;

	var d = {};
	this.definitions = d;

	/**
	 * @param sitelink
	 *            {string} sitelink title to pass
	 * @param urlFunction
	 *            {function} function to convert title to URL
	 * @return {function}
	 */
	var searchClickF = function( sitelink, urlFunction ) {
		return function() {
			var title;
			if ( typeof externalLinksEdit.entity !== 'undefined' // 
					&& typeof externalLinksEdit.entity.sitelinks !== 'undefined' //
					&& typeof externalLinksEdit.entity.sitelinks[sitelink] !== 'undefined' //
					&& typeof externalLinksEdit.entity.sitelinks[sitelink].title !== 'undefined' //
			) {
				title = externalLinksEdit.entity.sitelinks[sitelink].title;
			} else {
				title = wgTitle;
			}

			window.open( urlFunction( title ), '_blank' );
		};
	};

	var regexpPath = /^[\w\.\-\~\$\&\'\(\)\*\+\,\;\=\:\@А-ЯЁа-яё]+$/;
	var regexpTitle = new RegExp( '^[' + wgLegalTitleChars + ']+$' );

	/* author, автор */
	this.definitions.P50 = new WEF_Definition( {
		datatype: 'wikibase-item'
	} );
	this.definitions.P213 = new WEF_Definition( {
		label: 'Q423048',
		labelPrefix: 'ISNI — ',
		normalize: function( id ) {
			if ( /^\d{15}[\dX]$/.exec( id ) ) {
				return id.substring( 0, 4 ) + ' ' + id.substring( 4, 8 ) + ' ' + id.substring( 8, 12 ) + ' ' + id.substring( 12, 16 );
			}
			return id;
		},
		check: /^\d{4} \d{4} \d{4} \d{3}[\dX]$/,
		url: function( id ) {
			var fixedId = id.substring( 0, 4 ) + id.substring( 5, 9 ) + id.substring( 10, 14 ) + id.substring( 15, 19 );
			return 'http://isni-url.oclc.nl/isni/' + fixedId;
		},
		qualifiers: [],
	} );
	this.definitions.P214 = new WEF_Definition( {
		label: 'Q54919',
		labelPrefix: 'VIAF — ',
		viaf: 'viafid',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?viaf\.org\/viaf\/(.*)$/i, '$2' );
		},
		check: /^[1-9]\d{1,8}$/,
		url: function( id ) {
			return 'http://viaf.org/viaf/' + id;
		},
		buttons: [ {
			icons: {
				primary: 'ui-icon-search'
			},
			text: false,
			label: i18n.buttonViafLabel,
			click: function() {
				externalLinksEdit.viafFillDialog.dialog( 'open' );
			},
		} ],
		qualifiers: [],
	} );
	this.definitions.P227 = new WEF_Definition( {
		flag: 'de',
		label: 'Q36578',
		labelPrefix: 'DNB / GND — ',
		viaf: 'dnb',
		normalize: function( id ) {
			return id.replace( /^(.*)x$/, '$1X' );
		},
		check: /^(1|10)\d{7}[0-9X]|[47]\d{6}-\d|[1-9]\d{0,7}-[0-9X]|3\d{7}[0-9X]$/,
		url: function( id ) {
			return 'http://d-nb.info/gnd/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P244 = new WEF_Definition( {
		flag: 'us',
		label: 'Q620946',
		labelPrefix: 'LCCN — ',
		viaf: 'lc',
		url: function( id ) {
			return 'http://id.loc.gov/authorities/names/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P245 = new WEF_Definition( {
		flag: 'us',
		label: 'Q2494649',
		labelPrefix: 'ULAN — ',
		viaf: 'jpg',
		url: function( id ) {
			return 'http://www.getty.edu/vow/ULANFullDisplay?find=&role=&nation=&subjectid=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P268 = new WEF_Definition( {
		flag: 'fr',
		label: 'Q193563',
		labelPrefix: 'BNF — ',
		viaf: 'bnf',
		normalize: function( id ) {
			// remove prefix
			var result = id.replace( /^cb([0-9]{8}\w?)$/i, '$1' );
			if ( /^[0-9]{8}$/.exec( result ) ) {
				// A few lines from
				// https://en.wikisource.org/wiki/User:Inductiveload/BnF_ARK_format
				var bnf_xdigits = '0123456789bcdfghjkmnpqrstvwxz';
				var bnf_check_digit = 0;
				result = 'cb' + id;
				for ( var i = 0; i < id.length; i++ ) {
					bnf_check_digit += bnf_xdigits.indexOf( id[i] ) * ( i + 1 );
				}
				// 29 is the radix
				result = id.substr( 2 ) + bnf_xdigits[bnf_check_digit % bnf_xdigits.length];
			}

			return result;
		},
		check: /^\d{8}[0-9bcdfghjkmnpqrstvwxz]$/,
		url: function( id ) {
			return 'http://catalogue.bnf.fr/ark:/12148/cb' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P269 = new WEF_Definition( {
		flag: 'fr',
		label: 'Q2597810',
		labelPrefix: 'SUDOC — ',
		viaf: 'sudoc',
		url: function( id ) {
			return 'http://www.idref.fr/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P270 = new WEF_Definition( {
		flag: 'cn',
		label: 'Q9384291',
		labelPrefix: 'CALIS — ',
		check: /^n[0-9]{10}$/,
		url: function( id ) {
			return 'http://opac.calis.edu.cn/aopac/ajsp/detail.jsp?actionfrom=1&actl=CAL++' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P271 = new WEF_Definition( {
		flag: 'jp',
		label: 'Q10726338',
		labelPrefix: 'CiNii — ',
		normalize: function( id ) {
			return id.replace( /^\d{7}[\dX]$/, 'DA$1' );
		},
		check: /^DA\d{7}[\dX]$/,
		url: function( id ) {
			return 'http://ci.nii.ac.jp/author/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P345 = new WEF_Definition( {
		label: 'Q37312',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/Name\?(.*)$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/company\/(.*)$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/name\/(.*)$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?imdb\.com\/title\/(.*)$/i, '$2' );
			return result;
		},
		check: /^(ch|co|nm|tt)\d{7}$/,
		url: function( id ) {
			if ( id.indexOf( 'ch' ) === 0 )
				return 'http://www.imdb.com/Name?' + id;
			if ( id.indexOf( 'co' ) === 0 )
				return 'http://www.imdb.com/company/' + id;
			if ( id.indexOf( 'nm' ) === 0 )
				return 'http://www.imdb.com/name/' + id;
			if ( id.indexOf( 'tt' ) === 0 )
				return 'http://www.imdb.com/title/' + id;
			return id;
		},
		qualifiers: [],
	} );
	this.definitions.P349 = new WEF_Definition( {
		flag: 'jp',
		label: 'Q477675',
		labelPrefix: 'NDL — ',
		viaf: 'ndl',
		url: function( id ) {
			return 'http://id.ndl.go.jp/auth/ndlna/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P350 = new WEF_Definition( {
		flag: 'nl',
		label: 'Q17299580',
		check: /^\d+$/,
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?explore\.rkd\.nl\/[a-z]{2}\/images\/(\d+)$/i, '$2' );
		},
		url: function( id ) {
			return 'http://explore.rkd.nl/en/images/' + id;
		},
		qualifiers: [],
	} );
	/* title; название */
	this.definitions.P357 = new WEF_Definition( {
		datatype: 'string',
	} );
	this.definitions.P373 = new WEF_Definition( {
		label: 'Q565',
		autocomplete: {
			source: function( request, response ) {
				var term = request.term;
				$.ajax(
						{
							type: 'GET',
							dataType: 'json',
							url: '//commons.wikimedia.org/w/api.php?format=json&origin=' + encodeURIComponent( location.protocol + wgServer )
									+ '&action=query&list=prefixsearch&psnamespace=14&pslimit=15&pssearch=' + encodeURIComponent( term ),
						} ).done( function( result ) {
					var list = [];
					$.each( result.query.prefixsearch, function( index, p ) {
						list.push( p.title.substring( 'Category:'.length ) );
					} );
					response( list );
				} );
			}
		},
		check: regexpTitle,
		url: function( id ) {
			return '//commons.wikimedia.org/wiki/Category:' + encodeURIComponent( id );
		},
		qualifiers: [],
	} );
	this.definitions.P380 = new WEF_Definition( {
		flag: 'fr',
		label: 'Q809830',
		check: /^[PEI][A]\d[0-9AB]\d\d\d\d\d\d$/,
		qualifiers: [],
	} );
	this.definitions.P396 = new WEF_Definition( {
		flag: 'it',
		label: 'Q3803707',
		labelPrefix: 'ICCU / SBN — ',
		viaf: 'iccu',
		check: /^IT\\ICCU\\(\d{10}|\D\D[\D\d]\D\\\d{6})$/,
		normalize: function( id ) {
			var result = id;
			if ( /^([a-z]{4})(\d+)$/.exec( result ) ) {
				result = result.replace( /^([a-z]{4})(\d+)$/, 'IT\\ICCU\\$1\\$2' ).toUpperCase();
			}
			return result;
		},
		url: function( id ) {
			return 'http://opac.sbn.it/opacsbn/opac/iccu/scheda_authority.jsp?bid=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P407 = new WEF_Definition( {
		dataType: 'wikibase-item',
		qualifiers: [],
	} );
	this.definitions.P409 = new WEF_Definition( {
		flag: 'au',
		label: 'Q623578',
		labelPrefix: 'NLA — ',
		viaf: 'nla',
		normalize: function( id ) {
			return id.replace( /^0*([1-9][0-9]{0,11})$/, '$1' );
		},
		check: /^[1-9][0-9]{0,11}$/,
		url: function( id ) {
			return 'http://nla.gov.au/anbd.aut-an' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P434 = new WEF_Definition( {
		label: 'Q14005',
		labelQualifier: [ 'Q215627', 'Q2088357' ], // person, musical
		// ensemble
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?musicbrainz\.org\/artist\/(.*)$/i, '$2' );
		},
		check: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		url: function( id ) {
			return 'https://musicbrainz.org/artist/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P435 = new WEF_Definition( {
		label: 'Q14005',
		// музыкальное произведение (Q2188189), mainly сингл (Q134556)
		labelQualifier: [ 'Q2188189', 'Q134556' ],
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?musicbrainz\.org\/work\/(.*)$/i, '$2' );
		},
		check: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		url: function( id ) {
			return 'https://musicbrainz.org/work/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P436 = new WEF_Definition( {
		label: 'Q14005',
		// музыкальное произведение (Q2188189)
		// mainly музыкальный альбом (Q482994)
		labelQualifier: [ 'Q2188189', 'Q482994' ],
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?musicbrainz\.org\/release\-group\/(.*)$/i, '$2' );
		},
		check: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		url: function( id ) {
			return 'https://musicbrainz.org/release-group/' + id;
		},
		qualifiers: [],
	} );
	/* Volume, том */
	this.definitions.P478 = new WEF_Definition( {
		datatype: 'string',
	} );
	this.definitions.P480 = new WEF_Definition( {
		label: 'Q2638147',
		check: /^\d+$/,
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?filmaffinity\.com\/[a-z]+\/film(\d+)\.html?$/i, '$2' );
		},
		url: function( id ) {
			return 'http://www.filmaffinity.com/en/film' + id + '.html';
		},
		qualifiers: [],
	} );
	this.definitions.P496 = new WEF_Definition( {
		label: 'Q51044',
		normalize: function( id ) {
			if ( /^\d\d\d\d\s\d\d\d\d\s\d\d\d\d\s\d\d\d[\dX]$/.exec( id ) ) {
				return id.substring( 0, 4 ) + '-' + id.substring( 5, 9 ) + '-' + id.substring( 10, 14 ) + '-' + id.substring( 15, 19 );
			}
			if ( /^\d{15}[\dX]$/.exec( id ) ) {
				return id.substring( 0, 4 ) + '-' + id.substring( 4, 8 ) + '-' + id.substring( 8, 12 ) + '-' + id.substring( 12, 16 );
			}
			return id;
		},
		check: /^\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d[\dX]$/,
		url: function( id ) {
			return 'http://orcid.org/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P497 = new WEF_Definition( {
		flag: 'tw',
		label: 'Q17299677',
		labelPrefix: 'CBDB — ',
		check: /^\d{7}$/,
		normalize: function( id ) {
			return id //
			.replace( /^https?:\/\/db1\.ihp\.\sinica\.edu\.tw\/cbdbc\/cbdbkm\?\~\~AAA(\d{7})$/i, '$1' ) //
			.replace( /^https?:\/\/db1\.ihp\.\sinica\.edu\.tw\/cbdbc\/cbdbkmeng\?\~\~AAA(\d{7})$/i, '$1' ) //
			;
		},
		url: function( id ) {
			return 'http://db1.ihp.sinica.edu.tw/cbdbc/cbdbkmeng?~~AAA' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P535 = new WEF_Definition( {
		label: 'Q63056',
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.findagrave.com/cgi-bin/fg.cgi?page=gr&GRid=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P549 = new WEF_Definition( {
		label: 'Q829984',
		check: /^\d{1,6}$/,
		url: function( id ) {
			return 'http://www.genealogy.ams.org/id.php?id=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P650 = new WEF_Definition( {
		flag: 'nl',
		label: 'Q17299517',
		check: /^\d{1,6}$/,
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?rkd\.nl\/rkddb\.aspx\?action\=search\&database\=ChoiceArtists\&search\=priref\=(\d{1,6})$/i, '$2' );
		},
		url: function( id ) {
			return 'http://www.rkd.nl/rkddb/dispatcher.aspx?action=search&database=ChoiceArtists&search=priref=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P651 = new WEF_Definition( {
		flag: 'nl',
		label: 'Q1868372',
		labelPrefix: 'BPN — ',
		viaf: 'bpn',
		url: function( id ) {
			return 'http://www.biografischportaal.nl/persoon/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P691 = new WEF_Definition( {
		flag: 'cz',
		label: 'Q1967876',
		labelPrefix: 'NKC — ',
		viaf: 'nkc',
		url: function( id ) {
			return 'http://aut.nkp.cz/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P839 = new WEF_Definition( {
		label: 'Q523660',
		check: regexpPath,
		url: function( id ) {
			return 'http://imslp.org/wiki/' + id;
		},
	} );
	this.definitions.P886 = new WEF_Definition( {
		flag: 'ch',
		label: 'Q642074',
		labelQualifier: 'Q35127',
		labelPrefix: 'LIR — ',
		url: function( id ) {
			return 'http://www.e-lir.ch/e-LIR___Lexicon.' + id + '.450.0.html';
		},
		qualifiers: [],
	} );
	this.definitions.P902 = new WEF_Definition( {
		flag: 'ch',
		label: 'Q642074',
		labelPrefix: 'HLS — ',
		check: /^[1-9]\d*$/,
		url: function( id ) {
			return 'http://www.hls-dhs-dss.ch/textes/f/F' + id + '.php';
		},
		qualifiers: [],
	} );
	this.definitions.P906 = new WEF_Definition( {
		flag: 'se',
		label: 'Q953058',
		labelPrefix: 'SELIBR / LIBRIS — ',
		viaf: 'selibr',
		url: function( id ) {
			return 'http://libris.kb.se/auth/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P947 = new WEF_Definition( {
		flag: 'ru',
		label: 'Q1048694',
		labelPrefix: 'RSL — ',
		viaf: 'rsl',
		url: function( id ) {
			return 'http://aleph.rsl.ru/F?func=find-b&find_code=SYS&adjacent=Y&local_base=RSL11&request=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P950 = new WEF_Definition( {
		flag: 'es',
		label: 'Q750403',
		labelPrefix: 'BNE — ',
		viaf: 'bne',
		normalize: function( id ) {
			return id.replace( /^(XX)?(\d{6,7})$/i, 'XX$2' );
		},
		check: /^XX\d{6,7}$/,
		url: function( id ) {
			return 'http://catalogo.bne.es/uhtbin/authoritybrowse.cgi?action=display&authority_id=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P951 = new WEF_Definition( {
		flag: 'hu',
		label: 'Q1063819',
		labelPrefix: 'NSZL — ',
		viaf: 'nszl',
		url: function( id ) {
			return 'http://viaf.org/processed/NSZL%7C' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P998 = new WEF_Definition( {
		label: 'Q41226',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?dmoz\.org\/(.*)$/i, '$2' ).replace( /^(.*)\/$/i, '$1' ).replace( /^\/(.*)$/i, '$1' );
		},
		url: function( id ) {
			return 'http://www.dmoz.org/' + id;
		},
	} );
	this.definitions.P1003 = new WEF_Definition( {
		flag: 'ro',
		label: 'Q622012',
		labelPrefix: 'BNR — ',
		check: /^\d{9}$/,
		url: function( id ) {
			return 'http://alephnew.bibnat.ro:8991/F?func=find-b&request=' + id + '&find_code=SYS&adjacent=Y&local_base=NLR10';
		},
		qualifiers: [],
	} );
	this.definitions.P1005 = new WEF_Definition( {
		flag: 'pt',
		label: 'Q245966',
		labelPrefix: 'PTBNP — ',
		viaf: 'ptbnp',
		url: function( id ) {
			return 'http://viaf.org/processed/PTBNP%7C' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1006 = new WEF_Definition( {
		flag: 'nl',
		label: 'Q1526131',
		labelPrefix: 'NTA — ',
		viaf: 'nta',
		url: function( id ) {
			return 'http://opc4.kb.nl/PPN?PPN=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1015 = new WEF_Definition( {
		flag: 'no',
		label: 'Q4584301',
		labelPrefix: 'BIBSYS — ',
		viaf: 'bibsys',
		url: function( id ) {
			return 'http://ask.bibsys.no/ask/action/result?cmd=&kilde=biblio&cql=bs.autid+%3D+' + id + '&feltselect=bs.autid';
		},
		qualifiers: [],
	} );
	this.definitions.P1017 = new WEF_Definition( {
		flag: 'va',
		label: 'Q213678',
		labelPrefix: 'BAV — ',
		viaf: 'bav',
		normalize: function( id ) {
			return id.replace( /^(ADV)?(\d{8})$/i, 'ADV$2' );
		},
		check: /^ADV\d{8}$/,
		url: function( id ) {
			return 'http://viaf.org/processed/BAV%7C' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1053 = new WEF_Definition( {
		label: 'Q7315186',
		check: /[A-Z]-\d{4}-(19|20)\d\d/,
		url: function( id ) {
			return 'http://www.researcherid.com/rid/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1153 = new WEF_Definition( {
		label: 'Q371467',
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.scopus.com/authid/detail.url?authorId=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1185 = new WEF_Definition( {
		label: 'Q649227',
		check: /^\d+$/,
		url: function( id ) {
			return 'http://ru.rodovid.org/wk/Person:' + id;
		},
	} );
	this.definitions.P1207 = new WEF_Definition( {
		flag: 'pl',
		label: 'Q11789729',
		labelPrefix: 'NUKAT — ',
		viaf: 'nukat',
		check: /^n\d+$/,
		url: function( id ) {
			return 'http://viaf.org/processed/NUKAT%7C' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1213 = new WEF_Definition( {
		flag: 'cn',
		label: 'Q732353',
		labelPrefix: 'NLC — ',
		check: /^\d{1,9}$/,
		url: function( id ) {
			return '';
		},
		qualifiers: [],
	} );
	this.definitions.P1217 = new WEF_Definition( {
		label: 'Q31964',
		labelQualifier: [ 'Q8719053', 'Q24354' ], // Концертная площадка
		// (Q8719053), <...>
		// театр (Q24354)...
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.ibdb.com/venue.php?id=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1218 = new WEF_Definition( {
		label: 'Q31964',
		labelQualifier: 'Q7777570', // театральная постановка (Q7777570)
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.ibdb.com/production.php?id=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1219 = new WEF_Definition( {
		label: 'Q31964',
		labelQualifier: [ 'Q386724', 'Q25379' ], // произведение
		// (Q386724): пьеса
		// (Q25379)
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.ibdb.com/show.asp?id=id' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1220 = new WEF_Definition( {
		label: 'Q31964',
		labelQualifier: 'Q215627', // person
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.ibdb.com/person.php?id=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1233 = new WEF_Definition( {
		label: 'Q2629164',
		labelQualifier: 'Q215627', // person
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.isfdb.org/cgi-bin/ea.cgi?' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1234 = new WEF_Definition( {
		label: 'Q2629164',
		labelQualifier: 'Q732577', // publication
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.isfdb.org/cgi-bin/pl.cgi?' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1235 = new WEF_Definition( {
		label: 'Q2629164',
		labelQualifier: 'Q7725310', // series
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.isfdb.org/cgi-bin/pe.cgi?' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1237 = new WEF_Definition( {
		label: 'Q223142',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?boxofficemojo\.com\/movies\/\?id\=(.*)\.htm$/i, '$2' );
		},
		check: /^[a-z0-9]+$/,
		url: function( id ) {
			return 'http://boxofficemojo.com/movies/?id=' + id + '.htm';
		},
		qualifiers: [],
	} );
	this.definitions.P1239 = new WEF_Definition( {
		label: 'Q2629164',
		labelQualifier: 'Q4198509', // publisher
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.isfdb.org/cgi-bin/publisher.cgi?' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1258 = new WEF_Definition( {
		label: 'Q105584',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?rottentomatoes\.com\/(.*)$/i, '$2' );
		},
		check: /^(m|tv|celebrity)\/[-0-9a-z_\']+$/,
		url: function( id ) {
			return 'http://www.rottentomatoes.com/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1265 = new WEF_Definition( {
		label: 'Q31165',
		labelQualifier: 'Q11424', // film
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?allocine\.fr\/film\/\fichefilm_gen_cfilm\=(.*)\.html$/i, '$2' );
		},
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.allocine.fr/film/fichefilm_gen_cfilm=' + id + '.html';
		},
		qualifiers: [],
	} );
	this.definitions.P1266 = new WEF_Definition( {
		label: 'Q31165',
		labelQualifier: 'Q215627', // person
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?allocine\.fr\/personne\/\fichepersonne_gen_cpersonne\=(.*)\.html$/i, '$2' );
		},
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.allocine.fr/personne/fichepersonne_gen_cpersonne=' + id + '.html';
		},
		qualifiers: [],
	} );
	this.definitions.P1267 = new WEF_Definition( {
		label: 'Q31165',
		labelQualifier: 'Q7725310', // series
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?allocine\.fr\/series\/\ficheserie_gen_cserie\=(.*)\.html$/i, '$2' );
		},
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.allocine.fr/series/ficheserie_gen_cserie=' + id + '.html';
		},
		qualifiers: [],
	} );
	this.definitions.P1273 = new WEF_Definition( {
		flag: 'ct',
		label: 'Q1200925',
		labelPrefix: 'BNC — ',
		viaf: 'bnc',
		url: function( id ) {
			return 'http://cantic.bnc.cat/registres/CUCId/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1280 = new WEF_Definition( {
		flag: 'si',
		label: 'Q16744133',
		labelPrefix: 'CONOR — ',
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.cobiss.si/scripts/cobiss?command=DISPLAY&base=CONOR&rid=' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1309 = new WEF_Definition( {
		flag: 'eg',
		label: 'Q501851',
		labelPrefix: 'EGAXA — ',
		viaf: 'egaxa',
		normalize: function( id ) {
			return id.replace( /^vtls(\d+)$/, '$1' );
		},
		url: function( id ) {
			return 'http://viaf.org/processed/EGAXA%7Cvtls' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1315 = new WEF_Definition( {
		flag: 'au',
		label: 'Q623578',
		labelPrefix: 'NLA PI — ',
		normalize: function( id ) {
			return id.replace( /^0*([1-9][0-9]{0,11})$/, '$1' );
		},
		check: /^\d{1,10}$/,
		url: function( id ) {
			return 'http://nla.gov.au/nla.party-' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1368 = new WEF_Definition( {
		flag: 'lv',
		label: 'Q1133733',
		labelPrefix: 'LNB — ',
		viaf: 'lnb',
		check: /^\d+$/,
		url: function( id ) {
			return 'http://viaf.org/processed/LNB%7CLNC10-' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1375 = new WEF_Definition( {
		flag: 'hr',
		label: 'Q631375',
		labelPrefix: 'NSK — ',
		viaf: 'nsk',
		check: /^\d+$/,
		url: function( id ) {
			return 'http://viaf.org/processed/NSK%7C' + id;
		},
		qualifiers: [],
	} );
	this.definitions.P1361 = new WEF_Definition( {
		label: 'Q220509',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/anime\.php\?id=(\d+)$/i, 'anime/$2' );
			result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/company\.php\?id=(\d+)$/i, 'company/$2' );
			result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/manga\.php\?id=(\d+)$/i, 'manga/$2' );
			result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/people\.php\?id=(\d+)$/i, 'people/$2' );
			result = result.replace( /^https?:\/\/(www\.)?animenewsnetwork\.com\/encyclopedia\/releases\.php\?id=(\d+)$/i, 'releases/$2' );
			return result;
		},
		check: /^(anime|company|manga|people|releases)\/(1-9)\d*$/,
		url: function( id ) {
			if ( id.indexOf( 'anime/' ) === 0 )
				return 'http://www.animenewsnetwork.com/encyclopedia/anime.php?id=' + id.subst( 'anime/'.length );
			if ( id.indexOf( 'company/' ) === 0 )
				return 'http://www.animenewsnetwork.com/encyclopedia/company.php?id=' + id.subst( 'company/'.length );
			if ( id.indexOf( 'manga/' ) === 0 )
				return 'http://www.animenewsnetwork.com/encyclopedia/manga.php?id=' + id.subst( 'manga/'.length );
			if ( id.indexOf( 'people/' ) === 0 )
				return 'http://www.animenewsnetwork.com/encyclopedia/people.php?id=' + id.subst( 'people/'.length );
			if ( id.indexOf( 'releases/' ) === 0 )
				return 'http://www.animenewsnetwork.com/encyclopedia/releases.php?id=' + id.subst( 'releases/'.length );
			return id;
		},
		qualifiers: [],
	} );
	this.definitions.P1417 = new WEF_Definition( {
		datatype: 'string',
		flag: 'uk',
		code: 'P1417',
		label: 'Q17329360',
		check: /^\d+$/,
		buttons: [ {
			icons: {
				primary: 'ui-icon-search'
			},
			text: false,
			label: 'Search on Encyclopædia Britannica website',
			click: searchClickF( 'enwiki', function( title ) {
				return 'http://global.britannica.com/search?query=' + encodeURIComponent( title );
			} ),
		} ],
		url: function( id ) {
			return 'http://global.britannica.com/EBchecked/topic/' + id + '/';
		},
		qualifiers: [ d.P50, d.P357, ],
	} );

	this.definitions.Q355 = new WEF_Definition( {
		code: 'P553[Q355]/P554',
		label: 'Q355',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?facebook\.com\/(.+)$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://www.facebook.com/' + id;
		},
	} );
	this.definitions.Q356 = new WEF_Definition( {
		code: 'P553[Q356]/P554',
		label: 'Q356',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/plus\.google\.com\/(.*)\/posts$/i, '$1' );
		},
		url: function( id ) {
			return 'https://plus.google.com/' + id + '/posts';
		},
	} );
	this.definitions.Q866 = new WEF_Definition( {
		code: 'P553[Q866]/P554',
		label: 'Q866',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/www\.youtube\.com\/(.*)$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://youtube.com/' + id;
		}
	} );
	this.definitions.Q918 = new WEF_Definition( {
		code: 'P553[Q918]/P554',
		label: 'Q918',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?twitter\.com\/(.*)$/i, '$2' );
		},
		url: function( id ) {
			return 'https://twitter.com/' + id;
		}
	} );
	this.definitions.Q40629 = new WEF_Definition( {
		code: 'P553[Q40629]/P554',
		label: 'Q40629',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?myspace\.com\/(.*)$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://myspace.com/' + id;
		}
	} );
	this.definitions.Q103204 = new WEF_Definition( {
		code: 'P553[Q103204]/P554',
		label: 'Q103204',
		check: regexpPath,
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?flickr\.com\/(.+)$/i, '$2' );
		},
		url: function( id ) {
			return 'https://www.flickr.com/' + id;
		},
	} );
	this.definitions.Q116933 = new WEF_Definition( {
		code: 'P553[Q116933]/P554',
		label: 'Q116933',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?vkontakte\.ru\/(\w+)$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?vk\.com\/(\w+)$/i, '$2' );
			return result;
		},
		check: /^id\d+$/,
		url: function( id ) {
			return 'https://vk' + '.com/' + id;
		},
	} );
	this.definitions.Q156376 = new WEF_Definition( {
		code: 'P553[Q156376]/P554',
		label: 'Q156376',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?vimeo\.com\/(.*)$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://vimeo.com/' + id;
		}
	} );
	this.definitions.Q171186 = new WEF_Definition( {
		code: 'P553[Q171186]/P554',
		label: 'Q171186',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(.+)?\.blogspot\.com\/?$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://' + id + '.blogspot.com/';
		},
	} );
	this.definitions.Q183718 = new WEF_Definition( {
		code: 'P553[Q183718]/P554',
		label: 'Q183718',
		normalize: function( id ) {
			if ( /^https?:\/\/(www\.)?lastfm\.ru\/music\/(.*)$/i.exec( id ) ) {
				return decodeURIComponent( id.replace( /^https?:\/\/(www\.)?lastfm\.ru\/music\/(.*)$/i, '$2' ) );
			}
			return id;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://www.lastfm.ru/music/' + id;
		},
		qualifiers: [],
	} );
	this.definitions.Q209330 = new WEF_Definition( {
		code: 'P553[Q209330]/P554',
		label: 'Q209330',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?instagram\.com\/(.+)$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://instagram.com/' + id;
		},
	} );
	this.definitions.Q219523 = new WEF_Definition( {
		code: 'P553[Q219523]/P554',
		label: 'Q219523',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(.+)?\.livejournal\.com\/?$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://' + id + '.livejournal.com/';
		}
	} );
	this.definitions.Q234535 = new WEF_Definition( {
		datatype: 'url',
		flag: 'ru',
		code: 'P1343[Q234535]/P854',
		label: 'Q234535',
		normalize: function( id ) {
			return id.replace( /^(https?:\/\/slovari\.yandex\.ru\/)[^\/]+(\/%D0%91%D0%A1%D0%AD\/.*)$/i, '$1~%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8$2' );
		},
		check: /^https?:\/\/slovari\.yandex\/.ru\/(~%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8|~книги)\/(%D0%91%D0%A1%D0%AD|БСЭ)\//,
		buttons: [ {
			icons: {
				primary: 'ui-icon-search'
			},
			text: false,
			label: 'Search on Yandex.Slovari website',
			click: searchClickF( 'ruwiki', function( title ) {
				return '//slovari.yandex.ru/' + encodeURIComponent( title ) + '/%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5/';
			} ),
		} ],
		qualifiers: [ d.P50, d.P357, d.P478 ],
	} );
	this.definitions.Q372827 = new WEF_Definition( {
		code: 'P553[Q372827]/P554',
		label: 'Q372827',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(.+)?\.rutube\.ru\/?$/i, '$1' );
			result = result.replace( /^https?:\/\/(www\.)?rutube\.ru\/video\/person\/(d+)\/?$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			if ( /^d+$/.exec( id ) ) {
				return 'http://rutube.ru/video/person/' + id + '/';
			}
			return "http://" + id + ".rutube.ru/";
		}
	} );
	this.definitions.Q384060 = new WEF_Definition( {
		code: 'P553[Q384060]/P554',
		label: 'Q384060',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(.+)?\.tumblr\.com\/?$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://' + id + '.tumblr.com/';
		}
	} );
	this.definitions.Q568769 = new WEF_Definition( {
		code: 'P553[Q568769]/P554',
		label: 'Q568769',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?soundcloud\.com\/(.*)(\/)?$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://soundcloud.com/' + id + '/';
		}
	} );
	this.definitions.Q798490 = new WEF_Definition( {
		code: 'P553[Q798490]/P554',
		label: 'Q798490',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(.+)?\.ya\.ru\/?$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://' + id + '.ya.ru/';
		},
	} );
	this.definitions.Q1002972 = new WEF_Definition( {
		code: 'P553[Q1002972]/P554',
		label: 'Q1002972',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?spring\.me\/(.+)$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://www.spring.me/' + id;
		},
	} );
	this.definitions.Q1123836 = new WEF_Definition( {
		code: 'P553[Q1123836]/P554',
		label: 'Q1123836',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?odnoklassniki\.ru\/profile\/(\d+)$/i, '$2' );
		},
		check: /^\d+$/,
		url: function( id ) {
			return 'http://www.odnoklassniki' + '.ru/profile/' + id;
		},
	} );
	this.definitions.Q2498180 = new WEF_Definition( {
		datatype: 'url',
		flag: 'ru',
		code: 'P1343[Q2498180]/P854',
		label: 'Q2498180',
		qualifiers: [ d.P50, d.P357, d.P478 ],
	} );
	this.definitions.Q2627728 = new WEF_Definition( {
		datatype: 'url',
		flag: 'ru',
		code: 'P1343[Q2627728]/P854',
		label: 'Q2627728',
		qualifiers: [ d.P50, d.P357 ],
	} );
	this.definitions.Q4037665 = new WEF_Definition( {
		code: 'P553[Q4037665]/P554',
		label: 'Q4037665',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(www\.)?dudu\.com\/(.*)(\/)?$/i, '$2' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://dudu.com/' + id + '/';
		}
	} );
	this.definitions.Q4043051 = new WEF_Definition( {
		code: 'P553[Q4043051]/P554',
		label: 'Q4043051',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?liveinternet\.ru\/users\/(.+)\/$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?liveinternet\.ru\/users\/(.+)$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://www.liveinternet.ru/users/' + id;
		},
	} );
	this.definitions.Q4101720 = new WEF_Definition( {
		code: 'P553[Q4101720]/P554',
		label: 'Q4101720',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(.+)?\.vkrugudruzei\.ru\/?$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://' + id + '.vkrugudruzei.ru/';
		},
	} );
	this.definitions.Q4239850 = new WEF_Definition( {
		datatype: 'url',
		flag: 'ru',
		code: 'P1343[Q4239850]/P854',
		label: 'Q4239850',
		qualifiers: [ d.P50, d.P357, d.P478 ],
	} );
	this.definitions.Q4263804 = new WEF_Definition( {
		datatype: 'url',
		flag: 'ru',
		code: 'P1343[Q4263804]/P854',
		label: 'Q4263804',
		qualifiers: [ d.P50, d.P357, d.P478 ],
	} );
	this.definitions.Q4299813 = new WEF_Definition( {
		code: 'P553[Q4299813]/P554',
		label: 'Q4299813',
		normalize: function( id ) {
			return id.replace( /^https?:\/\/(.+)?\.moikrug\.ru\/?$/i, '$1' );
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://' + id + '.moikrug.ru/';
		},
	} );
	this.definitions.Q4299858 = new WEF_Definition( {
		code: 'P553[Q4299858]/P554',
		label: 'Q4299858',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/my\.?mail\.ru\/(.+)$/i, '$1' );
			result = result.replace( /^(.*)\/$/i, '$1' );
			return result;
		},
		check: /^(bk|inbox|list|mail)\/.+$/,
		url: function( id ) {
			return 'http://my.mail.ru/' + id;
		},
	} );
	this.definitions.Q4380129 = new WEF_Definition( {
		code: 'P553[Q4380129]/P554',
		label: 'Q4380129',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?proza\.ru\/avtor\/(\w+)\/$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?proza\.ru\/avtor\/(\w+)$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://proza.ru/avtor/' + id;
		}
	} );
	this.definitions.Q4442644 = new WEF_Definition( {
		code: 'P553[Q4442644]/P554',
		label: 'Q4442644',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?stihi\.ru\/avtor\/(.+)\/$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?stihi\.ru\/avtor\/(.+)$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://stihi.ru/avtor/' + id;
		}
	} );
	this.definitions.Q6883832 = new WEF_Definition( {
		code: 'P553[Q6883832]/P554',
		label: 'Q6883832',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?mixcloud\.com\/(.+)\/$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?mixcloud\.com\/(.+)$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://mixcloud.com/' + id + '/';
		}
	} );
	this.definitions.Q17117201 = new WEF_Definition( {
		code: 'P553[Q17117201]/P554',
		label: 'Q17117201',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(.+)?\.promodj\.ru\/?$/i, '$1' );
			result = result.replace( /^https?:\/\/(www\.)?promodj\.com\/(.*)(\/)?$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'https://promodj.com/' + id + '/';
		}
	} );
	this.definitions.Q17144398 = new WEF_Definition( {
		code: 'P553[Q17144398]/P554',
		label: 'Q17144398',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?qroom\.ru\/(.+)\/$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?qroom\.ru\/(.+)$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://qroom.ru/' + id + '/';
		}
	} );
	this.definitions.Q17195318 = new WEF_Definition( {
		code: 'P553[Q17195318]/P554',
		label: 'Q17195318',
		normalize: function( id ) {
			var result = id;
			result = result.replace( /^https?:\/\/(www\.)?sprashivai\.ru\/(.+)\/$/i, '$2' );
			result = result.replace( /^https?:\/\/(www\.)?sprashivai\.ru\/(.+)$/i, '$2' );
			return result;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://sprashivai.ru/' + id;
		}
	} );
	this.definitions.Q17195344 = new WEF_Definition( {
		code: 'P553[Q17195344]/P554',
		label: 'Q17195344',
		normalize: function( id ) {
			return id //
			.replace( /^https?:\/\/(www\.)?samlib\.ru\/\w\/(\w+)\/$/i, '$2' ) //
			.replace( /^https?:\/\/(www\.)?samlib\.ru\/\w\/(\w+)$/i, '$2' ) //
			;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://samlib.ru/' + id.charAt( 0 ) + '/' + id + '/';
		}
	} );
	this.definitions.Q17254543 = new WEF_Definition( {
		code: 'P553[Q17254543]/P554',
		label: 'Q17254543',
		normalize: function( id ) {
			return id //
			.replace( /^https?:\/\/(www\.)?chitalnya\.ru\/\users\/(\w+)\/$/i, '$2' ) //
			.replace( /^https?:\/\/(www\.)?chitalnya\.ru\/\users\/(\w+)$/i, '$2' ) //
			;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://chitalnya.ru/users/' + id + '/';
		}
	} );
	this.definitions.Q17300505 = new WEF_Definition( {
		code: 'P553[Q17300505]/P554',
		label: 'Q17300505',
		normalize: function( id ) {
			return id //
			.replace( /^https?:\/\/fan\.lib\.ru\/\w\/(\w+)\/$/i, '$1' ) //
			.replace( /^https?:\/\/fan\.lib\.ru\/\w\/(\w+)$/i, '$1' ) //
			;
		},
		check: regexpPath,
		url: function( id ) {
			return 'http://fan.lib.ru/' + id.charAt( 0 ) + '/' + id + '/';
		}
	} );
	this.definitions.Q17329836 = new WEF_Definition( {
		datatype: 'url',
		flag: 'fr',
		code: 'P1343[Q17329836]/P854',
		label: 'Q17329836',
		check: /^https?:\/\/(www\.)?larousse\/.fr\/encyclopedie\//,
		buttons: [ {
			icons: {
				primary: 'ui-icon-search'
			},
			text: false,
			label: 'Search on Encyclopédie Larousse en ligne',
			click: searchClickF( 'frwiki', function( title ) {
				return 'http://www.larousse.fr/encyclopedie/rechercher?q=' + encodeURIComponent( title );
			} ),
		} ],
		qualifiers: [ d.P357 ],
	} );

	this.defaultQualifiers = [ d.P407 ];

	this.entity = null;

	/** code -> table row */
	this.editors = {};

	/* Usually already in cache */
	/** @private */
	var getLabelTextShort = function( definition ) {
		if ( typeof ( definition.label ) !== "undefined" ) {
			return wef_LabelsCache.getLabel( definition.label );
		} else {
			return wef_LabelsCache.getLabel( definition.code );
		}
	};

	this.addButtonsEdit = function() {
		if ( !this.enabled )
			return;

		var definitions = this.definitions;

		$.each( definitions, function( key, definition ) {
			if ( typeof definition.code === 'undefined' ) {
				definition.code = key;
			}
			if ( typeof definition.label === 'undefined' ) {
				definition.label = key;
			}
			if ( typeof ( definition.qualifiers ) === "undefined" ) {
				definition.qualifiers = externalLinksEdit.defaultQualifiers;
			}
		} );

		var dialogForm = $( '' + '<div class="wef_externalLinks_dialog" id="wefExternalLinksDialog" title="' + i18n.dialogTitle + '">' + '<div id="wefExternalLinksDialogTabs">'
				+ '<ul id="wefExternalLinksDialogTabsList">' + '</ul>' + '</div>' + '<p class="validateTips"></p>' + '</div>' );
		var statusAndTips = dialogForm.find( 'p.validateTips' );
		dialogForm.find( "#ruWikiExternalEditProgress" ).hide();

		/** @type {WEF_ClaimEditorDecorator} */
		var decorator = ( function() {
			var result = new WEF_ClaimEditorDecorator();
			var oldDecorate = result.decorate;
			result.decorate = function( claimEditor, elements ) {
				/** @type {WEF_Definition} */
				var definition = claimEditor.definition;
				/** @type {function} */
				var normalizeF = definition.normalize;
				/** @type {function} */
				var urlF = definition.url;

				// append before URL and after input cell
				var buttonsCell = $( '<td class="wef_button_cell"></td>' ).appendTo( claimEditor.row1 );
				if ( typeof ( definition.buttons ) !== "undefined" ) {
					$.each( definition.buttons, function( index, buttonDefinition ) {
						var newButton = $( '<button class="wef_property_button" type="button"></button>' );
						newButton.button( buttonDefinition );
						if ( $.isFunction( buttonDefinition.click ) ) {
							newButton.click( buttonDefinition.click );
						}
						buttonsCell.append( newButton );
					} );
				}

				if ( $.isFunction( urlF ) ) {

					claimEditor.row1.find( 'td.wef_property_editor_input' ).addClass( 'wef_external_links_before_url_cell' );
					var urlCell = $( '<td class="wef_external_links_url_cell"></td>' ).appendTo( claimEditor.row1 );
					var div = $( '<div class="wef_external_links_url_div">&nbsp;</div>' ).appendTo( urlCell );
					var a = $( '<a class="wef_external_links_url_a"></a>' ).appendTo( div ).attr( 'target', '_blank' );

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
							if ( typeof ( definition.check ) !== "undefined" ) {
								var result = definition.check.exec( newValue );
								if ( result == null ) {
									var tip = i18n.getTip( definition );
									var shortLabel = getLabelTextShort( definition );
									tip = tip.replace( "{0}", shortLabel );

									a.addClass( 'ui-state-error' );
									claimEditor.tbody.find( 'input' ).addClass( 'ui-state-error' );
									statusAndTips.text( tip );
									statusAndTips.addClass( 'ui-state-error' );
								} else {
									a.removeClass( 'ui-state-error' );
									claimEditor.tbody.find( 'input' ).removeClass( 'ui-state-error' );
									statusAndTips.text( '' );
									statusAndTips.removeClass( 'ui-state-error' );
								}
							}
						} else {
							a.attr( 'href', '' );
							a.text( '' );
							a.removeClass( 'ui-state-error' );
							claimEditor.tbody.find( 'input' ).removeClass( 'ui-state-error' );
							statusAndTips.text( '' );
							statusAndTips.removeClass( 'ui-state-error' );
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
					$( '<td class="wef_button_cell"></td>' ).appendTo( claimEditor.row1 );

				} else {
					claimEditor.row1.find( 'td.wef_property_editor_input' ).attr( 'colspan', 3 );
				}

				oldDecorate.call( this, claimEditor, elements );
			};
			return result;
		} )();
		var claimEditorsTableOptions = {
			decorator: decorator,
		};

		$( "div#mw-content-text" ).after( dialogForm );
		dialogForm.dialog( {
			autoOpen: false,
			height: 'auto',
			width: externalLinksEdit.dialogWidth,
			modal: false,
			open: function( event, ui ) {
				dialogForm.find( "tr" ).remove();
				var tabs = $( "#wefExternalLinksDialogTabs" );

				var tabsHeaders = $( '#wefExternalLinksDialogTabsList' );
				statusAndTips.text( 'Идёт загрузка данных с Викиданных...' );

				var onWikidataResult = function( result ) {
					statusAndTips.text( '' );
					if ( typeof result === 'undefined'// 
							|| typeof result.entities === 'undefined'//
							|| typeof result.entities[entityId] === 'undefined'// 
							|| typeof result.entities[entityId].claims === 'undefined'// 
					) {
						alert( 'Wikidata answer format is not expected one' );
						dialogForm.dialog( 'close' );
						return;
					}
					externalLinksEdit.entity = result.entities[entityId];

					tabs.hide();
					externalLinksEdit.editors = {};
					$.each( externalLinksEdit.groups, function( index, group ) {
						var link = 'wefExternalLinksDialogTabs-' + index;
						var newTabHeader = $( '<li></li>' ).append( $( '<a href="#' + link + '"></a>' ).text( group.label ) );
						var newTabTable = $( '<table border="0" style="white-space: nowrap;" width="100%" cellspacing="0"></table>' );
						var newTabPage = $( '<div id="' + link + '"></div>' ).append( newTabTable );

						tabsHeaders.append( newTabHeader );
						tabs.append( newTabPage );

						$.each( group.fields, function( i, definition ) {
							var claimEditorsTable = new WEF_ClaimEditorsTable( definition, claimEditorsTableOptions );
							externalLinksEdit.editors[definition.code] = claimEditorsTable;
							claimEditorsTable.appendTo( newTabTable );
						} );
					} );

					$.each( externalLinksEdit.editors, function( i, claimEditorsTable ) {
						claimEditorsTable.init( externalLinksEdit.entity );
					} );

					wef_LabelsCache.receiveLabels();

					// recenter
					tabs.tabs();
					tabs.tabs( "destroy" );
					tabs.tabs();
					tabs.show();
					dialogForm.dialog( "option", "position", "center" );
				};

				$.ajax( {
					type: 'GET',
					url: URI_PREFIX + '&action=wbgetentities&ids=' + entityId,
					dataType: "json",
					success: onWikidataResult,
					fail: function() {
						alert( 'Unable to load Wikidata entity' );
						dialogForm.dialog( 'close' );
					},
				} );
			},
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
					dialogForm.dialog( 'close' );
					wef_save( externalLinksEdit.editors );
				}
			}, {
				text: i18n.dialogButtonCloseText,
				label: i18n.dialogButtonCloseLabel,
				click: function() {
					$( this ).dialog( "close" );
				}
			} ]
		} );
		$( "#p-tb div ul" ).append( $( '<li class="plainlinks"><a href="javascript:externalLinksEdit.edit()">' + i18n.buttonMenuLabel + '</a></li>' ) );
		$( "table.ruwikiArticleExternalLinksTable" ).find( ".navbox-list" ).first().prepend(
				'<div style="float: right;"><a href="javascript:externalLinksEdit.edit()">' + i18n.buttonNavboxLabel + '</a></div>' );

		{
			var viafFillFieldset = $( '<fieldset></fieldset>' );
			var viafFillDialog = $( '<div></div>' ).attr( 'title', i18n.buttonViafLabel ).append( $( '<form></form>' ).append( viafFillFieldset ) );
			externalLinksEdit.viafFillDialog = viafFillDialog;
			var viafFillInput = $( '<input type="text" style="width: 100%;"></input>' );
			var viafFillCheckButtons = $( '<div></div>' );
			viafFillFieldset.append( viafFillInput ).append( viafFillCheckButtons );

			var oldSearch = null;
			var onSearchUpdate = function() {
				if ( !viafFillInput.val() )
					return;
				if ( oldSearch === viafFillInput.val() )
					return;
				oldSearch = viafFillInput.val();

				$.ajax( {
					type: 'GET',
					url: '//viaf.org/viaf/AutoSuggest?query=' + encodeURIComponent( viafFillInput.val() ) + '&callback=?',
					dataType: 'jsonp',
					success: function( data ) {
						viafFillCheckButtons.empty();
						if ( data.result === undefined ) {
							return;
						}
						$.each( data.result, function( index, entry ) {
							var existing = viafFillCheckButtons.find( 'label#viaflabel' + entry.viafid );
							if ( existing.length === 0 ) {
								var checkbox = $( '<input type="checkbox" name="viafFillItem" id="viaf' + entry.viafid + '" value="' + entry.viafid + '">' );
								checkbox.data( 'viaf', entry );
								var label = $( '<label for="viaf' + entry.viafid + '" id="viaflabel' + entry.viafid + '"></label>' );
								if ( typeof entry.nametype !== 'undefined' ) {
									label.append( $( '<i></i>' ).text( entry.nametype + ': ' ) );
								}
								label.append( $( '<a href="http://www.viaf.org/viaf/' + entry.viafid + '">VIAF: ' + entry.viafid + '</a>; ' ) );

								viafFillCheckButtons.append( checkbox );
								viafFillCheckButtons.append( label );
								viafFillCheckButtons.append( '<br >' );
								existing = label;
							}

							existing.append( '<br>' ).append( $( '<span style="margin-left: 2em;"></span>' ).text( entry.term + '; ' ) );
						} );
					}
				} );
			};

			viafFillInput.change( onSearchUpdate );
			viafFillInput.keyup( onSearchUpdate );

			viafFillDialog.dialog( {
				autoOpen: false,
				height: 600,
				width: 640,
				modal: false,
				open: function() {
					onSearchUpdate();
				},
				buttons: {
					'Select': function() {
						WEF_ClaimEditorsTable.removeFoundValueClasses();
						var selected = viafFillCheckButtons.find( 'input[type=checkbox]:checked' );
						$.each( selected, function( i1, input ) {
							var checkbox = $( input );
							var viafdata = checkbox.data( 'viaf' );
							if ( viafdata ) {
								$.each( externalLinksEdit.definitions,
								/**
								 * @param definition
								 *            {WEF_Definition}
								 */
								function( i2, definition ) {
									if ( typeof ( definition.viaf ) === "undefined" ) {
										return;
									}
									var newValue = viafdata[definition.viaf];
									if ( typeof ( newValue ) === "undefined" || newValue.length === 0 ) {
										return;
									}

									var editors = externalLinksEdit.editors[definition.code];
									if ( typeof editors === "undefined" ) {
										return;
									}

									if ( $.isFunction( definition.normalize ) ) {
										newValue = definition.normalize( newValue );
									}

									editors.onFoundValue( newValue );
								} );
							}
						} );
						viafFillDialog.dialog( 'close' );
					},
					'Cancel': function() {
						viafFillDialog.dialog( 'close' );
					},
				}
			} );
		}
	};

	this.edit = function() {
		$( "#wefExternalLinksDialog" ).dialog( 'open' );
	};

	this.purge = function() {
		window.location.replace( wgServer + wgScriptPath + '/index.php?action=purge&title=' + encodeURIComponent( wgPageName ) );
		return;
	};
};

WEF_ExternalLinks.prototype.setup = function() {
	var d = this.definitions;
	var i18n = wef_ExternalLinks_i18n;

	this.groups = [];
	this.groups.push( {
		label: i18n.tabOfficialPages,
		fields: [// 
		d.Q116933, // vk.com
		d.Q4101720, // vkrugudruzei.ru
		d.Q219523, // livejournal.com
		d.Q4299813, // moikrug.ru
		d.Q4299858, // my.mail.ru
		d.Q1123836, // odnoklassniki.ru
		d.Q17195318, // sprashivai.ru
		d.Q798490, // ya.ru
		d.Q171186, // blogspot.com
		d.Q4037665, // dudu.com
		d.Q355, // facebook.com
		d.Q356, // plus.google.com
		d.Q4043051, // liveinternet.ru
		d.Q40629, // myspace.com
		d.Q17144398, // qroom.ru
		d.Q1002972, // spring.me
		d.Q384060, // tumblr.com
		d.Q918, // twitter.com
		],
	} );
	this.groups.push( {
		label: i18n.tabTexts,
		fields: [//
		d.Q17254543, // chitalnya.ru
		d.Q4380129, // proza.ru
		d.Q17195344, // samlib.ru
		d.Q4442644, // stihi.ru
		d.Q17300505, // fan.lib.ru
		],
	} );
	this.groups.push( {
		label: i18n.tabMedia,
		fields: [//
		d.P373, // commons.wikimedia.org
		d.Q103204, // flickr.com
		d.Q209330, // instagram.com
		d.Q6883832, // mixcloud.com
		d.Q17117201, // promodj.com
		d.Q372827, // rutube.ru
		d.Q568769, // soundcloud.com
		d.Q156376, // vimeo.com
		d.Q866, // youtube.com
		],
	} );
	this.groups.push( {
		label: i18n.tabTheaterAndMovies,
		fields: [//
		d.P1265, // allocine.fr
		d.P1266, // allocine.fr
		d.P1267, // allocine.fr
		d.P1237, // boxofficemojo.com
		d.P480, // Filmaffinity
		d.P1217, // ibdb.com
		d.P1218, // ibdb.com
		d.P1219, // ibdb.com
		d.P1220, // ibdb.com
		d.P345, // imdb.com
		d.P1258, // rottentomatoes.com
		],
	} );
	this.groups.push( {
		label: i18n.tabMusic,
		fields: [ //
		d.P839, // imslp.org
		d.Q183718, // lastfm.ru
		d.P434, // musicbrainz.org
		d.P435, // musicbrainz.org
		d.P436, // musicbrainz.org
		],
	} );
	this.groups.push( {
		label: i18n.tabLiteratureAndManga,
		fields: [// 
		d.P1361, // animenewsnetwork.com
		d.P1233, // isfdb.org
		d.P1234, // isfdb.org
		d.P1235, // isfdb.org
		d.P1239, // isfdb.org
		],
	} );
	this.groups.push( {
		label: i18n.tabScience,
		fields: [// 
		d.P549, // genealogy.ams.org
		d.P496, // orcid.org
		d.P1053, // researcherid.com
		d.P1153, // scopus.com
		],
	} );
	this.groups.push( {
		label: i18n.tabOther,
		fields: [//
		d.P1185, // rodovid.org
		d.P535, // findagrave.com
		d.P998, // dmoz.org
		d.P650, // RKDartists
		d.P350, // RKDimages
		],
	} );
	this.groups.push( {
		label: i18n.tabEncyclopedias,
		fields: [//
		d.Q234535,// Большая советская
		d.Q4239850,// Краткая литературная
		d.Q2627728,// Кругосвет
		d.Q4263804,// Литературная
		d.Q2498180,// Православная
		d.P1417, // Encyclopædia Britannica online
		d.Q17329836,// Encyclopédique Larousse en ligne
		d.P902, // hls-dhs-dss.ch
		d.P886, // e-lir.ch
		],
	} );
	this.groups.push( {
		label: i18n.tabAuthorityControlVIAF,
		fields: [// 
		d.P213, // ISNI
		d.P214, // VIAF
		d.P1017, // BAV
		d.P1015, // BIBSYS
		d.P1273, // BNC
		d.P950, // BNE
		d.P268, // BNF
		d.P651, // BPN
		d.P1309, // EGAXA
		d.P227, // DNB / GND
		d.P396, // ICCU / SBN
		d.P244, // LCCN
		d.P1368, // LNB
		d.P349, // NDL
		d.P691, // NKC
		d.P409, // NLA
		d.P1006, // NTA
		d.P1375, // NSK
		d.P951, // NSZL
		d.P1207, // NUKAT
		d.P1005, // PTBNP
		d.P947, // RSL
		d.P906, // SELIBR / LIBRIS
		d.P269, // SUDOC
		d.P245, // ULAN
		],
	} );
	this.groups.push( {
		label: i18n.tabAuthorityControlOther,
		fields: [//
		d.P1003, // BNR
		d.P270, // CALIS
		d.P497, // CBDB
		d.P271, // CiNii
		d.P1280, // CONOR
		d.P380, // Mérimée
		d.P1315, // NLA PI
		d.P1213, // NLC
		],
	} );
};

if ( wgServerName === 'ru.wikipedia.org' ) {
	importScript( 'MediaWiki:RuWikiFlagsHtml.js' );
	importStylesheet( 'MediaWiki:WEF_ExternalLinks.css' );
	importScript( 'MediaWiki:WEF_Editors.js' );
	importStylesheet( 'MediaWiki:WEF_Editors.css' );
} else {
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:RuWikiFlagsHtml.js&action=raw&ctype=text/javascript&maxage=86400&smaxage=21600' );
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_ExternalLinks.css&action=raw&ctype=text/css&maxage=86400&smaxage=21600', 'text/css' );
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.js&action=raw&ctype=text/javascript&maxage=86400&smaxage=21600' );
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.css&action=raw&ctype=text/css&maxage=86400&smaxage=21600', 'text/css' );
}

var externalLinksEdit;
mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.dialog', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		externalLinksEdit = new WEF_ExternalLinks();
		externalLinksEdit.init();
		externalLinksEdit.setup();
		externalLinksEdit.addButtonsEdit();
	} );
} );
