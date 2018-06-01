import * as ModelUtils from './ModelUtils';
import i18n from './core.i18n';
import labelsCache from './labelsCache';
import styles from './core.css';
import WEF_ClaimReferenceEditor from './ClaimReferenceEditor';

export default class ClaimReferencesEditor {

  constructor() {

    this.parent = $( document.createElement( 'div' ) ).addClass( styles.wef_references_editor );
    this.referencesHolder = $( document.createElement( 'div' ) ).appendTo( this.parent );

    const referencesTable = $( document.createElement( 'div' ) ).addClass( styles.wef_reference_editor_table ).appendTo( this.parent );
    const part1 = $( document.createElement( 'div' ) ).addClass( styles.wef_reference_editor_column ).appendTo( referencesTable );
    $( document.createElement( 'span' ) ).text( i18n.sourcesLabelAddUsedReferences ).appendTo( part1 );
    this.addReferenceHolder = $( document.createElement( 'ul' ) ).addClass( styles.wef_reference_editor_list ).appendTo( part1 );

    this.editors = [];
    this.parent.dialog( {
      dialogClass: 'wef_references_editor_dialog',
      title: i18n.sourcesDialogTitle,
      autoOpen: false,
      width: 'auto',
      maxWidth: 1000,
      height: 'auto',
      resizable: true,
      modal: true,
      buttons: [ {
        text: i18n.sourcesButtonAddText,
        label: i18n.sourcesButtonAddLabel,
        click: () => this.add(),
        style: 'float: left;',
      }, {
        text: i18n.sourcesButtonUpdateLabelsText,
        label: i18n.sourcesButtonUpdateLabelsLabel,
        click: function() {
          labelsCache.clearCacheAndRequeue();
        },
        style: 'float: left;',
      }, {
        text: i18n.sourcesButtonCloseText,
        label: i18n.sourcesButtonCloseLabel,
        click: () => {
          this.parent.dialog( 'close' );
          this.rememberUsedSources();
        },
        style: 'float: right;',
      } ],
    } );
  }

  add() {

    const div = $( document.createElement( 'table' ) )
      .addClass( styles.wef_reference_editor )
      .appendTo( this.referencesHolder );
    const claimReferenceEditor = new WEF_ClaimReferenceEditor( div );
    // TODO: something like "init with empty?"
    // claimReferenceEditor.load( reference );
    this.editors.push( claimReferenceEditor );
  }

  collect() {

    const result = [];
    $.each( this.editors, function( i, editor ) {
      /** @type WEF_ClaimReferenceEditor */
      const claimReferenceEditor = editor;
      const reference = claimReferenceEditor.collect();
      if ( !$.isEmptyObject( reference ) ) {
        result.push( reference );
      }
    } );
    return result;
  }

  initAsEmpty() {

    this.loadUsedSources();
  }

  load( references ) {

    const claimReferencesEditor = this;
    $.each( references, function( i, reference ) {
      claimReferencesEditor.addReference( reference );
    } );
    this.loadUsedSources();
  }

  addReference( reference ) {
    const div = $( document.createElement( 'table' ) )
      .addClass( styles.wef_reference_editor )
      .appendTo( this.referencesHolder );
    const claimReferenceEditor = new WEF_ClaimReferenceEditor( div );
    claimReferenceEditor.load( reference );
    this.editors.push( claimReferenceEditor );
  }

  loadUsedSources() {


    if ( typeof window.localStorage === 'undefined' || typeof window.localStorage[ 'wef-latest-sources-refs' ] === 'undefined' )
      return;

    const claimReferencesEditor = this;
    try {
      const remembered = JSON.parse( window.localStorage[ 'wef-latest-sources-refs' ] ).slice( 0 );
      $.each( remembered, function( i, record ) {
        const property = 'P' + record[ 0 ];
        const itemId = Number( record[ 1 ] );
        const item = 'Q' + itemId;

        let propertyName = property;
        let itemName = item;

        const li = $( document.createElement( 'li' ) )
          .appendTo( claimReferencesEditor.addReferenceHolder );
        const reflink = $( document.createElement( 'a' ) )
          .addClass( styles.wef_reference_editor_ref )
          .text( propertyName + ': ' + itemName )
          .appendTo( li );
        labelsCache.getOrQueue( property, function( label ) {
          propertyName = label;
          reflink.text( propertyName + ': ' + itemName );
        } );
        labelsCache.getOrQueue( item, function( label ) {
          itemName = label;
          reflink.text( propertyName + ': ' + itemName );
        } );
        reflink.click( function() {
          li.remove();
          const reference = {
            snaks: {},
          };
          reference.snaks[ property ] = [ ModelUtils.newWikibaseItemSnak( property, 'item', itemId ) ];
          claimReferencesEditor.addReference( reference );
        } );
      } );
    } catch ( e ) {
      mw.log( 'Unable to load latest sources refs from local storage: ' + e );
    }
  }

  rememberUsedSources() {
    if ( typeof window.localStorage === 'undefined' )
      return;

    const claimReferencesEditor = this;
    try {
      const usedSources = [];
      $.each( this.editors, function( i, claimReferenceEditor ) {
        const reference = claimReferenceEditor.collect();
        claimReferencesEditor._collectSourceRef( reference.snaks, 248, usedSources );
        claimReferencesEditor._collectSourceRef( reference.snaks, 143, usedSources );
      } );

      let remembered = [];
      try {
        const stored = window.localStorage[ 'wef-latest-sources-refs' ];
        if ( typeof stored !== 'undefined' ) {
          remembered = JSON.parse( stored ).slice( 0 );
        }
      } catch ( e ) {
        mw.log( 'Unknown error trying to restore latest sources refs from local storage: ' + e );
      }

      let newToRemember = usedSources.concat( remembered ).slice( 0, 10 );
      // leave unique only
      const stringified = $.map( newToRemember, function( x ) {
        return JSON.stringify( x );
      } );
      newToRemember = $.grep( newToRemember, function( item, i ) {
        return $.inArray( JSON.stringify( item ), stringified ) === i // /
					&& typeof $.isArray( item ) //
					&& item.length === 2 //
					&& typeof item[ 0 ] === 'number' //
					&& typeof item[ 1 ] === 'number';
      } );
      window.localStorage[ 'wef-latest-sources-refs' ] = JSON.stringify( newToRemember );
    } catch ( e ) {
      mw.log( 'Unable to update latest sources refs in local storage: ' + e );
    }
  }

  _collectSourceRef( snaks, propertyNumberId, usedSources ) {
    const value = this._getItemId( snaks, 'P' + propertyNumberId );
    if ( typeof value !== 'undefined' ) {
      usedSources.push( [ propertyNumberId, value ] );
    }
  }

  _getItemId( snaks, propertyId ) {
    const hasValue = typeof snaks[ propertyId ] !== 'undefined' //
			&& snaks[ propertyId ].length === 1 //
			&& typeof snaks[ propertyId ][ 0 ].datavalue !== 'undefined' //
			&& typeof snaks[ propertyId ][ 0 ].datavalue.value !== 'undefined' //
			&& snaks[ propertyId ][ 0 ].datavalue.value[ 'entity-type' ] === 'item';
    if ( hasValue ) {
      const value = Number( snaks[ propertyId ][ 0 ].datavalue.value[ 'numeric-id' ] );
      if ( !Number.isNaN( value ) ) {
        return value;
      }
    }
    return undefined;
  }

  show() {
    this.parent.dialog( 'open' );
  }

}
