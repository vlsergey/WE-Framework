( function() {

	/**
	 * @class
	 */
	WEF_InsertSourceForm_List_Item = function( entityId, defaultLabel ) {
		WEF_Utils.assertCorrectEntityId( entityId );
		this.entityId = entityId;

		var htmlElement = this.htmlElement = $( '<div class="wefInsertSourceForm_list_item ui-button ui-corner-all">' );
		htmlElement.data( 'WEF_InsertSourceForm_List_Item', this );

		var divDescription = $( '<div>' ).appendTo( htmlElement );

		$( '<span class="wefInsertSourceForm_list_item_id"></span>' ).text( entityId ).appendTo( divDescription );
		this.labelElement = $( '<span class="wefInsertSourceForm_list_item_label"></span>' ).text( defaultLabel ).appendTo( divDescription );
		wef_LabelsCache.localizeLabel( this.labelElement, entityId );

		$( '<span class="wefInsertSourceForm_list_item_parenthesis"></span>' ).text( ' (' ).appendTo( divDescription );
		this.typesElement = $( '<span class="wefInsertSourceForm_list_item_types"></span>' ).appendTo( divDescription );
		$( '<span class="wefInsertSourceForm_list_item_parenthesis"></span>' ).text( ')' ).appendTo( divDescription );

		this.visualElement = $( '<div>' ).appendTo( htmlElement );

		this.htmlElement.click( entityId, WEF_InsertSourceForm_List_Item.clickHandler );
	};

	WEF_InsertSourceForm_List_Item.clickHandler = function( event ) {
		var entityId = event.data;
		$( '#wpTextbox1' ).textSelection( 'encapsulateSelection', {
			post: '{{source|' + entityId + '}}'
		} );
	};

	/**
	 * @class
	 */
	WEF_InsertSourceForm_List = function() {
		this._map = {};
		this.htmlElement = $( '<div class="wefInsertSourceForm_list">' );
	};

	WEF_InsertSourceForm_List.prototype.lookup = function( searchTerm ) {
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
				var item = new WEF_InsertSourceForm_List_Item( entity.id, entity.label );
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
						/** @type {WEF_InsertSourceForm_List_Item} */
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
	WEF_InsertSourceForm = function() {

		var form = this;
		var html = this._html = $( '<div class="wefInsertSourceForm"></div>' );

		var tabs = this._tabs = $( '<div class="wefInsertSourceForm_tabs"></div>' ).appendTo( html );
		var tabsList = $( '<ul class="wefInsertSourceForm_tabsList"></ul>' ).appendTo( tabs );

		{
			$( '<li><a href="#wefInsertSourceForm_tab_lookup">Поиск</a></li>' ).appendTo( tabsList );
			var tabLookup = $( '<div id="wefInsertSourceForm_tab_lookup" class="wefInsertSourceForm_tab">' ).appendTo( tabs );

			var input = this._input = $( '<input class="wefInsertSourceForm_input">' );
			tabLookup.append( input );
			tabLookup.append( $( '<br />' ) );

			var list = this._list = new WEF_InsertSourceForm_List();
			tabLookup.append( list.htmlElement );

			var changeHandler = function() {
				form._scheduleLookup( input.val() );
			};

			input.change( changeHandler );
			input.keyup( changeHandler );
			input.keydown( changeHandler );
			input.keypress( changeHandler );
		}
	};

	WEF_InsertSourceForm.prototype._scheduleLookup = function( newLookupTerm ) {
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

	WEF_InsertSourceForm.prototype._lookup = function() {
		this._list.lookup( this._scheduledLookupTerm );
	};

	WEF_InsertSourceForm.prototype.display = function() {
		this._tabs.tabs();
		this._html.dialog( {
			title: 'Добавление ссылки на источник из Викиданных',
			height: 'auto',
			width: '700px',
			close: function() {
				$( this ).dialog( 'destroy' ).remove();
			},
		} );
	};

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
		.on( 'click', new WEF_InsertSourceForm().display() );
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
							new WEF_InsertSourceForm().display();
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