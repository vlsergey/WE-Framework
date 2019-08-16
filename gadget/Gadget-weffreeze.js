/** Wikidata Freeze gadget */
( function() {

	var PREFIX = "Module:WikidataCache/";
	var MODULE_DOC = "{{wikidata cache module}}";

	var i18n = {
		menuButton: 'Кэш Викиданных',

		buttonCancel: 'Отмена',
		buttonCompare: 'Проверить изменения',
		buttonCreateCache: 'Создать локальный кэш',
		buttonRemove: 'Удалить локальный кэш',
		buttonUpdateCache: 'Обновить локальный кэш',

		descriptionCached: 'Данная страница имеет локально кэшированную копии элемента Викиданных. '
				+ 'Эта копия была создана для предотвращения попадания изменений на Викиданных сразу в русский раздел Википедии. '
				+ 'Данный элемент совпадает с текущей версией элемента на Викиданных. '
				+ 'Если Вы являетесь администратром, Вы можете удалить локальную версию, если дополнительная защита больше не требуется.',
		descriptionNotCached: 'Данная страница не имеет локально кэшированной копии элемента Викиданных. '
				+ 'Вы можете создать элемент кэша, и, тем самым, защитить локальную страницу Википедии от изменений, происходящих на Викиданных. '
				+ 'Это может быть полезно для защищённых страниц, стабилизированных страниц или страниц, часто подвергающихся вандализму на Викиданных. '
				+ 'Для создания или обновления кэша могут потребоваться права администратора.',
		descriptionOutdated: 'Данная страница имеет локально кэшированную копии элемента Викиданных. '
				+ 'Текущая копия была создана для предотвращения попадания изменений на Викиданных сразу в русский раздел Википедии. '
				+ 'В настоящий момент на Викиданных имеется более свежая информация (возможно, содержащая неконсенсусные или вандальные изменения). '
				+ 'Если Вы являетесь администратром, Вы можете обновить локальный кэш или удалить локальную версию, если дополнительная защита больше не требуется.',

		errorLoadingWikidata: 'Ошибка загрузки элемента Викиданных',
		errorUpdatingCache: 'Ошибка сохранения элемента кэша',

		statusLoadingWikidata: 'Получение данных с Викиданных...',
		statusDeleteDonePurge: 'Удаление кэша завершено, обновление страницы...',
		statusGenerateLua: 'Генерация текста LUA-модуля...',
		statusRemovingCache: 'Удаление локального кэша...',
		statusUpdateDonePurge: 'Обновление кэша завершено, обновление страницы...',
		statusUpdatingCache: 'Обновление локального кэша...',

		summary: 'Обновление локального кэша',

		title: 'Управление локальным кэшем Викиданных',
	};

	/* Some utils functions */

	function getFirstObjectValue( obj ) {
		return obj[ Object.keys( obj )[ 0 ] ];
	}

	function getWikidataApiPrefix() {
		return '//www.wikidata.org/w/api.php' + '?origin=' + encodeURIComponent( location.protocol + mw.config.get( 'wgServer' ) ) + '&format=json';
	}

	function isWikidata() {
		return mw.config.get( 'wgSiteName' ) === 'Wikidata';
	}

	function purge() {
		window.location.replace( mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/index.php?action=purge&title='
				+ encodeURIComponent( mw.config.get( 'wgPageName' ) ) );
	}

	/* Different dialog windows depending on status of local cache */

	function dialogForNotCached() {
		"use strict";

		var dialog = $( document.createElement( "div" ) );
		dialog.append( $( document.createElement( "p" ) ).text( i18n.descriptionNotCached ) );
		dialog.append( document.createElement( "br" ) );
		dialog.append( $( document.createElement( "div" ) ).text( i18n.buttonCreateCache ).button().click( function() {
			dialog.dialog( 'close' );
			updateCache();
		} ) );
		dialog.dialog( {
			title: i18n.title,
			autoOpen: true,
			width: 500,
			buttons: [ {
				text: i18n.buttonCancel,
				click: function() {
					dialog.dialog( 'close' );
				},
			} ]
		} );
	}

	function dialogForCurrent() {
		"use strict";

		var dialog = $( document.createElement( "div" ) );
		$( document.createElement( "p" ) ).text( i18n.descriptionCached ).appendTo( dialog );
		$( document.createElement( "br" ) ).appendTo( dialog );
		$( document.createElement( "div" ) ).text( i18n.buttonRemove ).button().click( function() {
			dialog.dialog( 'close' );
			removeCache();
		} ).appendTo( dialog );
		dialog.dialog( {
			title: i18n.title,
			autoOpen: true,
			width: 500,
			buttons: [ {
				text: i18n.buttonCancel,
				click: function() {
					dialog.dialog( 'close' );
				},
			} ]
		} );
	}

	function dialogForOutdated( oldRevisionId ) {
		"use strict";

		var dialog = $( document.createElement( "div" ) );
		$( document.createElement( "p" ) ).text( i18n.descriptionOutdated ).appendTo( dialog );
		$( document.createElement( "br" ) ).appendTo( dialog );

		$( document.createElement( "a" ) ) //
		/**/.text( i18n.buttonCompare )
		/**/.button()
		/**/.attr( 'href', '//www.wikidata.org/w/index.php?diff=cur&oldid=' + oldRevisionId )
		/**/.attr( 'target', '_blank' )
		/**/.appendTo( dialog );
		$( document.createElement( "br" ) ).appendTo( dialog );

		$( document.createElement( "div" ) )
		/**/.text( i18n.buttonUpdateCache )
		/**/.button()
		/**/.click( function() {
				dialog.dialog( 'close' );
				updateCache();
			} )
		/**/.appendTo( dialog );
		$( document.createElement( "br" ) ).appendTo( dialog );

		$( document.createElement( "div" ) ).text( i18n.buttonRemove ).button().click( function() {
			dialog.dialog( 'close' );
			removeCache();
		} ).appendTo( dialog );
		dialog.dialog( {
			title: i18n.title,
			autoOpen: true,
			width: 500,
			buttons: [ {
				text: i18n.buttonCancel,
				click: function() {
					dialog.dialog( 'close' );
				},
			} ]
		} );
	}

	/** Update cache function */
	function updateCache() {
		"use strict";
		jsMsg( i18n.statusLoadingWikidata );

		var entityId = mw.config.get( 'wgWikibaseItemId' ).toUpperCase();
		$.ajax( {
			type: 'GET',
			url: getWikidataApiPrefix() + '&action=wbgetentities&ids=' + entityId,
			dataType: 'json',
			success: function( result ) {
				var entity = result.entities[ entityId ];
				var api = new mw.Api();

				jsMsg( i18n.statusGenerateLua );
				var lua = generateLua( entity );

				jsMsg( i18n.statusUpdatingCache );
				$.when(

					api.postWithEditToken( {
						action: 'edit',
						format: 'json',
						title: PREFIX + entityId.toUpperCase(),
						summary: i18n.summary,
						text: lua,
					}, function() {
						// ok
					}, function( text /*, data */ ) {
						// error
						alert( i18n.errorUpdatingCache + ': ' + text );
					} ),

					api.postWithEditToken( {
						action: 'edit',
						format: 'json',
						title: PREFIX + entityId + '/doc',
						summary: i18n.summary,
						createonly: 1,
						text: MODULE_DOC,
					} )

				).done( function() {
					jsMsg( i18n.statusUpdateDonePurge );
					purge();
				} );

			},
			fail: function() {
				alert( i18n.errorLoadingWikidata );
			},
		} );
	}

	function generateLua( json ) {
		"use strict";
		return "return " + generateLuaImpl( json, 1 ) + ";";
	}

	function repeat( str, count ) {
		var result = "";
		for ( var i = 0; i < count; i++ ) {
			result += str;
		}
		return result;
	}

	function escapeForLua( str ) {
		return str.replace( "'", "\\'" );
	}

	function generateLuaImpl( value, level ) {
		"use strict";

		if ( typeof value === 'string' ) {
			return "'" + escapeForLua( value ) + "'";
		} else if ( typeof value === 'number' ) {
			return '' + value;
		} else if ( $.isArray( value ) ) {
			var result = '{';
			$.each( value, function( i, item ) {
				var subvalue = generateLuaImpl( item, level + 1 );
				if ( subvalue ) {
					result = result + subvalue + ', ';
				}
			} );
			return result + '}';
		} else if ( typeof value === 'object' ) {
			var result = '{';
			Object.keys( value ).forEach( function( key ) {
				var subvalue = value[ key ];
				var subResult = generateLuaImpl( subvalue, level + 1 );
				if ( subResult ) {
					result = result + '\n' + repeat( '\t', level ) + generateLuaLabel( key ) + " = " + subResult + ',';
				}
			} );
			return result + '\n' + repeat( '\t', level - 1 ) + '}';
		}
	}

	function generateLuaLabel( key ) {
		if ( /^[a-zA-Z][a-zA-Z0-9_]*$/.exec( key ) ) {
			return key;
		}
		return "['" + escapeForLua( key ) + "']";
	}

	/** Remove cache function */
	function removeCache() {
		jsMsg( i18n.statusRemovingCache );

		var entityId = mw.config.get( 'wgWikibaseItemId' ).toUpperCase();
		var api = new mw.Api();

		$.when(

			api.postWithToken( 'delete', {
				action: 'delete',
				title: PREFIX + entityId,
			} ),

			api.postWithToken( 'delete', {
				action: 'delete',
				title: PREFIX + entityId + '/doc',
			} )

		).done( function() {
			jsMsg( i18n.statusDeleteDonePurge );
			purge();
		} );
	}

	mw.loader.using( [ 'jquery.ui.dialog', 'mediawiki.api.edit', ], function() {
		"use strict";

		if ( isWikidata() ) {
			return;
		}

		/** @return {string} */
		var entityId = mw.config.get( 'wgWikibaseItemId' );
		if ( typeof entityId === 'undefined' || entityId == null ) {
			return;
		}

		$.when( $.ajax( {
			type: 'GET',
			url: getWikidataApiPrefix() + '&action=query&prop=revisions&titles=' + entityId.toUpperCase() + '&rvprop=' + encodeURIComponent( 'content|ids' ),
			dataType: 'json',
		} ), $.ajax( {
			type: 'GET',
			url: '/w/api.php?format=json&action=query&prop=revisions&titles=Module:WikidataCache/' + entityId.toUpperCase() + '&rvprop=' + encodeURIComponent( 'content|ids' ),
			dataType: 'json',
		} ) ).done( function( wikidataResponse, wikipediaResponse ) {
			var wikidataPage = getFirstObjectValue( wikidataResponse[ 0 ].query.pages );

			if ( typeof wikidataPage.missing !== "undefined" ) {
				mw.log.warn( 'Entity is missing on Wikidata: ' + entityId );
				return;
			}

			var wikipediaPage = getFirstObjectValue( wikipediaResponse[ 0 ].query.pages );
			if ( typeof wikipediaPage.missing !== "undefined" ) {

				// cache is missed
				var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
				$( document.createElement( 'a' ) ).addClass( 'wef-menuitem-freeze' ).addClass( 'wef-menuitem-freeze-missing' ).click( function() {
					dialogForNotCached();
				} ).text( i18n.menuButton ).appendTo( li );
				$( '#p-tb div ul' ).append( li );

			} else {
				// check revision
				var content = wikipediaPage.revisions[ 0 ][ "*" ];
				var storedRevision = Number( content.match( /lastrevid\s*=\s*\s*([0-9]+),/ )[ 1 ] );
				var existedRevision = Number( wikidataPage.revisions[ 0 ].revid );

				if ( storedRevision === existedRevision ) {

					// cache is exist and actual
					var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
					$( document.createElement( 'a' ) ).addClass( 'wef-menuitem-freeze' ).addClass( 'wef-menuitem-freeze-current' ).click( function() {
						dialogForCurrent();
					} ).text( i18n.menuButton ).appendTo( li );
					$( '#p-tb div ul' ).append( li );

				} else {

					// cache is exist and outdated
					var li = $( document.createElement( 'li' ) ).addClass( 'plainlinks' );
					$( document.createElement( 'a' ) ).addClass( 'wef-menuitem-freeze' ).addClass( 'wef-menuitem-freeze-outdated' ).click( function() {
						dialogForOutdated( storedRevision );
					} ).text( i18n.menuButton ).appendTo( li );
					$( '#p-tb div ul' ).append( li );

				}
			}
		} );

	} );
} )();
