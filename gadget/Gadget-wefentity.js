/**
 * This JavaScript is a implementation of JavaScript Gadget to edit common
 * entity information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_EntityEditor_html = "<div class=\'wef_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_entityEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_entityEditor_tab_sources\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P1343</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_entityEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- subclass of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P279\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_entityEditor_tab_sources\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P1343</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- described by source -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1343\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- stated in -->\r\n" + 
		"						<tr data-code=\'P248\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- section, verse, or paragraph -->\r\n" + 
		"						<tr data-code=\'P958\' data-datatype=\'string\' />\r\n" + 
		"						<!-- volume -->\r\n" + 
		"						<tr data-code=\'P478\' data-datatype=\'string\' />\r\n" + 
		"						<!-- page -->\r\n" + 
		"						<tr data-code=\'P304\' data-datatype=\'string\' />\r\n" + 
		"						<!-- reference URL -->\r\n" + 
		"						<tr data-code=\'P854\' data-datatype=\'url\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_EntityEditor_i18n_en = {
	dialogTitle: 'Entity data — WE-Framework',
	menuButton: 'WEF: Entity',
};

window.wef_EntityEditor_i18n_ru = {
	dialogTitle: 'Свойства сущности — WE-Framework',
	menuButton: 'WEF: Сущность',
};

var editor = new WEF_Editor( wef_EntityEditor_html );
editor.localize( 'wef_EntityEditor_i18n_' );
editor.addEditButtons();
window.wef_editors_registry.registerEditor( 'Q35120', editor );
