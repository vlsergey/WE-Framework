import * as ApiUtils from './ApiUtils';
import * as WEF_Utils from './utils';
import anyEditor_i18n_translations from './AnyEditor_i18n_translations';

export default class Editor {

  constructor( ) {
    this.i18n = WEF_Utils.localize( {}, anyEditor_i18n_translations );
  }

  addEditButtons( initTypeId ) {
    if ( mw.config.get( 'wgArticleId' ) ) {
      const editor = this;
      ApiUtils
        .getEntityIdDeferred()
        .then( ( entityId ) => {
          const li = jQuery( document.createElement( 'li' ) ).addClass( 'plainlinks' );
          jQuery( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).click( () => {
            const editPromise = this.edit( true, entityId, initTypeId );
            editPromise.then( () => ApiUtils.purge() );
          } ).text( editor.i18n.menuButton ).appendTo( li );

          jQuery( '#p-tb div ul' ).append( li );
        } );
    }
  }

  /**
   * @param {!Boolean}
   *            currentPageItem
   * @param {?String}
   *            entityId
   * @param {?String}
   *            entityTypeId
   */
  // edit( currentPageItem, entityId, entityTypeId ) {
  //
  // 	if ( !WEF_Utils.isEmpty( entityId ) )
  // 		WEF_Utils.assertCorrectEntityId( entityId );
  // 	if ( !WEF_Utils.isEmpty( entityTypeId ) )
  // 		WEF_Utils.assertCorrectEntityId( entityTypeId );
  //
  // 	var editDeferred = $.Deferred();
  // 	var editor = this;
  // 	var i18n = this.i18n;
  //
  // 	if ( entityId === null ) {
  // 		// empty item
  // 		var editorForm = new WEF_EditorForm( editor.i18n.dialogTitle, editor.dialogHtml, editor.definitionEnhanceCallback, editor.i18n, currentPageItem, editDeferred );
  // 		editorForm.initAsEmpty( currentPageItem, entityTypeId );
  // 		editorForm.open();
  // 		return editDeferred;
  // 	}
  //
  // 	var statusDialog = $( document.createElement( 'div' ) );
  // 	statusDialog.attr( 'title', this.i18n.dialogTitle );
  // 	statusDialog.append( $( document.createElement( 'p' ) ).text( this.i18n.statusLoadingWikidata ) );
  // 	statusDialog.dialog();
  //
  // 	WEF_Utils.getWikidataApi().get( {
  // 		action: 'wbgetentities',
  // 		ids: entityId,
  // 	} ).then( function( result ) {
  // 		var editorForm = new WEF_EditorForm( editor.i18n.dialogTitle, editor.dialogHtml, editor.definitionEnhanceCallback, editor.i18n, currentPageItem, editDeferred );
  // 		editorForm.load( result.entities[ entityId ] );
  // 		editorForm.open();
  // 	} ).catch( function() {
  // 		alert( i18n.errorLoadingWikidata );
  // 		editDeferred.reject( 'Unable to load from Wikidata' );
  // 	} ).always( function() {
  // 		statusDialog.dialog( 'close' );
  // 	} );
  //
  // 	return editDeferred;
  // }

}
