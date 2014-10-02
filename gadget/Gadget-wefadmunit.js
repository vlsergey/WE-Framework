/**
 * This JavaScript is a implementation of JavaScript Gadget to edit
 * administrative unit information on Wikidata. This script is based on
 * WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_AdmUnitEditor_html = "<div class=\'wef_admUnitEditor_dialog wef_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_media\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupMedia</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_history\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q309</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_geography\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q1071</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_politic\' class=\'wef_editor_tab_anchor wef_i18n_label\'>Q7163</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_subdivisions\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P150</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_demography\' class=\'wef_editor_tab_anchor wef_i18n_label\'>P1082</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_clubs\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupClubs</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_codes\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupCodes</a></li>\r\n" + 
		"			<li><a href=\'#wef_admUnitEditor_tab_categories\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupCategories</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_admUnitEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetGeneral</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- is in the administrative territorial entity -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P131\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- type of administrative territorial entity -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P132\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- part of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P361\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- territory claimed by -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1336\' data-datatype=\'wikibase-item\' />\r\n" + 
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
		"		<div id=\'wef_admUnitEditor_tab_media\' class=\'wef_editor_tab\'>\r\n" + 
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
		"		<div id=\'wef_admUnitEditor_tab_history\' class=\'wef_editor_tab\'>\r\n" + 
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
		"		<div id=\'wef_admUnitEditor_tab_geography\' class=\'wef_editor_tab\'>\r\n" + 
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
		"				<!-- capital of -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1376\' data-datatype=\'wikibase-item\' />\r\n" + 
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
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- located next to body of water -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P206\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- highest point -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P610\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_admUnitEditor_tab_politic\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- basic form of government -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P122\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- legislative body -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P194\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- highest judicial authority -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P209\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- office held by head of government -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1313\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- central bank -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1304\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_admUnitEditor_tab_subdivisions\' class=\'wef_editor_tab\'>\r\n" + 
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
		"		<div id=\'wef_admUnitEditor_tab_demography\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- Gini coefficient -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1125\' data-datatype=\'quantity\' />\r\n" + 
		"			</table>\r\n" + 
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
		"		<div id=\'wef_admUnitEditor_tab_clubs\' class=\'wef_editor_tab\'>\r\n" + 
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
		"		<div id=\'wef_admUnitEditor_tab_codes\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- phone code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P473\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>Q25275</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- ISO 3166-1 alpha-2 -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P297\' data-datatype=\'string\' />\r\n" + 
		"					<!-- ISO 3166-1 alpha-3 -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P298\' data-datatype=\'string\' />\r\n" + 
		"					<!-- ISO 3166-1 numeric -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P299\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>Q133153</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- ISO 3166-2 -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P300\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!--  local administrative unit -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'eu\' data-code=\'P782\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Austrian municipality key -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'at\' data-code=\'P964\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Swiss municipality code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ch\' data-code=\'P771\' data-datatype=\'string\' />\r\n" + 
		"					<!-- China administrative division code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'cn\' data-code=\'P442\' data-datatype=\'string\' />\r\n" + 
		"					<!-- German regional key -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'de\' data-code=\'P1388\' data-datatype=\'string\' />\r\n" + 
		"					<!-- municipality code (Denmark) -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'dk\' data-code=\'P1168\' data-datatype=\'string\' />\r\n" + 
		"					<!-- EHAK id -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ee\' data-code=\'P1140\' data-datatype=\'string\' />\r\n" + 
		"					<!-- INE municipality code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'es\' data-code=\'P772\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Finnish municipality number -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'fi\' data-code=\'P1203\' data-datatype=\'string\' />\r\n" + 
		"					<!--  INSEE municipality code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'fr\' data-code=\'P374\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Kallikratis geographical code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'gr\' data-code=\'P1116\' data-datatype=\'string\' />\r\n" + 
		"					<!-- KSH code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'hu\' data-code=\'P939\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Iran statistics ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ir\' data-code=\'P1010\' data-datatype=\'string\' />\r\n" + 
		"					<!-- ISTAT ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'it\' data-code=\'P635\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Italian cadastre code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'it\' data-code=\'P806\' data-datatype=\'string\' />\r\n" + 
		"					<!-- dantai code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'jp\' data-code=\'P429\' data-datatype=\'string\' />\r\n" + 
		"					<!-- ATVK ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'lv\' data-code=\'P1115\' data-datatype=\'string\' />\r\n" + 
		"					<!-- CBS municipality code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'nl\' data-code=\'P382\' data-datatype=\'string\' />\r\n" + 
		"					<!-- SIRUTA -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ro\' data-code=\'P843\' data-datatype=\'string\' />\r\n" + 
		"					<!-- ОКАТО -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ru\' data-code=\'P721\' data-datatype=\'string\' />\r\n" + 
		"					<!-- OKTMO identifier -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ru\' data-code=\'P764\' data-datatype=\'string\' />\r\n" + 
		"					<!-- State Catalogue of Geographical Names identifier (Russia) -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ru\' data-code=\'P1397\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Geokod -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'se\' data-code=\'P1172\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Thailand central administrative unit code -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'th\' data-code=\'P1067\' data-datatype=\'string\' />\r\n" + 
		"					<!-- KOATUU identifier -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ua\' data-code=\'P1077\' data-datatype=\'string\' />\r\n" + 
		"					<!-- Philippine Standard Geographic Code ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-flag=\'ph\' data-code=\'P1228\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"		<div id=\'wef_admUnitEditor_tab_categories\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- main category -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P910\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1464\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1465\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"\r\n" + 
		"	</div>\r\n" + 
		"</div>";

window.wef_AdmUnitEditor_i18n_en = {

	dialogTitle: 'Administrative Unit — WE-Framework',

	groupMedia: 'media',
	groupClubs: 'clubs',
	groupCodes: 'codes',
	groupCategories: 'categories',

	menuButton: 'WEF: Adm. Unit',
};

window.wef_AdmUnitEditor_i18n_ru = {

	dialogTitle: 'Административная единица — WE-Framework',

	groupMedia: 'медиа',
	groupClubs: 'клубы',
	groupCodes: 'коды',
	groupCategories: 'категории',

	menuButton: 'WEF: Адм. Единица',
};

mw.loader.using( [ //
'jquery.ui.autocomplete', //
'jquery.ui.dialog', //
'jquery.ui.tabs', //
'ext.gadget.wefcore', //
'ext.gadget.wefflags', //
], function() {
	var editor = new WEF_Editor( wef_AdmUnitEditor_html );
	editor.localize( 'wef_AdmUnitEditor_i18n_' );
	editor.addEditButtons();
	window.wef_editors_registry.registerEditor( 'Q56061', editor );
} );