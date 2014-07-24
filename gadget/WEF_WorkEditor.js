/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit FRBR work
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_WorkEditor_html = "<div class=\'wef_workEditor_dialog\'><div class=\'wef_tabs\'><ul><li><a href=\'#wef_workEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li><li><a href=\'#wef_workEditor_tab_content\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupContent</a></li><li><a href=\'#wef_workEditor_tab_characters\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P674</a></li><li><a href=\'#wef_workEditor_tab_classification\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupClassification</a></li><li><a href=\'#wef_workEditor_tab_awards\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P166</a></li><li><a href=\'#wef_workEditor_tab_editions\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P747</a></li></ul><div id=\'wef_workEditor_tab_general\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset\'><legend class=\'wef_i18n_text\'>fieldsetGeneral</legend><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\'/></table></fieldset><fieldset class=\'wef_fieldset\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P50\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P767\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P98\' data-datatype=\'wikibase-item\'/></table></fieldset><fieldset class=\'wef_fieldset\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P357\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P392\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P571\' data-datatype=\'time\'/></table></fieldset></div><div id=\'wef_workEditor_tab_content\' class=\'wef_editor_tab\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P135\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P136\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P921\' data-datatype=\'wikibase-item\'/></table><fieldset class=\'wef_fieldset\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P155\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P156\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P179\' data-datatype=\'wikibase-item\'/></table></fieldset><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P144\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P941\' data-datatype=\'wikibase-item\'/></table></div><div id=\'wef_workEditor_tab_characters\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset wef_single_property_fieldset\'><legend class=\"wef_i18n_label\">P674</legend><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P674\' data-datatype=\'wikibase-item\'/></table></fieldset></div><div id=\'wef_workEditor_tab_classification\' class=\'wef_editor_tab\'><table class=\"wef_table\"><tbody class=\'wef_claim_editors\' data-code=\'P1036\' data-datatype=\'string\' data-check=\'^\\d{3}|\\d{3}\\.\\d+|2--\\d+$\'/><tbody class=\'wef_claim_editors\' data-code=\'P648\' data-datatype=\'string\' data-check=\'^OL\\d+(W|M|A)$\'data-template=\'https://openlibrary.org/books/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1085\' data-datatype=\'string\' data-check=\'^\\d{1,8}$\'data-template=\'http://www.librarything.com/work/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1150\' data-datatype=\'string\' data-flag=\'cn\'/><tbody class=\'wef_claim_editors\' data-code=\'P1150\' data-datatype=\'string\' data-flag=\'de\'/><tbody class=\'wef_claim_editors\' data-code=\'P1190\' data-datatype=\'string\' data-flag=\'ru\'/><tbody class=\'wef_claim_editors\' data-code=\'P1149\' data-datatype=\'string\' data-flag=\'us\'/></table></div><div id=\'wef_workEditor_tab_awards\' class=\'wef_editor_tab\'><fieldset class=\"wef_fieldset\"><legend class=\"wef_i18n_label\">P166</legend><table class=\"wef_table\"><tbody class=\"wef_claim_editors\" data-code=\"P166\" data-datatype=\"wikibase-item\"><tr data-code=\"P585\" data-datatype=\"time\" data-as-column=\"true\" data-editordatatype=\"time-years\"/><tr data-code=\"P1027\" data-datatype=\"wikibase-item\"/></tbody></table></fieldset></div><div id=\'wef_workEditor_tab_editions\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset wef_single_property_fieldset\'><legend class=\"wef_i18n_label\">P747</legend><table class=\"wef_table\"><tbody class=\"wef_claim_editors\" data-code=\"P747\" data-datatype=\"wikibase-item\"></tbody></table></fieldset></div></div></div>";

var wef_WorkEditor_i18n_en = {

	dialogTitle: 'FRBR Work data — WE-Framework',

	groupContent: 'Content',
	groupClassification: 'Classification',

	menuButton: 'WEF: FRBR Work',
};

var wef_WorkEditor_i18n_ru = {

	dialogTitle: 'Свойства работы — WE-Framework',

	groupContent: 'Содержание',
	groupClassification: 'Классификация',

	menuButton: 'WEF: FRBR работа',
};

if ( wgServerName === 'ru.wikipedia.org' ) {
	importStylesheet( 'MediaWiki:WEF_WorkEditor.css' );

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
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_WorkEditor.css&action=raw&ctype=text/css', 'text/css' );

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

var wef_WorkEditor;
mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.ui.dialog', 'jquery.ui.selectable', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		wef_WorkEditor = new WEF_Editor( wef_WorkEditor_html );
		wef_WorkEditor.localize( 'wef_WorkEditor_i18n_' );
		wef_WorkEditor.addEditButtons();
	} );
} );
