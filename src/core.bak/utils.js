import * as ApiUtils from './ApiUtils';
import i18n from './core.i18n';
import WEF_Updates from './Updates';

const SUMMARY_PREFIX = 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ';
const TAG = 'WE-Framework gadget';


export function appendToNamedMap( element, mapName, key, obj ) {
  if ( typeof element === 'undefined' ) {
    throw new Error( 'Illegal argument: element is undefined' );
  }
  if ( typeof element[ mapName ] === 'undefined' ) {
    element[ mapName ] = {};
  }
  if ( typeof element[ mapName ][ key ] === 'undefined' ) {
    element[ mapName ][ key ] = [];
  }
  element[ mapName ][ key ].push( obj );
}

export function assertCorrectEntityId( entityId ) {
  if ( !isCorrectEntityId( entityId ) ) {
    throw new Error( 'Incorrect entity ID: ' + entityId );
  }
}

export function createWikidataItem( itemData ) {
  const updates = new WEF_Updates( null );
  updates.data = itemData;
  return update( updates );
}

export function formatQuantity( value ) {
  if ( Number( value ) > 0 ) {
    return '+' + Number( value );
  } else {
    return '' + Number( value );
  }
}

export function formatValueRemotely( datatype, datavalue, span ) {
  if ( !( span instanceof jQuery ) )
    throw new Error( 'Passed «span» argument is not a jQuery object' );

  return ApiUtils.getWikidataApi().post( {
    action: 'wbformatvalue',
    generate: 'text/html',
    datatype: datatype,
    datavalue: JSON.stringify( datavalue ),
    uselang: getDefaultLanguageCode(),
  } ).then( ( response ) => {
    if ( response.error ) {
      console.log( 'Unable to call \'wbformatvalue\': ' + response.error.info );
      return;
    }
    const result = response.result;
    if ( typeof result === 'undefined' ) {
      console.log( 'Unable to call \'wbformatvalue\': no result' );
      return;
    }

    // we assume Wikidata is trusted source :-)
    span.html( result );
  } ).fail( ( jqXHR, textStatus, errorThrown ) => {
    // too bad :-(
    console.log( 'Unable to call \'wbformatvalue\'' );
    console.log( textStatus );
    console.log( errorThrown );
  } );
}

export function isCorrectEntityId( entityId ) {
  //$FlowFixMe
  return !isEmpty( entityId ) && /^[PQ]\d+$/.test( entityId );
}

export function isEmpty( str ) {
  if ( typeof str === 'undefined' )
    return true;
  if ( typeof str === 'string' || str instanceof String ) {
    return !str || str.trim() === '';
  }
  //$FlowFixMe
  throw new Error( 'Passed argument is not a string: ' + str );
}

let CALCULATED_DEFAULT_LANGUAGE_CODE = null;
export function getDefaultLanguageCode() {
  if ( isEmpty( CALCULATED_DEFAULT_LANGUAGE_CODE ) ) {
    CALCULATED_DEFAULT_LANGUAGE_CODE = mw.config.get( 'wgUserLanguage' );
    if ( isEmpty( CALCULATED_DEFAULT_LANGUAGE_CODE ) ) {
      CALCULATED_DEFAULT_LANGUAGE_CODE = mw.config.get( 'wgContentLanguage' );
      if ( isEmpty( CALCULATED_DEFAULT_LANGUAGE_CODE ) ) {
        CALCULATED_DEFAULT_LANGUAGE_CODE = 'en';
      }
    }
  }

  return CALCULATED_DEFAULT_LANGUAGE_CODE ;
}

export function getFirstObjectKey( obj ) {
  return Object.keys( obj )[ 0 ];
}

export function getFirstObjectValue( obj ) {
  return obj[ getFirstObjectKey( obj ) ];
}

export function regexpEscape( s ) {
  return s.replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' );
}

export function tagRevisions( entityId, displayNotifications ) {
  const notifyOptions = {
    autoHide: true,
    tag: 'WE-F Revisions Tags',
  };

  function notify( text ) {
    if ( displayNotifications )
      mw.notify( '[WE-F] ' + text, notifyOptions );
    else
      console.log( '[WEF_Utils.tagRevisions] ' + text );
  }

  const requestDeferred = $.Deferred();
  {
    if ( displayNotifications )
      notify( 'Query last 50 Wikidata entity revisions of ' + entityId );

    ApiUtils.getWikidataApi().get( {
      action: 'query',
      prop: 'revisions',
      titles: entityId,
      rvprop: 'comment|ids|tags',
      rvlimit: 50,
    } ).then( ( result ) => {
      if ( result.error ) {
        requestDeferred.reject( result.error.info );
        return;
      }
      requestDeferred.resolve( result );
    } ).fail( ( jqXHR, textStatus ) => requestDeferred.reject( textStatus ) );
  }
  const requestPromise = requestDeferred.promise();

  const revisionsDeferred = $.Deferred();
  requestPromise.then( ( result ) => {
    if ( result.error ) {
      notify( 'Unable to retrieve ' + entityId + ' revisions: ' + result.error.info );
      revisionsDeferred.reject( result.error.info );
      return;
    }

    notify( 'Received last Wikidata entity revisions of ' + entityId );
    const revisions = [];

    if ( result.query && result.query.pages ) {
      const page = result.query.pages[ Object.keys( result.query.pages )[ 0 ] ];
      if ( page && page.revisions ) {
        notify( 'Received last ' + page.revisions.length + ' Wikidata entity revisions of ' + entityId );
        $.each( page.revisions, function( index, revision ) {
          if ( revision.comment ) {
            if ( revision.comment.indexOf( SUMMARY_PREFIX ) != -1 && revision.tags.indexOf( TAG ) == -1 ) {
              notify( 'Found revision to apply tag to: ' + revision.revid + ' of ' + entityId );
              revisions.push( revision.revid );
            }
          }
        } );
      }
    }

    revisionsDeferred.resolve( revisions );
  } );
  const revisionsPromise = revisionsDeferred.promise();

  const tagDeferred = $.Deferred();
  revisionsPromise.then( function( revisions ) {
    if ( revisions.length == 0 ) {
      notify( 'Nothing to update in revisions history of ' + entityId );
      tagDeferred.resolve();
      return;
    }

    notify( 'Update tags of ' + revisions.length + ' revisions of ' + entityId );
    ApiUtils.getWikidataApi().postWithEditToken( {
      action: 'tag',
      revid: revisions.join( '|' ),
      add: TAG,
    } ).then( ( result ) => {
      if ( result.error ) {
        console.log( result );
        notify( 'Unable to update tags of ' + revisions.length + ' revisions of ' + entityId + ': ' + result.error.info );
        tagDeferred.reject( result.error.info );
        return;
      }
      notify( 'Successfully updated tags of ' + revisions.length + ' revisions of ' + entityId );
      tagDeferred.resolve( result );
    } ).fail( function( jqXHR, textStatus ) {
      tagDeferred.reject( textStatus );
      console.log( textStatus );
      notify( 'Unable to update tags of ' + revisions.length + ' revisions of ' + entityId + ': ' + textStatus );
    } );
  } );
  const tagPromise = tagDeferred.promise();

  return tagPromise;
}

const TO_ROMAN_LIMIT = 3999;
const TO_ROMAN_VALUES = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
const TO_ROMAN_LETTERS = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

/**
 * @param s
 *            {string} string to escapse
 * @returns {string} safe-to-use regexp pattern string
 */
export function toRoman( src ) {
  let n = Math.floor( src );
  let val = 0;
  let s = '';
  let i = 0;

  if ( n < 1 || n > TO_ROMAN_LIMIT )
    return '';
  while ( i < 13 ) {
    val = TO_ROMAN_VALUES[ i ];
    while ( n >= val ) {
      n -= val;
      s += TO_ROMAN_LETTERS[ i ];
    }
    if ( n === 0 )
      return s;
    ++i;
  }
  return '';
}

export function update( updates ) {
  if ( !( updates instanceof WEF_Updates ) ) {
    throw new Error( 'WEF_Updates object is expected' );
  }

  const d = $.Deferred();

  /* Saving changes in entity, if required */
  let saveAction;
  if ( !$.isEmptyObject( updates.data ) ) {
    const notifySaveOptions = {
      autoHide: true,
      tag: 'WE-F wbeditentity',
    };

    const params = {
      action: 'wbeditentity',
      summary: i18n.summary,
      tags: TAG,
      data: JSON.stringify( updates.data ),
    };

    if ( isEmpty( updates.entityId ) ) {
      params[ 'new' ] = 'item';
    } else {
      params[ 'id' ] = updates.entityId;
    }

    mw.notify( i18n.actionUpdateEntity, notifySaveOptions );
    saveAction = ApiUtils
      .getWikidataApi()
      .postWithEditToken( params )
      .then( ( result ) => {
        if ( result.error ) {
          console.log( i18n.errorUpdateEntity );
          console.log( result.error );
          mw.notify( i18n.actionUpdateEntityFail, notifySaveOptions );
          alert( i18n.errorUpdateEntity + ': ' + result.error.info );
          return;
        }
        mw.notify( i18n.actionUpdateEntityDone, notifySaveOptions );
        if ( result.entity ) {
          updates.entityId = result.entity.id;
        }
      } ).fail( function( jqXHR, textStatus ) {
        console.log( i18n.errorUpdateEntity );
        console.log( arguments );
        mw.notify( i18n.actionUpdateEntityFail, notifySaveOptions );
        alert( i18n.errorUpdateEntity + ': ' + textStatus );
      } );
  } else {
    saveAction = $.when();
  }

  const removeClaimAction = $.Deferred();

  /* Remove claims in separate request */
  if ( updates.removedClaims.length !== 0 ) {
    saveAction.always( function() {
      const notifyRemoveClainsOptions = {
        autoHide: true,
        tag: 'WE-F wbremoveclaims',
      };

      mw.notify( i18n.actionRemoveClaims, notifyRemoveClainsOptions );
      ApiUtils
        .getWikidataApi()
        .postWithEditToken( {
          action: 'wbremoveclaims',
          summary: i18n.summary,
          tags: TAG,
          claim: updates.removedClaims.join( '|' )
        } )
        .then( ( result ) => {
          if ( result.error ) {
            mw.notify( i18n.actionRemoveClaimsFail, notifyRemoveClainsOptions );
            alert( i18n.errorRemoveClaims + ': ' + result.error.info );
            removeClaimAction.reject( result.error );
            return;
          }
          mw.notify( i18n.actionRemoveClaimsDone, notifyRemoveClainsOptions );
          removeClaimAction.resolve( result );
        } )
        .fail( ( jqXHR, textStatus, errorThrown ) => {
          mw.notify( i18n.actionRemoveClaimsFail, notifyRemoveClainsOptions );
          alert( i18n.errorRemoveClaims + ': ' + textStatus );
          removeClaimAction.reject( jqXHR, textStatus, errorThrown );
        } );
    } );
  } else {
    saveAction.always( function() {
      removeClaimAction.resolve();
    } );
  }

  removeClaimAction.always( function() {
    d.resolve( updates.entityId );
  } );

  return d.promise();
}

export function urlCommons( value ) {
  return urlNice( '//commons.wikimedia.org/wiki/File:' + escape( value ) );
}

export const urlNice = ( function() {
  let abc = 'ёйцукенгшщзхъфывапролджэячсмитьбюáñú,';
  abc = abc + abc.toUpperCase();
  const patterns = [];
  const map = {};
  for ( let i = 0; i < abc.length; i++ ) {
    const c = abc.charAt( i );
    const e = encodeURIComponent( c );
    patterns.push( e );
    map[ e ] = c;
  }

  const pattern = new RegExp( patterns.join( '|' ), 'g' );

  return function( stored ) {
    return stored.replace( pattern, function( match ) {
      return map[ match ];
    } );
  };
} )();

/**
 * @type {function}
 * @returns {string}
 */
export const urlUnnice = ( function() {
  let abc = 'ёйцукенгшщзхъфывапролджэячсмитьбюáñú,';
  abc = abc + abc.toUpperCase();
  const patterns = [];
  const map = {};
  for ( let i = 0; i < abc.length; i++ ) {
    const c = abc.charAt( i );
    const e = encodeURIComponent( c );
    patterns.push( c );
    map[ c ] = e;
  }

  const pattern = new RegExp( patterns.join( '|' ), 'g' );

  return function( displayed ) {
    return displayed.replace( pattern, function( match ) {
      return map[ match ];
    } );
  };
} )();
