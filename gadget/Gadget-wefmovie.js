/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit taxonal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_MovieEditor_html = "<div class=\'wef_movieEditor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_movieEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_movieEditor_tab_cast_member\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P161</a></li>\r\n" + 
		"			<li><a href=\'#wef_movieEditor_tab_voice_actor\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P725</a></li>\r\n" + 
		"			<li><a href=\'#wef_movieEditor_tab_databases\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupDatabases</a></li>\r\n" + 
		"			<li><a href=\'#wef_movieEditor_tab_awards\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P166</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_movieEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetGeneral</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- image -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- country of origin -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P495\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- original language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- date of publication -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\' />\r\n" + 
		"					<!-- genre -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P136\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>Q3297652</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- director -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P57\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- director of photography -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P344\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- screenwriter -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P58\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- producer -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P162\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- production company -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P272\' /data-datatype=\'wikibase-item\'>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_movieEditor_tab_cast_member\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P161</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- cast member -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P161\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- character role -->\r\n" + 
		"						<tr data-code=\'P453\' data-datatype=\'wikibase-item\' data-as-column=\'true\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_movieEditor_tab_voice_actor\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P725</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- voice actor -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P725\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- character role -->\r\n" + 
		"						<tr data-code=\'P453\' data-datatype=\'wikibase-item\' data-as-column=\'true\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_movieEditor_tab_awards\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
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
		"		<div id=\'wef_movieEditor_tab_databases\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1237\' data-datatype=\'string\' data-check=\'^[a-z0-9]+$\'\r\n" + 
		"					data-template=\'http://boxofficemojo.com/movies/?id=$1.htm\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P480\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.filmaffinity.com/en/film$1.html\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P345\' data-datatype=\'string\' data-check=\'^tt\\d{7}$\'\r\n" + 
		"					data-template=\'http://www.imdb.com/title/$1/\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1258\' data-datatype=\'string\'\r\n" + 
		"					data-check=\'^(m|tv|celebrity|critic)/[-0-9a-z_&#39;]+|source-[1-9]\\d*$\'\r\n" + 
		"					data-template=\'http://www.rottentomatoes.com/$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1265\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.allocine.fr/film/fichefilm_gen_cfilm=$1.html\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_MovieEditor_i18n_en = {
	dialogTitle: 'Movie data — WE-Framework',
	groupDatabases: 'Databases',
	menuButton: 'WEF: Movie',
};

window.wef_MovieEditor_i18n_ru = {
	dialogTitle: 'Свойства фильма — WE-Framework',
	groupDatabases: 'Базы данных',
	menuButton: 'WEF: Фильм',
};

mw.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.dialog', 'jquery.ui.datepicker', 'jquery.ui.tabs', 'ext.gadget.wefcore', 'ext.gadget.wefflags' ], function() {
	window.wef_MovieEditor = new WEF_Editor( wef_MovieEditor_html );
	window.wef_MovieEditor.localize( 'wef_MovieEditor_i18n_' );
	window.wef_MovieEditor.addEditButtons();
} );
