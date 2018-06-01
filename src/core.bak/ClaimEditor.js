import * as ModelUtils from './ModelUtils';
import * as WEF_Utils from './utils';
import flags from './flags';
import i18n from './core.i18n';
import SelectableQualifierEditor from './SelectableQualifierEditor';
import SingleQualifierEditor from './SingleQualifierEditor';
import styles from './core.css';
import WEF_ClaimReferencesEditor from './ClaimReferencesEditor';
import wef_LabelsCache from './labelsCache';
import wef_selectRank from './SelectRank';
import WEF_SnakEditor from './SnakEditor';

const WEF_RANK_PREFERRED = 'preferred';
const WEF_RANK_NORMAL = 'normal';
const WEF_RANK_DEPRECATED = 'deprecated';

/**
 * Creates editor from definition. Definition includes:
 * <ul>
 * <li><tt>code</tt> -- expression like <tt>P123</tt> to edit property
 * value or expression like
 * <tt>P234[Q456]/P567<tt> to edit qualifier value under specified property with specified value
 * <li><tt>datatype</tt> -- property datatype. Currently supported:
 * <ul>
 * <li><tt>string</tt>
 * <li><tt>url</tt>
 * <li><tt>wikibase-item</tt>
 * </ul>
 * <li><tt>flag</tt> -- Flag code to show before label
 * <li><tt>label</tt> -- Wikidata code to load label from
 * <li><tt>labelPrefix</tt> -- Text to add to label (no i18n)
 * <li><tt>labelQualifier</tt> -- An array of Wikidata items to additionally qualify property label
 * <li><tt>qualifiers</tt> -- An array of Wikidata property ID that will be added to qualifiers list by default
 * <li><tt>check</tt> -- function to check value correctness
 * <li><tt>normalize</tt> -- function to normalize value (including loaded one)
 * </ul>
 * The following events (using JQuery wrapper) are supported:
 * <ul>
 * <li><tt>change</tt>
 * </ul>
 *
 * On exit there is an editor structure:
 * <ul>
 * <li><tt>tbody</tt> -- jQuery HTML TBODY element of editor
 * <li><tt>collectUpdates( updates )</tt> -- updates special structure:
 * <ul>
 * <li><tt>data</tt> -- JSON structure to be sent to <tt>wgeditclaims</tt> to update Wikidata claim
 * <li><tt>removedClaims</tt> -- list of claims ID to be removed
 * </ul>
 * <li><tt>hide( )</tt> -- method to hide editor
 * <li><tt>show( )</tt> -- method to show editor
 * <li><tt>hideLabel( placeholderText )</tt> -- hide label (optionally replace with placeholder)
 * <li><tt>showLabel(  )</tt> -- show original label
 * <li><tt>load( value )</tt> -- load stored value into editor. The whole claim shall be loaded
 * <li><tt>toDataValue( )</tt> -- return current value JSON
 * <li><tt>setDataValue( value )</tt> -- updates current value JSON
 * </ul>
 * @param definition {WEP_Definition} property definition
 * @class
 */

function getLabel( definition ) {
  const label = $( document.createElement( 'label' ) );

  const spanPrefix = $( document.createElement( 'span' ) );
  spanPrefix.text( definition.labelPrefix );
  spanPrefix.appendTo( label );

  const spanLabel = $( document.createElement( 'span' ) );
  spanLabel.text( definition.label );
  if ( WEF_Utils.isCorrectEntityId( definition.label ) ) {
    wef_LabelsCache.localizeLabel( spanLabel, definition.label );
    wef_LabelsCache.localizeDescriptionAsTitle( label, definition.label );
  }
  spanLabel.appendTo( label );

  if ( typeof definition.labelQualifier !== 'undefined' ) {
    label.append( $( document.createElement( 'span' ) ).text( ' (' ) );
    if ( $.isArray( definition.labelQualifier ) ) {
      $.each( definition.labelQualifier, function( index, qualifier ) {
        if ( index !== 0 ) {
          label.append( $( document.createElement( 'span' ) ).text( ', ' ) );
        }

        const spanQualifier = $( document.createElement( 'span' ) );
        spanQualifier.text( qualifier );
        if ( WEF_Utils.isCorrectEntityId( qualifier ) ) {
          wef_LabelsCache.localizeLabel( spanQualifier, qualifier );
        }
        label.append( spanQualifier );
      } );
    } else {
      const spanQualifier = $( document.createElement( 'span' ) );
      spanQualifier.text( definition.labelQualifier );
      if ( WEF_Utils.isCorrectEntityId( definition.labelQualifier ) ) {
        wef_LabelsCache.localizeLabel( spanQualifier, definition.labelQualifier );
      }
      label.append( spanQualifier );
    }
    label.append( $( document.createElement( 'span' ) ).text( ')' ) );
  }

  return label;
}


export default class WEF_ClaimEditor {

  constructor( definition ) {
    if ( !definition ) throw new Error( 'Missing definition function argument' );

    /** @type {WEP_Definition} */
    this.definition = definition;

    /** @type WEF_ClaimReferencesEditor */
    this.referencesEditor = null;

    this.isPropertyEditor = /^P\d+$/i.test( definition.code );
    this.isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

    /**
   * Main property ID
   *
   * @type {string}
   */
    this.propertyId;

    /**
   * Required property value
   *
   * @type {string}
   */
    this.propertyValue;

    /**
   * Qualifier property to edit
   *
   * @type {string}
   */
    this.qualifierPropertyId;

    if ( this.isPropertyEditor ) {
      const test = definition.code.match( /^P(\d+)$/i );
      this.propertyId = 'P' + test[ 1 ];
      this.propertyValue = undefined;
      this.qualifierPropertyId = undefined;
    } else if ( this.isQualifierEditor ) {
      const test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
      this.propertyId = 'P' + test[ 1 ];
      this.propertyValue = 'Q' + test[ 2 ];
      this.qualifierPropertyId = 'P' + test[ 3 ];
    } else {
      throw new Error( 'Unsupported code: ' + definition.code );
    }

    this.tbody = $( document.createElement( 'tbody' ) ).addClass( styles.wef_property_editor_tbody ).addClass( styles[ 'wef_property_editor_' + this.propertyId ] );
    const row1 = this.row1 = $( document.createElement( 'tr' ) ).addClass( styles.wef_property_editor_row ).appendTo( this.tbody );
    const rankCell = $( document.createElement( 'td' ) ).addClass( styles.wef_property_editor_rank ).addClass( styles.wef_button_cell ).appendTo( row1 );
    const flagCell = $( document.createElement( 'td' ) ).addClass( styles.wef_property_editor_flag ).appendTo( row1 );
    const labelCell = $( document.createElement( 'th' ) ).addClass( styles.wef_property_editor_label ).appendTo( row1 );
    const beforeInputCell = $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).appendTo( row1 );
    const inputCell = $( document.createElement( 'td' ) ).addClass( styles.wef_property_editor_input ).appendTo( row1 );
    const sourcesButtonCell = $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).appendTo( row1 );

    const columnTables = this.columnTables = {};
    if ( !WEF_Utils.isEmpty( definition.columns ) ) {
      $.each( definition.columns, ( i, columnDefinition ) => {
        if ( !WEF_Utils.isEmpty( columnDefinition.code ) ) {
          const addColumnQualifierCell = $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).addClass( styles.wef_button_cell_addColumnQualifier ).appendTo( row1 );
          $( document.createElement( 'button' ) ).attr( 'type', 'button' ).button( {
            icons: {
              primary: 'ui-icon-plus'
            },
            text: false,
            label: i18n.buttonAddQualifier,
          } ).click( () => {
            const qualifierEditor = this.claimEditor.addQualifier( columnDefinition.code );
            qualifierEditor.initWithEmpty( columnDefinition.code, columnDefinition.datatype, columnDefinition.editordatatype );
          } ).addClass( styles.wef_property_button ).appendTo( addColumnQualifierCell );

          const columnCell = $( document.createElement( 'td' ) ).addClass( styles.wef_property_editor_column_cell ).appendTo( row1 );
          wef_LabelsCache.getOrQueue( columnDefinition.code, function( label, description ) {
            columnCell.attr( 'title', description );
          } );

          const columnTable = $( document.createElement( 'table' ) ).addClass( styles.wef_property_editor_column_table ).appendTo( columnCell );
          columnTables[ columnDefinition.code ] = columnTable;
        }
      } );
    }

    if ( this.isPropertyEditor ) {
      wef_LabelsCache.getOrQueue( this.propertyId, ( label, description ) => {
        if ( !WEF_Utils.isEmpty( description ) && description !== this.propertyId )
          row1.attr( 'title', description );
      } );
    }

    /** @type {WEF_SnakEditor} */
    this.snakEditor = new WEF_SnakEditor( inputCell, definition );

    /* Rank */
    this.rankButton = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( styles.wef_property_button ).addClass( styles.wef_button_rank_normal ).button( {
      icons: {
        primary: 'ui-icon-arrowthick-2-n-s'
      },
      text: false,
      label: i18n.rankNormalValue,
    } ).appendTo( rankCell );
    this.rankButton.click( () => {
      if ( wef_selectRank.visible && wef_selectRank.initiator === this ) {
        wef_selectRank.hide();
      } else {
        wef_selectRank.initiator = this;
        wef_selectRank.show( this.rankButton, this.rank, ( value ) => {
          this.setRank( value );
        } );
      }
    } );

    /* Flag */
    if ( definition.flag !== 'undefined' && typeof flags !== 'undefined' && typeof flags[ definition.flag ] !== 'undefined' ) {
      flagCell.html( flags[ definition.flag ] );
    }

    /* Label */
    this._labelToDisplay = getLabel( definition );
    this._labelPlaceholder = $( document.createElement( 'label' ) );

    labelCell.empty();
    labelCell.append( this._labelToDisplay );
    labelCell.append( this._labelPlaceholder );

    /* Sources */
    this.sourcesButton = $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( styles.wef_property_button ).addClass( styles.wef_button_sources ).button( {
      text: true,
      label: '[0]',
    } ).appendTo( sourcesButtonCell );
    this.sourcesButton.click( () => {
      if ( this.claimEditor.referencesEditor == null ) {
        this.claimEditor.referencesEditor = new WEF_ClaimReferencesEditor( parent );
        this.claimEditor.referencesEditor.load( this.claimEditor.references );
      }
      this.referencesEditor.show();
    } );

    const row2 = $( document.createElement( 'tr' ) ).addClass( styles.wef_property_editor_row ).appendTo( this.tbody );
    $( document.createElement( 'td' ) ).addClass( styles.wef_property_editor_cell_emtpy ).appendTo( row2 );
    const bottomContentCell = $( document.createElement( 'td' ) ).addClass( styles.wef_property_editor_bottom_content ).attr( 'colspan', '100' ).appendTo( row2 );
    this._bottomContentTable = $( document.createElement( 'table' ) ).addClass( styles.wef_qualifiers ).appendTo( bottomContentCell );

    this.disabled = false;

    /** @type {WEF_Definition} */
    this.definition = definition;
    this.wikidataClaim = null;
    this.wikidataSnak = null;
    this.wikidataOldValue = null;
    this.rank = WEF_RANK_NORMAL;
    this.references = null;

    $( this.snakEditor ).change( () => $( this ).change() );

    /* Qualifiers support */

    /** @type {WEF_QualifierEditor[]} */
    this.qualifiers = [];
    /** @type {string[]} */
    this.removedQualifiersHashes = [];

    /* Add qualifier button */
    if ( typeof definition.qualifiers !== 'undefined' && definition.qualifiers.length > 0 ) {
      $( document.createElement( 'button' ) ).attr( 'type', 'button' ).addClass( styles.wef_property_button ).button( {
        icons: {
          primary: 'ui-icon-tag'
        },
        text: false,
        label: i18n.buttonAddQualifier,
      } )
        .click( () => this.addQualifier() )
        .appendTo( beforeInputCell );
    }
  }

  addQualifier( qualifierId ) {
    if ( WEF_Utils.isEmpty( qualifierId ) || typeof this.columnTables[ qualifierId ] === 'undefined' ) {
      const qualifierEditor = new SelectableQualifierEditor( this._bottomContentTable, this.definition.qualifiers, ( removedQualifierEditor ) => {
        const hash = removedQualifierEditor.getHash();
        if ( hash !== null ) {
          this.removedQualifiersHashes.push( hash );
        }
      } );
      this.qualifiers.push( qualifierEditor );
      return qualifierEditor;
    }

    const targetCell = this.columnTables[ qualifierId ];
    const qualifierEditor = new SingleQualifierEditor( targetCell, qualifierId, ( removedQualifierEditor ) => {
      const hash = removedQualifierEditor.getHash();
      if ( hash !== null ) {
        this.removedQualifiersHashes.push( hash );
      }
    } );
    this.qualifiers.push( qualifierEditor );
    return qualifierEditor;
  }

  /**
   * @param updates
   *            {WEF_Updates}
   */
  collectUpdates( updates ) {
    if ( this.disabled === true ) {
      return;
    }

    // check if we have any changes
    const hasData = this.snakEditor.hasData();
    const newSnak = hasData ? this.toSnakValue() : null;

    const oldClaim = this.wikidataClaim;
    const oldSnak = this.wikidataSnak;
    const oldSnakStr = this.wikidataOldValue;
    const oldRank = this.wikidataOldRank;
    const oldReferencesStr = this.wikidataOldReferences;

    if ( hasData === false ) {
      if ( oldClaim !== null ) {
        updates.removedClaims.push( oldClaim.id );
      }
    } else {
      const claim = {};
      if ( oldClaim !== null ) {
        $.extend( claim, oldClaim );
        // qualifiers we will refill by ourselfs
        delete claim.qualifiers;
        delete claim[ 'qualifiers-order' ];
        delete claim.rank;
        delete claim.references;
      } else {
        claim.type = 'statement';
      }
      claim.rank = this.rank;
      if ( this.referencesEditor !== null ) {
        this.references = this.referencesEditor.collect();
      }
      claim.references = this.references;

      if ( this.isPropertyEditor === true ) {
        claim.mainsnak = newSnak;
      } else if ( this.isQualifierEditor === true ) {
        if ( oldClaim === null ) {
          claim.mainsnak = ModelUtils.newWikibaseItemSnak( this.propertyId, 'item', Number( this.propertyValue.substr( 1 ) ) );
        }
        const qualifier = newSnak;
        if ( oldSnak !== null ) {
          qualifier.hash = oldSnak.hash;
        }
        WEF_Utils.appendToNamedMap( claim, 'qualifiers', this.qualifierPropertyId, qualifier );
      } else {
        throw new Error( 'Unsupported code: ' + this.definition.code );
      }

      let needToUpdateClaim = this.rank !== oldRank || JSON.stringify( newSnak ) !== oldSnakStr || JSON.stringify( this.references ) !== oldReferencesStr;

      // save qualifiers
      $.each( this.qualifiers, function( index, qualifierEditor ) {
        needToUpdateClaim = qualifierEditor.collectUpdates( claim ) || needToUpdateClaim;
      } );

      needToUpdateClaim = needToUpdateClaim || this.removedQualifiersHashes.length > 0 ;

      if ( needToUpdateClaim === true ) {
        WEF_Utils.appendToNamedMap( updates.data, 'claims', this.propertyId, claim );
      }
    }
  }

  equalsStringValue( value ) {
    return this.snakEditor.equalsStringValue( value );
  }

  equalsWikibaseItemValue( entityId ) {
    WEF_Utils.assertCorrectEntityId( entityId );
    return this.snakEditor.equalsWikibaseItemValue( entityId );
  }

  getStringValue() {
    if ( this.hasValue() ) {
      return this.snakEditor.toDataValue().value;
    }
  }

  hasData() {
    return this.snakEditor.hasData();
  }

  hasValue() {
    return this.snakEditor.hasValue();
  }

  hideLabel( placeholderText ) {
    if ( typeof placeholderText === 'string' ) {
      this._labelPlaceholder.text( placeholderText );
    }
    this._labelToDisplay.hide();
    this._labelPlaceholder.show();
  }

  initEmpty() {
    // we have definition only
    this.rank = WEF_RANK_NORMAL;
    this.snakEditor.initEmptyWithDataType( this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId, this.definition.datatype );
    this.references = [];

    this.wikidataClaim = null;
    this.wikidataOldValue = null;
    this.wikidataOldReferences = null;
  }

  initWithValue( claim ) {

    this.wikidataClaim = claim;
    if ( typeof claim.rank === 'undefined' ) {
      this.setRank( WEF_RANK_NORMAL );
    } else {
      this.setRank( claim.rank );
    }
    this.references = typeof claim.references !== 'undefined' && claim.references !== null ? claim.references : [];
    this.sourcesButton.button( 'option', 'label', '[' + this.references.length + ']' );

    if ( this.isPropertyEditor ) {
      // load property main snak
      this.wikidataSnak = claim.mainsnak;
      if ( claim.mainsnak ) {
        this.snakEditor.initWithValue( claim.mainsnak );
      } else {
        // WTF?
        this.snakEditor.initEmptyWithDataType( this.propertyId, this.definition.datatype );
      }
    } else if ( this.isQualifierEditor ) {
      /*
       * since it's loading time, we assume there is qualifier with specified
       * value
       */
      const qualifiers = claim.qualifiers[ this.qualifierPropertyId ];
      if ( !$.isArray( qualifiers ) ) {
        throw new Error( 'Qualifiers «' + this.qualifierPropertyId + '» of ' + this.propertyId + '[' + this.propertyValue + '] not found or not an array' );
      }
      if ( qualifiers.length != 1 ) {
        throw new Error( 'Length of qualifiers «' + this.qualifierPropertyId + '» of ' + this.propertyId + '[' + this.propertyValue + '] is not 1 as expected' );
      }

      const qualifier = qualifiers[ 0 ];
      this.wikidataSnak = qualifier;
      this.snakEditor.initWithValue( qualifier );
    } else {
      throw new Error( 'Unsupported code: ' + this.definition.code );
    }

    /*
     * Remember the values to compare them later with future ones to check if
     * update in Wikidata required
     */
    this.wikidataOldRank = this.rank;
    this.wikidataOldValue = this.hasData() ? JSON.stringify( this.toSnakValue() ) : null;
    this.wikidataOldReferences = JSON.stringify( this.references );

    const claimEditor = this;
    if ( typeof claim.qualifiers !== 'undefined' ) {
      $.each( claim.qualifiers, function( property, qualifiers ) {
        if ( claimEditor.isQualifierEditor && property === claimEditor.qualifierPropertyId ) {
          return;
        }
        $.each( qualifiers, function( index, qualifier ) {
          const qualifierEditor = claimEditor.addQualifier( qualifier.property );
          qualifierEditor.initWithValue( qualifier );
        } );
      } );
    }
  }

  initWithDataValue( datatype, datavalue ) {
    this.rank = WEF_RANK_NORMAL;
    this.references = [];
    this.sourcesButton.button( 'option', 'label', '[0]' );

    this.wikidataClaim = null;
    this.wikidataOldValue = null;
    this.wikidataOldReferences = null;

    this.snakEditor.initWithValue( {
      snaktype: 'value',
      property: this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId,
      datatype: datatype,
      datavalue: datavalue
    } );
  }

  initWithStringValue( datatype, strValue ) {
    this.initWithDataValue( datatype, {
      value: strValue,
      type: 'string'
    } );
  }

  remove() {
    this.tbody.remove();
  }

  setDataValue( datatype, datavalue ) {
    this.snakEditor.setSnakValue( {
      snaktype: 'value',
      property: this.isPropertyEditor ? this.propertyId : this.qualifierPropertyId,
      datatype: datatype,
      datavalue: datavalue,
    } );
  }

  setRank( newRank ) {
    this.rank = newRank;
    switch ( newRank ) {
    case WEF_RANK_PREFERRED:
      this.rankButton.button( 'option', 'label', i18n.rankPreferredValue );
      this.rankButton.button( 'option', 'icons', {
        primary: 'ui-icon-arrowthickstop-1-n'
      } );
      break;
    case WEF_RANK_NORMAL:
      this.rankButton.button( 'option', 'label', i18n.rankNormalValue );
      this.rankButton.button( 'option', 'icons', {
        primary: 'ui-icon-arrowthick-2-n-s'
      } );
      break;
    case WEF_RANK_DEPRECATED:
      this.rankButton.button( 'option', 'label', i18n.rankDeprecatedValue );
      this.rankButton.button( 'option', 'icons', {
        primary: 'ui-icon-arrowthickstop-1-s'
      } );
      break;
    }
  }

  setStringValue( strValue ) {
    this.setDataValue( this.editorDataType, {
      value: strValue,
      type: 'string'
    } );
  }

  setWikibaseItemValue( entityId ) {
    this.setDataValue( 'wikibase-item', ModelUtils.newWikibaseItemDataValue( entityId ) );
  }

  showLabel() {
    this._labelToDisplay.show();
    this._labelPlaceholder.hide();
  }

  toDataValue() {
    return this.snakEditor.toDataValue();
  }

  toSnakValue() {
    if ( !this.hasData() ) {
      throw new Error( 'no data' );
    }

    const snak = {};
    snak.snaktype = this.snakEditor.snakTypeMode;

    if ( this.isPropertyEditor ) {
      snak.property = this.propertyId;
    }
    if ( this.isQualifierEditor ) {
      snak.property = this.qualifierPropertyId;
      if ( this.wikidataSnak !== null ) {
        snak.hash = this.wikidataSnak.hash;
      }
    }

    snak.datatype = this.definition.datatype;
    if ( this.snakEditor.snakTypeMode === 'value' ) {
      snak.datavalue = this.toDataValue();
    }

    return snak;
  }

}
