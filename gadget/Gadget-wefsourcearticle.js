var wef_SourceArticleEditor_html = "<div class=\'wef_sourceArticleEditor_dialog\'><div class=\'wef_tabs\'><ul><li><a href=\'#wef_sourceArticleEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li></ul><div id=\'wef_sourceArticleEditor_tab_general\' class=\'wef_editor_tab\'><fieldset><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\'/></table><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P50\' data-datatype=\'wikibase-item\'><tr data-code=\'P743\' data-datatype=\'string\' data-as-column=\'true\'/></tbody></table><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P357\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'string\'/></table></fieldset><fieldset><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P1433\' data-datatype=\'wikibase-item\'><tr data-code=\'P743\' data-datatype=\'string\'/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P478\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P304\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P407\' data-datatype=\'string\'/><tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\'/></table></fieldset><fieldset><table class=\'wef_table\'><tbody class=\'wef_claim_editors\' data-code=\'P953\' data-datatype=\'url\'/><tbody class=\'wef_claim_editors\' data-code=\'P813\' data-datatype=\'time\'/><tbody class=\'wef_claim_editors\' data-code=\'P1065\' data-datatype=\'url\'/></table></fieldset></div></div></div>";

window.wef_SourceArticleEditor_i18n_en = {
	dialogTitle: 'Source (Article) — WE-Framework',
	statusLoadingModuleData: 'Loading local description data',
};

window.wef_SourceArticleEditor_i18n_ru = {
	dialogTitle: 'Источник (Статья) — WE-Framework',
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
	var editor = new WEF_Editor( wef_SourceArticleEditor_html );
	editor.localize( 'wef_SourceArticleEditor_i18n_' );

	editor.afterSave = function() {
		window.wef_sources.updateLocalSourceDescription( editor.i18n, editor.entityId );
	};

	var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
	$( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).click( function() {
		var entityId = prompt( "EntityID to edit as scientific article source defintion", "Q" );
		editor.entityId = entityId;
		editor.edit();
	} ).text( "edit some article definition" ).appendTo( li );
	$( '#p-tb div ul' ).append( li );
} );
