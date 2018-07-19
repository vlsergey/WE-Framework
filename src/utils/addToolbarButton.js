function addOldToolbarButton( alt, title, oldToolbarImageUrl, callback ) {
  let $toolbar = jQuery( '#gadget-toolbar' );
  if ( !$toolbar.length ) {
    $toolbar = jQuery( '#toolbar' );
  }
  jQuery( '<div>' ) //
    .addClass( 'mw-toolbar-editbutton' ) //
    .attr( 'alt', alt ) //
    .attr( 'title', title ) //
    .css( 'background-image', 'url(' + oldToolbarImageUrl + ')' ) //
    .appendTo( $toolbar ).on( 'click', callback );
}

function addNewToolbarButton( code, title, newToolbarImageUrl, callback ) {
  jQuery( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
    section: 'main',
    group: 'gadgets',
    tools: {
      urldecoder: {
        label: title,
        type: 'button',
        icon: newToolbarImageUrl,
        action: {
          type: 'callback',
          execute: callback,
        },
      },
    },
  } );
}

export default function( code, alt, title, oldToolbarImageUrl, newToolbarImageUrl, callback ) {
  if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) === -1 ) return;

  mw.loader.using( [ 'user.options', 'jquery.textSelection' ], () => {
    if ( mw.user.options.get( 'usebetatoolbar' ) === 1 ) {
      jQuery.when(
        mw.loader.using( [ 'ext.wikiEditor', 'schema.Edit' ] ),
        jQuery.ready
      ).then( () => {
        let buttonAdded = false;

        mw.hook( 'wikieditor.toolbar.wikificator' ).add( () => {
          if ( !buttonAdded ) {
            addNewToolbarButton( code, title, newToolbarImageUrl, callback );
            buttonAdded = true;
          }
        } );

        mw.hook( 'wikieditor.toolbar.gadgetsgroup' ).add( () => {
          setTimeout( () => {
            if ( !buttonAdded ) {
              addNewToolbarButton( code, title, newToolbarImageUrl, callback );
              buttonAdded = true;
            }
          }, 2000 );
        } );

      } );
    } else {
      mw.loader.using( 'mediawiki.toolbar', () => {
        addOldToolbarButton( code, title, newToolbarImageUrl, callback );
      } );
    }
  } );
}
