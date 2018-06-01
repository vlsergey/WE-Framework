import * as WEF_Utils from './utils';
import i18n from './core.i18n';
import styles from './core.css';
import typesCache from './typesCache';
import wef_selectSnakType from './SelectSnakType';
import WEF_SnakValueEditor from './SnakValueEditor';

export default class SnakEditor {

  constructor( parent, options ) {
    if ( !( parent instanceof jQuery ) )
      throw new Error( 'parent is no specified or not a jQuery variable: ' + parent );

    this.options = options;

    /** @type {WEF_SnakEditor} */
    const snakEditor = this;

    /** @type {String} */
    this.snakTypeMode = null;

    /** @type {WEF_SnakValueEditor} */
    this.valueEditor = null;

    /** @type {String} */
    this.propertyId = null;

    this._butttonSelectSnakType = $( document.createElement( 'button' ) )
      .addClass( styles.wef_select_snak_type_button );
    this._butttonSelectSnakType.button( {
      icons: {
        primary: 'ui-icon-triangle-1-e'
      },
      text: false,
      label: i18n.buttonSelectSnakType,
    } ).click( () => {
      if ( wef_selectSnakType.visible && wef_selectSnakType.initiator === this ) {
        wef_selectSnakType.hide();
      } else {
        wef_selectSnakType.initiator = this;
        wef_selectSnakType.show( snakEditor._butttonSelectSnakType, snakEditor.snakTypeMode, function( value ) {
          snakEditor.switchToSnakType( value );
        } );
      }
    } );

    // JQuery parent element
    this.table = $( document.createElement( 'table' ) )
      .addClass( styles.wef_snak_table )
      .appendTo( parent );
    this._tr = $( document.createElement( 'tr' ) )
      .appendTo( this.table );
    this._td1 = $( document.createElement( 'td' ) )
      .addClass( styles.wef_button_cell )
      .appendTo( this._tr );
    this._td2 = $( document.createElement( 'td' ) )
      .addClass( styles.wef_snak_table_value_editor_cell )
      .appendTo( this._tr );
    this._snakTypeLabel = $( document.createElement( 'span' ) )
      .addClass( styles.wef_snak_type_label )
      .appendTo( this._td2 )
      .hide();

    this._td1.append( this._butttonSelectSnakType );

    this.hiddenBehindLabel = false;
    this._jThis = $( this );
  }

  _change() {
    this._jThis.trigger( 'change' );
  }

  equalsStringValue( value ) {
    if ( !this.hasValue() )
      return false;

    return this.toDataValue().value === value;
  }

  equalsWikibaseItemValue( entityId ) {
    WEF_Utils.assertCorrectEntityId( entityId );

    if ( !this.hasValue() || 'wikibase-item' != this.getDataType() )
      return false;

    const snakDataValue = this.toDataValue().value;
    return entityId == WEF_Utils.getEntityIdFromDatavalue( snakDataValue );
  }

  hasData() {
    return this.snakTypeMode !== 'value' || this.valueEditor.hasValue();
  }

  hasValue() {
    return this.snakTypeMode === 'value' && this.valueEditor.hasValue();
  }

  hideBehindLabel() {
    const label = $( document.createElement( 'span' ) )
      .addClass( styles.wef_snak_replacement_label );
    label.css( 'cursor', 'pointer' );

    if ( this.snakTypeMode === 'value' ) {
      label.append( this.valueEditor.getAsLabel() );
    } else {
      label.text( wef_selectSnakType.text() );
    }

    this.table.before( label );
    this.table.hide();

    const snakEditor = this;
    snakEditor.hiddenBehindLabel = true;
    label.click( function() {
      label.remove();
      snakEditor.table.show();
      snakEditor.hiddenBehindLabel = false;
    } );

    return label;
  }

  initEmptyWithDataType( propertyId, dataType, editorDataType ) {
    this.propertyId = propertyId;
    this.snakTypeMode = 'value';
    this.valueEditor = new WEF_SnakValueEditor( this._td2, dataType, editorDataType, undefined, this.options );
    this._initValueEditor();
  }

  initEmptyWithPropertyId( propertyId ) {
    this.propertyId = propertyId;
    this.snakTypeMode = 'novalue';
    this.switchToSnakType( 'value' );
  }

  _initValueEditor() {
    const snakEditor = this;
    $( this.valueEditor ).change( function() {
      snakEditor._change();
    } );
  }

  initWithValue( snak ) {
    if ( typeof snak.property === 'undefined' ) {
      throw new Error( 'Snak does not specify property ID' );
    }
    if ( typeof snak.snaktype === 'undefined' ) {
      throw new Error( 'Snak does not specify snak type' );
    }
    this.propertyId = snak.property;
    this.snakTypeMode = snak.snaktype;

    if ( snak.snaktype === 'value' ) {
      if ( typeof snak.datatype === 'undefined' ) {
        throw new Error( 'Snak contains value, but does not specify data type' );
      }
      if ( typeof snak.datavalue === 'undefined' ) {
        throw new Error( 'Snak type is value, but value does not present' );
      }
      this.valueEditor = new WEF_SnakValueEditor( this._td2, snak.datatype, undefined, snak.datavalue, this.options );
      this._initValueEditor();
    } else {
      this._showSnakTypeLabel( snak.snaktype );
    }

    this._change();
  }

  /** @return {string} */
  getDataType() {
    if ( this.snakTypeMode !== 'value' ) {
      throw new Error( 'data type make sence only when snak type is "value"' );
    }
    return this.valueEditor.dataDataType;
  }

  toDataValue() {
    return this.valueEditor.toDataValue();
  }

  remove() {
    this.table.remove();
    this.valueEditor = null;
    this.parent = null;
  }

  /**
   * @param {WEF_Snak}
   *            snak
   */
  setSnakValue( snak ) {
    if ( typeof snak.property === 'undefined' ) {
      throw new Error( 'Snak does not specify property ID' );
    }
    if ( typeof snak.snaktype === 'undefined' ) {
      throw new Error( 'Snak does not specify snak type' );
    }
    this.propertyId = snak.property;
    this.switchToSnakType( snak.snaktype );
    if ( snak.snaktype === 'value' ) {
      this.valueEditor.setDataValue( snak.datavalue );
    }
    this._change();
  }

  _showSnakTypeLabel( snakType ) {
    if ( snakType === 'novalue' ) {
      this._snakTypeLabel.text( i18n.snakTypeNoValue ).attr( 'title', i18n.snakTypeNoValueTitle );
    } else if ( snakType === 'somevalue' ) {
      this._snakTypeLabel.text( i18n.snakTypeSomeValue ).attr( 'title', i18n.snakTypeSomeValueTitle );
    } else {
      this._snakTypeLabel.text( '' ).attr( 'title', '' );
    }
    this._snakTypeLabel.show();
  }

  switchToSnakType( snakType ) {
    const oldSnakType = this.snakTypeMode;
    if ( oldSnakType === snakType ) {
      return;
    }

    this.snakTypeMode = snakType;
    if ( this.valueEditor !== null ) {
      this.valueEditor.hide();
    }

    const snakEditor = this;
    if ( snakType === 'value' ) {
      if ( this.valueEditor === null ) {
        typesCache
          .getPropertyType( snakEditor.propertyId )
          .then( ( dataType ) => {
            snakEditor._snakTypeLabel.hide();
            snakEditor.valueEditor = new WEF_SnakValueEditor( snakEditor._td2, dataType, undefined, undefined, snakEditor.options );
            snakEditor._initValueEditor();
            snakEditor._change();
          } )
          .catch( ( failureReason ) => {
            alert( 'Can\'t change snak value type bacause property data type is unknown: ' + failureReason );
            snakEditor.snakTypeMode = oldSnakType;
          } );
      } else {
        this._snakTypeLabel.hide();
        this.valueEditor.show();
      }
    } else {
      this._showSnakTypeLabel( snakType );
      this._change();
    }
  }

}
