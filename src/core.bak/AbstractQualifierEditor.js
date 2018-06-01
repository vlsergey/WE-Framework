import * as WEF_Utils from './utils';
import i18n from './core.i18n';
import styles from './core.css';
import WEF_SnakEditor from './SnakEditor';

/**
 * Returns the array of claims for specified definition from entity
 *
 * @param definition
 *            {WEF_Definition}
 * @param claims
 *            Wikidata entity JSON
 * @returns {WEF_Claim[]}
 */
export default class AbstractQualifierEditor {

  constructor( onRemove ) {
    /** @type {string} */
    this.propertyId = null;
    /** @type {WEF_SnakEditor} */
    this.snakEditor = null;
    /** @type {WEF_Snak} */
    this.wikidataSnak = null;
    /** @type {string} */
    this.wikidataOldValue = null;
    /** @type {function} */
    this._onRemove = onRemove;
  }

  /**
   * @param claimData
   *            {WEF_Claim}
   * @return {Boolean}
   */
  collectUpdates( claimData ) {
    if ( this.hasData() ) {
      const snakValue = this.toSnakValue();
      WEF_Utils.appendToNamedMap( claimData, 'qualifiers', this.propertyId, snakValue );
      return JSON.stringify( snakValue ) !== this.wikidataOldValue;
    } else {
      /*
		 * just ignore it and do not add to claim -- it will be removed as
		 * "missing" one
		 */
      return this.wikidataOldValue !== null;
    }
  }

  hasData() {
    return this.propertyId != null && this.snakEditor.hasData();
  }

  /** Create empty editor but hide it behind replacement label as well */
  initWithEmpty( propertyId, dataType, editorDataType ) {
    this.wikidataSnak = null;
    this.propertyId = propertyId;
    this.wikidataOldValue = null;
    this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
    this.snakEditor.initEmptyWithDataType( propertyId, dataType, editorDataType );
  }

  /** @return {string} */
  getHash() {
    return this.wikidataSnak != null ? this.wikidataSnak.hash : null;
  }

  toSnakValue() {
    if ( !this.hasData() ) {
      throw new Error( 'no data' );
    }

    const snak = {};
    if ( this.wikidataSnak !== null ) {
      snak.hash = this.wikidataSnak.hash;
    }
    snak.snaktype = this.snakEditor.snakTypeMode;
    snak.property = this.propertyId;
    if ( this.snakEditor.snakTypeMode === 'value' ) {
      snak.datatype = this.snakEditor.getDataType();
      snak.datavalue = this.snakEditor.toDataValue();
    }
    return snak;
  }

  clear() {
    this.propertyId = null;
    this.snakEditor = null;
  }

  _addRemoveButton( target ) {
    const button = $( document.createElement( 'button' ) )
      .addClass( styles.wef_qualifier_button )
      .attr( 'type', 'button' )
      .button( {
        icons: {
          primary: 'ui-icon-trash'
        },
        text: false,
        label: i18n.buttonRemoveQualifier,
      } )
      .click( () => this._onRemove( this ) )
      .appendTo( target );

    $( this ).on( 'afterHide', function() {
      button.hide();
    } );
    $( this ).on( 'afterShow', function() {
      button.show();
    } );
  }

}
