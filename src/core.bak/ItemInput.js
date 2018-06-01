import * as ApiUtils from './ApiUtils';
import * as WEF_Utils from './utils';
import styles from './core.css';
import wef_LabelsCache from './labelsCache';

const DATA_ENTITY_ID = 'value-entity-id';
const DATA_ENTITY_LABEL = 'value-entity-label';

/**
 * Creates input field that used to display or input Wikidata items
 */
export default class WEF_ItemInput {

  constructor( ) {
    const input = $( document.createElement( 'input' ) )
      .attr( 'type', 'text' )
      .addClass( styles.wef_item_input );

    this.val = function( entityId ) {
      if ( typeof entityId === 'undefined' ) {
        // return current value
        return input.data( DATA_ENTITY_ID );
      }

      // or set value
      input.data( DATA_ENTITY_ID, entityId );
      input.data( DATA_ENTITY_LABEL, '' );
      input.val( '(' + entityId + ')' );

      wef_LabelsCache.getOrQueue( entityId, function( label, description ) {
        if ( input.data( DATA_ENTITY_ID ) === entityId ) {
          // we need to be sure user didn't start to edit field
          if ( input.val() === '(' + entityId + ')' || input.val() === input.data( DATA_ENTITY_LABEL ) + ' (' + entityId + ')' ) {
            input.data( DATA_ENTITY_LABEL, label );
            input.val( label + ' (' + entityId + ')' );
            input.attr( 'title', description );
          }
        }
      } );

      input.change();
    };

    input.autocomplete( {
      source: function( request, response ) {
        const term = request.term;
        ApiUtils.getWikidataApi().get( {
          action: 'wbsearchentities',
          language: mw.config.get( 'wgUserLanguage' ),
          limit: 15,
          search: term,
        } ).then( ( result ) => {
          const list = [];
          $.each( result.search, function( index, entity ) {
            const item = new WEF_ItemInput_Item( entity.id, entity.label );
            list.push( item );
          } );

          if ( list.length == 0 ) {
            list.push( new WEF_ItemInput_NothingFound( 'nothing found by term «' + term + '»' ) );
          }

          response( list );
        } );
      },
      select: function( event, ui ) {
        /** @type {WEF_ItemInput_Item} */
        const item = ui.item;
        const input = $( event.target );

        const entityId = item.entityId;
        input.data( DATA_ENTITY_ID, entityId );
        input.val( entityId );
        input.removeAttr( 'title' );
        input.change();

        wef_LabelsCache.getOrQueue( entityId, function( newLabel, newDescription ) {
          // still the same
          if ( input.data( DATA_ENTITY_ID ) === entityId ) {
            input.data( DATA_ENTITY_LABEL, newLabel );
            input.val( newLabel );

            if ( !WEF_Utils.isEmpty( newDescription ) ) {
              input.attr( 'title', newDescription );
            } else {
              input.removeAttr( 'title' );
            }
            input.change();
          }
        } );
        return false;
      },
    } );

    input.data( 'autocomplete' )._renderItem =
  ( ul, item ) => {
    if ( item.entityId ) {
      return $( document.createElement( 'li' ) ).append( item.a ).data( 'item.autocomplete', item ).appendTo( ul );
    } else {
      return $( document.createElement( 'li' ) ).addClass( 'ui-state-disabled' ).append( item.a ).appendTo( ul );
    }
  };

    input.focus( function() {
      const id = input.data( DATA_ENTITY_ID );
      const label = input.data( DATA_ENTITY_LABEL );

      if ( typeof id === 'undefined' || typeof label === 'undefined' ) {
        input.val( '' );
        input.removeData( DATA_ENTITY_ID );
        input.removeData( DATA_ENTITY_LABEL );
      } else {
        input.val( label );
      }

      input.change();
    } );

    input.blur( function() {
      const id = input.data( DATA_ENTITY_ID );
      const label = input.data( DATA_ENTITY_LABEL );
      const currentVal = input.val();
      if ( currentVal === label ) {
        input.val( label + ' (' + id + ')' );
      } else {
        input.val( '' );
        input.removeData( DATA_ENTITY_ID );
        input.removeData( DATA_ENTITY_LABEL );
      }

      input.change();
    } );

    this.addClass = function() {
      input.addClass.apply( input, arguments );
      return this;
    };
    this.appendTo = function() {
      input.appendTo.apply( input, arguments );
      return this;
    };
    this.change = input.change.bind( input );
    this.keyup = input.keyup.bind( input );
  }
}

class WEF_ItemInput_Item {
  constructor( entityId ) {
    this.entityId = entityId;

    const labelWrapper = $( '<strong></strong>' );
    wef_LabelsCache.localizeLabel( labelWrapper, entityId );

    const entityIdWrapper = $( '<span style="color: darkgray;">' + entityId + '</span>' );

    const descriptionWrapper = $( '<span></span>' );
    wef_LabelsCache.localizeDescription( descriptionWrapper, entityId );

    const space = $( '<span> </span>' );
    const br = $( '<br>' );

    const a = this.a = $( '<a></a>' );
    a.append( labelWrapper );
    a.append( space );
    a.append( entityIdWrapper );
    a.append( br );
    a.append( descriptionWrapper );
  }
}

class WEF_ItemInput_NothingFound {
  constructor( label ) {
    const labelWrapper = $( '<strong></strong>' );
    labelWrapper.text( label );
    const a = this.a = $( '<a></a>' );
    a.append( labelWrapper );
  }
}
