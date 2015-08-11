var wef_SourceArticleEditor_html = "<div class=\'wef_sourceArticleEditor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_sourceArticleEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_sourceArticleEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- author -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P50\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- short name -->\r\n" + 
		"						<tr data-code=\'P743\' data-datatype=\'string\' data-as-column=\'true\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- title -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P357\' data-datatype=\'string\' />\r\n" + 
		"					<!-- original language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- published in -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1433\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- short name -->\r\n" + 
		"						<tr data-code=\'P743\' data-datatype=\'string\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- volume -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P478\' data-datatype=\'string\' />\r\n" + 
		"					<!-- issue -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P433\' data-datatype=\'string\' />\r\n" + 
		"					<!-- pages -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P304\' data-datatype=\'string\' />\r\n" + 
		"					<!-- language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P407\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- date of publication -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- URL -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P953\' data-datatype=\'url\' />\r\n" + 
		"					<!-- check date -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P813\' data-datatype=\'time\' />\r\n" + 
		"					<!-- archive URL -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1065\' data-datatype=\'url\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P356\' data-datatype=\'string\' />\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P888\' data-datatype=\'string\' />\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P889\' data-datatype=\'string\' />\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P894\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_SourceArticleEditor_i18n_en = {
	dialogTitle: 'Source (Article) — WE-Framework',
	statusLoadingModuleData: 'Loading local description data',

	menuButton: 'WEF: Article',
};

window.wef_SourceArticleEditor_i18n_ru = {
	dialogTitle: 'Источник (Статья) — WE-Framework',
	statusLoadingModuleData: 'Загрузка локальных данных описания',

	menuButton: 'WEF: Статья',
};

mw.loader.using( [ //
'jquery.ui.autocomplete', //
'jquery.ui.dialog', //
'jquery.ui.tabs', //
'jquery.uls.data', //
'ext.gadget.wefcore', //
'ext.gadget.wefflags', //
], function() {
	var editor = new WEF_Editor( wef_SourceArticleEditor_html );
	editor.localize( 'wef_SourceArticleEditor_i18n_' );
	editor.addEditButtons();
	window.wef_editors_registry.registerEditor( 'Q191067', editor );
} );
