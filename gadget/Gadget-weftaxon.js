/**
 * This JavaScript is a implementation of JavaScript Gadget to edit taxonal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_TaxonEditor_html = "<div class=\'wef_taxonEditor_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_taxonEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_taxonEditor_tab_biology\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupBiology</a></li>\r\n" + 
		"			<li><a href=\'#wef_taxonEditor_tab_databases\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupDatabases</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_taxonEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetGeneral</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetScientificNane</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- taxon name -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P225\' data-datatype=\'string\'>\r\n" + 
		"						<!--  taxon author -->\r\n" + 
		"						<tr data-code=\'P405\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- date of scientific description -->\r\n" + 
		"						<tr class=\'wef_claim_editors\' data-code=\'P574\' data-datatype=\'time\' />\r\n" + 
		"						<!--  nomenclatural status -->\r\n" + 
		"						<tr data-code=\'P1135\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!--  original spelling -->\r\n" + 
		"						<tr data-code=\'P1353\' data-datatype=\'string\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- basionym -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P566\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- original combination -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1403\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- replaced synonym (for nom. nov.) -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P694\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- taxon synonym -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1420\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- ex taxon author -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P697\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- Code of nomenclature -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P944\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- image -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_taxonEditor_tab_biology\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetSystematics</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- taxon rank -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P105\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- parent taxon -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P171\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- incertae sedis -->\r\n" + 
		"						<tr data-code=\'P678\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetRedListStatus</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- IUCN conservation status -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P141\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- range map image -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P181\' data-datatype=\'commonsMedia\' />\r\n" + 
		"				<!-- endemic to -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P183\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- ecoregion (WWF) -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1425\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- temporal range start -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P523\' data-datatype=\'time\' />\r\n" + 
		"				<!-- temporal range end -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P524\' data-datatype=\'time\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_taxonEditor_tab_databases\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P687\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://biodiversitylibrary.org/page/$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P830\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.eol.org/pages/$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P938\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.fishbase.org/Summary/speciesSummary.php?id=$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P961\' data-datatype=\'string\' data-check=\'^\\d+-\\d$\'\r\n" + 
		"					data-template=\'http://www.ipni.org/ipni/idPlantNameSearch.do?id=$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P962\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.mycobank.org/MycoTaxo.aspx?Link=T&Rec=$1\' />\r\n" + 
		"				<!-- Collaboration between the Royal Botanic Gardens, Kew and Missouri Botanical Garden  -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1070\' data-datatype=\'string\'\r\n" + 
		"					data-check=\'^(kew|tro|gcc|rjp|ild){1}-{1}\\d+$\' data-template=\'http://www.theplantlist.org/tpl/record/$1\' />\r\n" + 
		"				<!-- International Committee on Taxonomy of Viruses -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1076\' data-datatype=\'string\' data-check=\'^\\d\\d.\\d\\d\\d.\\d.\\d\\d.\\d\\d\\d$\' />\r\n" + 
		"\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P850\' data-flag=\'be\' data-datatype=\'string\' data-check=\'^\\d{1,6}$\'\r\n" + 
		"					data-template=\'http://www.marinespecies.org/aphia.php?p=taxdetails&amp;id=$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P838\' data-flag=\'cz\' data-datatype=\'string\' data-check=\'^\\d{6}$\'\r\n" + 
		"					data-template=\'http://www.biolib.cz/en/taxon/id$1/\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P846\' data-flag=\'de\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://data.gbif.org/species/$1/\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1348\' data-flag=\'ie\' data-datatype=\'url\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1391\' data-flag=\'uk\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.indexfungorum.org/names/NamesRecord.asp?RecordID=$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P685\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.ncbi.nlm.nih.gov/taxonomy/$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P815\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d{2,6}$\'\r\n" + 
		"					data-template=\'http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&amp;search_value=$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P959\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.departments.bucknell.edu/biology/resources/msw3/browse.asp?s=y&amp;id=$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P960\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d+$\'\r\n" + 
		"					data-template=\'http://www.tropicos.org/Name/$1\' />\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1421\' data-flag=\'us\' data-datatype=\'url\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_TaxonEditor_i18n_en = {

	dialogTitle: 'Taxon data — WE-Framework',

	fieldsetScientificNane: 'scientific nane',
	fieldsetSystematics: 'systematics',
	fieldsetRedListStatus: 'Red List status',

	groupBiology: 'Biology',
	groupDatabases: 'Databases',

	menuButton: 'WEF: Taxon',
};

window.wef_TaxonEditor_i18n_ru = {

	dialogTitle: 'Свойства таксона — WE-Framework',

	fieldsetScientificNane: 'научное название',
	fieldsetSystematics: 'систематика',
	fieldsetRedListStatus: 'охранный статус',

	groupBiology: 'Биология',
	groupDatabases: 'Базы данных',

	menuButton: 'WEF: Таксон',
};

mw.loader.using( [ //
'jquery.ui.autocomplete', //
'jquery.ui.dialog', //
'jquery.ui.tabs', //
'jquery.uls.data', //
'ext.gadget.wefcore', //
'ext.gadget.wefflags', //
], function() {
	var editor = new WEF_Editor( wef_TaxonEditor_html );
	editor.localize( 'wef_TaxonEditor_i18n_' );
	editor.addEditButtons();
	window.wef_editors_registry.registerEditor( 'Q16521', editor );
} );