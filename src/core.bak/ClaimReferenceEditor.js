import * as WEF_Utils from './utils';
import styles from './core.css';
import WEF_Definition from './FieldDefinition';
import WEF_ItemSelect from './ItemSelect';
import WEF_SelectableQualifierEditor from './SelectableQualifierEditor';
import wef_TypesCache from './typesCache';

/** @const */
const PROPERTIES_OF_REFERENCE = [];
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P248', // specified in
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P50', // author
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P1476', // title
  datatype: 'monolingualtext',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P1680', // subtitle
  datatype: 'monolingualtext',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P393', // editor
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P1433', // publication
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P123', // publisher
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P478', // volume
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P433', // issue
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P792', // chapter
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P958', // section
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P304', // pages
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P143', // imported from
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P813', // date retrieved
  datatype: 'time',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P854', // URL
  datatype: 'url',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P1065', // archive URL
  datatype: 'url',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P212', // ISBN 13
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P957', // ISBN 10
  datatype: 'string',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P1480', // sourcing circumstances
  datatype: 'wikibase-item',
} ) );
PROPERTIES_OF_REFERENCE.push( new WEF_Definition( {
  code: 'P387', // citation
  datatype: 'string',
} ) );

/** @class */
export default class ClaimReferenceEditor {

  constructor( parentTableElement ) {
    this.parentTableElement = parentTableElement;
    this.snaksEditors = [];
    this.wikidataHash = null;
    this.wikidataOldSnaksStr = null;

    this.lastRow = $( document.createElement( 'tr' ) ).appendTo( parentTableElement );

    const newSnakTypeSelect = new WEF_ItemSelect();
    $.each( PROPERTIES_OF_REFERENCE, function( index, propertyDefinition ) {
      const code = propertyDefinition.code;
      newSnakTypeSelect.addOption( code );
      wef_TypesCache.putInCache( code, propertyDefinition.datatype );
    } );
    newSnakTypeSelect.val( null );
    newSnakTypeSelect.select.appendTo( $( document.createElement( 'td' ) ).addClass( styles.wef_reference_select_cell ).appendTo( this.lastRow ) );

    newSnakTypeSelect.select.change( () => {
      const newPropertyId = newSnakTypeSelect.val();

      if ( newPropertyId != null ) {
        const snakEditor = new WEF_SelectableQualifierEditor(
          this.parentTableElement,
          PROPERTIES_OF_REFERENCE,
          ( removedEditor ) => this._onSnakEditorRemove( removedEditor ) );
        snakEditor.qualifierSelect.val( newPropertyId );
        snakEditor._onPropertySelect( newPropertyId );
        this.snaksEditors.push( snakEditor );

        newSnakTypeSelect.val( null );
        this.moveSelectToLastRow();
      }
    } );
  }

  /**
 * Reappend empty row with only-for-select drop-down list to the end of the
 * table
 */
  moveSelectToLastRow() {

    this.lastRow.detach();
    this.lastRow.appendTo( this.parentTableElement );
  }

  load( reference ) {

    this.wikidataHash = typeof reference.hash !== 'undefined' ? reference.hash : null;
    this.wikidataOldSnaksStr = typeof reference.snaks !== 'undefined' ? JSON.stringify( reference.snaks ) : null;

    const claimReferenceEditor = this;
    $.each( reference.snaks, function( propertyId, propertySnaks ) {
      $.each( propertySnaks, function( i, snak ) {
        const snakEditor = new WEF_SelectableQualifierEditor(
          claimReferenceEditor.parentTableElement,
          PROPERTIES_OF_REFERENCE,
          ( removedEditor ) => claimReferenceEditor._onSnakEditorRemove( removedEditor ) );
        snakEditor.initWithValue( snak );
        claimReferenceEditor.snaksEditors.push( snakEditor );
      } );
    } );
    this.moveSelectToLastRow();
  }

  collect() {

    const newReference = {};
    const snaksOrder = [];

    if ( this.wikidataHash !== null ) {
      newReference.hash = this.wikidataHash;
    }

    $.each( this.snaksEditors, function( i, snakEditor ) {
      if ( snakEditor.hasData() ) {
        const propertyId = snakEditor.propertyId;
        WEF_Utils.appendToNamedMap( newReference, 'snaks', propertyId, snakEditor.toSnakValue() );
        if ( $.inArray( propertyId, snaksOrder ) === -1 ) {
          snaksOrder.push( propertyId );
        }
      }
    } );

    if ( !$.isEmptyObject( newReference.snaks ) ) {
      newReference[ 'snaks-order' ] = snaksOrder;
      return newReference;
    }
    return;
  }

  _onSnakEditorRemove( removedEditor ) {

    removedEditor.qualifierRow.remove();
    this.snaksEditors = $.grep( this.snaksEditors, function( value ) {
      return value != removedEditor;
    } );
  }

}
