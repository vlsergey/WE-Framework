/**
 * This JavaScript is a implementation of JavaScript Gadget to edit FRBR work
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_WorkEditor_html = "<div class=\'wef_workEditor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_content\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupContent</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_characters\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P674</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_classification\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupClassification</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_awards\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P166</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_editions\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P747</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_workEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- author -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P50\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- collaborator -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P767\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- editor -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P98\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- title -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1476\' data-datatype=\'monolingualtext\' />\r\n" + 
		"					<!-- subtitle -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1680\' data-datatype=\'monolingualtext\' />\r\n" + 
		"					<!-- original language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- date of foundation or creation -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P571\' data-datatype=\'time\' />\r\n" + 
		"					<!-- date of publication -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- image -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_content\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- movement -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P135\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- genre -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P136\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- subject heading -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P921\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- follows -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P155\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- followed by -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P156\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- series -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P179\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- based on -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P144\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- inspired by -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P941\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_characters\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P674</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- characters -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P674\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_classification\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- Dewey Decimal Classification -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1036\' data-datatype=\'string\' data-check=\'^\\d{3}|\\d{3}\\.\\d+|2--\\d+$\' />\r\n" + 
		"				<!-- Open Library identifier -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P648\' data-datatype=\'string\' data-check=\'^OL\\d+(W|M|A)$\'\r\n" + 
		"					data-template=\'https://openlibrary.org/books/$1\' />\r\n" + 
		"				<!-- LibraryThing work identifier -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1085\' data-datatype=\'string\' data-check=\'^\\d{1,8}$\'\r\n" + 
		"					data-template=\'http://www.librarything.com/work/$1\' />\r\n" + 
		"				<!-- Universal Decimal Classification -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1190\' data-datatype=\'string\' />\r\n" + 
		"				<!-- Chinese Library Classification -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1189\' data-datatype=\'string\' data-flag=\'cn\' />\r\n" + 
		"				<!-- Regensburg Classification -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1150\' data-datatype=\'string\' data-flag=\'de\' />\r\n" + 
		"				<!-- Library of Congress Classification -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1149\' data-datatype=\'string\' data-flag=\'us\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_awards\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P166</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- award received -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P166\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- point in time -->\r\n" + 
		"						<tr data-code=\'P585\' data-datatype=\'time\' data-as-column=\'true\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- awarded by -->\r\n" + 
		"						<tr data-code=\'P1027\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_editions\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P747</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- edition -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P747\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_WorkEditor_i18n_en = {

	dialogTitle: 'FRBR Work data — WE-Framework',

	groupContent: 'Content',
	groupClassification: 'Classification',

	menuButton: 'WEF: FRBR Work',
};

window.wef_WorkEditor_i18n_ru = {

	dialogTitle: 'Свойства работы — WE-Framework',

	groupContent: 'Содержание',
	groupClassification: 'Классификация',

	menuButton: 'WEF: FRBR работа',
};

var editor = new WEF_Editor( wef_WorkEditor_html );
editor.localize( 'wef_WorkEditor_i18n_' );
editor.addEditButtons( 'Q386724' );
window.wef_editors_registry.registerEditor( 'Q386724', editor );
