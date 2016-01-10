/**
 * This JavaScript is a implementation of JavaScript Gadget to edit sotware
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.wef_SoftwareEditor_html = "<div class=\'wef_editor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_softwareEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_softwareEditor_tab_releases\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P348</a></li>\r\n" + 
		"			<li><a href=\'#wef_softwareEditor_tab_file_formats\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q235557</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_softwareEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- Logo -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P154\' data-datatype=\'commonsMedia\' />\r\n" + 
		"					<!-- Image -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" + 
		"					<!--  Commons category -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P373\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- founder -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P112\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- creator -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P170\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- developer -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P178\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- license -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P275\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- site -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P856\' data-datatype=\'url\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- hardware platform -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P400\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- OS -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P306\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- programming language  -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P277\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- UI -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1414\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- Languages  -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P407\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_softwareEditor_tab_releases\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P348</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- releases  -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P348\' data-datatype=\'string\'>\r\n" + 
		"						<!-- type -->\r\n" + 
		"						<tr data-code=\'P548\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- platform -->\r\n" + 
		"						<tr data-code=\'P306\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- OS -->\r\n" + 
		"						<tr data-code=\'P400\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- date -->\r\n" + 
		"						<tr data-code=\'P577\' data-datatype=\'time\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_softwareEditor_tab_file_formats\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P1072</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- input formats -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1072\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P1073</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- input formats -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1073\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_SoftwareEditor_i18n_en = {
	dialogTitle: 'Software — WE-Framework',
	menuButton: 'WEF: Software',
};

window.wef_SoftwareEditor_i18n_ru = {
	dialogTitle: 'Программное обеспечение — WE-Framework',
	menuButton: 'WEF: Программа',
};

mw.loader.using( [ //
'jquery.ui.autocomplete', //
'jquery.ui.dialog', //
'jquery.ui.tabs', //
'jquery.uls.data', //
'ext.gadget.wefcore', //
'ext.gadget.wefflags', //
], function() {
	var editor = new WEF_Editor( wef_SoftwareEditor_html );
	editor.localize( 'wef_SoftwareEditor_i18n_' );
	editor.addEditButtons( 'Q7397' );
	window.wef_editors_registry.registerEditor( 'Q7397', editor );
} );
