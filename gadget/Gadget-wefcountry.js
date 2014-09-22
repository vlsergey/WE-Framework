/**
 * This JavaScript is a implementation of JavaScript Gadget to edit country
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.wef_CountryEditor_html = "<div class=\'wef_countryEditor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_media\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupMedia</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_history\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q309</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_geography\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q1071</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_politic\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q7163</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_subdivisions\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P150</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_demography\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P1082</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_clubs\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupClubs</a></li>\r\n" + 
		"			<li><a href=\'#wef_countryEditor_tab_iso\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q25275</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetGeneral</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- part of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P361\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- official language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P37\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- currency -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P38\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- song -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P85\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_media\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- commons -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P373\' data-datatype=\'string\' />\r\n" + 
		"			</table>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>Q14660</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- flag image -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P41\' data-datatype=\'commonsMedia\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- flag -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P163\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>Q14659</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- coat of arms image -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P94\' data-datatype=\'commonsMedia\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- coat of arms -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P237\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_history\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- est. date -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P571\' data-datatype=\'time\' />\r\n" + 
		"					<!-- previous -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P155\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- next -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P156\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P138</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- named after -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P138\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- language -->\r\n" + 
		"						<tr data-code=\'P407\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P793</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- significant event -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P793\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_geography\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- continent -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P30\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- capital -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P36\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- time zone -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P421\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P47</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- shares border with -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P47\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"						<!-- subject -->\r\n" + 
		"						<tr data-code=\'P805\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_politic\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- basic form of government -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P122\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- legislative body -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P194\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- highest judicial authority -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P209\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_subdivisions\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P150</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- member of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P150\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"						<!-- subject -->\r\n" + 
		"						<tr data-code=\'P805\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_demography\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P1082</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- member of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1082\' data-datatype=\'quantity\'>\r\n" + 
		"						<!-- point in time -->\r\n" + 
		"						<tr data-code=\'P585\' data-datatype=\'time\' data-as-column=\'true\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_clubs\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P463</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- member of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P463\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' data-as-column=\'true\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' data-as-column=\'true\' />\r\n" + 
		"						<!-- subject -->\r\n" + 
		"						<tr data-code=\'P805\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_countryEditor_tab_iso\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- ISO 3166-1 alpha-2 -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P297\' data-datatype=\'string\' />\r\n" + 
		"				<!-- ISO 3166-1 alpha-3 -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P298\' data-datatype=\'string\' />\r\n" + 
		"				<!-- ISO 3166-1 numeric -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P299\' data-datatype=\'string\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_CountryEditor_i18n_en = {

	dialogTitle: 'Country — WE-Framework',

	groupMedia: 'media',
	groupClubs: 'clubs',

	menuButton: 'WEF: Country',
};

window.wef_CountryEditor_i18n_ru = {

	dialogTitle: 'Страна — WE-Framework',

	groupMedia: 'медиа',
	groupClubs: 'клубы',

	menuButton: 'WEF: Страна',
};

mw.loader.using( [ //
'jquery.ui.autocomplete', //
'jquery.ui.dialog', //
'jquery.ui.tabs', //
'ext.gadget.wefcore', //
'ext.gadget.wefflags', //
'wikibase.utilities.jQuery.ui.tagadata', //
], function() {
	var editor = new WEF_Editor( wef_CountryEditor_html );
	editor.localize( 'wef_CountryEditor_i18n_' );
	editor.addEditButtons();
	window.wef_editors_registry.registerEditor( 'Q6256', editor );
} );