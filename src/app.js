import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { getEnabledEditors, registerEditor } from './settings/index';
import allEditorTemplates from './editors';
import EditorsLinks from './settings/EditorsLinks';
import i18n from 'settings/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import wikieditorIntegration from 'sources/wikieditorIntegration';

function loadSemanticUiCss( ) {
  /* eslint no-undef: 0 */
  if ( process.env.NODE_ENV === 'production' ) {
    require( 'semantic-ui-css/components/menu.min.css?global' );
    require( 'semantic-ui-css/components/popup.min.css?global' );
  } else {
    require( 'semantic-ui-css/components/menu.css?global' );
    require( 'semantic-ui-css/components/popup.css?global' );
  }
}

mw.loader.using( [ 'jquery.ui.dialog', 'jquery.ui.tabs', 'jquery.uls.data', 'mediawiki.ForeignApi' ], () => {

  require( 'fetch-polyfill' );
  loadSemanticUiCss();

  allEditorTemplates.forEach( editorTemplate => {
    registerEditor( editorTemplate );
  } );

  const [ toolsGroup ] = jQuery( '#p-tb' );

  const wefGroup = toolsGroup.cloneNode( true );
  wefGroup.setAttribute( 'id', 'p-wef' );

  const [ h3Title ] = wefGroup.getElementsByTagName( 'h3' );
  h3Title.setAttribute( 'id', 'p-wef-label' );
  h3Title.textContent = i18n.portalLabel;
  toolsGroup.parentElement.insertBefore( wefGroup, toolsGroup );

  const [ ul ] = jQuery( wefGroup ).find( 'ul' );
  while ( ul.firstChild ) ul.removeChild( ul.firstChild );
  ReactDOM.render( <EditorsLinks editorTemplates={getEnabledEditors()} />, ul );

  // only for ru-wiki: add source insert to edit toolbar
  wikieditorIntegration();

}, function() {
  /* eslint no-console: 0*/
  console.log( '[WE-F] unable to load WE-F: ' );
  console.log( arguments );
} );
