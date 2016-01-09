( function() {

	/**
	 * @const
	 * 
	 * @type {String[]}
	 */
	var WEF_SOURCES_LOOKUP_LANGUAGES = ( function() {
		"use strict";
		var languages = [ mw.config.get( 'wgUserLanguage' ), mw.config.get( 'wgContentLanguage' ), 'ru', 'en', 'nl', 'de' ];
		var uniqueLanguages = languages.filter( function( v, i ) {
			return languages.indexOf( v ) == i;
		} );
		return uniqueLanguages;
	} )();

	/** @class */
	WEF_LatestUsedSources = function() {
		// no op
	};

	WEF_LatestUsedSources.get = function() {
		if ( !WEF_LatestUsedSources.isEnabled() )
			return;

		var serialized = window.localStorage.getItem( 'WEF_LatestUsedSources' );
		if ( WEF_Utils.isEmpty( serialized ) )
			return [];

		var result = [];
		var entityIds = serialized.split( ',', 10 );
		$.each( entityIds, function( index, item ) {
			if ( WEF_Utils.isCorrectEntityId( item ) ) {
				if ( result.indexOf( item ) === -1 )
					result.push( item );
			}
		} );
		return result;
	};

	WEF_LatestUsedSources.isEnabled = function() {
		return !WEF_Utils.isEmpty( window.localStorage );
	};

	WEF_LatestUsedSources.add = function( entityId ) {
		if ( !WEF_LatestUsedSources.isEnabled() )
			return;

		var existing = this.get();
		if ( existing.length > 0 ) {
			window.localStorage.setItem( 'WEF_LatestUsedSources', entityId + "," + existing.join( "," ) );
		} else {
			window.localStorage.setItem( 'WEF_LatestUsedSources', entityId );
		}
	};

	/**
	 * @class
	 */
	WEF_SelectOrFindSourceForm = function() {

		var form = this;
		var html = this._html = $( '<div class="wefSelectOrFindSourceForm"></div>' );

		var tabs = this._tabs = $( '<div class="wefSelectOrFindSourceForm_tabs"></div>' ).appendTo( html );
		var tabsList = $( '<ul class="wefSelectOrFindSourceForm_tabsList"></ul>' ).appendTo( tabs );

		if ( WEF_LatestUsedSources.isEnabled() ) {
			var latest = WEF_LatestUsedSources.get();
			if ( !WEF_Utils.isEmpty( latest ) ) {
				$( '<li><a href="#wefSelectOrFindSourceForm_tab_latest">Последние</a></li>' ).appendTo( tabsList );
				var tabLatest = $( '<div id="wefSelectOrFindSourceForm_tab_latest" class="wefSelectOrFindSourceForm_tab">' ).appendTo( tabs );

				var list = this._listLatest = new WEF_SelectOrFindSourceForm_List();
				tabLatest.append( list.htmlElement );
				list._add( latest );
			}
		}

		{
			$( '<li><a href="#wefSelectOrFindSourceForm_tab_lookup">Поиск</a></li>' ).appendTo( tabsList );
			var tabLookup = $( '<div id="wefSelectOrFindSourceForm_tab_lookup" class="wefSelectOrFindSourceForm_tab">' ).appendTo( tabs );

			var input = this._input = $( '<input class="wefSelectOrFindSourceForm_input">' );
			tabLookup.append( input );
			tabLookup.append( $( '<br />' ) );

			var list = this._list = new WEF_SelectOrFindSourceForm_List();
			tabLookup.append( list.htmlElement );

			var changeHandler = function() {
				form._scheduleLookup( input.val() );
			};

			input.change( changeHandler );
			input.keyup( changeHandler );
			input.keydown( changeHandler );
			input.keypress( changeHandler );
		}

		// create source tab
		{
			$( '<li><a href="#wefSelectOrFindSourceForm_tab_create">Создать</a></li>' ).appendTo( tabsList );
			var tabCreate = $( '<div id="wefSelectOrFindSourceForm_tab_create" class="wefSelectOrFindSourceForm_tab">' ).appendTo( tabs );

			$.each( wef_editors_registry.registry, function( classEntityId, editor ) {
				var button = $( '<span>' ).addClass( 'wefSelectOrFindSourceForm_tab_create_button' ).appendTo( tabCreate );
				wef_LabelsCache.localizeLabel( button, classEntityId );
				button.button();
				button.click( function() {
					var d = editor.edit( false, null, classEntityId );
					form._html.dialog( "close" );
					d.done( function( newEntityId ) {
						if ( !WEF_Utils.isEmpty( newEntityId ) ) {
							showInsertSourceDialog( newEntityId );
						}
					} );
				} );
			} );
		}
	};

	WEF_SelectOrFindSourceForm.prototype._scheduleLookup = function( newLookupTerm ) {
		if ( !WEF_Utils.isEmpty( newLookupTerm ) && this._scheduledLookupTerm != newLookupTerm ) {
			this._scheduledLookupTerm = newLookupTerm;

			// reset timer
			if ( typeof this._scheduleLookupTimeoutID !== "undefined" ) {
				window.clearTimeout( this._scheduleLookupTimeoutID );
				delete this.timeoutID;
			}

			var form = this;
			this._scheduleLookupTimeoutID = window.setTimeout( function() {
				form._lookup();
			}, 500 );
		}
	};

	WEF_SelectOrFindSourceForm.prototype._lookup = function() {
		this._list.lookup( this._scheduledLookupTerm );
	};

	WEF_SelectOrFindSourceForm.prototype.display = function() {
		var tabs = this._tabs;
		tabs.tabs();

		this._html.dialog( {
			title: 'Добавление ссылки на источник из Викиданных',
			height: 'auto',
			width: '700px',
			open: function() {
				tabs.tabs();
			},
			close: function() {
				$( this ).dialog( 'destroy' ).remove();
			},
		} );
	};

	/**
	 * @class
	 */
	WEF_SelectOrFindSourceForm_List = function() {
		this._map = {};
		this.htmlElement = $( '<div class="wefSelectOrFindSourceForm_list">' );
	};

	WEF_SelectOrFindSourceForm_List.prototype.latest = function( entityIds ) {
		this.htmlElement.empty();
		this._add( entityIds );
	};

	WEF_SelectOrFindSourceForm_List.prototype.lookup = function( searchTerm ) {
		this.htmlElement.empty();

		var list = this;
		var alreadyAdded = {};

		$.each( WEF_SOURCES_LOOKUP_LANGUAGES, function( i, languageCode ) {
			$.ajax( {
				dataType: 'json',
				url: WEF_Utils.getWikidataApiPrefix() // 
						+ '&action=wbsearchentities' //
						+ '&language=' + encodeURIComponent( languageCode ) // 
						+ '&strictlanguage=false' //
						+ '&type=item' //
						+ '&limit=50' //
						+ '&search=' + encodeURIComponent( searchTerm ),
			} ).done( function( searchEntitiesResult ) {
				var entityIds = [];
				$.each( searchEntitiesResult.search, function( index, entity ) {
					if ( alreadyAdded.hasOwnProperty( entity.id ) ) {
						return;
					}
					alreadyAdded[entity.id] = true;
					entityIds.push( entity.id );
				} );
				list._add( entityIds );
			} );
		} );
	};

	/**
	 * @param {String[]}
	 *            entityIds
	 */
	WEF_SelectOrFindSourceForm_List.prototype._add = function( entityIds ) {
		if ( entityIds.length === 0 )
			return;

		var list = this;
		$.each( entityIds, function( index, entityId ) {
			var item = new WEF_SelectOrFindSourceForm_List_Item( entityId );
			list._map[entityId] = item;
			list.htmlElement.append( item.htmlElement );
		} );

		// TODO: add some local cache
		// receive elements info... on each try?

		var idsString = entityIds.join( '|' );
		$.ajax( {
			url: WEF_Utils.getWikidataApiPrefix() //
					+ '&action=wbgetentities' //
					+ '&props=' + encodeURIComponent( 'claims' ) // 
					+ '&ids=' + encodeURIComponent( idsString ),
			dataType: 'json',
			error: function( jqXHR, textStatus, errorThrown ) {
				mw.log( textStatus );
			},
			success: function( getEntitiesResult ) {
				if ( typeof getEntitiesResult.error !== 'undefined' ) {
					mw.log.warn( getEntitiesResult.error );
					return;
				}
				if ( WEF_Utils.isEmpty( getEntitiesResult.entities ) )
					return;

				$.each( getEntitiesResult.entities, function( entityIndex, entity ) {
					var entityId = entity.id;
					/** @type {WEF_SelectOrFindSourceForm_List_Item} */
					var item = list._map[entityId];
					if ( typeof item === 'undefined' ) {
						return;
					}

					// TODO: check if compatible and exclude
					if ( typeof entity.claims !== 'undefined' && typeof entity.claims.P31 !== 'undefined' ) {
						$.each( entity.claims.P31, function( index, claim ) {
							var typeId = WEF_Utils.getEntityIdFromClaim( claim );
							if ( typeof typeId !== 'undefined' ) {
								var typeSpan = $( '<span>' );
								wef_LabelsCache.localizeLabel( typeSpan, typeId );
								item.typesElement.append( typeSpan );
								item.typesElement.append( $( '<span>' ).text( '; ' ) );
							}
						} );
					}

					$.ajax( {
						url: mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/api.php?format=json' // 
								+ '&action=parse' // 
								+ '&prop=text' // 
								+ '&disablepp=true' // 
								+ '&disableeditsection=true' // 
								+ '&preview=true' // 
								+ '&disabletoc=true' // 
								+ '&contentformat=' + encodeURIComponent( 'text/x-wiki' ) // 
								+ '&contentmodel=' + encodeURIComponent( 'wikitext' ) // 
								+ '&text=' + encodeURIComponent( '{{source|' + entityId + '}}' ),
						dataType: 'json',
						error: function( jqXHR, textStatus, errorThrown ) {
							mw.log( textStatus );
						},
						success: function( parseResult ) {
							if ( typeof parseResult.error !== 'undefined' ) {
								mw.log.warn( parseResult.error );
								return;
							}

							var text = parseResult.parse.text['*'];
							if ( !WEF_Utils.isEmpty( text ) ) {
								item.visualElement.html( text );
							}
						},
					} );

				} );
			},
		} );
	};

	/**
	 * @class
	 */
	WEF_SelectOrFindSourceForm_List_Item = function( entityId ) {
		WEF_Utils.assertCorrectEntityId( entityId );
		this.entityId = entityId;

		var htmlElement = this.htmlElement = $( '<div class="wefSelectOrFindSourceForm_list_item ui-button ui-corner-all">' );
		htmlElement.data( 'WEF_SelectOrFindSourceForm_List_Item', this );

		var divDescription = $( '<div>' ).appendTo( htmlElement );

		$( '<span class="wefSelectOrFindSourceForm_list_item_id"></span>' ).text( entityId ).appendTo( divDescription );
		this.labelElement = $( '<span class="wefSelectOrFindSourceForm_list_item_label"></span>' ).appendTo( divDescription );
		wef_LabelsCache.localizeLabel( this.labelElement, entityId );

		$( '<span class="wefSelectOrFindSourceForm_list_item_parenthesis"></span>' ).text( ' (' ).appendTo( divDescription );
		this.typesElement = $( '<span class="wefSelectOrFindSourceForm_list_item_types"></span>' ).appendTo( divDescription );
		$( '<span class="wefSelectOrFindSourceForm_list_item_parenthesis"></span>' ).text( ')' ).appendTo( divDescription );

		this.visualElement = $( '<div>' ).appendTo( htmlElement );

		this.htmlElement.click( entityId, WEF_SelectOrFindSourceForm_List_Item.clickHandler );
	};

	WEF_SelectOrFindSourceForm_List_Item.clickHandler = function( event ) {
		var entityId = event.data;
		showInsertSourceDialog( entityId );
	};

	function showInsertSourceDialog( entityId ) {
		var html = this._html = $( '<div class="wefInsertSourceForm"></div>' );

		$( '<p>При необходимости укажите дополнительные параметры источника</p>' ).appendTo( html );

		var parameters = $( '<table class="wefInsertSourceFormParameters"></div>' ).appendTo( html );

		var inputPart = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_part">' ).appendTo(
				$( '<td></td>' ).appendTo(
						$( '<tr class="wefInsertSourceForm_labelAndInput">' ).append(
								$( '<th><label for="wefInsertSourceForm_input_part">Название главы, части или раздела:</label></th>' ) ).appendTo( parameters ) ) );

		var inputUrl = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_url">' ).appendTo(
				$( '<td></td>' ).appendTo(
						$( '<tr class="wefInsertSourceForm_labelAndInput">' ).append(
								$( '<th><label for="wefInsertSourceForm_input_url">URL для главы, части или раздела:</label></th>' ) ).appendTo( parameters ) ) );

		var inputPages = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_pages">' ).appendTo(
				$( '<td></td>' ).appendTo(
						$( '<tr class="wefInsertSourceForm_labelAndInput">' ).append( $( '<th><label for="wefInsertSourceForm_input_pages">Номера страниц:</label></th>' ) )
								.appendTo( parameters ) ) );

		var inputVolume = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_volume">' ).appendTo(
				$( '<td></td>' ).appendTo(
						$( '<tr class="wefInsertSourceForm_labelAndInput">' ).append( $( '<th><label for="wefInsertSourceForm_input_volume">Том:</label></th>' ) ).appendTo(
								parameters ) ) );

		var inputIssue = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_issue">' ).appendTo(
				$( '<td></td>' ).appendTo(
						$( '<tr class="wefInsertSourceForm_labelAndInput">' ).append( $( '<th><label for="wefInsertSourceForm_input_issue">Выпуск:</label></th>' ) ).appendTo(
								parameters ) ) );

		$( '<hr>' ).appendTo( html );
		$( '<p>Если Вам необходимо указать другие параметры, например, автора, нужно завести отдельный элемент источника.</p>' ).appendTo( html );
		$( '<hr>' ).appendTo( html );

		var checkboxRef = $( '<input type="checkbox" class="wefInsertSourceForm_checkbox" id="wefInsertSourceForm_checkbox_ref">' ).appendTo(
				$( '<div class="wefInsertSourceForm_labelAndInput">' ).appendTo( html ) ).after( $( '<label for="wefInsertSourceForm_checkbox_ref">Вставить как сноску</label>' ) );

		html.dialog( {
			title: 'Дополнительные параметры источника',
			height: 'auto',
			width: '400px',
			buttons: {
				"Добавить": function() {
					$( this ).dialog( "close" );

					var textToInsert;
					if ( checkboxRef.is( ':checked' ) ) {
						textToInsert = '{{source-ref|';
					} else {
						textToInsert = '{{source|';
					}

					textToInsert += entityId;
					if ( !WEF_Utils.isEmpty( inputPart.val() ) )
						textToInsert += '|part=' + inputPart.val();
					if ( !WEF_Utils.isEmpty( inputUrl.val() ) )
						textToInsert += '|parturl=' + inputUrl.val();
					if ( !WEF_Utils.isEmpty( inputPages.val() ) )
						textToInsert += '|pages=' + inputPages.val();
					if ( !WEF_Utils.isEmpty( inputVolume.val() ) )
						textToInsert += '|volume=' + inputVolume.val();
					if ( !WEF_Utils.isEmpty( inputIssue.val() ) )
						textToInsert += '|issue=' + inputIssue.val();
					textToInsert += '}}';

					$( '#wpTextbox1' ).textSelection( 'encapsulateSelection', {
						post: textToInsert,
					} );

					WEF_LatestUsedSources.add( entityId );
					createTalkPageWithPlaceholder( entityId );
				},
				"Отменить": function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				$( this ).dialog( 'destroy' ).remove();
			},
		} );
	}

	/**
	 * insert template {{source talkpage placeholder}} on Wikidata talk page:
	 */
	function createTalkPageWithPlaceholder( entityId ) {
		var notifyOptions = {
			autoHide: true,
			tag: 'WEF-Sources Talkpage',
		};

		mw.notify( "Получение токенов редактирования и централизованной аутентификации", notifyOptions );

		WEF_Utils.queryWikidataEditAndAuthTokens().fail( function( textStatus ) {
			mw.notify( "Ошибка получения токенов: " + textStatus, notifyOptions );
		} ).done( function( editToken, centralAuthToken ) {
			mw.notify( "Токены получены, отправка запроса на обновление страницы обсуждения...", notifyOptions );

			var url = WEF_Utils.getWikidataApiPrefix() //
					+ '&centralauthtoken=' + encodeURIComponent( centralauthtoken2 ) //
					+ '&action=edit' //
					+ '&title=' + encodeURI( "Talk:" + entityId ) //
					+ '&createonly=1' //
					+ '&minor=1' //
					+ '&format=json';
			$.ajax( {
				type: 'POST',
				url: url,
				dataType: 'json',
				data: {
					tags: 'WE-Framework gadget',
					text: '{{source talkpage placeholder}}',
					token: editToken,
					summary: 'Add source talkpage placehoder {{source talkpage placeholder}} via [[:w:ru:ВП:WE-F|WE-Framework gadget]] from ' + mw.config.get( 'wgDBname' ),
				},
				success: function( result ) {
					mw.notify( "Запрос на создание страницы обсуждения отправлен", notifyOptions );
				},
			} );
		} );
	}

	function addOldToolbarButton() {
		var $toolbar = $( '#gadget-toolbar' );
		if ( !$toolbar.length ) {
			$toolbar = $( '#toolbar' );
		}
		$( '<div>' ) //
		.addClass( 'mw-toolbar-editbutton' ) //
		.attr( 'alt', 'Вставить ссылку на источник' ) //
		.attr( 'title', 'Вставить ссылку на источник' ) //
		.css( 'background-image', 'url(//upload.wikimedia.org/wikipedia/commons/b/b8/Bouton_Faut_sourcer.png)' ) //
		.appendTo( $toolbar ) //
		.on( 'click', new WEF_SelectOrFindSourceForm().display() );
	}

	function addNewToolbarButton() {
		$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
			'section': 'main',
			'group': 'insert',
			'tools': {
				'wefSourcesToolbar': {
					label: 'Вставить ссылку на источник',
					type: 'button',
					icon: '//upload.wikimedia.org/wikipedia/commons/b/b8/Bouton_Faut_sourcer.png',
					action: {
						type: 'callback',
						execute: function( context ) {
							new WEF_SelectOrFindSourceForm().display();
						}
					}
				}
			}
		} );
	}

	if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
		mw.loader.using( 'user.options', function() {
			if ( mw.user.options.get( 'usebetatoolbar' ) === 1 ) {
				if ( mw.user.options.get( 'showtoolbar' ) === 1 ) {
					$.when( mw.loader.using( [ 'ext.wikiEditor.toolbar', 'schema.Edit' ] ), $.ready ).then( function() {
						$( '#wpTextbox1' ).on( 'wikiEditor-toolbar-doneInitialSections', function() {
							addNewToolbarButton();
						} );
					} );
				}
			} else {
				mw.loader.using( 'mediawiki.toolbar', function() {
					$( addOldToolbarButton );
				} );
			}
		} );
	}

	mw.hook( 'ext.lqt.textareaCreated' ).add( addNewToolbarButton );

	$.each( window.wef_editors_registry.registry, function( classId, editor ) {

		$( '.citetype_' + classId ).prepend( $( document.createElement( 'a' ) ).addClass( 'wef_attached_edit' ).text( '[edit] ' ).css( 'cursor', 'pointer' ).click( function() {
			var entityId = $( this ).parent().data( 'entity-id' );
			if ( !WEF_Utils.isEmpty( entityId ) ) {
				editor.edit( false, entityId );
			}
		} ) );

	} );

} )();
