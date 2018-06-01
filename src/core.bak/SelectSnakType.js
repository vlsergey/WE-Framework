import i18n from './core.i18n';
import styles from './core.css';

/** @class */
class WEF_SelectSnakType {

  constructor() {
    this.select = $( document.createElement( 'select' ) )
      .addClass( styles[ 'wef-snaktypeselector-menu' ] )
      .attr( 'size', 3 );
    this.select.hide();
    $( document.body ).append( this.select );

    const _this = this;
    function changeF() {
      const value = _this.val();
      if ( value !== null ) {
        _this.hide();
        _this.listener( value );
      }
    }

    $( document.createElement( 'option' ) )
      .attr( 'value', 'value' )
      .text( i18n.snakTypeValue )
      .attr( 'title', i18n.snakTypeValueTitle )
      .appendTo( this.select );
    $( document.createElement( 'option' ) )
      .attr( 'value', 'novalue' )
      .text( i18n.snakTypeNoValue )
      .attr( 'title', i18n.snakTypeNoValueTitle )
      .appendTo( this.select );
    $( document.createElement( 'option' ) )
      .attr( 'value', 'somevalue' )
      .text( i18n.snakTypeSomeValue )
      .attr( 'title', i18n.snakTypeSomeValueTitle )
      .appendTo( this.select );

    this.select.click( changeF );
    this.select.change( changeF );

    this.listener = () => {};
    this.visible = false;
  }

  val( value ) {
    if ( typeof value === 'undefined' ) {
      return this.select.val();
    }

    this.select.val( value );
  }

  text() {
    const option = this.select.find( ':selected' );
    if ( option.length !== 0 ) {
      return option.text();
    }
    return null;
  }

  hide() {
    this.visible = false;
    this.select.hide();
  }

  show( anchor, value, listener ) {
    this.val( value );
    anchor.after( this.select );
    this.select.show().position( {
      my: 'left top',
      at: 'right top',
      of: anchor,
    } );
    this.listener = listener;
    this.visible = true;
  }
}

const instance = new WEF_SelectSnakType();
export default instance;
