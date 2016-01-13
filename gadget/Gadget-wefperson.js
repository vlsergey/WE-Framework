/**
 * This JavaScript is a implementation of JavaScript Gadget to edit personal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
window.wef_PersonEditor_html = "<div class=\'wef_dialog\'>\r\n" + 
		"	<div class=\'wef_tabs\'>\r\n" + 
		"		<ul>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_general\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupGeneral</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_birthAndDeath\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupBirthAndDeath</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_media\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupMedia</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_family\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupFamily</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_education_and_science\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupEducationAndScience</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_profession\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupProfession</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_military\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupMilitary</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_views\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupViews</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_sport\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupSport</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_culture\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupCulture</a></li>\r\n" + 
		"			<li><a href=\'#wef_personEditor_tab_awards\' class=\'wef_editor_tab_anchor wef_i18n_text\'>groupAwards</a></li>\r\n" + 
		"		</ul>\r\n" + 
		"		<div id=\'wef_personEditor_tab_general\' class=\'wef_editor_tab\'>\r\n" + 
		"			<div class=\"wef_labels_editor\"></div>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetName</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- name in native language  -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1559\' data-datatype=\'monolingualtext\' />\r\n" + 
		"					<!-- birth name -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1477\' data-datatype=\'monolingualtext\' />\r\n" + 
		"					<!-- pseudonym -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P742\' data-datatype=\'string\'>\r\n" + 
		"						<!--  language -->\r\n" + 
		"						<tr data-code=\'P407\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetTitle</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- noble family -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P53\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- noble title -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P97\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- honorific prefix -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P511\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- instance of -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P31\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- sex or gender -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P21\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- sexual orientation -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P91\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- country of citizenship -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P27\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- native language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P103\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- languages spoken -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1412\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- official website -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P856\' data-datatype=\'url\'>\r\n" + 
		"						<!--  language -->\r\n" + 
		"						<tr data-code=\'P407\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_birthAndDeath\' class=\'wef_editor_tab\'>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetBirth</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- birth date -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P569\' data-datatype=\'time\'>\r\n" + 
		"						<!-- earliest date -->\r\n" + 
		"						<tr data-code=\'P1319\' data-datatype=\'time\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- earliest date -->\r\n" + 
		"						<tr data-code=\'P1326\' data-datatype=\'time\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- sourcing circumstances -->\r\n" + 
		"						<tr data-code=\'P1480\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- birth place -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P19\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!--  is in the administrative territorial entity -->\r\n" + 
		"						<tr data-code=\'P131\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!--  country -->\r\n" + 
		"						<tr data-code=\'P17\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- sourcing circumstances -->\r\n" + 
		"						<tr data-code=\'P1480\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- ethnic group -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P172\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- native language -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P103\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- place of origin (Switzerland) -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1321\' data-datatype=\'wikibase-item\' data-flag=\'ch\' />\r\n" + 
		"					<!-- ancestral home -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P66\' data-datatype=\'wikibase-item\' data-flag=\'cn\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetDeath</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- Death date -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P570\' data-datatype=\'time\'>\r\n" + 
		"						<!-- earliest date -->\r\n" + 
		"						<tr data-code=\'P1319\' data-datatype=\'time\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- latest date -->\r\n" + 
		"						<tr data-code=\'P1326\' data-datatype=\'time\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- sourcing circumstances -->\r\n" + 
		"						<tr data-code=\'P1480\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- Death place -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P20\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!--  is in the administrative territorial entity -->\r\n" + 
		"						<tr data-code=\'P131\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!--  country -->\r\n" + 
		"						<tr data-code=\'P17\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- sourcing circumstances -->\r\n" + 
		"						<tr data-code=\'P1480\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"					<!-- Death cause -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P509\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- manner of death -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1196\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- killed by -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P157\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- place of burial -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P119\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- Find a Grave grave ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P535\' data-datatype=\'string\'\r\n" + 
		"						data-template=\'http://www.findagrave.com/cgi-bin/fg.cgi?page=gr&GRid=$1\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_media\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- Image -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P18\' data-datatype=\'commonsMedia\' />\r\n" + 
		"				<!-- signature -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P109\' data-datatype=\'commonsMedia\' />\r\n" + 
		"				<!-- recording of the subject\'s voice -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P990\' data-datatype=\'commonsMedia\' />\r\n" + 
		"				<!-- grave picture -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1442\' data-datatype=\'commonsMedia\' />\r\n" + 
		"			</table>\r\n" + 
		"			<fieldset class=\'wef_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetCoatOfArms</legend>\r\n" + 
		"				<table>\r\n" + 
		"					<!-- coat of arms image -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P94\' data-datatype=\'commonsMedia\' />\r\n" + 
		"					<!-- coat of arms -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P237\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!--  Commons category -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P373\' data-datatype=\'string\' />\r\n" + 
		"				<!-- Commons Creator page  -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1472\' data-datatype=\'string\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_family\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- father -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P22\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- mother -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P25\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- stepfather -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P43\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- stepmother -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P44\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- godparent -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1290\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- brother -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P7\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- sister -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P9\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- spouse -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P26\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- cohabitant -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P451\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- child -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P40\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- relative -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1038\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<tr data-code=\'P1039\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</tbody>\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_education_and_science\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- student of -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1066\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- student -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P802\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- alma mater -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P69\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"					<!-- academic degree -->\r\n" + 
		"					<tr data-code=\'P512\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- academic major -->\r\n" + 
		"					<tr data-code=\'P812\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- doctoral advisor -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P184\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- doctoral student -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P185\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- academic degree -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P512\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- alma mater -->\r\n" + 
		"					<tr data-code=\'P69\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- academic major -->\r\n" + 
		"					<tr data-code=\'P812\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- point in time -->\r\n" + 
		"					<tr data-code=\'P585\' data-datatype=\'time\' />\r\n" + 
		"					<!-- doctoral advisor -->\r\n" + 
		"					<tr data-code=\'P184\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					<!-- doctoral thesis -->\r\n" + 
		"					<tr data-code=\'P1026\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- doctoral thesis -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1026\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>Q5962346</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- Google Scholar ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1960\' data-datatype=\'string\'\r\n" + 
		"						data-template=\'https://scholar.google.com/citations?user=$1\' />\r\n" + 
		"					<!--  Mathematics Genealogy Project identifier -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P549\' data-datatype=\'string\'\r\n" + 
		"						data-template=\'http://genealogy.math.ndsu.nodak.edu/id.php?id=$1\' />\r\n" + 
		"					<!-- ORCID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P496\' data-datatype=\'string\' data-template=\'http://orcid.org/$1\' />\r\n" + 
		"					<!-- ResearcherID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1053\' data-datatype=\'string\'\r\n" + 
		"						data-template=\'http://www.researcherid.com/rid/$1\' />\r\n" + 
		"					<!-- Scopus Author ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1153\' data-datatype=\'string\'\r\n" + 
		"						data-template=\'https://www.scopus.com/authid/detail.url?authorId=$1\' />\r\n" + 
		"					<!-- Zentralblatt MATH author ID -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P1556\' data-datatype=\'string\'\r\n" + 
		"						data-template=\'https://zbmath.org/authors/?q=ai:$1\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"			<fieldset>\r\n" + 
		"				<legend class=\'wef_i18n_text\'>fieldsetBiology</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!-- botanist author abbreviation -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P428\' data-datatype=\'string\' />\r\n" + 
		"					<!-- author citation (zoology) -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P835\' data-datatype=\'string\' />\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_profession\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!--  occupation -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P106\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!--  field of work -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P101\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!--  employer -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P108\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- official residence -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P263\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"			<fieldset class=\'wef_fieldset wef_single_property_fieldset\'>\r\n" + 
		"				<legend class=\'wef_i18n_label\'>P39</legend>\r\n" + 
		"				<table class=\'wef_table\'>\r\n" + 
		"					<!--  position held -->\r\n" + 
		"					<tbody class=\'wef_claim_editors\' data-code=\'P39\' data-datatype=\'wikibase-item\'>\r\n" + 
		"						<!-- affiliation -->\r\n" + 
		"						<tr data-code=\'P1416\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- start date -->\r\n" + 
		"						<tr data-code=\'P580\' data-datatype=\'time\' data-as-column=\'true\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- end date -->\r\n" + 
		"						<tr data-code=\'P582\' data-datatype=\'time\' data-as-column=\'true\' data-editordatatype=\'time-years\' />\r\n" + 
		"						<!-- subject of -->\r\n" + 
		"						<!-- of -->\r\n" + 
		"						<tr data-code=\'P642\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- electoral district -->\r\n" + 
		"						<tr data-code=\'P768\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<tr data-code=\'P805\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- follows -->\r\n" + 
		"						<tr data-code=\'P155\' data-datatype=\'wikibase-item\' />\r\n" + 
		"						<!-- followed by -->\r\n" + 
		"						<tr data-code=\'P156\' data-datatype=\'wikibase-item\' />\r\n" + 
		"					</tbody>\r\n" + 
		"				</table>\r\n" + 
		"			</fieldset>\r\n" + 
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
		"		<div id=\'wef_personEditor_tab_military\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- military branch -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P241\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- military rank -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P410\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- commands -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P598\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- conflict -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P607\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_views\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- member of political party -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P102\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- religion -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P140\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- canonization status -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P411\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- feast day -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P841\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_sport\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- member of sports team -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P54\' data-datatype=\'wikibase-item\'>\r\n" + 
		"					<!-- start date -->\r\n" + 
		"					<tr data-code=\'P580\' data-datatype=\'time\' />\r\n" + 
		"					<!-- end date -->\r\n" + 
		"					<tr data-code=\'P582\' data-datatype=\'time\' />\r\n" + 
		"				</tbody>\r\n" + 
		"				<!-- position played on team -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P413\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- shooting handedness -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P423\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- dan/kyu rank -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P468\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_culture\' class=\'wef_editor_tab\'>\r\n" + 
		"			<table class=\'wef_table\'>\r\n" + 
		"				<!-- movement -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P135\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- voice type -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P412\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- instrument -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P1303\' data-datatype=\'wikibase-item\' />\r\n" + 
		"				<!-- notable works -->\r\n" + 
		"				<tbody class=\'wef_claim_editors\' data-code=\'P800\' data-datatype=\'wikibase-item\' />\r\n" + 
		"			</table>\r\n" + 
		"		</div>\r\n" + 
		"		<div id=\'wef_personEditor_tab_awards\' class=\'wef_editor_tab\'>\r\n" + 
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
		"	</div>\r\n" + 
		"</div>";

window.wef_PersonEditor_i18n_en = {

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

window.wef_PersonEditor_i18n_fr = {

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

window.wef_PersonEditor_i18n_ru = {

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

var editor = new WEF_Editor( wef_PersonEditor_html );
editor.localize( 'wef_PersonEditor_i18n_' );
editor.addEditButtons( 'Q5' );
window.wef_editors_registry.registerEditor( 'Q5', editor );
