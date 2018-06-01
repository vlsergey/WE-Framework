import styles from './core.css';
import wef_LabelsCache from './labelsCache';

/**
 * Creates select field that has predefined number of values, but also support
 * extending values based on load external values. Uses {@link WEF_LabelsCache}
 * and JQuery autoselect
 */
export default class ItemSelect {

  constructor() {
    this.select = $( document.createElement( 'select' ) ).addClass( styles.wef_item_select );
  }

  addOption( entityId ) {
    if ( typeof entityId === 'undefined' || entityId === null ) {
      throw new Error( 'incorrect entity ID: ' + entityId );
    }

    const option = $( document.createElement( 'option' ) ).appendTo( this.select );
    option.attr( 'value', entityId );
    option.text( entityId );
    wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
      option.text( label );
      option.attr( 'title', description );
    } );
    return option;
  }

  val( value ) {
    if ( typeof value === 'undefined' ) {
      return this.select.val();
    } else if ( value === null ) {
      this.select.prop( 'selectedIndex', -1 );
    } else {
      this.select.val( value );
      const option = this.select.find( ':selected' );
      if ( option.length !== 0 ) {
        return option;
      }
      const newOption = this.addOption( value );
      this.select.val( value );
      return newOption;
    }
  }
}
