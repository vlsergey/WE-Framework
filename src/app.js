import 'babel-polyfill';
import { getEnabledEditors, registerEditor } from './settings/index';
import allEditorTemplates from './editors';
import EditorsLinks from './settings/EditorsLinks';
import React from 'react';
import ReactDOM from 'react-dom';

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

mw.loader.using( [ //
  'jquery.ui.dialog', //
  'jquery.ui.tabs', //
  'jquery.uls.data', //
  'mediawiki.ForeignApi',
], () => {

  require( 'fetch-polyfill' );
  loadSemanticUiCss();

  allEditorTemplates.forEach( editorTemplate => {
    registerEditor( editorTemplate );
  } );

  const toolsGroup = jQuery( '#p-tb' )[ 0 ];
  const div = document.createElement( 'div' );
  toolsGroup.parentElement.insertBefore( div, toolsGroup );

  ReactDOM.render( <EditorsLinks editorTemplates={getEnabledEditors()} />, div );
}, function() {
  /*eslint no-console: 0*/
  console.log( '[WE-F] unable to load WE-F: ' );
  console.log( arguments );
} );
