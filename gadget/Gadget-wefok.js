/**
 * This JavaScript is a implementation of JavaScript Gadget to edit common
 * entity information on Wikidata. This script is based on WE-Framework.
 *
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_OkEditor_html = "<div class=\'wef_dialog\'>\r\n" +
		"	<div class=\'wef_tabs\'>\r\n" +
		"		<ul>\r\n" +
		"			<li><a href=\'#wef_entityEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" +
		"			<li><a href=\'#wef_entityEditor_tab_sources\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P1343</a></li>\r\n" +
		"		</ul>\r\n" +
		"		<div id=\'wef_entityEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" +
		"			<div class=\"wef_labels_editor\"></div>\r\n" +
		"			<fieldset class=\'wef_single_property_fieldset\'>\r\n" +
		"				<legend class=\'wef_i18n_label\'>P279</legend>\r\n" +
		"				<table class=\'wef_table\'>\r\n" +
		"					<!-- subclass of -->\r\n" +
		"					<tbody class=\'wef_claim_editors\' data-code=\'P279\' data-datatype=\'wikibase-item\' >\r\n" +
		"						<tr data-code=\'P1013\' data-datatype=\'wikibase-item\' />\r\n" +
		"					</tbody>\r\n" +
		"				</table>\r\n" +
		"			</fieldset>\r\n" +
		"			<fieldset>\r\n" +
		"				<legend class=\'wef_i18n_label\'>Q4330198</legend>\r\n" +
		"				<table class=\'wef_table\'>\r\n" +
		"					<tbody class=\'wef_claim_editors\' data-code=\'P3248\' data-datatype=\'external-id\'>\r\n" +
		"						<tr data-code=\'P1448\' data-datatype=\'monolingualtext\' />\r\n" +
		"					</tbody>\r\n" +
		"					<tbody class=\'wef_claim_editors\' data-code=\'P3245\' data-datatype=\'external-id\'>\r\n" +
		"						<tr data-code=\'P1448\' data-datatype=\'monolingualtext\' />\r\n" +
		"					</tbody>\r\n" +
		"					<tbody class=\'wef_claim_editors\' data-code=\'P3250\' data-datatype=\'external-id\'>\r\n" +
		"						<tr data-code=\'P1448\' data-datatype=\'monolingualtext\' />\r\n" +
		"					</tbody>\r\n" +
		"				</table>\r\n" +
		"			</fieldset>\r\n" +
		"			<fieldset>\r\n" +
		"				<legend class=\'wef_i18n_label\'>Q19192441</legend>\r\n" +
		"				<table class=\'wef_table\'>\r\n" +
		"					<tbody class=\'wef_claim_editors\' data-code=\'P3243\' data-datatype=\'external-id\'>\r\n" +
		"						<tr data-code=\'P1448\' data-datatype=\'monolingualtext\' />\r\n" +
		"					</tbody>\r\n" +
		"					<tbody class=\'wef_claim_editors\' data-code=\'P3246\' data-datatype=\'external-id\'>\r\n" +
		"						<tr data-code=\'P1448\' data-datatype=\'monolingualtext\' />\r\n" +
		"					</tbody>\r\n" +
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

window.wef_OkEditor_i18n_en = {
	dialogTitle: 'Russian Classifiers — WE-Framework',
	menuButton: 'WEF: RuClassifiers',
};

window.wef_OkEditor_i18n_ru = {
	dialogTitle: 'Общероссийские классификаторы — WE-Framework',
	menuButton: 'WEF: ОК[ВЭД,П,ПД]',
};

var editor = new WEF_Editor( wef_OkEditor_html );
editor.localize( 'wef_OkEditor_i18n_' );
editor.addEditButtons();
