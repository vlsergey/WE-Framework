import 'babel-polyfill';
import * as settings from './settings/index';
import AdmEntityEditorTemplate from './editors/AdmEntityEditorTemplate';
import ArticleEditorTemplate from './editors/ArticleEditorTemplate';
import EntityEditorTemplate from './editors/EntityEditorTemplate';
import expect from 'expect';
import ExternalLinksEditorTemplate from './editors/ExternalLinksEditorTemplate';
import FrbrEditionEditorTemplate from './editors/FrbrEditionEditorTemplate';
import FrbrWorkEditorTemplate from './editors/FrbrWorkEditorTemplate';
import { getEntityIdDeferred } from './core/ApiUtils';
import MovieEditorTemplate from './editors/MovieEditorTemplate';
import { onEditorLinkClick } from './core/edit';
import PersonEditorTemplate from './editors/PersonEditorTemplate';
import SoftwareEditorTemplate from './editors/SoftwareEditorTemplate';
import TaxonEditorTemplate from './editors/TaxonEditorTemplate';

function loadSemanticUiCss( ) {
  /* eslint no-undef: 0 */
  if ( process.env.NODE_ENV === 'production' ) {
    require( 'semantic-ui-css/components/popup.min.css?global' );
  } else {
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

  settings.registerEditor( AdmEntityEditorTemplate );
  settings.registerEditor( ArticleEditorTemplate );
  settings.registerEditor( EntityEditorTemplate );
  settings.registerEditor( ExternalLinksEditorTemplate );
  settings.registerEditor( FrbrEditionEditorTemplate );
  settings.registerEditor( FrbrWorkEditorTemplate );
  settings.registerEditor( MovieEditorTemplate );
  settings.registerEditor( PersonEditorTemplate );
  settings.registerEditor( SoftwareEditorTemplate );
  settings.registerEditor( TaxonEditorTemplate );

  if ( mw.config.get( 'wgArticleId' ) ) {
    getEntityIdDeferred().then( entityId => {

      settings.getEnabledEditors().forEach( editorDescription => {
        expect( editorDescription ).toBeAn( 'object' );
        expect( editorDescription.linkText ).toBeA( 'string' );

        const editorLeftMenuLink = $( document.createElement( 'a' ) )
          .text( editorDescription.linkText )
          .click( () => {
            onEditorLinkClick( editorDescription, entityId );
          } );

        jQuery( '#p-tb div ul' ).append( jQuery( '<li class="plainlinks"></li>' ).append( editorLeftMenuLink ) );
      } );

    } );
  }

  const leftMenuLink = $( document.createElement( 'a' ) )
    .text( settings.linkText )
    .click( () => {
      settings.start();
    } );
  jQuery( '#p-tb div ul' ).append( jQuery( '<li class="plainlinks"></li>' ).append( leftMenuLink ) );

}, function() {
  /*eslint no-console: 0*/
  console.log( '[WE-F] unable to load WE-F: ' );
  console.log( arguments );
} );
