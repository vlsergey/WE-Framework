/**
 * Wikidata labels and description cache using local user storage (i.e.
 * client-side). Part of WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var WEF_LabelsCache = function() {

	/**
	 * @const
	 * @private
	 */
	var URL_PREFIX = '//www.wikidata.org/w/api.php?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
	/**
	 * @const
	 * @private
	 */
	var MAX_ITEMS_PER_REQUEST = 50;
	/**
	 * @const
	 * @private
	 */
	var LOCALSTORAGE_PREFIX_LABELS = 'wef-d-label-';
	var LOCALSTORAGE_PREFIX_DESCRIPTIONS = 'wef-d-description-';

	/** @private */
	var cacheLabels = {};
	/** @private */
	var cacheDescriptions = {};
	/** @private */
	var queue = [];

	/** Functions to be called after new items received from Wikidata */
	var listeners = [];

	this.clearCacheAndRequeue = function() {
		$.each( cacheLabels, function( key, item ) {
			delete localStorage[LOCALSTORAGE_PREFIX_LABELS + key];
			delete cacheLabels[key];
			if ( queue.indexOf( key ) === -1 ) {
				queue.push( key );
			}
		} );
		$.each( cacheDescriptions, function( key, item ) {
			delete localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + key];
			delete cacheDescriptions[key];
			if ( queue.indexOf( key ) === -1 ) {
				queue.push( key );
			}
		} );
	};

	/**
	 * @param key
	 *            {string} key to check
	 */
	var assertKeyCorrect = function( key ) {
		if ( !/^[PQ]\d+$/.test( key ) ) {
			throw new Error( "Incorrect key: " + key );
		}
	};

	/** Return cached value */
	this.getLabel = function( key ) {
		assertKeyCorrect( key );

		var cached = cacheLabels[key];
		if ( typeof ( cached ) !== 'undefined' ) {
			return cached;
		}

		var localCached = localStorage[LOCALSTORAGE_PREFIX_LABELS + key];
		if ( isValid( localCached ) ) {
			cacheLabels[key] = localCached;
			return localCached;
		}

		return key;
	};

	/** Return cached value */
	this.getDescription = function( key ) {
		assertKeyCorrect( key );

		var cached = cacheDescriptions[key];
		if ( typeof ( cached ) !== 'undefined' ) {
			return cached;
		}

		var localCached = localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + key];
		if ( isValid( localCached ) ) {
			cacheDescriptions[key] = localCached;
			return localCached;
		}

		return key;
	};

	/** @private */
	var isValid = function( value ) {
		return typeof ( value ) !== "undefined" && value !== null && value.length !== 0;
	};

	/** Return cached value or queue values to be received from Wikidata */
	this.getOrQueue = function( key, listener ) {
		assertKeyCorrect( key );

		var getLabel = this.getLabel;
		var getDescription = this.getDescription;

		var cachedLabel = getLabel( key );
		var cachedDescription = getDescription( key );
		// call listener even if got from cache
		listener( cachedLabel, cachedDescription );

		if ( !isValid( cachedLabel ) || cachedLabel === key || !isValid( cachedDescription ) || cachedDescription === key ) {
			listeners.push( function() {
				var label = getLabel( key );
				var description = getDescription( key );
				listener( label, description );
			} );
			queue.push( key );
			return key;
		}
		return cachedLabel;
	};

	/**
	 * Notify listeners
	 * 
	 * @private
	 */
	var onUpdate = function() {
		$.each( listeners, function( index, listener ) {
			try {
				listener();
			} catch ( err ) {
				mw.warn( 'Exception during labels-update listener call' );
			}
		} );
	};

	/** Receive values from Wikidata, if any queued */
	this.receiveLabels = function() {

		var languages = [ wgUserLanguage, wgContentLanguage, 'en', 'ru' ];
		var languagesString = encodeURIComponent( wgUserLanguage + '|' + wgContentLanguage + '|en|ru' );

		// remove already known
		queue = jQuery.grep( queue, function( value ) {
			return !isValid( cacheLabels[value] ) || !isValid( cacheDescriptions[value] );
		} );

		var gotFromCache = [];
		var idsToQuery = [];

		$.each( queue, function( index, key ) {
			var cachedLabel = localStorage[LOCALSTORAGE_PREFIX_LABELS + key];
			var cachedDescription = localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + key];

			if ( isValid( cachedLabel ) ) {
				cacheLabels[key] = cachedLabel;
				gotFromCache.push( key );
			}
			if ( isValid( cachedDescription ) ) {
				cacheDescriptions[key] = cachedDescription;
				gotFromCache.push( key );
			}

			if ( !isValid( cachedLabel ) || isValid( cachedDescription ) ) {
				idsToQuery.push( key );
			}
		} );

		var ajaxResultFunction = function( result ) {

			if ( typeof result.error !== 'undefined' ) {
				mw.log.warn( result.error );
			}

			$.each( result.entities, function( entityIndex, entity ) {
				var entityId = entity.id;

				if ( typeof entity.labels !== "undefined" ) {
					for ( var l = 0; l < languages.length; l++ ) {
						var label = entity.labels[languages[l]];
						if ( typeof label !== "undefined" ) {
							var title = label.value;
							cacheLabels[entityId] = title;
							localStorage[LOCALSTORAGE_PREFIX_LABELS + entityId] = title;
							break;
						}
					}
				}

				if ( typeof entity.descriptions !== "undefined" ) {
					for ( var l = 0; l < languages.length; l++ ) {
						var description = entity.descriptions[languages[l]];
						if ( typeof description !== "undefined" ) {
							var title = description.value;
							cacheDescriptions[entityId] = title;
							localStorage[LOCALSTORAGE_PREFIX_DESCRIPTIONS + entityId] = title;
							break;
						}
					}
				}
			} );
			onUpdate();
		};

		var total = idsToQuery.length;
		for ( var i = 0; i < total; i += MAX_ITEMS_PER_REQUEST ) {
			var idsString = '';
			for ( var k = i; k < i + MAX_ITEMS_PER_REQUEST && k < total; k++ ) {
				if ( k != i ) {
					idsString = idsString + '|';
				}
				idsString = idsString + idsToQuery[k];
			}
			$.ajax( {
				url: URL_PREFIX //
						+ '&action=wbgetentities' //
						+ '&props=' + encodeURIComponent( 'labels|descriptions' ) // 
						+ '&languages=' + languagesString // 
						+ '&ids=' + encodeURIComponent( idsString ),
				dataType: 'json',
				success: ajaxResultFunction,
			} );
		}
		queue = jQuery.grep( queue, function( value ) {
			return idsToQuery.indexOf( value ) === -1;
		} );
		if ( gotFromCache.length > 0 ) {
			onUpdate();
		}
	};

};
var wef_LabelsCache = new WEF_LabelsCache();