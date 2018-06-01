import i18n from './core.i18n';
import styles from './core.css';

const WEF_RANK_PREFERRED = 'preferred';
const WEF_RANK_NORMAL = 'normal';
const WEF_RANK_DEPRECATED = 'deprecated';

export default class WEF_SelectRank {

  constructor() {
    this.select = $( document.createElement( 'select' ) )
      .addClass( styles[ 'wef-claimrankselector-menu' ] )
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
      .attr( 'value', WEF_RANK_PREFERRED )
      .text( i18n.rankPreferredValue )
      .attr( 'title', i18n.rankPreferredTitle )
      .appendTo( this.select );
    $( document.createElement( 'option' ) )
      .attr( 'value', WEF_RANK_NORMAL )
      .text( i18n.rankNormalValue )
      .attr( 'title', i18n.rankNormalTitle )
      .appendTo( this.select );
    $( document.createElement( 'option' ) )
      .attr( 'value', WEF_RANK_DEPRECATED )
      .text( i18n.rankDeprecatedValue )
      .attr( 'title', i18n.rankDeprecatedTitle )
      .appendTo( this.select );

    this.select.click( changeF );
    this.select.change( changeF );

    this.listener = ( ) => {};
    this.visible = false;
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

  text() {
    const option = this.select.find( ':selected' );
    if ( option.length !== 0 ) {
      return option.text();
    }
    return null;
  }

  val( value ) {
    if ( typeof value === 'undefined' ) {
      return this.select.val();
    }

    this.select.val( value );
  }

}
