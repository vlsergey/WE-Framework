var wef_SourceJournalEditor_html = "<div class=\'wef_sourceJournalEditor_dialog\'><div class=\'wef_tabs\'><ul><li><a href=\'#wef_sourceJournalEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li></ul><div id=\'wef_sourceJournalEditor_tab_general\' class=\'wef_editor_tab\'><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\'/></table><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P357\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P743\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'wikibase-item\'/></table><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P291\' data-datatype=\'wikibase-item\'><tr data-code=\'P743\' data-datatype=\'string\' data-as-column=\'true\'/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P123\' data-datatype=\'wikibase-item\'><tr data-code=\'P743\' data-datatype=\'string\' data-as-column=\'true\'/></tbody></table><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P236\' data-datatype=\'string\'/></table></div></div></div>";

window.wef_SourceJournalEditor_i18n_en = {
	dialogTitle: 'Source (Journal) — WE-Framework',
	statusLoadingModuleData: 'Loading local description data',
};

window.wef_SourceJournalEditor_i18n_ru = {
	dialogTitle: 'Источник (научный журнал) — WE-Framework',
	statusLoadingModuleData: 'Загрузка локальных данных описания',
};

var dependencies = [ // 
'jquery.ui.autocomplete', // 
'jquery.ui.dialog', //
'jquery.ui.datepicker',// 
'jquery.ui.tabs', //
'ext.gadget.wefcore', //
'ext.gadget.wefflags', //
'ext.gadget.wefsources', //
'mediawiki.api.edit',//
];
mw.loader.using( dependencies, function() {
	var editor = new WEF_Editor( wef_SourceJournalEditor_html );
	editor.localize( 'wef_SourceJournalEditor_i18n_' );

	editor.afterSave = function() {
		window.wef_sources.updateLocalSourceDescription( editor.i18n, editor.entityId );
	};

	var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
	$( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).click( function() {
		var entityId = prompt( "EntityID to edit as scientific journal source defintion", "Q" );
		editor.entityId = entityId;
		editor.edit();
	} ).text( "edit some journal definition" ).appendTo( li );
	$( '#p-tb div ul' ).append( li );
} );
