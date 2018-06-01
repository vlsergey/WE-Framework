import * as WEF_Utils from './utils';
import i18n from './core.i18n';
import styles from './core.css';
import WEF_ClaimEditor from './ClaimEditor';
import wef_LabelsCache from './labelsCache';

export default class ClaimEditorsTable {

  constructor( definition ) {
    if ( !definition ) throw new Error( 'Missing definition function argument' );

    this.definition = definition;

    /** @type {WEF_ClaimEditor[]} */
    this.claimEditors = [];
    /** @type {string[]} */
    this.removedClaims = [];
    this.placed = false;
    this.temporaryHolder = null;
  }

  add() {
    if ( !this.placed ) {
      throw new Error( 'Claims edit table is not placed on the form yet' );
    }

    const claimEditor = new WEF_ClaimEditor( this.definition );

    const buttonAddClaim = $( document.createElement( 'button' ) )
      .attr( 'type', 'button' )
      .addClass( styles.wef_property_button )
      .button( {
        icons: {
          primary: 'ui-icon-plus'
        },
        text: false,
        label: i18n.buttonAddClaim,
      } )
      .click( () => {
        const editor = this.add();
        editor.initEmpty();
      } );

    const buttonRemoveClaim = $( document.createElement( 'button' ) )
      .attr( 'type', 'button' )
      .addClass( styles.wef_property_button )
      .button( {
        icons: {
          primary: 'ui-icon-trash'
        },
        text: false,
        label: i18n.buttonRemoveClaim,
      } ).click( () => {

        const question = i18n.confirmDeleteClaim //
          .replace( '{code}', this.definition.label ) //
          .replace( '{label}', wef_LabelsCache.getLabel( this.definition.label ) );

        const r = !claimEditor.hasData() || confirm( question );
        if ( r === true ) {
        /*
         * add before removing to insert immediately after last existing
         */
          if ( this.claimEditors.length === 1 ) {
            const editor = this.add();
            editor.initEmpty();
          }

          this.claimEditors = jQuery.grep( this.claimEditors, function( value ) {
            return value != claimEditor;
          } );

          if ( claimEditor.wikidataClaim != null && !WEF_Utils.isEmpty( claimEditor.wikidataClaim.id ) ) {
            this.removedClaims.push( claimEditor.wikidataClaim.id );
          }
          claimEditor.remove();
        }
      } );

    /** @type {function} */
    const normalizeF = this.definition.normalize;
    /** @type {function} */
    const urlF = this.definition.url;

    // append before URL and after input cell
    const buttonsCell = $( document.createElement( 'td' ) )
      .addClass( styles.wef_button_cell )
      .appendTo( claimEditor.row1 );
    try {
      if ( this.definition.datatype === 'url' ) {
        const newButton = $( document.createElement( 'button' ) )
          .addClass( styles.wef_property_button )
          .attr( 'type', 'button' )
          .button( {
            icons: {
              primary: 'ui-icon-extlink'
            },
            disabled: true,
            text: false,
            label: i18n.buttonUrlNavigate,
          } )
          .click( function() {
            if ( claimEditor.hasValue() ) {
              window.open( claimEditor.toDataValue().value, '_blank' );
            }
          } );
        $( claimEditor ).change( function() {
          if ( claimEditor.hasValue() ) {
            newButton.button( 'option', 'disabled', false );
            newButton.button( 'enable' );
          } else {
            newButton.button( 'option', 'disabled', true );
            newButton.button( 'disable' );
          }
        } );
        buttonsCell.append( newButton );
      }
    } catch ( err ) {
      mw.log.warn( 'Unable to attach URL button: ' + err );
    }
    if ( typeof this.definition.buttons !== 'undefined' ) {
      this.definition.buttons.forEach( buttonDefinition => {
        const newButton = $( document.createElement( 'button' ) ).addClass( styles.wef_property_button ).attr( 'type', 'button' );
        newButton.button( buttonDefinition );
        if ( $.isFunction( buttonDefinition.click ) ) {
          newButton.click( () => buttonDefinition.click( claimEditor ) );
        }
        if ( $.isFunction( buttonDefinition.init ) ) {
          buttonDefinition.init( claimEditor );
        }
        buttonsCell.append( newButton );
      } );
    }

    if ( $.isFunction( urlF ) ) {
      claimEditor.row1.find( 'td.wef_property_editor_input' ).addClass( styles.wef_external_links_before_url_cell );
      const urlCell = $( document.createElement( 'td' ) ).addClass( styles.wef_external_links_url_cell ).appendTo( claimEditor.row1 );
      const div = $( '<div>&nbsp;</div>' ).addClass( styles.wef_external_links_url_div ).appendTo( urlCell );
      const a = $( document.createElement( 'a' ) ).addClass( styles.wef_external_links_url_a ).appendTo( div ).attr( 'target', '_blank' );

      const updateLinkImplF = function( newValue ) {
        if ( $.isFunction( normalizeF ) ) {
          const newValueNormalized = normalizeF( newValue );
          if ( newValue !== newValueNormalized ) {
            claimEditor.setStringValue( newValueNormalized );
            return;
          }
        }
        if ( newValue ) {
          const newUrl = urlF( newValue );
          a.attr( 'href', newUrl );
          a.text( newUrl );
          // if ( typeof definition.check !== 'undefined' ) {
          // var result = definition.check.exec( newValue );
          // if ( result == null ) {
          // var tip = i18n.getTip( definition );
          // var shortLabel = getLabelTextShort( definition );
          // tip = tip.replace( '{0}', shortLabel );

          // statusAndTips.text( tip );
          // statusAndTips.addClass( 'ui-state-error' );
          // } else {
          // statusAndTips.text( '' );
          // statusAndTips.removeClass( 'ui-state-error' );
          // }
          // }
        } else {
          a.attr( 'href', '' );
          a.text( '' );
          // statusAndTips.text( '' );
          // statusAndTips.removeClass( 'ui-state-error' );
        }
      };
      const updateLinkF = function() {
        if ( claimEditor.hasValue() ) {
          updateLinkImplF( claimEditor.toDataValue().value );
        } else {
          updateLinkImplF( '' );
        }
      };
      $( claimEditor ).change( updateLinkF );

      // additional placeholders to align buttons after URL fields
      $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).appendTo( claimEditor.row1 );
      $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).appendTo( claimEditor.row1 );
    } else {
      claimEditor.row1.find( 'td.wef_property_editor_input' ).attr( 'colspan', 4 );
    }

    const beforeCell = $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).prependTo( claimEditor.row1 );
    beforeCell.append( buttonAddClaim );

    const afterCell = $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).appendTo( claimEditor.row1 );
    afterCell.append( buttonRemoveClaim );

    this.claimEditors.push( claimEditor );

    if ( this.temporaryHolder !== null ) {
      claimEditor.tbody.replaceAll( this.temporaryHolder );
      this.temporaryHolder = null;
    } else {
      const prev = this.claimEditors[ this.claimEditors.length - 2 ].tbody;
      const curr = this.claimEditors[ this.claimEditors.length - 1 ].tbody;
      curr.insertAfter( prev );
    }

    $( claimEditor ).change( () => jQuery( this ).change() );
    return claimEditor;
  }

  createPlaceholder( ) {
    if ( WEF_Utils.isEmpty( this.definition.columns ) ) {
      this.temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + this.definition.code + ' -->' );
      return this.temporaryHolder;
    }

    const container = $( document.createElement( 'tbody' ) );
    const columnsTable = $( document.createElement( 'table' ) ).addClass( styles.wef_columns_table ).appendTo( container );
    const columnsHeader = $( document.createElement( 'tr' ) ).addClass( styles.wef_columns_header ).appendTo( columnsTable );

    // empty cell for adding claim button
    columnsHeader.append( $( document.createElement( 'th' ) ).addClass( styles.wef_column_th_empty ) );

    const propertyName = $( document.createElement( 'th' ) ).addClass( styles.wef_column_th ).attr( 'colspan', '8' ).appendTo( columnsHeader );
    if ( typeof this.definition.label !== 'undefined' ) {
      wef_LabelsCache.getOrQueue( this.definition.label, ( label, description ) => {
        propertyName.text( label );
        propertyName.attr( 'title', description );
      } );
    }
    $.each( this.definition.columns, ( i, columnDefinition ) => {
      if ( !WEF_Utils.isEmpty( columnDefinition.code ) ) {
        const columnName = $( document.createElement( 'th' ) ).addClass( styles.wef_column_th ).attr( 'colspan', '2' ).appendTo( columnsHeader );
        if ( typeof columnDefinition.label !== 'undefined' ) {
          wef_LabelsCache.getOrQueue( columnDefinition.label, function( label, description ) {
            columnName.text( label );
            columnName.attr( 'title', description );
          } );
        }
      }
    } );

    this.temporaryHolder = $( document.createElement( 'tbody' ) ).html( '<!-- Temporary holder for ' + this.definition.code + ' -->' );
    this.temporaryHolder.appendTo( columnsTable );
    return container;
  }

  /**
   * Init editor with values. Must be called after placement on the form.
   *
   * @param entity
   *            {WEF_Entity}
   */
  init( entity ) {
    if ( !this.placed ) {
      throw new Error( 'Claims edit table is not placed on the form yet' );
    }

    /** @type {WEF_Claim[]} */
    const claims = this.definition.filterClaims( entity.claims );

    $.each( claims, ( i, claim ) => {
      /** @type {WEF_ClaimEditor} */
      const editor = this.add();
      editor.initWithValue( claim );
    } );

    if ( this.size() === 0 ) {
      /** @type {WEF_ClaimEditor} */
      const editor = this.add();
      editor.initEmpty();
    }
  }

  /**
   * Init editor with values. Must be called after placement on the form.
   *
   * @param entity
   *            {WEF_Entity}
   */
  initAsEmpty() {
    if ( !this.placed ) {
      throw new Error( 'Claims edit table is not placed on the form yet' );
    }

    /** @type {WEF_ClaimEditor} */
    const editor = this.add();
    editor.initEmpty();
  }


  appendTo( target ) {
    if ( this.placed ) {
      throw new Error( 'Claims edit table is already placed on the form' );
    }
    this.placed = true;

    this.createPlaceholder().appendTo( target );
    return;
  }


  /**
   * Looking for equals value and mark it as foung (light-green) or create new
   * item and mark it as new
   *
   * @param {string}
   *            strValue
   */
  onFoundStringValue( strValue ) {
    let found = false;
    this.claimEditors.forEach( claimEditor => {
      if ( claimEditor.equalsStringValue( strValue ) ) {
        claimEditor.tbody.addClass( styles[ 'wef-lookup-found' ] );
        found = true;
      }
    } );

    if ( found )
      return;

    const emptyClaimEditors = this.claimEditors.filter( claimEditor => !claimEditor.hasValue() );
    if ( emptyClaimEditors.length === 0 ) {
      const newClaimEditor = this.add();
      newClaimEditor.initWithStringValue( this.definition.datatype, strValue );
      newClaimEditor.tbody.addClass( styles[ 'wef-lookup-found-new' ] );
    } else {
      const newClaimEditor = emptyClaimEditors[ 0 ];
      newClaimEditor.setStringValue( strValue );
      newClaimEditor.tbody.addClass( styles[ 'wef-lookup-found-new' ] );
    }
  }


  /** Replace each target element with the set of matched elements. */
  replaceAll( target ) {
    if ( this.placed ) {
      throw new Error( 'Claims edit table is already placed on the form' );
    }
    this.placed = true;

    this.createPlaceholder().replaceAll( target );
    return;
  }

  /**
   * @param {WEF_Updates}
   *            updates
   */
  collectUpdates( updates ) {
    $.each( this.claimEditors, function( i, claimEditor ) {
      claimEditor.collectUpdates( updates );
    } );
    for ( let index = 0; index < this.removedClaims.length; index++ ) {
      updates.removedClaims.push( this.removedClaims[ index ] );
    }
  }

  /**
   * @returns {number} the number of values, including no-value and some-value
   *          snaks
   */
  getHasDataSize() {
    return this.claimEditors.filter( editor => editor.hasData() ).length;
  }

  size() {
    return this.claimEditors.length;
  }
}
