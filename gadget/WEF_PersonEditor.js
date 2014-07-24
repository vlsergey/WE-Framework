/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit personal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_PersonEditor_html = '<div class="wef_personEditor_dialog"><div class="wef_tabs"><ul><li><a href="#wef_personEditor_tab_general" class="wef_editor_tab_anchor wef_i18n_text">groupGeneral</a></li><li><a href="#wef_personEditor_tab_birthAndDeath" class="wef_editor_tab_anchor wef_i18n_text">groupBirthAndDeath</a></li><li><a href="#wef_personEditor_tab_media" class="wef_editor_tab_anchor wef_i18n_text">groupMedia</a></li><li><a href="#wef_personEditor_tab_family" class="wef_editor_tab_anchor wef_i18n_text">groupFamily</a></li><li><a href="#wef_personEditor_tab_education_and_science" class="wef_editor_tab_anchor wef_i18n_text">groupEducationAndScience</a></li><li><a href="#wef_personEditor_tab_profession" class="wef_editor_tab_anchor wef_i18n_text">groupProfession</a></li><li><a href="#wef_personEditor_tab_military" class="wef_editor_tab_anchor wef_i18n_text">groupMilitary</a></li><li><a href="#wef_personEditor_tab_views" class="wef_editor_tab_anchor wef_i18n_text">groupViews</a></li><li><a href="#wef_personEditor_tab_sport" class="wef_editor_tab_anchor wef_i18n_text">groupSport</a></li><li><a href="#wef_personEditor_tab_culture" class="wef_editor_tab_anchor wef_i18n_text">groupCulture</a></li><li><a href="#wef_personEditor_tab_awards" class="wef_editor_tab_anchor wef_i18n_text">groupAwards</a></li></ul><div id="wef_personEditor_tab_general" class="wef_editor_tab"><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetName</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P735" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P734" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P513" data-datatype="string"><tr data-code="P407" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P742" data-datatype="string"><tr data-code="P407" data-datatype="wikibase-item"/></tbody></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetTitle</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P53" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P97" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P511" data-datatype="wikibase-item"/></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetGeneral</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P31" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P21" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P91" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P27" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_personEditor_tab_birthAndDeath" class="wef_editor_tab"><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetBirth</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P569" data-datatype="time"/><tbody class="wef_claim_editors" data-code="P19" data-datatype="wikibase-item"><tr data-code="P131" data-datatype="wikibase-item"/><tr data-code="P17" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P66" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P172" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P103" data-datatype="wikibase-item"/></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetDeath</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P570" data-datatype="time"/><tbody class="wef_claim_editors" data-code="P20" data-datatype="wikibase-item"><tr data-code="P131" data-datatype="wikibase-item"/><tr data-code="P17" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P509" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1196" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P157" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P119" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_personEditor_tab_media" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P18" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P109" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P990" data-datatype="commonsMedia"/></table><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetCoatOfArms</legend><table><tbody class="wef_claim_editors" data-code="P94" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P237" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_personEditor_tab_family" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P22" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P25" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P43" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P44" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1290" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P7" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P9" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P26" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P451" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P40" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1038" data-datatype="wikibase-item"><tr data-code="P1039" data-datatype="wikibase-item"/></tbody></table></div><div id="wef_personEditor_tab_education_and_science" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P1066" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P802" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P69" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/><tr data-code="P512" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P184" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P185" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P512" data-datatype="wikibase-item"/></table><fieldset><legend class="wef_i18n_text">fieldsetBiology</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P428" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P835" data-datatype="string"/></table></fieldset></div><div id="wef_personEditor_tab_profession" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P106" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P101" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P108" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody></table><fieldset class="wef_fieldset wef_single_property_fieldset"><legend class="wef_i18n_label">P39</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P39" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time" data-as-column="true" data-editordatatype="time-years"/><tr data-code="P582" data-datatype="time" data-as-column="true" data-editordatatype="time-years"/><tr data-code="P642" data-datatype="wikibase-item"/><tr data-code="P768" data-datatype="wikibase-item"/><tr data-code="P805" data-datatype="wikibase-item"/><tr data-code="P155" data-datatype="wikibase-item"/><tr data-code="P156" data-datatype="wikibase-item"/></tbody></table></fieldset><table class="wef_table"><tbody class="wef_claim_editors" data-code="P1037" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/><tr data-code="P155" data-datatype="wikibase-item"/><tr data-code="P156" data-datatype="wikibase-item"/></tbody><tbody class="wef_claim_editors" data-code="P263" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P463" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody></table></div><div id="wef_personEditor_tab_military" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P241" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P410" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P598" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P607" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_views" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P102" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P140" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P411" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P841" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_sport" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P54" data-datatype="wikibase-item"><tr data-code="P580" data-datatype="time"/><tr data-code="P582" data-datatype="time"/></tbody><tbody class="wef_claim_editors" data-code="P413" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P423" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P468" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_culture" class="wef_editor_tab"><table class="wef_table"><tbody class="wef_claim_editors" data-code="P135" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P412" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1303" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P800" data-datatype="wikibase-item"/></table></div><div id="wef_personEditor_tab_awards" class="wef_editor_tab"><fieldset class="wef_fieldset wef_single_property_fieldset"><legend class="wef_i18n_label">P166</legend><table class="wef_table"><tbody class="wef_claim_editors" data-code="P166" data-datatype="wikibase-item"><tr data-code="P585" data-datatype="time" data-as-column="true" data-editordatatype="time-years"/><tr data-code="P1027" data-datatype="wikibase-item"/></tbody></table></fieldset></div></div></div>';

var wef_PersonEditor_i18n_en = {

	dialogTitle: 'Person data — WE-Framework',

	fieldsetBiology: 'name',
	fieldsetBirth: 'nirth',
	fieldsetCoatOfArms: 'coat of arms',
	fieldsetDeath: 'death',
	fieldsetImage: 'image',
	fieldsetName: 'name',
	fieldsetTitle: 'title',

	groupAwards: 'Awards',
	groupBirthAndDeath: 'Birth & Death',
	groupCulture: 'Culture & Art',
	groupEducationAndScience: 'Education & Science',
	groupFamily: 'Family',
	groupMedia: 'Media',
	groupMilitary: 'Military',
	groupProfession: 'Profession',
	groupSport: 'Sport',
	groupViews: 'Views',

	menuButton: 'WEF: Person',

};

var wef_PersonEditor_i18n_fr = {

	dialogTitle: 'Données biographiques — WE-Framework',

	fieldsetBiology: 'biologie',
	fieldsetBirth: 'naissance',
	fieldsetCoatOfArms: 'armoiries',
	fieldsetDeath: 'mort',
	fieldsetImage: 'image',
	fieldsetName: 'nom',
	fieldsetTitle: 'titre',

	groupAwards: 'Distinctions',
	groupBirthAndDeath: 'Naissance et mort',
	groupCulture: 'Culture et art',
	groupEducationAndScience: 'Scolarité et science',
	groupFamily: 'Famille',
	groupMedia: 'Images, sons et vidéos',
	groupMilitary: 'Armée',
	groupProfession: 'Profession',
	groupSport: 'Sport',
	groupViews: 'Opinions',

	menuButton: 'WEF : Biographie',
};

var wef_PersonEditor_i18n_ru = {

	dialogTitle: 'Свойства персоны — WE-Framework',

	fieldsetBiology: 'биология',
	fieldsetBirth: 'рождение',
	fieldsetCoatOfArms: 'герб',
	fieldsetDeath: 'смерть',
	fieldsetImage: 'изображение',
	fieldsetName: 'имя',
	fieldsetTitle: 'титул',

	groupAwards: 'Награды',
	groupBirthAndDeath: 'Рождение и смерть',
	groupCulture: 'Культура и искусство',
	groupEducationAndScience: 'Образование и наука',
	groupFamily: 'Семья',
	groupMedia: 'Медиа',
	groupMilitary: 'Военные',
	groupProfession: 'Проф. деятельность',
	groupSport: 'Спорт',
	groupViews: 'Взгляды',

	menuButton: 'WEF: Персона',
};

if ( wgServerName === 'ru.wikipedia.org' ) {
	importStylesheet( 'MediaWiki:WEF_PersonEditor.css' );

	if ( !window.wef_loadingMarker_RuWikiFlagsHtml ) {
		importScript( 'MediaWiki:RuWikiFlagsHtml.js' );
		window.wef_loadingMarker_RuWikiFlagsHtml = true;
	}

	if ( !window.wef_loadingMarker_Editors ) {
		importScript( 'MediaWiki:WEF_Editors.js' );
		importStylesheet( 'MediaWiki:WEF_Editors.css' );
	}
} else {
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_PersonEditor.css&action=raw&ctype=text/css', 'text/css' );

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

var wef_PersonEditor;
mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.ui.dialog', 'jquery.ui.selectable', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		wef_PersonEditor = new WEF_Editor( wef_PersonEditor_html );
		wef_PersonEditor.localize( 'wef_PersonEditor_i18n_' );
		wef_PersonEditor.addEditButtons();
	} );
} );
