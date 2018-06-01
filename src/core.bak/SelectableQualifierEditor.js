import * as WEF_Utils from './utils';
import AbstractQualifierEditor from './AbstractQualifierEditor';
import labelsCache from './labelsCache';
import styles from './core.css';
import typesCache from './typesCache';
import WEF_ItemSelect from './ItemSelect';
import WEF_SnakEditor from './SnakEditor';

export default class WEF_SelectableQualifierEditor extends AbstractQualifierEditor {

  constructor( parent, qualifierDefinitions, onRemove ) {
    super( onRemove );

    this.qualifierRow = $( document.createElement( 'tr' ) ).appendTo( parent );
    /** @type {WEF_ItemSelect} */
    const qualifierSelect = this.qualifierSelect = new WEF_ItemSelect();
    qualifierSelect.select.appendTo( $( document.createElement( 'td' ) )
      .addClass( styles.wef_qualifiers_select_cell )
      .appendTo( this.qualifierRow ) );
    this.qualifierEditCell = $( document.createElement( 'td' ) )
      .addClass( styles.wef_qualifiers_edit_cell )
      .appendTo( this.qualifierRow );
    this.qualifierRemoveCell = $( document.createElement( 'td' ) )
      .addClass( styles.wef_button_cell )
      .appendTo( this.qualifierRow );

    if ( $.isArray( qualifierDefinitions ) ) {
      $.each( qualifierDefinitions, function( index, qualifierDefinition ) {
        const code = qualifierDefinition.code;
        qualifierSelect.addOption( code );

        if ( !WEF_Utils.isEmpty( qualifierDefinition.datatype ) ) {
          typesCache.putInCache( code, qualifierDefinition.datatype );
        }
      } );
    }

    // do not select the first
    qualifierSelect.val( null );

    qualifierSelect.hideBehindLabel = function() {
      const label = $( document.createElement( 'span' ) );
      label.css( 'cursor', 'pointer' );

      const code = qualifierSelect.val();
      label.text( '(' + qualifierSelect.val() + '): ' );
      labelsCache.getOrQueue( code, function( newLabel, newDescription ) {
        label.text( newLabel + ': ' );
        label.attr( 'title', newDescription );
      } );

      qualifierSelect.select.before( label );
      qualifierSelect.select.hide();

      label.click( function() {
        label.remove();
        qualifierSelect.select.show();
      } );
      return label;
    };

    qualifierSelect.select.change( () => {
      const newPropertyId = qualifierSelect.val();
      if ( newPropertyId != null && this.propertyId != newPropertyId ) {
        this._onPropertySelect( newPropertyId );
      }
    } );

    /** @type {function} */
    this._onRemove = onRemove;
    this._addRemoveButton( this.qualifierRemoveCell );
  }

  initWithValue( qualifierSnak ) {
    const qualifierEditor = this;

    this.wikidataSnak = qualifierSnak;
    this.propertyId = qualifierSnak.property;
    this.qualifierSelect.val( qualifierSnak.property );
    this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
    this.snakEditor.initWithValue( qualifierSnak );

    // remember old value
    this.wikidataOldValue = this.hasData() ? JSON.stringify( this.toSnakValue() ) : null;

    const selectLabel = this.qualifierSelect.hideBehindLabel();
    const editorLabel = this.snakEditor.hideBehindLabel();
    this.qualifierRemoveCell.css( 'visibility', 'hidden' );
    $( qualifierEditor ).trigger( 'afterHide' );

    let firstTime = true;
    this.qualifierRow.click( function( evt ) {
      if ( firstTime ) {
        firstTime = false;
        qualifierEditor.qualifierRemoveCell.css( 'visibility', 'inherit' );

        const target = $( evt.target );
        if ( !selectLabel.is( target ) && !$.contains( selectLabel[ 0 ], target ) ) {
          selectLabel.click();
        }
        if ( !editorLabel.is( target ) && !$.contains( editorLabel[ 0 ], target ) ) {
          editorLabel.click();
        }
        $( qualifierEditor ).trigger( 'afterShow' );
      }
    } );
  }

  /* Called from drop-down select */
  _onPropertySelect( newPropertyId ) {
    this.propertyId = newPropertyId;

    // do we have qualifier input already?
    if ( this.snakEditor == null ) {
      this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
      this.snakEditor.initEmptyWithPropertyId( newPropertyId );
    } else {
      if ( this.snakEditor.propertyId === newPropertyId ) {
        // leave as it is
      } else {
        this.snakEditor.remove();
        this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
        this.snakEditor.initEmptyWithPropertyId( newPropertyId );
      }
    }
  }

}
