import editorsRegistry from './editorsRegistry';
import labelsCache from './labelsCache';
import styles from './core.css';

export default class WEF_SelectEditor {

  constructor( anchor, optionPrefix, listener ) {
    if ( !$.isFunction( listener ) ) throw new Error( 'listener argument is not a function' );

    this.anchor = anchor;
    this.listener = listener;

    const select = $( document.createElement( 'select' ) )
      .addClass( styles.wef_editor_menu )
      .attr( 'size', editorsRegistry.registryLength );
    select.hide();
    $( document.body ).append( select );

    let called = false;
    const _this = this;
    function changeF() {
      const classEntityId = _this.val();
      if ( classEntityId !== null ) {
        if ( called ) {
          return;
        }
        called = true;
        _this.hide();
        _this.listener( classEntityId, editorsRegistry.registry[ classEntityId ] );
      }
    }

    $.each( editorsRegistry.registry, ( entityId ) => {
      const jOption = $( document.createElement( 'option' ) ).attr( 'value', entityId ).text( optionPrefix + entityId ).appendTo( select );
      labelsCache.getOrQueue( entityId, function( label, description ) {
        jOption.text( optionPrefix + label );
        jOption.attr( 'title', description );
      } );
    } );

    select.click( changeF );
    select.change( changeF );

    this.visible = false;
  }

  hide() {
    this.visible = false;
    this.select.hide();
  }

  show() {
    this.called = false;
    this.anchor.after( this.select );
    this.select.show().position( {
      my: 'left top',
      at: 'left bottom',
      of: this.anchor,
    } );
    this.visible = true;
  }

  text() {
    const option = this.select.find( ':selected' );
    if ( option.length !== 0 ) {
      return option.text();
    }
    return null;
  }

  toggle() {
    if ( this.visible ) {
      this.hide();
    } else {
      this.show();
    }
  }

  val( value ) {
    if ( typeof value === 'undefined' ) {
      return this.select.val();
    }

    this.select.val( value );
  }

}
