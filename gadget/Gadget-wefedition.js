/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit FRBR
 * edition information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.wef_EditionEditor_html = "<div class=\'wef_workEditor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_inside\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupInside</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_classification\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupClassification</a></li>\r\n" + 
		"			<li><a href=\'#wef_workEditor_tab_other\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupOther</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_workEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\"wef_table\">\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\"wef_table\">\r\n" + 
		"					<!-- language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P407\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- title -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P357\' data-datatype=\'string\' />\r\n" + 
		"					<!-- subtitle -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P392\' data-datatype=\'string\' />\r\n" + 
		"					<!-- part of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P361\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\"wef_table\">\r\n" + 
		"					<!-- edition or translation of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P629\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- edition number -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P393\' data-datatype=\'string\' />\r\n" + 
		"					<!-- place of publication -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P291\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- publisher -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P123\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- date of publication -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\' />\r\n" + 
		"					<!-- printed by -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P872\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\"wef_table\">\r\n" + 
		"				<!-- image -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_inside\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\"wef_table\">\r\n" + 
		"					<!-- author -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P50\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- translator -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P655\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- editor -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P98\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- illustrator -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P110\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- collaborator -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P767\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- applies to part -->\r\n" + 
		"						<tr data-code=\"P518\" data-datatype=\"wikibase-item\" />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\"wef_table\">\r\n" + 
		"				<!-- movement -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1104\' data-datatype=\'quantity\' />\r\n" + 
		"				<!-- scan file -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P996\' data-datatype=\'commonsMedia\' />\r\n" + 
		"				<!-- full text available at -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P953\' data-datatype=\'url\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_classification\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\"wef_table\">\r\n" + 
		"				<!-- ISBN-10 -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P957\' data-datatype=\'string\'\r\n" + 
		"					data-check=\'^\\d{1,5}(-)\\d{1,7}\\1\\d{1,6}\\1[0-9X]$\' data-template=\'/wiki/Special:BookSources/$1\'>\r\n" + 
		"					<!-- distribution -->\r\n" + 
		"					<tr data-code=\'P437\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- ISBN-13 -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P212\' data-datatype=\'string\'\r\n" + 
		"					data-check=\'^97[89]-([0-57]-\\d-\\d\\d\\d\\d\\d\\d\\d|[0-57]-\\d\\d-\\d\\d\\d\\d\\d\\d|[0-57]-\\d\\d\\d-\\d\\d\\d\\d\\d|[0-57]-\\d\\d\\d\\d-\\d\\d\\d\\d|[0-57]-\\d\\d\\d\\d\\d-\\d\\d\\d|[0-57]-\\d\\d\\d\\d\\d\\d-\\d\\d|[0-57]-\\d\\d\\d\\d\\d\\d\\d-\\d|[89]\\d-\\d-\\d\\d\\d\\d\\d\\d|[89]\\d-\\d\\d-\\d\\d\\d\\d\\d|[89]\\d-\\d\\d\\d-\\d\\d\\d\\d|[89]\\d-\\d\\d\\d\\d-\\d\\d\\d|[89]\\d-\\d\\d\\d\\d\\d-\\d\\d|[89]\\d-\\d\\d\\d\\d\\d\\d-\\d|[69]\\d\\d-\\d-\\d\\d\\d\\d\\d|[69]\\d\\d-\\d\\d-\\d\\d\\d\\d|[69]\\d\\d-\\d\\d\\d-\\d\\d\\d|[69]\\d\\d-\\d\\d\\d\\d-\\d\\d|[69]\\d\\d-\\d\\d\\d\\d\\d-\\d|99[0-8]\\d-\\d-\\d\\d\\d\\d|99[0-8]\\d-\\d\\d-\\d\\d\\d|99[0-8]\\d-\\d\\d\\d-\\d\\d|99[0-8]\\d-\\d\\d\\d\\d-\\d|999\\d\\d-\\d-\\d\\d\\d|999\\d\\d-\\d\\d-\\d\\d|999\\d\\d-\\d\\d\\d-\\d)-\\d$\'\r\n" + 
		"					data-template=\'/wiki/Special:BookSources/$1\'>\r\n" + 
		"					<!-- distribution -->\r\n" + 
		"					<tr data-code=\'P437\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- OCLC control number -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P243\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'https://www.worldcat.org/oclc/$1\' />\r\n" + 
		"				<!-- Open Library identifier -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P648\' data-datatype=\'string\' data-check=\'^OL\\d+(W|M|A)$\'\r\n" + 
		"					data-template=\'https://openlibrary.org/books/$1\' />\r\n" + 
		"				<!-- Google Books identifier -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P675\' data-datatype=\'string\' data-check=\'^[0-9a-zA-Z_\\-]{12}$\'\r\n" + 
		"					data-template=\'http://books.google.com/books?id=$1\' />\r\n" + 
		"				<!-- Internet Archive ID -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P724\' data-datatype=\'string\'\r\n" + 
		"					data-template=\'http://archive.org/details/$1\' />\r\n" + 
		"				<!-- BN (Argentina) editions -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1143\' data-datatype=\'string\' data-flag=\'ar\' data-check=\'^\\d+$\' />\r\n" + 
		"				<!-- SWB editions -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1044\' data-datatype=\'string\' data-flag=\'de\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://swb.bsz-bw.de/DB=2.1/PPNSET?PPN=$1&INDEXSET=1\'>\r\n" + 
		"					<!-- distribution -->\r\n" + 
		"					<tr data-code=\'P437\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- DNB editions -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1292\' data-datatype=\'string\' data-flag=\'de\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://d-nb.info/$1\' />\r\n" + 
		"				<!-- EUL editions -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1084\' data-datatype=\'string\' data-flag=\'eg\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://srv3.eulc.edu.eg/eulc_v5/libraries/Start.aspx?fn=ApplySearch&BibID=$1\' />\r\n" + 
		"				<!-- SUDOC editions -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1025\' data-datatype=\'string\' data-flag=\'fr\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.sudoc.fr/$1\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_workEditor_tab_other\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- collection -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P195\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- located in -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P276\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- key event -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P793\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- point in time -->\r\n" + 
		"					<tr data-code=\'P585\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_EditionEditor_i18n_en = {

	dialogTitle: 'FRBR Edition data — WE-Framework',

	groupContent: 'Content',
	groupInside: 'Inside',
	groupClassification: 'Classification',
	groupOther: 'Other',

	menuButton: 'WEF: FRBR Edition',
};

window.wef_EditionEditor_i18n_ru = {

	dialogTitle: 'Свойства издания — WE-Framework',

	groupContent: 'Содержание',
	groupInside: 'Внутри',
	groupClassification: 'Классификация',
	groupOther: 'Другое',

	menuButton: 'WEF: FRBR издание',
};

mw.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.dialog', 'jquery.ui.datepicker', 'jquery.ui.tabs', 'ext.gadget.wefcore', 'ext.gadget.wefflags' ], function() {
	window.wef_EditionEditor = new WEF_Editor( wef_EditionEditor_html );
	window.wef_EditionEditor.localize( 'wef_EditionEditor_i18n_' );
	window.wef_EditionEditor.addEditButtons();
} );