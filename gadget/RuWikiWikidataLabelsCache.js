/**
 * Wikidata labels cache using local user storage (i.e. client-side)
 */
ruWikiWikidataLabelsCache = {

	URL_PREFIX: '//www.wikidata.org/w/api.php?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json',
	MAX_ITEMS_PER_REQUEST: 50,

	cache: {},
	queue: [],

	/** Functions to be called after new items received from Wikidata */
	listeners: [],

	clearCacheAndRequeue: function() {
		var cache = this.cache;
		var queue = this.queue;
		$.each( cache, function( key, item ) {
			delete localStorage['vlsergey-d-label-' + key];
			delete cache[key];
			queue.push( key );
		} );
	},

	/** Return cached value */
	get: function( key ) {
		if ( !/^[PQ]\d+$/.test( key ) ) {
			throw new Error( "Incorrect key: " + key );
		}

		var cached = this.cache[key];
		if ( typeof ( cached ) !== 'undefined' ) {
			return cached;
		}

		var localCached = localStorage['vlsergey-d-label-' + key];
		if ( this.isValid( localCached ) ) {
			this.cache[key] = localCached;
			return localCached;
		}

		return key;
	},

	/** Return cached value or queue values to be received from Wikidata */
	getOrQueue: function( key, listener ) {
		if ( !/^[PQ]\d+$/.test( key ) ) {
			throw new Error( "Incorrect key: " + key );
		}

		var _this = this;
		var queue = this.queue;

		var cached = _this.get( key );
		if ( !this.isValid( cached ) || cached === key ) {
			this.listeners.push( function() {
				var fromNewCache = _this.get( key );
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
	},

	isValid: function( value ) {
		return typeof ( value ) !== "undefined" && value !== null && value.length !== 0;
	},

	/** Receive values from Wikidata, if any queued */
	receiveLabels: function() {

		var _this = this;
		var cache = this.cache;

		var languages = [ wgUserLanguage, wgContentLanguage, 'en' ];
		var languagesString = encodeURIComponent( wgUserLanguage + '|' + wgContentLanguage + '|en' );

		// remove already known
		this.queue = jQuery.grep( this.queue, function( value ) {
			return !_this.isValid( cache[value] );
		} );

		var gotFromCache = [];
		var idsToQuery = [];

		$.each( this.queue, function( index, key ) {
			var cached = localStorage['vlsergey-d-label-' + key];
			if ( _this.isValid( cached ) ) {
				_this.cache[key] = cached;
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
			_this.onUpdate();
		};

		var total = idsToQuery.length;
		for ( var i = 0; i < total; i += this.MAX_ITEMS_PER_REQUEST ) {
			var idsString = '';
			for ( var k = i; k < i + this.MAX_ITEMS_PER_REQUEST && k < total; k++ ) {
				if ( k != i ) {
					idsString = idsString + '|';
				}
				idsString = idsString + idsToQuery[k];
			}
			$.ajax( {
				url: _this.URL_PREFIX + '&action=wbgetentities&props=labels&languages=' + languagesString + '&ids=' + encodeURIComponent( idsString ),
				dataType: 'json',
				success: ajaxResultFunction,
			} );
		}
		this.queue = jQuery.grep( this.queue, function( value ) {
			return idsToQuery.indexOf( value ) === -1;
		} );
		if ( gotFromCache.length > 0 ) {
			_this.onUpdate();
		}
	},

	/** Notify listeners */
	onUpdate: function() {
		$.each( this.listeners, function( index, listener ) {
			try {
				listener();
			} catch ( err ) {
				mw.warn( 'Exception during labels-update listener call' )
			}
		} );
	}
};
