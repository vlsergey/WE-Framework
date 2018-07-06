import 'babel-polyfill';
import * as settings from './settings/index';
import AdmEntityEditorTemplate from './editors/AdmEntityEditorTemplate';
import EntityEditorTemplate from './editors/EntityEditorTemplate';
import expect from 'expect';
import { getEntityIdDeferred } from './core/ApiUtils';
import MovieEditorTemplate from './editors/MovieEditorTemplate';
import { onEditorLinkClick } from './core/edit';
import SoftwareEditorTemplate from './editors/SoftwareEditorTemplate';

mw.loader.using( [ //
  'jquery.ui.autocomplete', //
  'jquery.ui.dialog', //
  'jquery.ui.tabs', //
  'jquery.ui.tooltip', //
  'jquery.uls.data', //
  'mediawiki.ForeignApi',
], () => {

  require( 'fetch-polyfill' );

  settings.registerEditor( AdmEntityEditorTemplate );
  settings.registerEditor( EntityEditorTemplate );
  settings.registerEditor( MovieEditorTemplate );
  settings.registerEditor( SoftwareEditorTemplate );

  if ( mw.config.get( 'wgArticleId' ) ) {
    getEntityIdDeferred().then( entityId => {

      settings.getEnabledEditors().forEach( editorDescription => {
        expect( editorDescription ).toBeAn( 'object' );
        expect( editorDescription.linkTitle ).toBeA( 'string' );

        const editorLeftMenuLink = $( document.createElement( 'a' ) )
          .text( editorDescription.linkTitle )
          .click( () => {
            onEditorLinkClick( editorDescription, entityId );
          } );

        jQuery( '#p-tb div ul' ).append( jQuery( '<li class="plainlinks"></li>' ).append( editorLeftMenuLink ) );
      } );

    } );
  }

  const leftMenuLink = $( document.createElement( 'a' ) )
    .text( settings.linkTitle )
    .click( () => {
      settings.start();
    } );
  jQuery( '#p-tb div ul' ).append( jQuery( '<li class="plainlinks"></li>' ).append( leftMenuLink ) );

}, function() {
  /*eslint no-console: 0*/
  console.log( '[WE-F] unable to load WE-F: ' );
  console.log( arguments );
} );
