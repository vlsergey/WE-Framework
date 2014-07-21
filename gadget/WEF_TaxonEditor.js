/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit taxonal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_TaxonEditor_html = "<div class=\'wef_taxonEditor_dialog\'><div class=\'wef_tabs\'><ul><li><a href=\'#wef_taxonEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li><li><a href=\'#wef_taxonEditor_tab_biology\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupBiology</a></li><li><a href=\'#wef_taxonEditor_tab_databases\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupDatabases</a></li></ul><div id=\'wef_taxonEditor_tab_general\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset\'><legend class=\'wef_i18n_text\'>fieldsetGeneral</legend><table><tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\'/></table></fieldset><fieldset class=\'wef_fieldset\'><legend class=\'wef_i18n_text\'>fieldsetScientificNane</legend><table><tbody class=\'wef_claim_editors\' data-code=\'P225\' data-datatype=\'string\'><tr data-code=\'P405\' data-datatype=\'wikibase-item\'/><tr class=\'wef_claim_editors\' data-code=\'P574\' data-datatype=\'time\'/><tr data-code=\'P1135\' data-datatype=\'wikibase-item\'/><tr data-code=\'P1353\' data-datatype=\'string\'/></tbody><tbody class=\'wef_claim_editors\' data-code=\'P566\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P1403\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P694\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P1420\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P697\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P944\' data-datatype=\'wikibase-item\'/></table></fieldset></div><div id=\'wef_taxonEditor_tab_biology\' class=\'wef_editor_tab\'><fieldset class=\'wef_fieldset\'><legend class=\'wef_i18n_text\'>fieldsetSystematics</legend><table><tbody class=\'wef_claim_editors\' data-code=\'P105\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P171\' data-datatype=\'wikibase-item\'><tr data-code=\'P678\' data-datatype=\'wikibase-item\'/></tbody></table></fieldset><fieldset class=\'wef_fieldset\'><legend class=\'wef_i18n_text\'>fieldsetRedListStatus</legend><table><tbody class=\'wef_claim_editors\' data-code=\'P141\' data-datatype=\'wikibase-item\'/></table></fieldset><table><tbody class=\'wef_claim_editors\' data-code=\'P181\' data-datatype=\'commonsMedia\'/><tbody class=\'wef_claim_editors\' data-code=\'P183\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P1425\' data-datatype=\'wikibase-item\'/><tbody class=\'wef_claim_editors\' data-code=\'P523\' data-datatype=\'time\'/><tbody class=\'wef_claim_editors\' data-code=\'P524\' data-datatype=\'time\'/></table></div><div id=\'wef_taxonEditor_tab_databases\' class=\'wef_editor_tab\'><table><tbody class=\'wef_claim_editors\' data-code=\'P687\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://biodiversitylibrary.org/page/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P830\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.eol.org/pages/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P938\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.fishbase.org/Summary/speciesSummary.php?id=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P961\' data-datatype=\'string\' data-check=\'^\\d+-\\d$\'data-template=\'http://www.ipni.org/ipni/idPlantNameSearch.do?id=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P962\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.mycobank.org/MycoTaxo.aspx?Link=T&Rec=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1070\' data-datatype=\'string\'data-check=\'^(kew|tro|gcc|rjp|ild){1}-{1}\\d+$\' data-template=\'http://www.theplantlist.org/tpl/record/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1076\' data-datatype=\'string\' data-check=\'^\\d\\d.\\d\\d\\d.\\d.\\d\\d.\\d\\d\\d$\'/><tbody class=\'wef_claim_editors\' data-code=\'P850\' data-flag=\'be\' data-datatype=\'string\' data-check=\'^\\d{1,6}$\'data-template=\'http://www.marinespecies.org/aphia.php?p=taxdetails&amp;id=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P838\' data-flag=\'cz\' data-datatype=\'string\' data-check=\'^\\d{6}$\'data-template=\'http://www.biolib.cz/en/taxon/id$1/\'/><tbody class=\'wef_claim_editors\' data-code=\'P846\' data-flag=\'de\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://data.gbif.org/species/$1/\'/><tbody class=\'wef_claim_editors\' data-code=\'P1348\' data-flag=\'ie\' data-datatype=\'url\'/><tbody class=\'wef_claim_editors\' data-code=\'P1391\' data-flag=\'uk\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.indexfungorum.org/names/NamesRecord.asp?RecordID=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P685\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.ncbi.nlm.nih.gov/taxonomy/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P815\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d{2,6}$\'data-template=\'http://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&amp;search_value=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P959\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.departments.bucknell.edu/biology/resources/msw3/browse.asp?s=y&amp;id=$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P960\' data-flag=\'us\' data-datatype=\'string\' data-check=\'^\\d+$\'data-template=\'http://www.tropicos.org/Name/$1\'/><tbody class=\'wef_claim_editors\' data-code=\'P1421\' data-flag=\'us\' data-datatype=\'url\'/></table></div></div></div>";

var wef_TaxonEditor_i18n_en = {

	dialogTitle: 'Taxon data — WE-Framework',

	fieldsetScientificNane: 'scientific nane',
	fieldsetSystematics: 'systematics',
	fieldsetRedListStatus: 'Red List status',

	groupBiology: 'Biology',
	groupDatabases: 'Databases',

	menuButton: 'WEF: Taxon',
};

var wef_TaxonEditor_i18n_ru = {

	dialogTitle: 'Свойства таксона — WE-Framework',

	fieldsetScientificNane: 'научное название',
	fieldsetSystematics: 'систематика',
	fieldsetRedListStatus: 'охранный статус',

	groupBiology: 'Биология',
	groupDatabases: 'Базы данных',

	menuButton: 'WEF: Таксон',
};

/**
 * @class
 */
var WEF_TaxonEditor = function() {

	this.i18n = {};
	var i18n = this.i18n;

	var URI_PREFIX;
	var entityId;

	if ( WEF_Utils.isWikidata() ) {
		entityId = mw.config.get( 'wgTitle' );
		URI_PREFIX = '//www.wikidata.org/w/api.php?format=json';
	} else {
		entityId = mw.config.get( 'wgWikibaseItemId' );
		URI_PREFIX = '//www.wikidata.org/w/api.php?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
	}

	this.enabled = /^Q\d+$/.test( entityId );

	this.init = function() {
		WEF_Utils.localize( i18n, 'wef_AnyEditor_i18n_' );
		WEF_Utils.localize( i18n, 'wef_TaxonEditor_i18n_' );
	};

	this.addEditButtons = function() {
		if ( !this.enabled ) {
			return;
		}

		$( "#p-tb div ul" ).append( $( '<li class="plainlinks"><a href="javascript:wef_TaxonEditor.edit()">' + i18n.menuButton + '</a></li>' ) );
	};

	this.edit = function() {
		var statusDialog = $( '<div></div>' );
		statusDialog.attr( 'title', i18n.dialogTitle );
		statusDialog.append( $( '<p></p>' ).text( i18n.statusLoadingWikidata ) );
		statusDialog.dialog();

		$.ajax( {
			type: 'GET',
			url: URI_PREFIX + '&action=wbgetentities&ids=' + entityId,
			dataType: "json",
			success: function( result ) {
				var dialogForm = new WEF_EditorForm( i18n.dialogTitle, wef_TaxonEditor_html, i18n );
				dialogForm.load( result.entities[entityId] );
				wef_LabelsCache.receiveLabels();
				dialogForm.open();
			},
			complete: function() {
				statusDialog.dialog( 'close' );
			},
			fail: function() {
				alert( i18n.errorLoadingWikidata );
			},
		} );
	};
};

if ( wgServerName === 'ru.wikipedia.org' ) {
	importStylesheet( 'MediaWiki:WEF_TaxonEditor.css' );

	if ( !window.wef_loadingMarker_RuWikiFlagsHtml ) {
		importScript( 'MediaWiki:RuWikiFlagsHtml.js' );
		window.wef_loadingMarker_RuWikiFlagsHtml = true;
	}

	if ( !window.wef_loadingMarker_Editors ) {
		importScript( 'MediaWiki:WEF_Editors.js' );
		importStylesheet( 'MediaWiki:WEF_Editors.css' );
		window.wef_loadingMarker_Editors = true;
	}
} else {
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_TaxonEditor.css&action=raw&ctype=text/css', 'text/css' );

	if ( !window.wef_loadingMarker_RuWikiFlagsHtml ) {
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:RuWikiFlagsHtml.js&action=raw&ctype=text/javascript' );
		window.wef_loadingMarker_RuWikiFlagsHtml = true;
	}

	if ( !window.wef_loadingMarker_Editors ) {
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.js&action=raw&ctype=text/javascript' );
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.css&action=raw&ctype=text/css', 'text/css' );
		window.wef_loadingMarker_Editors = true;
	}
}

mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.ui.dialog', 'jquery.ui.selectable', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		wef_TaxonEditor = new WEF_TaxonEditor();
		wef_TaxonEditor.init();
		wef_TaxonEditor.addEditButtons();
	} );
} );
