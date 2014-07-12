/**
 * Wikidata labels cache using local user storage (i.e. client-side)
 */
var WEF_LabelsCache = function() {

	/** @private */
	var URL_PREFIX = '//www.wikidata.org/w/api.php?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
	/** @private */
	var MAX_ITEMS_PER_REQUEST = 50;

	/** @private */
	var cache = {};
	/** @private */
	var queue = [];

	/** Functions to be called after new items received from Wikidata */
	var listeners = [];

	this.clearCacheAndRequeue = function() {
		$.each( cache, function( key, item ) {
			delete localStorage['vlsergey-d-label-' + key];
			delete cache[key];
			queue.push( key );
		} );
	};

	/** Return cached value */
	this.get = function( key ) {
		if ( !/^[PQ]\d+$/.test( key ) ) {
			throw new Error( "Incorrect key: " + key );
		}

		var cached = cache[key];
		if ( typeof ( cached ) !== 'undefined' ) {
			return cached;
		}

		var localCached = localStorage['vlsergey-d-label-' + key];
		if ( isValid( localCached ) ) {
			cache[key] = localCached;
			return localCached;
		}

		return key;
	};

	/** Return cached value or queue values to be received from Wikidata */
	this.getOrQueue = function( key, listener ) {
		if ( !/^[PQ]\d+$/.test( key ) ) {
			throw new Error( "Incorrect key: " + key );
		}

		var get = this.get;

		var cached = get( key );
		if ( !isValid( cached ) || cached === key ) {
			listeners.push( function() {
				var fromNewCache = get( key );
				if ( typeof ( fromNewCache ) !== 'undefined' ) {
					listener( fromNewCache );
				}
			} );
			queue.push( key );
			return key;
		}
		// call listener even if got from cache
		listener( cached );
		return cached;
	};

	/** @private */
	var isValid = function( value ) {
		return typeof ( value ) !== "undefined" && value !== null && value.length !== 0;
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

		var languages = [ wgUserLanguage, wgContentLanguage, 'en' ];
		var languagesString = encodeURIComponent( wgUserLanguage + '|' + wgContentLanguage + '|en' );

		// remove already known
		queue = jQuery.grep( queue, function( value ) {
			return !isValid( cache[value] );
		} );

		var gotFromCache = [];
		var idsToQuery = [];

		$.each( queue, function( index, key ) {
			var cached = localStorage['vlsergey-d-label-' + key];
			if ( isValid( cached ) ) {
				cache[key] = cached;
				gotFromCache.push( key );
			} else {
				idsToQuery.push( key );
			}
		} );

		var ajaxResultFunction = function( result ) {

			if ( typeof result.error !== 'undefined' ) {
				mw.log.warn( result.error );
			}

			$.each( result.entities, function( entityIndex, entity ) {
				if ( typeof ( entity.labels ) === "undefined" ) {
					return;
				}
				for ( var l = 0; l < languages.length; l++ ) {
					var label = entity.labels[languages[l]];
					if ( typeof ( label ) !== "undefined" ) {
						var title = label.value;
						cache[entity.id] = title;
						localStorage['vlsergey-d-label-' + entity.id] = title;
						break;
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
				url: URL_PREFIX + '&action=wbgetentities&props=labels&languages=' + languagesString + '&ids=' + encodeURIComponent( idsString ),
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