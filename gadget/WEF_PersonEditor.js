/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit personal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_PersonEditor_html = '<div class="wef_personEditor_dialog"><div class="wef_tabs"><ul><li><a href="#wef_personEditor_tab_general" class="wef_i18n_text">groupGeneral</a></li><li><a href="#wef_personEditor_tab_birthAndDeath" class="wef_i18n_text">groupBirthAndDeath</a></li><li><a href="#wef_personEditor_tab_media" class="wef_i18n_text">groupMedia</a></li><li><a href="#wef_personEditor_tab_family" class="wef_i18n_text">groupFamily</a></li><li><a href="#wef_personEditor_tab_education" class="wef_i18n_text">groupEducation</a></li><li><a href="#wef_personEditor_tab_profession" class="wef_i18n_text">groupProfession</a></li><li><a href="#wef_personEditor_tab_military" class="wef_i18n_text">groupMilitary</a></li><li><a href="#wef_personEditor_tab_views" class="wef_i18n_text">groupViews</a></li><li><a href="#wef_personEditor_tab_sport" class="wef_i18n_text">groupSport</a></li><li><a href="#wef_personEditor_tab_culture" class="wef_i18n_text">groupCulture</a></li><li><a href="#wef_personEditor_tab_awards" class="wef_i18n_text">groupAwards</a></li></ul><div id="wef_personEditor_tab_general"><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetName</legend><table><tbody class="wef_claim_editors" data-code="P735" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P734" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P513" data-datatype="string"><tr data-code="P407" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P742" data-datatype="string"><tr data-code="P407" data-datatype="wikibase-item"/></tbody></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetTitle</legend><table><tbody class="wef_claim_editors" data-code="P53" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P97" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P511" data-datatype="wikibase-item"/></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetGeneral</legend><table><tbody class="wef_claim_editors" data-code="P31" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P21" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P91" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P27" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_personEditor_tab_birthAndDeath"><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetBirth</legend><table><tbody class="wef_claim_editors" data-code="P569" data-datatype="time"/><tbody class="wef_claim_editors" data-code="P19" data-datatype="wikibase-item"><tr data-code="P131" data-datatype="wikibase-item"/><tr data-code="P17" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P66" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P172" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P103" data-datatype="wikibase-item"/></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetDeath</legend><table><tbody class="wef_claim_editors" data-code="P570" data-datatype="time"/><tbody class="wef_claim_editors" data-code="P20" data-datatype="wikibase-item"><tr data-code="P131" data-datatype="wikibase-item"/><tr data-code="P17" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P509" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1196" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P157" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P119" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_personEditor_tab_media"><table><tbody class="wef_claim_editors" data-code="P18" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P109" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P990" data-datatype="commonsMedia"/></table><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetCoatOfArms</legend><table><tbody class="wef_claim_editors" data-code="P94" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P237" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_personEditor_tab_family"><table><tbody class="wef_claim_editors" data-code="P22" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P25" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P43" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P44" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1290" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P7" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P9" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P26" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P451" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P40" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1038" data-datatype="wikibase-item"><tr data-code="P1039" data-datatype="wikibase-item"/></tbody></table></div><div id="wef_personEditor_tab_education"><table><tbody class="wef_claim_editors" data-code="P1066" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P802" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P69" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/><tr data-code="P512" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P184" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P185" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P512" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_profession"><table><tbody class="wef_claim_editors" data-code="P106" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P101" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P108" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P39" data-datatype="wikibase-item"><tr data-code="P642" data-datatype="wikibase-item"/><tr data-code="P768" data-datatype="wikibase-item"/><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/><tr data-code="P805" data-datatype="wikibase-item"/><tr data-code="P155" data-datatype="wikibase-item"/><tr data-code="P156" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P1037" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/><tr data-code="P155" data-datatype="wikibase-item"/><tr data-code="P156" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P263" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P463" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody></table></div><div id="wef_personEditor_tab_military"><table><tbody class="wef_claim_editors" data-code="P241" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P410" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P598" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P607" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_views"><table><tbody class="wef_claim_editors" data-code="P102" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P140" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P411" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P841" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_sport"><table><tbody class="wef_claim_editors" data-code="P54" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P413" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P423" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P468" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_culture"><table><tbody class="wef_claim_editors" data-code="P412" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1303" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_awards"><table><tbody class="wef_claim_editors" data-code="P166" data-datatype="wikibase-item"><tr data-code="P585" data-datatype="time"/><tr data-code="P1027" data-datatype="time"/></tbody></table></div></div></div>';

var wef_PersonEditor_i18n_en = {

	dialogButtonUpdateLabelsText: 'Update labels',
	dialogButtonUpdateLabelsLabel: 'Redownload properties, qualificator and objects labels and descriptions from Wikidata',
	dialogButtonSaveText: 'Save',
	dialogButtonSaveLabel: 'Close the dialog and save all changes to Wikidata',
	dialogButtonCloseText: 'Cancel',
	dialogButtonCloseLabel: 'Close the dialog and discard all changes (do not save)',
	dialogTitle: 'Person data — WE-Framework',

	fieldsetBirth: 'Birth',
	fieldsetCoatOfArms: 'Coat of arms',
	fieldsetDeath: 'Death',
	fieldsetImage: 'Image',
	fieldsetGeneral: 'General',
	fieldsetName: 'Name',
	fieldsetTitle: 'Title',

	groupAwards: 'Awards',
	groupBirthAndDeath: 'Birth & Death',
	groupCulture: 'Culture & Art',
	groupEducation: 'Education',
	groupFamily: 'Family',
	groupGeneral: 'General',
	groupMedia: 'Media',
	groupMilitary: 'Military',
	groupProfession: 'Profession',
	groupSport: 'Sport',
	groupViews: 'Views',

	errorLoadingWikidata: 'Unable to load element data from Wikidata',

	menuButton: 'WEF: Person',

	statusLoadingWikidata: 'Loading element data from Wikidata',

};

var wef_PersonEditor_i18n_ru = {

	dialogButtonUpdateLabelsText: 'Обновить названия',
	dialogButtonUpdateLabelsLabel: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
	dialogButtonSaveText: 'Сохранить',
	dialogButtonSaveLabel: 'Закрыть окно и сохранить все изменения в Викиданных',
	dialogButtonCloseText: 'Отмена',
	dialogButtonCloseLabel: 'Закрыть окно и отменить все изменения (не сохранять)',
	dialogTitle: 'Свойства персоны — WE-Framework',

	fieldsetCoatOfArms: 'Герб',
	fieldsetBirth: 'Рождение',
	fieldsetDeath: 'Смерть',
	fieldsetImage: 'Изображение',
	fieldsetGeneral: 'Общие свойства',
	fieldsetName: 'Имя',
	fieldsetTitle: 'Титул',

	groupAwards: 'Награды',
	groupBirthAndDeath: 'Рождение и смерть',
	groupCulture: 'Культура и искусство',
	groupEducation: 'Образование',
	groupFamily: 'Семья',
	groupGeneral: 'Основное',
	groupMedia: 'Медиа',
	groupMilitary: 'Военные',
	groupProfession: 'Проф. деятельность',
	groupSport: 'Спорт',
	groupViews: 'Взгляды',

	errorLoadingWikidata: 'Невозможно загрузить информацию с Викиданных',

	menuButton: 'WEF: Персона',

	statusLoadingWikidata: 'Загружаем данные элемента с Викиданных',
};

/**
 * @class
 */
var WEF_PersonEditor = function() {

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
		WEF_Utils.localize( i18n, 'wef_PersonEditor_i18n_' );
	};

	this.addEditButtons = function() {
		if ( !this.enabled ) {
			return;
		}

		$( "#p-tb div ul" ).append( $( '<li class="plainlinks"><a href="javascript:wef_PersonEditor.edit()">' + i18n.menuButton + '</a></li>' ) );
	};

	var DialogForm = function() {

		/** @type {WEF_ClaimEditorsTable[]} */
		var claimEditorsTables = [];

		var dialog = $( wef_PersonEditor_html );
		dialog.attr( 'title', i18n.dialogTitle );

		dialog.find( '.wef_i18n_text' ).each( function( i, htmlItem ) {
			var item = $( htmlItem );
			if ( typeof i18n[item.text()] !== 'undefined' ) {
				item.text( i18n[item.text()] );
			}
		} );

		dialog.find( '.wef_claim_editors' ).each( function( i, htmlItem ) {
			var item = $( htmlItem );

			var code = item.data( 'code' );
			var datatype = item.data( 'datatype' );
			var label = item.data( 'label' );
			if ( typeof label === 'undefined' ) {
				label = code;
			}

			var definition = new WEF_Definition( {
				code: code,
				datatype: datatype,
				label: label,
				qualifiers: [],
			} );

			item.find( "tr" ).each( function( k, qItem ) {
				var qualifier = $( qItem );
				var qDefinition = new WEF_Definition( {
					code: qualifier.data( 'code' ),
					datatype: qualifier.data( 'datatype' ),
					label: qualifier.data( 'label' ),
				} );
				definition.qualifiers.push( qDefinition );
			} );

			var claimEditorTable = new WEF_ClaimEditorsTable( definition );
			claimEditorsTables.push( claimEditorTable );
			claimEditorTable.replaceAll( item );
		} );

		dialog.find( '.wef_tabs' ).tabs();
		dialog.dialog( {
			autoOpen: false,
			width: 900,
			buttons: [ {
				text: i18n.dialogButtonUpdateLabelsText,
				label: i18n.dialogButtonUpdateLabelsLabel,
				click: function() {
					wef_LabelsCache.clearCacheAndRequeue();
					wef_LabelsCache.receiveLabels();
				},
				style: 'position: absolute; left: 1em;',
			}, {
				text: i18n.dialogButtonSaveText,
				label: i18n.dialogButtonSaveLabel,
				click: function() {
					dialog.dialog( 'close' );
					wef_save( claimEditorsTables );
				},
			}, {
				text: i18n.dialogButtonCloseText,
				label: i18n.dialogButtonCloseLabel,
				click: function() {
					$( this ).dialog( "close" );
				}
			} ],
		} );

		this.load = function( entity ) {
			$.each( claimEditorsTables, function( i, claimEditorsTable ) {
				claimEditorsTable.init( entity );
			} );
		};

		this.open = function() {
			dialog.dialog( 'open' );
		};
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
				var dialogForm = new DialogForm();
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
	importScript( 'MediaWiki:RuWikiFlagsHtml.js' );
	importStylesheet( 'MediaWiki:WEF_PersonEditor.css' );
	importScript( 'MediaWiki:WEF_Editors.js' );
	importStylesheet( 'MediaWiki:WEF_Editors.css' );
} else {
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:RuWikiFlagsHtml.js&action=raw&ctype=text/javascript&maxage=86400&smaxage=21600' );
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_PersonEditor.css&action=raw&ctype=text/css&maxage=86400&smaxage=21600', 'text/css' );
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.js&action=raw&ctype=text/javascript&maxage=86400&smaxage=21600' );
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.css&action=raw&ctype=text/css&maxage=86400&smaxage=21600', 'text/css' );
}

mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.ui.dialog', 'jquery.ui.selectable', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		wef_PersonEditor = new WEF_PersonEditor();
		wef_PersonEditor.init();
		wef_PersonEditor.addEditButtons();
	} );
} );
