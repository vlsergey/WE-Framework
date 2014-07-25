/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit FRBR
 * edition information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_EditionEditor_html = "<div class=\'wef_workEditor_dialog\'><div class=\'wef_tabs\'><ul><li><a href=\'#wef_workEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li><li><a href=\'#wef_workEditor_tab_inside\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupInside</a></li><li><a href=\'#wef_workEditor_tab_classification\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupClassification</a></li><li><a href=\'#wef_workEditor_tab_other\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupOther</a></li></ul><div id=\'wef_workEditor_tab_general\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset\'><legend class=\'wef_i18n_text\'>fieldsetGeneral</legend><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\'/></table></fieldset><fieldset class=\'wef_fieldset\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P407\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P357\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P392\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P361\' data-datatype=\'wikibase-item\'/></table></fieldset><fieldset class=\'wef_fieldset\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P629\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P393\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P291\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P123\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\'/><tbody class=\'wef_claim_editors\' data-code=\'P872\' data-datatype=\'wikibase-item\'/></table></fieldset></div><div id=\'wef_workEditor_tab_inside\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P50\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P655\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P98\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P110\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P767\' data-datatype=\'wikibase-item\'><tr data-code=\"P518\" data-datatype=\"wikibase-item\"/></tbody></table></fieldset><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P1104\' data-datatype=\'quantity\'/><tbody class=\'wef_claim_editors\' data-code=\'P996\' data-datatype=\'commonsMedia\'/><tbody class=\'wef_claim_editors\' data-code=\'P953\' data-datatype=\'url\'/></table></div><div id=\'wef_workEditor_tab_classification\' class=\'wef_editor_tab\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P957\' data-datatype=\'string\'data-check=\'^\\d{1,5}(-)\\d{1,7}\\1\\d{1,6}\\1[0-9X]$\' data-template=\'//wiki/Special:BookSources/$1\'><tr data-code=\"P437\" data-datatype=\"wikibase-item\"/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P212\' data-datatype=\'string\'data-check=\'^97[89]-([0-57]-\\d-\\d\\d\\d\\d\\d\\d\\d|[0-57]-\\d\\d-\\d\\d\\d\\d\\d\\d|[0-57]-\\d\\d\\d-\\d\\d\\d\\d\\d|[0-57]-\\d\\d\\d\\d-\\d\\d\\d\\d|[0-57]-\\d\\d\\d\\d\\d-\\d\\d\\d|[0-57]-\\d\\d\\d\\d\\d\\d-\\d\\d|[0-57]-\\d\\d\\d\\d\\d\\d\\d-\\d|[89]\\d-\\d-\\d\\d\\d\\d\\d\\d|[89]\\d-\\d\\d-\\d\\d\\d\\d\\d|[89]\\d-\\d\\d\\d-\\d\\d\\d\\d|[89]\\d-\\d\\d\\d\\d-\\d\\d\\d|[89]\\d-\\d\\d\\d\\d\\d-\\d\\d|[89]\\d-\\d\\d\\d\\d\\d\\d-\\d|[69]\\d\\d-\\d-\\d\\d\\d\\d\\d|[69]\\d\\d-\\d\\d-\\d\\d\\d\\d|[69]\\d\\d-\\d\\d\\d-\\d\\d\\d|[69]\\d\\d-\\d\\d\\d\\d-\\d\\d|[69]\\d\\d-\\d\\d\\d\\d\\d-\\d|99[0-8]\\d-\\d-\\d\\d\\d\\d|99[0-8]\\d-\\d\\d-\\d\\d\\d|99[0-8]\\d-\\d\\d\\d-\\d\\d|99[0-8]\\d-\\d\\d\\d\\d-\\d|999\\d\\d-\\d-\\d\\d\\d|999\\d\\d-\\d\\d-\\d\\d|999\\d\\d-\\d\\d\\d-\\d)-\\d$\'data-template=\'//wiki/Special:BookSources/$1\'><tr data-code=\"P437\" data-datatype=\"wikibase-item\"/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P243\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'https://www.worldcat.org/oclc/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P648\' data-datatype=\'string\' data-check=\'^OL\\d+(W|M|A)$\'data-template=\'https://openlibrary.org/books/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P675\' data-datatype=\'string\' data-check=\'^[0-9a-zA-Z_\\-]{12}$\'data-template=\'http://books.google.com/books?id=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P724\' data-datatype=\'string\'data-template=\'http://archive.org/details/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1143\' data-datatype=\'string\' data-flag=\'ar\' data-check=\'^\\d+$\'/><tbody class=\'wef_claim_editors\' data-code=\'P1044\' data-datatype=\'string\' data-flag=\'de\' data-check=\'^\\d+$\'data-template=\'http://swb.bsz-bw.de/DB=2.1/PPNSET?PPN=$1&INDEXSET=1\'><tr data-code=\"P437\" data-datatype=\"wikibase-item\"/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P1292\' data-datatype=\'string\' data-flag=\'de\' data-check=\'^\\d+$\'data-template=\'http://d-nb.info/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1084\' data-datatype=\'string\' data-flag=\'eg\' data-check=\'^\\d+$\'data-template=\'http://srv3.eulc.edu.eg/eulc_v5/libraries/Start.aspx?fn=ApplySearch&BibID=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1025\' data-datatype=\'string\' data-flag=\'fr\' data-check=\'^\\d+$\'data-template=\'http://www.sudoc.fr/$1\'/></table></div><div id=\'wef_workEditor_tab_other\' class=\'wef_editor_tab\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P195\' data-datatype=\'wikibase-item\'><tr data-code=\"P580\" data-datatype=\"time\"/><tr data-code=\"P582\" data-datatype=\"time\"/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P276\' data-datatype=\'wikibase-item\'><tr data-code=\"P580\" data-datatype=\"time\"/><tr data-code=\"P582\" data-datatype=\"time\"/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P793\' data-datatype=\'wikibase-item\'><tr data-code=\"P585\" data-datatype=\"time\"/></tbody></table></div></div></div>";

var wef_EditionEditor_i18n_en = {

	dialogTitle: 'FRBR Edition data — WE-Framework',

	groupContent: 'Content',
	groupInside: 'Inside',
	groupClassification: 'Classification',
	groupOther: 'Other',

	menuButton: 'WEF: FRBR Edition',
};

var wef_EditionEditor_i18n_ru = {

	dialogTitle: 'Свойства издания — WE-Framework',

	groupContent: 'Содержание',
	groupInside: 'Внутри',
	groupClassification: 'Классификация',
	groupOther: 'Другое',

	menuButton: 'WEF: FRBR издание',
};

if ( wgServerName === 'ru.wikipedia.org' ) {
	importStylesheet( 'MediaWiki:WEF_EditionEditor.css' );

	if ( !window.wef_loadingMarker_RuWikiFlagsHtml ) {
		importScript( 'MediaWiki:RuWikiFlagsHtml.js' );
		window.wef_loadingMarker_RuWikiFlagsHtml = true;
	}

	if ( !window.wef_loadingMarker_Editors ) {
		importScript( 'MediaWiki:WEF_Editors.js' );
		importStylesheet( 'MediaWiki:WEF_Editors.css' );
		window.wef_loadingMarker_Editors = true;
	}
} else {
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_EditionEditor.css&action=raw&ctype=text/css', 'text/css' );

	if ( !window.wef_loadingMarker_RuWikiFlagsHtml ) {
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:RuWikiFlagsHtml.js&action=raw&ctype=text/javascript' );
		window.wef_loadingMarker_RuWikiFlagsHtml = true;
	}

	if ( !window.wef_loadingMarker_Editors ) {
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.js&action=raw&ctype=text/javascript' );
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.css&action=raw&ctype=text/css', 'text/css' );
		window.wef_loadingMarker_Editors = true;
	}
}

var wef_EditionEditor;
mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.ui.dialog', 'jquery.ui.selectable', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		wef_EditionEditor = new WEF_Editor( wef_EditionEditor_html );
		wef_EditionEditor.localize( 'wef_EditionEditor_i18n_' );
		wef_EditionEditor.addEditButtons();
	} );
} );
