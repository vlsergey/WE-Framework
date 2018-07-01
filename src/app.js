import 'babel-polyfill';
import * as settings from './settings/index';
import AdmEntityEditorTemplate from './editors/AdmEntityEditorTemplate';
import expect from 'expect';
import { getEntityIdDeferred } from './core/ApiUtils';
import MovieEditorTemplate from './editors/MovieEditorTemplate';
import { onEditorLinkClick } from './core/edit';

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
  settings.registerEditor( MovieEditorTemplate );

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

  // const appDiv = document.createElement( 'div' );
  // document.body.appendChild( appDiv );
  //
  // ReactDOM.render( <DialogWrapper title="test" onClose={ () => console.log( 'Dialog was closed' ) }>
  //   <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the x icon.</p>
  // </DialogWrapper>, appDiv );

  // jQuery( function() {
  //   if ( !Array.chunk ) {
  //     Object.defineProperty( Array.prototype, 'chunk', {
  //       value: function( chunkSize ) {
  //         const result = [];
  //         for ( let i = 0; i < this.length; i += chunkSize ) {
  //           result.push( this.slice( i, i + chunkSize ) );
  //         }
  //         return result;
  //       }
  //     } );
  //   }
  //
  //   if ( mw.config.get( 'wgArticleId' ) ) {
  //     ApiUtils.getEntityIdDeferred().then( ( entityId ) => {
  //       if ( !utils.isEmpty( entityId ) ) {
  //         const externalLinksEdit = new ExternalLinksEditor( entityId );
  //         externalLinksEdit.setup();
  //         externalLinksEdit.addButtonsEdit();
  //       }
  //     } );
  //   }
  // } );

}, function() {
  /*eslint no-console: 0*/
  console.log( '[WE-F] unable to load WE-F: ' );
  console.log( arguments );
} );
