/**
 * This JavaScript is a implementation of JavaScript Gadget to edit normative
 * document information on Wikidata. This script is based on WE-Framework.
 *
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_WorkEditor_html = "<div class=\'wef_documentEditor_dialog\'>\r\n" +
"    <div class=\'wef_tabs\'>\r\n" +
"        <ul>\r\n" +
"            <li><a href=\'#wef_documentEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" +
"            <li><a href=\'#wef_documentEditor_tab_editions\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P747</a></li>\r\n" +
"        </ul>\r\n" +
"        <div id=\'wef_documentEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" +
"            <div class=\"wef_labels_editor\"></div>\r\n" +
"            <fieldset class=\'wef_fieldset\'>\r\n" +
"                <table class=\'wef_table\'>\r\n" +
"                    <!-- instance of -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" +
"                    <!-- number -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P1545\' data-datatype=\'string\' />\r\n" +
"                    <!-- date of foundation or creation -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P571\' data-datatype=\'time\' />\r\n" +
"                    <!-- title -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P1476\' data-datatype=\'monolingualtext\' />\r\n" +
"                    <!-- subtitle -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P1680\' data-datatype=\'monolingualtext\' />\r\n" +
"                </table>\r\n" +
"            </fieldset>\r\n" +
"\r\n" +
"            <fieldset class=\'wef_fieldset\'>\r\n" +
"                <table class=\'wef_table\'>\r\n" +
"                    <!-- original language -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P364\' data-datatype=\'wikibase-item\' />\r\n" +
"                    <!-- date of publication -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P577\' data-datatype=\'time\' />\r\n" +
"                </table>\r\n" +
"            </fieldset>\r\n" +
"\r\n" +
"            <table class=\'wef_table\'>\r\n" +
"                <!-- image -->\r\n" +
"                <tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" +
"            </table>\r\n" +
"        </div>\r\n" +
"        <div id=\'wef_documentEditor_tab_editions\' class=\'wef_editor_tab\'>\r\n" +
"            <fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" +
"                <legend class=\'wef_i18n_label\'>P747</legend>\r\n" +
"                <table class=\'wef_table\'>\r\n" +
"                    <!-- edition -->\r\n" +
"                    <tbody class=\'wef_claim_editors\' data-code=\'P747\' data-datatype=\'wikibase-item\'>\r\n" +
"                    </tbody>\r\n" +
"                </table>\r\n" +
"            </fieldset>\r\n" +
"        </div>\r\n" +
"    </div>\r\n" +
"\r\n" +
"</div>";

window.wef_WorkEditor_i18n_en = {
	dialogTitle: 'Document — WE-Framework',
	menuButton: 'WEF: FRBR Work',
};

window.wef_WorkEditor_i18n_ru = {
	dialogTitle: 'Свойства документа — WE-Framework',
	menuButton: 'WEF: Документ',
};

var editor = new WEF_Editor( wef_WorkEditor_html );
editor.localize( 'wef_WorkEditor_i18n_' );
editor.addEditButtons( 'Q2061228' );
window.wef_editors_registry.registerEditor( 'Q2061228', editor );
window.wef_editors_registry.registerEditor( 'Q740464', editor );
