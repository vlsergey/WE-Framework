import * as ApiUtils from './ApiUtils';
import * as WEF_Utils from './utils';
import styles from './core.css';

const LABELS_CACHE_DB_NAME = 'WEFLabelsCache';
const LABELS_CACHE_STORE_NAME = 'NameAndDescription';
const LABELS_CACHE_FIELD_ID = 'id';
const LABELS_CACHE_FIELD_LABEL = 'label';
const LABELS_CACHE_FIELD_DESCRIPTION = 'description';

/**
 * Wikidata labels and description cache using local user storage (i.e.
 * client-side). Part of WE-Framework.
 *
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
const WEF_LabelsCache = function() {

  /** @type {IDBDatabase} */
  let dbCacheDb = null;
  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if ( window.indexedDB ) {
    try {
      console.log( '[WEF_LabelsCache] ' + LABELS_CACHE_DB_NAME + ' DB is opening...' );
      const dbCacheDbOpenRequest = indexedDB.open( LABELS_CACHE_DB_NAME, 1 );
      dbCacheDbOpenRequest.onerror = function( event ) {
        console.log( '[WEF_LabelsCache] ' + 'Unable to open cache DB: ' + event );
      };
      dbCacheDbOpenRequest.onsuccess = function( ) {
        console.log( '[WEF_LabelsCache] ' + LABELS_CACHE_DB_NAME + ' DB is open' );
        dbCacheDb = dbCacheDbOpenRequest.result;
      };
      dbCacheDbOpenRequest.onupgradeneeded = function( ounEvent ) {
        console.log( LABELS_CACHE_DB_NAME + ' DB is upgrading...' );
        const db = ounEvent.target.result;
        db.onerror = function( oeEvent ) {

          console.log( '[WEF_LabelsCache] ' + 'Unable to open cache DB: ' + oeEvent );
        };
        // Create an objectStore for this database
        db.createObjectStore( LABELS_CACHE_STORE_NAME, {
          keyPath: LABELS_CACHE_FIELD_ID
        } );
        console.log( '[WEF_LabelsCache] ' + LABELS_CACHE_DB_NAME + ' DB is upgraded' );
      };
    } catch ( e ) {
      console.log( '[WEF_LabelsCache] ' + 'Unable to initialize cache DB: ' + e );
    }
  }

  /**
	 * @const
	 * @private
	 */
  const MAX_ITEMS_PER_REQUEST = 50;

  /**
	 * @const
	 * @private
	 * @deprecated
	 */
  const LOCALSTORAGE_PREFIX_LABELS = 'wef-d-label-';
  /**
	 * @const
	 * @private
	 * @deprecated
	 */
  const LOCALSTORAGE_PREFIX_DESCRIPTIONS = 'wef-d-description-';

  /** @private */
  const pageCache = this._pageCache = {};

  /** @private */
  let queue = [];

  this.clear = function() {
    for ( const prop in pageCache )
      if ( pageCache.hasOwnProperty( prop ) )
        delete pageCache[ prop ];

    // clear local storage -- not used anymore
    $.each( localStorage, function( key ) {
      if ( key.substr( 0, LOCALSTORAGE_PREFIX_LABELS.length ) === LOCALSTORAGE_PREFIX_LABELS ) {
        localStorage.removeItem( key );
      }
      if ( key.substr( 0, LOCALSTORAGE_PREFIX_DESCRIPTIONS.length ) === LOCALSTORAGE_PREFIX_DESCRIPTIONS ) {
        localStorage.removeItem( key );
      }
    } );

    if ( dbCacheDb )
      dbCacheDb.transaction( [ LABELS_CACHE_STORE_NAME ], 'readwrite' ) //
      /**/.objectStore( LABELS_CACHE_STORE_NAME ) //
      /**/.clear();

    onUpdate();
  };

  this.clearCacheAndRequeue = function() {
    if ( dbCacheDb )
      dbCacheDb.transaction( [ LABELS_CACHE_STORE_NAME ], 'readwrite' ) //
      /**/.objectStore( LABELS_CACHE_STORE_NAME ) //
      /**/.clear();

    $.each( pageCache, function( key ) {
      // clear local storage -- not used anymore
      localStorage.removeItem( LOCALSTORAGE_PREFIX_LABELS + key );
      localStorage.removeItem( LOCALSTORAGE_PREFIX_DESCRIPTIONS + key );

      delete pageCache[ key ];
      queue.push( key );
      if ( !checkScheduled ) {
        checkScheduled = true;
        setTimeout( scheduleQueueCheck, 0 );
      }
    } );
  };

  /**
	 * Return cached value
	 *
	 * @param key
	 *            {string}
	 * @param returnKeyIfEmpty
	 *            {boolean}
	 * @returns {string}
	 */
  this.getLabel = function( key, returnKeyIfEmpty ) {
    WEF_Utils.assertCorrectEntityId( key );

    const cached = pageCache[ key ];
    if ( typeof cached !== 'undefined' ) {
      return cached[ LABELS_CACHE_FIELD_LABEL ];
    }

    if ( returnKeyIfEmpty !== false )
      return key;
  };

  /**
	 * Pass cached values to listener or queue values to be received from
	 * Wikidata
	 *
	 * @param key
	 *            {string}
	 * @param listener
	 *            {function(string,string)} callback to be called (may be
	 *            several times) after cache or Wikidata retrieve
	 */
  this.getOrQueue = function( key, listener ) {
    WEF_Utils.assertCorrectEntityId( key );
    if ( typeof listener !== 'function' ) {
      throw new Error( 'Listener not specified or not a function' );
    }

    // label can be updated later, or user can change language
    $( this ).bind( 'change', function() {
      const cached = pageCache[ key ];
      if ( typeof cached !== 'undefined' ) {
        listener( cached.label, cached.description );
      }
    } );

    const cached = pageCache[ key ];
    if ( typeof cached !== 'undefined' ) {
      // call listener even if got from cache
      listener( cached.label, cached.description );
    } else {
      this.queue( key );
    }
  };

  const jThis = $( this );

  /**
	 * Notify listeners
	 *
	 * @private
	 */
  const onUpdate = function() {
    // remove already known from queue
    queue = queue.filter( key => typeof pageCache[ key ] === 'undefined' );
    jThis.change();
  };

  let checkScheduled = false;

  /**
	 * Add key to the queue if his label is missing from cache
	 *
	 * @param key
	 *            {string}
	 */
  this.queue = function( key ) {
    if ( typeof pageCache[ key ] === 'undefined' ) {
      queue.push( key );

      if ( !checkScheduled ) {
        checkScheduled = true;
        setTimeout( scheduleQueueCheck, 0 );
      }
    }
  };

  function scheduleQueueCheck() {
    checkScheduled = false;
    if ( queue.length > 0 ) {
      const pCopy = queue.filter( key => key[ 0 ] === 'P' );
      const qCopy = queue.filter( key => key[ 0 ] === 'Q' );
      receiveLabels( pCopy, true );
      receiveLabels( qCopy, false );
      queue = [];
    }
  }

  /** Receive values from Wikidata, if any queued */
  function receiveLabels( queueCopy, useCacheDb ) {

    if ( queueCopy.length === 0 )
      return;

    // remove already known
    queueCopy = queueCopy.filter( key => typeof pageCache[ key ] === 'undefined' );
    if ( queueCopy.length === 0 ) {
      onUpdate();
      return;
    }

    let getAllDeferredPromise;
    {
      const getAllDeferred = $.Deferred();
      getAllDeferredPromise = getAllDeferred.promise();

      console.log( '[WEF_LabelsCache] ' + 'Looking up cache DB...' );
      if ( useCacheDb && dbCacheDb ) {
        const queueSet = {};
        for ( let i = 0; i < queueCopy.length; i++ ) {
          // looking up only properties
          if ( queueCopy[ i ][ 0 ] !== 'P' )
            continue;
          queueSet[ queueCopy[ i ] ] = true;
        }

        const transaction = dbCacheDb.transaction( [ LABELS_CACHE_STORE_NAME ], 'readonly' );
        const objectStore = transaction.objectStore( LABELS_CACHE_STORE_NAME );
        const getAllRequest = objectStore.openCursor();
        getAllRequest.onsuccess = function( event ) {
          const cursor = event.target.result;
          if ( cursor ) {
            const key = cursor.key;
            if ( queueSet[ key ] ) {
              pageCache[ key ] = cursor.value;
              queueSet[ key ] = false;
            }
            // instead of continue() to simplify IDE work
            cursor.advance( 1 );
          } else {
            // on done
            console.log( '[WEF_LabelsCache] ' + 'Looking up cache DB... Done' );
            onUpdate();
            getAllDeferred.resolve();
          }
        };
        getAllRequest.onerror = function( event ) {
          console.log( '[WEF_LabelsCache] ' + 'Unable to open cursor: ' + event );
          getAllDeferred.reject( event );
        };
      } else {
        getAllDeferred.reject( 'db not opened yet or disabled' );
        console.log( '[WEF_LabelsCache] ' + 'Cache DB is not opened yet or disabled' );
      }
    }

    getAllDeferredPromise.always( function() {
      queueCopy = queueCopy.filter( key => typeof pageCache[ key ] === 'undefined' );
      if ( queueCopy.length === 0 ) {
        onUpdate();
        return;
      }

      // TODO: add user languages setting
      const languages = [ mw.config.get( 'wgUserLanguage' ), mw.config.get( 'wgContentLanguage' ), 'en', 'ru', 'de' ];
      const languagesString = mw.config.get( 'wgUserLanguage' ) + '|' + mw.config.get( 'wgContentLanguage' ) + '|en|ru|de';

      function onError( jqXHR, textStatus ) {
        mw.log.warn( 'Unable to load labels and descriptions from Wikidata: ' + textStatus );
      }
      function onSuccess( result ) {
        if ( typeof result.error !== 'undefined' ) {
          mw.log.warn( result.error );
          return;
        }

        $.each( result.entities, function( entityIndex, entity ) {
          const entityId = entity.id;
          let label = '';
          let description = '';

          if ( typeof entity.labels !== 'undefined' ) {
            for ( let l = 0; l < languages.length; l++ ) {
              const langLabel = entity.labels[ languages[ l ] ];
              if ( typeof langLabel !== 'undefined' && !WEF_Utils.isEmpty( langLabel.value ) ) {
                label = langLabel.value;
                break;
              }
            }
          }
          if ( typeof entity.descriptions !== 'undefined' ) {
            for ( let l = 0; l < languages.length; l++ ) {
              const langDescription = entity.descriptions[ languages[ l ] ];
              if ( typeof langDescription !== 'undefined' && !WEF_Utils.isEmpty( langDescription.value ) ) {
                description = langDescription.value;
                break;
              }
            }
          }

          const dataToPut = {};
          dataToPut[ LABELS_CACHE_FIELD_ID ] = entityId;
          dataToPut[ LABELS_CACHE_FIELD_LABEL ] = label;
          dataToPut[ LABELS_CACHE_FIELD_DESCRIPTION ] = description;

          {
            // schedule update db cache
            const objectStore = dbCacheDb.transaction( [ LABELS_CACHE_STORE_NAME ], 'readwrite' ).objectStore( LABELS_CACHE_STORE_NAME );
            objectStore.put( dataToPut );
          }

          // update page cache
          pageCache[ entityId ] = dataToPut;
        } );

        onUpdate();
      }

      const total = queueCopy.length;
      for ( let i = 0; i < total; i += MAX_ITEMS_PER_REQUEST ) {
        let idsString = '';
        for ( let k = i; k < i + MAX_ITEMS_PER_REQUEST && k < total; k++ ) {
          if ( k != i ) {
            idsString = idsString + '|';
          }
          idsString = idsString + queueCopy[ k ];
        }
        ApiUtils.getWikidataApi().get( {
          action: 'wbgetentities',
          props: 'labels|descriptions|aliases',
          languages: languagesString,
          ids: idsString,
        } ).then( onSuccess ).catch( onError );
      }
    } );
  }

  // wef_i18n_label / wef_i18n_description support
  $( this ).bind( 'change', function() {
    $( '.' + styles.wef_i18n_label ).each( function( index, item ) {
      const jqItem = $( item );
      const entityId = jqItem.data( 'wef_i18n_entityId' );
      if ( !WEF_Utils.isEmpty( entityId ) ) {
        const cached = pageCache[ entityId ];
        if ( typeof cached !== 'undefined' && typeof cached[ LABELS_CACHE_FIELD_LABEL ] !== 'undefined' ) {
          jqItem.text( cached[ LABELS_CACHE_FIELD_LABEL ] );
        }
      }
    } );
    $( '.' + styles.wef_i18n_description ).each( function( index, item ) {
      const jqItem = $( item );
      const entityId = jqItem.data( 'wef_i18n_entityId' );
      if ( !WEF_Utils.isEmpty( entityId ) ) {
        const cached = pageCache[ entityId ];
        if ( typeof cached !== 'undefined' && typeof cached[ LABELS_CACHE_FIELD_DESCRIPTION ] !== 'undefined' ) {
          jqItem.text( cached[ LABELS_CACHE_FIELD_DESCRIPTION ] );
        }
      }
    } );
    $( '.' + styles.wef_i18n_description_as_title ).each( function( index, item ) {
      const jqItem = $( item );
      const entityId = jqItem.data( 'wef_i18n_entityId' );
      if ( !WEF_Utils.isEmpty( entityId ) ) {
        const cached = pageCache[ entityId ];
        if ( typeof cached !== 'undefined' && typeof cached[ LABELS_CACHE_FIELD_DESCRIPTION ] !== 'undefined' ) {
          jqItem.attr( 'title', cached[ LABELS_CACHE_FIELD_DESCRIPTION ] );
        }
      }
    } );
  } );
};

WEF_LabelsCache.prototype.localizeLabel = function( jqElement, entityId ) {
  WEF_Utils.assertCorrectEntityId( entityId );

  jqElement.addClass( styles.wef_i18n_label );
  jqElement.data( 'wef_i18n_entityId', entityId );
  this.queue( entityId );

  const cached = this._pageCache[ entityId ];
  if ( typeof cached !== 'undefined' && !WEF_Utils.isEmpty( cached[ LABELS_CACHE_FIELD_LABEL ] ) ) {
    jqElement.text( cached[ LABELS_CACHE_FIELD_LABEL ] );
  }
};

WEF_LabelsCache.prototype.localizeDescription = function( jqElement, entityId ) {
  WEF_Utils.assertCorrectEntityId( entityId );

  jqElement.addClass( styles.wef_i18n_description );
  jqElement.data( 'wef_i18n_entityId', entityId );
  this.queue( entityId );

  const cached = this._pageCache[ entityId ];
  if ( typeof cached !== 'undefined' && !WEF_Utils.isEmpty( cached[ LABELS_CACHE_FIELD_DESCRIPTION ] ) ) {
    jqElement.text( cached[ LABELS_CACHE_FIELD_DESCRIPTION ] );
  }
};

WEF_LabelsCache.prototype.localizeDescriptionAsTitle = function( jqElement, entityId ) {
  WEF_Utils.assertCorrectEntityId( entityId );

  jqElement.addClass( styles.wef_i18n_description_as_title );
  jqElement.data( 'wef_i18n_entityId', entityId );
  this.queue( entityId );

  const cached = this._pageCache[ entityId ];
  if ( typeof cached !== 'undefined' && typeof cached[ LABELS_CACHE_FIELD_DESCRIPTION ] !== 'undefined' ) {
    jqElement.attr( 'title', cached[ LABELS_CACHE_FIELD_DESCRIPTION ] );
  }
};

const wef_LabelsCache = new WEF_LabelsCache();
export default wef_LabelsCache;
