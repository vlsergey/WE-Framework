
/** @class */
window.WEF_ExternalLinks = function( entityId ) {
	var externalLinksEdit = this;

	this.i18n = wef_ExternalLinks_i18n;
	var i18n = this.i18n;

	this.enabled = /^Q\d+$/.test( entityId );

	this.init = function() {
		WEF_Utils.localize( i18n, 'wef_AnyEditor_i18n_' );
		WEF_Utils.localize( i18n, 'wef_ExternalLinks_i18n_' );
	};

	this.dialogWidth = $( window ).width() * 0.66;

	var d = {};

};

// WEF_ExternalLinks.prototype.createDictinaryArticleItem = function( options, pageTitle, articleTitle ) {
// 	var data = {
// 		type: "item",
// 		labels: {},
// 	};
// 	var wikidataTitlePrefix = WEF_Utils.isEmpty( options.wikidataTitlePrefix ) ? options.pageTitlePrefix : options.wikidataTitlePrefix;
// 	data.labels[options.contentLanguage] = {
// 		language: options.contentLanguage,
// 		value: wikidataTitlePrefix + ' / ' + articleTitle,
// 	};
// 	data.labels['ru'] = {
// 		language: 'ru',
// 		value: wikidataTitlePrefix + ' / ' + articleTitle,
// 	};
// 	data.descriptions = {};
// 	data.descriptions['en'] = {
// 		language: 'en',
// 		value: 'encyclopedic article',
// 	};
// 	data.descriptions['ru'] = {
// 		language: 'ru',
// 		value: 'энциклопедическая статья',
// 	};
//
// 	data.claims = {
//
// 		// type
// 		"P31": [ {
// 			"mainsnak": {
// 				"snaktype": "value",
// 				"property": "P31",
// 				"datatype": "wikibase-item",
// 				"datavalue": {
// 					"value": {
// 						"entity-type": "item",
// 						"numeric-id": 17329259
// 					},
// 					"type": "wikibase-entityid"
// 				}
// 			},
// 			"type": "statement",
// 			"rank": "normal"
// 		} ],
//
// 		// part from
// 		"P361": [ {
// 			"mainsnak": {
// 				"snaktype": "value",
// 				"property": "P361",
// 				"datatype": "wikibase-item",
// 				"datavalue": {
// 					"value": {
// 						"entity-type": "item",
// 						"numeric-id": Number( options.dictionaryEntityId.substring( 1 ) )
// 					},
// 					"type": "wikibase-entityid"
// 				}
// 			},
// 			"type": "statement",
// 			"rank": "normal"
// 		} ],
//
// 		// published in
// 		"P1433": [ {
// 			"mainsnak": {
// 				"snaktype": "value",
// 				"property": "P1433",
// 				"datatype": "wikibase-item",
// 				"datavalue": {
// 					"value": {
// 						"entity-type": "item",
// 						"numeric-id": Number( options.dictionaryEntityId.substring( 1 ) )
// 					},
// 					"type": "wikibase-entityid"
// 				}
// 			},
// 			"type": "statement",
// 			"rank": "normal"
// 		} ],
//
// 		// main topic
// 		"P921": [ {
// 			"mainsnak": {
// 				"snaktype": "value",
// 				"property": "P921",
// 				"datatype": "wikibase-item",
// 				"datavalue": {
// 					"value": {
// 						"entity-type": "item",
// 						"numeric-id": Number( options.mainTopicEntityId.substring( 1 ) )
// 					},
// 					"type": "wikibase-entityid"
// 				}
// 			},
// 			"type": "statement",
// 			"rank": "normal"
// 		} ],
//
// 		// title
// 		"P1476": [ {
// 			"mainsnak": {
// 				"snaktype": "value",
// 				"property": "P1476",
// 				"datatype": "monolingualtext",
// 				"datavalue": {
// 					"value": {
// 						"language": options.contentLanguage,
// 						"text": articleTitle,
// 					},
// 					"type": "monolingualtext"
// 				}
// 			},
// 			"type": "statement",
// 			"rank": "normal"
// 		} ],
// 	};
//
// 	data.sitelinks = {};
// 	data.sitelinks[options.project] = {
// 		"site": options.project,
// 		"title": pageTitle,
// 	};
//
// 	return WEF_Utils.createWikidataItem( data );
// };
//
// /** @class */
// WEF_ExternalLinks.DictinaryArticleInput_Options = function() {
// 	/** @type String */
// 	this.contentLanguage = '??';
// 	/** @type String */
// 	this.dictionaryEntityId = 'Q...';
// 	/** @type String */
// 	this.mainTopicEntityId = 'Q...';
// 	/** @type String */
// 	this.project = '??wikisource';
// 	/** @type String */
// 	pageTitleSplitChar: '/',
// 	/** @type String */
// 	this.pageTitlePrefix = '????';
// };
