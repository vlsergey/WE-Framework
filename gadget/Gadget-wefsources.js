( function() {

	/**
	 * @class
	 */
	WEF_SelectOrFindSourceForm = function() {

		var form = this;
		var html = this._html = $( '<div class="wefSelectOrFindSourceForm"></div>' );

		var tabs = this._tabs = $( '<div class="wefSelectOrFindSourceForm_tabs"></div>' ).appendTo( html );
		var tabsList = $( '<ul class="wefSelectOrFindSourceForm_tabsList"></ul>' ).appendTo( tabs );

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
				var button = $( '<span>' ).addClass('wefSelectOrFindSourceForm_tab_create_button').appendTo( tabCreate );
				wef_LabelsCache.localizeLabel( button, classEntityId );
				button.button();
				button.click( function() {
					var d = editor.edit( false, null );
					d.done( function( newEntityId ) {
						if ( !WEF_Utils.isEmpty( newEntityId ) ) {
							showInsertSourceDialog( newEntityId );
						}
					} );
				} );
			} );

			wef_LabelsCache.receiveLabels();
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

	WEF_SelectOrFindSourceForm_List.prototype.lookup = function( searchTerm ) {
		this.htmlElement.empty();

		var list = this;
		$.ajax( {
			dataType: 'json',
			url: WEF_Utils.getWikidataApiPrefix() // 
					+ '&action=wbsearchentities' //
					+ '&language=' + encodeURIComponent( mw.config.get( 'wgUserLanguage' ) ) // 
					+ '&strictlanguage=false' //
					+ '&type=item' //
					+ '&limit=50' //
					+ '&search=' + encodeURIComponent( searchTerm ),
		} ).done( function( searchEntitiesResult ) {
			var ids = [];

			$.each( searchEntitiesResult.search, function( index, entity ) {
				var item = new WEF_SelectOrFindSourceForm_List_Item( entity.id, entity.label );
				list._map[entity.id] = item;
				list.htmlElement.append( item.htmlElement );
				ids.push( entity.id );
			} );
			wef_LabelsCache.receiveLabels();

			// TODO: add some local cache
			// receive elements info... on each try?

			var idsString = ids.join( '|' );
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
					wef_LabelsCache.receiveLabels();
				},
			} );

		} );

	};

	/**
	 * @class
	 */
	WEF_SelectOrFindSourceForm_List_Item = function( entityId, defaultLabel ) {
		WEF_Utils.assertCorrectEntityId( entityId );
		this.entityId = entityId;

		var htmlElement = this.htmlElement = $( '<div class="wefSelectOrFindSourceForm_list_item ui-button ui-corner-all">' );
		htmlElement.data( 'WEF_SelectOrFindSourceForm_List_Item', this );

		var divDescription = $( '<div>' ).appendTo( htmlElement );

		$( '<span class="wefSelectOrFindSourceForm_list_item_id"></span>' ).text( entityId ).appendTo( divDescription );
		this.labelElement = $( '<span class="wefSelectOrFindSourceForm_list_item_label"></span>' ).text( defaultLabel ).appendTo( divDescription );
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

		$( '<p>При необходимости укажите дополнительные параметры источника</p>' );

		var inputPart = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_part">' ).appendTo(
				$( '<div class="wefInsertSourceForm_labelAndInput">' ).append( $( '<label for="wefInsertSourceForm_input_part">Название главы, части или раздела:</label>' ) )
						.appendTo( html ) );
		var inputUrl = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_url">' ).appendTo(
				$( '<div class="wefInsertSourceForm_labelAndInput">' ).append( $( '<label for="wefInsertSourceForm_input_url">URL для главы, части или раздела:</label>' ) )
						.appendTo( html ) );
		var inputPages = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_pages">' ).appendTo(
				$( '<div class="wefInsertSourceForm_labelAndInput">' ).append( $( '<label for="wefInsertSourceForm_input_pages">Номера страниц:</label>' ) ).appendTo( html ) );
		var inputVolume = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_volume">' ).appendTo(
				$( '<div class="wefInsertSourceForm_labelAndInput">' ).append( $( '<label for="wefInsertSourceForm_input_volume">Том:</label>' ) ).appendTo( html ) );
		var inputIssue = $( '<input class="wefInsertSourceForm_input" id="wefInsertSourceForm_input_volume">' ).appendTo(
				$( '<div class="wefInsertSourceForm_labelAndInput">' ).append( $( '<label for="wefInsertSourceForm_input_volume">Выпуск:</label>' ) ).appendTo( html ) );

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

	$.each( window.wef_editors_registry.registry, function( classId, editor ) {

		$( '.citetype_' + classId ).prepend( $( document.createElement( 'a' ) ).addClass( 'wef_attached_edit' ).text( '[edit] ' ).css( 'cursor', 'pointer' ).click( function() {
			var entityId = $( this ).parent().data( 'entity-id' );
			if ( !WEF_Utils.isEmpty( entityId ) ) {
				editor.edit( false, entityId );
			}
		} ) );

	} );

} )();