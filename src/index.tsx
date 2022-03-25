import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import allEditorTemplates from './editors';
import EditorsLinks from './settings/EditorsLinks';
import i18n from './settings/i18n';
import {getEnabledEditors, registerEditor} from './settings/index';
import wikieditorIntegration from './sources/wikieditorIntegration';

function loadSemanticUiCss () {
  /* eslint no-undef: 0 */
  if (process.env.NODE_ENV === 'production') {
    require('semantic-ui-css/components/menu.min.css?global');
    require('semantic-ui-css/components/popup.min.css?global');
  } else {
    require('semantic-ui-css/components/menu.css?global');
    require('semantic-ui-css/components/popup.css?global');
  }
}

function deepRenameId (element: Element, idSuffix: string, idNewSuffix: string) {
  if (element.id) {
    element.id = element.id.replace(idSuffix, idNewSuffix);
  }
  for (const child of Array.from(element.children)) {
    deepRenameId(child, idSuffix, idNewSuffix);
  }
}

mw.loader.using(['jquery.ui', 'jquery.uls', 'jquery.uls.data', 'mediawiki.ForeignApi'], () => {

  require('fetch-polyfill');
  loadSemanticUiCss();

  allEditorTemplates.forEach(editorTemplate => {
    registerEditor(editorTemplate);
  });

  const toolsGroup = (jQuery('#p-tb') as HTMLElement[])[0]!;
  const wefGroup = toolsGroup.cloneNode(true) as HTMLElement;
  deepRenameId(wefGroup, 'p-tb', 'p-wef');
  wefGroup.setAttribute('aria-labelledby', 'p-wef-label');

  const [h3Title] = jQuery('#p-wef-label', wefGroup);
  if (!h3Title) {
    throw new Error('Unable to locate \'p-wef-label\' ID on the page. ' +
      'Looks like site navigation menu is changed in a way that can\'t be modifid from JS');
  }
  h3Title.textContent = i18n.portalLabel;

  toolsGroup.parentElement!.insertBefore(wefGroup, toolsGroup);

  const ul = jQuery(wefGroup).find('ul')[0] as HTMLUListElement;
  while (ul.firstChild) ul.removeChild(ul.firstChild);
  ReactDOM.render(<EditorsLinks editorTemplates={getEnabledEditors()} />, ul);

  // only for ru-wiki: add source insert to edit toolbar
  wikieditorIntegration();

}, (...args: unknown[]) => {
  /* eslint no-console: 0*/
  console.log('[WE-F] unable to load WE-F: ');
  console.log(args);
});
