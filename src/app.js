import 'babel-polyfill';
import { getEnabledEditors, registerEditor } from './settings/index';
import AdmEntityEditorTemplate from './editors/AdmEntityEditorTemplate';
import ArticleEditorTemplate from './editors/ArticleEditorTemplate';
import EditorsLinks from './settings/EditorsLinks';
import EntityEditorTemplate from './editors/EntityEditorTemplate';
import ExternalLinksEditorTemplate from './editors/ExternalLinksEditorTemplate';
import FrbrEditionEditorTemplate from './editors/FrbrEditionEditorTemplate';
import FrbrWorkEditorTemplate from './editors/FrbrWorkEditorTemplate';
import MovieEditorTemplate from './editors/MovieEditorTemplate';
import PersonEditorTemplate from './editors/PersonEditorTemplate';
import React from 'react';
import ReactDOM from 'react-dom';
import SoftwareEditorTemplate from './editors/SoftwareEditorTemplate';
import TaxonEditorTemplate from './editors/TaxonEditorTemplate';

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

  registerEditor( AdmEntityEditorTemplate );
  registerEditor( ArticleEditorTemplate );
  registerEditor( EntityEditorTemplate );
  registerEditor( ExternalLinksEditorTemplate );
  registerEditor( FrbrEditionEditorTemplate );
  registerEditor( FrbrWorkEditorTemplate );
  registerEditor( MovieEditorTemplate );
  registerEditor( PersonEditorTemplate );
  registerEditor( SoftwareEditorTemplate );
  registerEditor( TaxonEditorTemplate );

  const toolsGroup = jQuery( '#p-tb' )[ 0 ];
  const div = document.createElement( 'div' );
  toolsGroup.parentElement.insertBefore( div, toolsGroup );

  ReactDOM.render( <EditorsLinks editorTemplates={getEnabledEditors()} />, div );
}, function() {
  /*eslint no-console: 0*/
  console.log( '[WE-F] unable to load WE-F: ' );
  console.log( arguments );
} );
