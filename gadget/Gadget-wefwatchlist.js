if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Watchlist' ) {
	mw.loader.using( [ 'mediawiki.api.edit', 'mediawiki.ForeignApi', 'ext.gadget.wefcore' ], function() {

		var notifyOptions = {
			autoHide: true,
			tag: 'WEF-Watchlist',
		};

		var i18n = {
			errorEdit: 'Произошла ошибка при сохранении списка наблюдения',

			actionObtain: 'Получение изменений с Викиданных...',
			actionIntegrate: 'Объединение со списком наблюдения',

			linePartLetter: 'д',
			linePartTooltip: 'Викиданные',
			linePartChange: 'разн.',
			linePartHistory: 'история',

			menuButtonSync: 'WEF: синхронизировать',

			// the same as in watchlist
			monthes: [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ],

			summary: 'via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get( 'wgDBname' ),
		};

		var chain = null;

		function asyncGetWatchlistRaw( wrcontinue ) {
			"use strict";

			if ( !WEF_Utils.isEmpty( wrcontinue ) ) {
				mw.notify( "Запрос содержимого локального списка наблюдения: начиная с «" + wrcontinue + "»", notifyOptions );
			} else {
				mw.notify( "Запрос содержимого локального списка наблюдения", notifyOptions );
			}

			new mw.Api().get( {
				action: 'query',
				list: 'watchlistraw',
				wrnamespace: 0,
				wrlimit: 50,
				wrcontinue: wrcontinue,
			} ).done( function( result ) {
				/** @type string[] */
				var titles = [];
				$.each( result.watchlistraw, function( i, item ) {
					titles.push( item.title );
				} );

				mw.log.warn( "List to get from Wikidata: " + titles.join( '|' ) );

				var newWRcontinue = false;
				if ( typeof result[ "continue" ] !== 'undefined' //
						&& typeof result[ "continue" ] !== 'undefined' //
						&& typeof result[ "continue" ].wrcontinue !== 'undefined' ) {
					newWRcontinue = result[ "continue" ].wrcontinue;
				}
				if ( newWRcontinue ) {
					asyncGetWatchlistRaw( newWRcontinue );
				}

				asyncGetEntityIds( titles, newWRcontinue === false );
			} );
		}

		var qIds = [];

		function asyncGetEntityIds( titles, isLast ) {
			"use strict";

			var request = WEF_Utils.getWikidataApi().post( {
				action: 'wbgetentities',
				sites: mw.config.get( 'wgDBname' ),
				redirects: 'no',
				props: 'info',
				titles: titles.join( '|' ),
			} ).done( function( result ) {
				$.each( result.entities, function( key /* , item */ ) {
					if ( /^Q[0-9]+$/.test( key ) ) {
						qIds.push( key );
					}
				} );
			} );

			if ( chain === null ) {
				chain = request;
			} else {
				chain = request.then( request );
			}

			if ( isLast ) {
				write();
			}
		}

		function write() {
			"use strict";

			chain.done( function() {
				qIds.sort();
				mw.notify( "Сохранение списка наблюдения на Викиданных (элементов: " + qIds.length + ")", notifyOptions );

				WEF_Utils.getWikidataApi().postWithEditToken( {
					action: 'edit',
					title: 'User:' + mw.config.get( 'wgUserName' ) + '/Watchlist/' + mw.config.get( 'wgDBname' ),
					text: '[[' + qIds.join( ']]\n[[' ) + ']]',
					summary: 'sync ' + i18n.summary,
					tags: WEF_Utils.tag,
				} ).done( function( result ) {
					if ( result.error ) {
						alert( i18n.errorEdit + ': ' + result.error.info );
						return;
					}

					mw.notify( "Список наблюдения успешно сихнронизирован (элементов: " + qIds.length + ")", notifyOptions );
				} ).fail( function() {
					console.log( arguments );
					mw.notify( "Ошибка при сихнронизации списка наблюдения! (элементов: " + qIds.length + ")", notifyOptions );
				} );
			} );
		}

		function syncWatchlist() {
			"use strict";

			mw.notify( i18n.statusSync, notifyOptions );
			asyncGetWatchlistRaw();
		}

		function showChanges() {
			"use strict";

			mw.notify( i18n.actionObtain, notifyOptions );

			WEF_Utils.getWikidataApi().get( {
				hideminor: mw.user.options.get( 'watchlisthideminor' ),
				hidebots: mw.user.options.get( 'watchlisthidebots' ),
				days: mw.user.options.get( 'watchlistdays' ),
				limit: mw.user.options.get( 'wllimit' ),
				target: 'User:' + mw.config.get( 'wgUserName' ) + '/Watchlist/' + mw.config.get( 'wgDBname' ),
				action: 'feedrecentchanges',
				feedformat: 'atom'
			}, {
				dataType: 'xml',
			} ).done( function( result ) {

				mw.notify( i18n.actionIntegrate, notifyOptions );

				var headers = {};
				var changeList = $( '.mw-changeslist' );
				$.each( changeList.children( 'h4' ), function( i, h4 ) {
					var jH4 = $( h4 );
					var firstDiv = jH4.find( '~ div' ).first();
					headers[ jH4.text() ] = {
						header: jH4,
						firstDiv: firstDiv,
						firstDivChildren: firstDiv.children(),
					};
				} );

				var entries = $( result ).find( "entry" );
				$.each( entries, function( i, entry ) {
					try {
						insertChange( headers, $( entry ) );
					} catch ( error ) {
						mw.log.warn( "Can't add change line", error );
					}
				} );
			} );
		}

		function pad( src ) {
			"use strict";

			if ( src < 10 ) {
				return "0" + src;
			} else {
				return "" + src;
			}
		}

		function insertChange( headers, jEntry ) {
			"use strict";

			var updatedString = jEntry.children( 'updated' ).text();
			var tzOffset = parseInt( mw.user.options.get( 'timecorrection' ).split( '|' )[ 1 ], 10 ) + new Date().getTimezoneOffset();
			var updated = new Date( Date.parse( updatedString ) + tzOffset * 60 * 1000 );
			var date = updated.getDate() + ' ' + i18n.monthes[ updated.getMonth() ] + ' ' + updated.getFullYear();

			if ( typeof headers[ date ] !== 'undefined' ) {
				var pregenerated = headers[ date ];
				var firstDiv = pregenerated.firstDiv;
				var firstDivChildren = pregenerated.firstDivChildren;

				var time = pad( updated.getHours() ) + ':' + pad( updated.getMinutes() );

				var toInsertBefore = null;
				$.each( firstDivChildren, function( c, child ) {
					if ( toInsertBefore !== null ) {
						return;
					}

					var jChild = $( child );

					var timeOfElement = jChild.data( 'wef-parsed-time' );
					if ( typeof timeOfElement === 'undefined' ) {
						timeOfElement = $( jChild.find( 'td.mw-enhanced-rc' )[ 0 ] ).text().substring( 6 ).trim();
						jChild.data( 'wef-parsed-time', timeOfElement );
					}

					if ( timeOfElement.localeCompare( time ) === -1 ) {
						toInsertBefore = jChild;
					}
				} );

				var jTable = generateWatchlistLine( jEntry, time );
				if ( toInsertBefore !== null ) {
					toInsertBefore.before( jTable );
				} else {
					firstDiv.append( jTable );
				}
			}
		}

		function generateWatchlistLine( jEntry, time ) {
			"use strict";

			var id = jEntry.children( 'title' ).text();
			var changeUrl = jEntry.children( 'link' ).attr( 'href' );
			var author = jEntry.children( 'author' ).children( 'name' ).text();

			var table = $( document.createElement( 'table' ) )//
			/**/.addClass( 'mw-collapsible' )//
			/**/.addClass( 'mw-enhanced-rc' );

			var firstLine = $( document.createElement( 'tr' ) ).appendTo( table );

			var toggleIcon = $( document.createElement( 'span' ) ).addClass( 'mw-collapsible-toggle' ).addClass( 'mw-collapsible-arrow' ).addClass( 'mw-enhancedchanges-arrow' )
				.addClass( 'mw-enhancedchanges-arrow-space' ).addClass( 'mw-collapsible-toggle-collapsed' );
			var toggle = $( document.createElement( 'td' ) ).append( toggleIcon ).appendTo( firstLine );

			$( document.createElement( 'td' ) ).addClass( 'mw-enhanced-rc' ).html(
				"<abbr class='wikidata' title='" + i18n.linePartTooltip + "'>" + i18n.linePartLetter + "</abbr>&#160;&#160;&#160;&#160;&#160;" + time + "&#160;" )
				.appendTo( firstLine );

			var title = $( document.createElement( 'a' ) ).addClass( 'mw-changeslist-title' ).attr( 'href', '//www.wikidata.org/wiki/' + id ).text( id );
			window.wef_LabelsCache.localizeLabel( title, id );
			window.wef_LabelsCache.localizeDescriptionAsTitle( title, id );

			var mainLine = $( document.createElement( 'td' ) ).addClass( 'mw-title' ).append( title );
			mainLine.append( " (" );
			mainLine.append( $( document.createElement( 'a' ) ).text( i18n.linePartChange ).attr( 'href', changeUrl ) );
			mainLine.append( " | " );
			mainLine.append( $( document.createElement( 'a' ) ).text( i18n.linePartHistory ).attr( 'href',
				'//www.wikidata.org/w/index.php?action=history&title=' + encodeURIComponent( id ) ) );
			mainLine.append( ")" );
			mainLine.append( $( document.createElement( 'span' ) ).addClass( 'mw-changeslist-separator' ).text( '. .' ) );
			mainLine.append( $( document.createElement( 'a' ) ).addClass( 'mw-userlink' ).addClass( 'userlink' ).text( author ).attr( 'href',
				'//www.wikidata.org/wiki/User:' + author ) );
			mainLine.append( $( document.createElement( 'span' ) ).addClass( 'mw-changeslist-separator' ).text( '. .' ) );
			mainLine.appendTo( firstLine );

			var secondLine = $( document.createElement( 'tr' ) ).css( 'display', 'none' );
			secondLine.append( $( document.createElement( 'td' ) ) );
			secondLine.append( $( document.createElement( 'td' ) ).addClass( 'mw-enhanced-rc' ) );
			secondLine.append( $( document.createElement( 'td' ) ).addClass( 'mw-enhanced-rc-nested' ).html( jEntry.children( 'summary' ).text() ) );
			secondLine.appendTo( table );

			var summaryElement = $( secondLine.children( 'td' )[ 2 ] );
			localizeSummary( summaryElement );

			var firstPOfSummary = summaryElement.children( 'p' ).first();
			if ( firstPOfSummary.length > 0 ) {
				mainLine.append( firstPOfSummary.children() );
				firstPOfSummary.remove();
			}

			toggle.click( function() {
				secondLine.toggle();
				if ( $( secondLine ).is( ":visible" ) ) {
					toggleIcon.removeClass( 'mw-collapsible-toggle-collapsed' );
					toggleIcon.addClass( 'mw-collapsible-toggle-expanded' );
				} else {
					toggleIcon.removeClass( 'mw-collapsible-toggle-expanded' );
					toggleIcon.addClass( 'mw-collapsible-toggle-collapsed' );
				}
			} );

			return table;
		}

		function localizeSummary( jElement ) {
			jElement.find( 'a' ).each( function( i, a ) {
				var jA = $( a );
				var key = null;
				if ( jA.text() === jA.attr( 'title' ) && /^Q[0-9]+$/.test( jA.text() ) ) {
					key = jA.text();
				}
				if ( jA.text() === jA.attr( 'title' ) && /^Property:P[0-9]+$/.test( jA.text() ) ) {
					key = jA.text().substring( 9 );
				}
				if ( key !== null ) {
					window.wef_LabelsCache.getOrQueue( key, function( label, description ) {
						jA.text( label + ' (' + key + ')' );
						jA.attr( 'title', description );
					} );
				}
				if ( jA.attr( 'href' ).substring( 0, 6 ) === '/wiki/' ) {
					jA.attr( 'href', '//www.wikidata.org' + jA.attr( 'href' ) );
				}
			} );
		}

		{
			var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
			$( document.createElement( 'a' ) ).css( 'cursor', 'pointer' ).click( function() {
				mw.loader.using( [ 'mediawiki.api.edit', ], function() {
					li.remove();
					syncWatchlist();
				} );
			} ).text( i18n.menuButtonSync ).appendTo( li );
			$( '#p-tb div ul' ).append( li );

			if ( $( ".mw-enhanced-rc" ).length > 0 ) {
				mw.loader.using( [ 'ext.gadget.wefcore', ], function() {
					showChanges();
				} );
			}
		}
	} );
}
