mediaWiki.loader.using( [ 'ext.gadget.wefcore', 'jquery.ui.button', 'wikibase.formatters.getStore', 'wikibase.experts', 'wikibase.parsers' ], function() {
	addOnloadHook( function() {

		( function( mw, wb, $, vv ) {
			'use strict';

			// temporarily define a hard coded prefix map until we get this from
			// the server
			var WB_ENTITIES_PREFIXMAP = {
				'Q': 'item',
				'P': 'property'
			};

			var PARENT = vv.experts.StringValue;

			/**
			 * Valueview expert for wb.datamodel.EntityId. This is a simple
			 * expert, only handling the input, based on the StringValue input
			 * but with the jQuery.wikibase.entityselector for convenience.
			 *
			 * @since 0.4
			 *
			 * @constructor
			 * @extends jQuery.valueview.experts.StringValue
			 */
			wikibase.experts.store._expertsForDataValueTypes['wikibase-entityid'] = vv.expert( 'wikibaseentityidinput', PARENT, {

				/**
				 * @see Query.valueview.experts.StringValue._init
				 */
				_init: function() {
					PARENT.prototype._init.call( this );

					// FIXME: Use SuggestedStringValue

					var notifier = this._viewNotifier, $input = this.$input, self = this;

					throw new Error( 'FIXME: getWikidataApiPrefix is removed' );
					$input.entityselector( {
						url: WEF_Utils.getWikidataApiPrefix(),
						selectOnAutocomplete: true
					} );

					var value = this.viewState().value();
					var entityId = value && value.getPrefixedId( WB_ENTITIES_PREFIXMAP );

					this.$input.data( 'entityselector' ).selectedEntity( entityId );
					$input.on( 'eachchange.' + this.uiBaseClass, function( /* e */ ) {
						$( this ).data( 'entityselector' ).repositionMenu();
					} ).on( 'entityselectorselected.' + this.uiBaseClass, function( /* e */ ) {
						self._resizeInput();
						notifier.notify( 'change' );
					} );
				},

				/**
				 * @see jQuery.valueview.Expert.destroy
				 */
				destroy: function() {
					// Prevent error when issuing destroy twice:
					if ( this.$input ) {
						// The entityselector may have already been destroyed by
						// a parent component:
						var entityselector = this.$input.data( 'entityselector' );
						if ( entityselector ) {
							entityselector.destroy();
						}
					}

					PARENT.prototype.destroy.call( this );
				},

				/**
				 * @see jQuery.valueview.Expert.rawValue
				 *
				 * @return string
				 */
				rawValue: function() {
					var entitySelector = this.$input.data( 'entityselector' ), selectedEntity = entitySelector.selectedEntity();

					return selectedEntity ? selectedEntity.id : '';
				},

				/**
				 * @see jQuery.valueview.Expert.valueCharacteristics
				 *
				 * TODO: remove this once the parsing is done via API
				 */
				valueCharacteristics: function() {
					return {
						prefixmap: WB_ENTITIES_PREFIXMAP
					};
				}
			} );

		}( mediaWiki, wikibase, jQuery, jQuery.valueview ) );

		function afterEdit( item ) {
			$( item ).find( 'a' ).each( function( index, a ) {
				var jA = $( a );
				if ( /^\/wiki\//.test( jA.attr( 'href' ) ) ) {
					jA.attr( 'href', '//wikidata.org' + jA.attr( 'href' ) );
				}
			} );
		}

		throw new Error( 'FIXME: getWikidataApiPrefix is removed' );
		$.ajax( {
			type: 'GET',
			url: WEF_Utils.getWikidataApiPrefix() + '&action=wbgetentities&ids=' + mw.config.get( 'wgWikibaseItemId' ) + '&ungroupedlist=1',
			dataType: 'json',
			success: function( result ) {
				var entity = result.entities[mw.config.get( 'wgWikibaseItemId' )];

				var claimsById = {};
				$.each( entity.claims, function( index, claim ) {
					claimsById[claim.id] = claim;
				} );

				var editButton = $( document.createElement( 'button' ) ).button( {
					label: 'edit',
					text: 'edit wikidata value of this field',
					icons: {
						primary: 'ui-icon-pencil',
					},
				} ).css( {
					'position': 'absolute',
					'z-index': 1,
				} );
				editButton.click( function() {
					editButton.data( 'click' )();
				} );

				var saveCancelButtons = $( document.createElement( 'div' ) ).css( {
					'position': 'absolute',
					'z-index': 1,
				} );
				saveCancelButtons.append( $( document.createElement( 'button' ) ).button( {
					label: 'save',
					icons: {
						primary: 'ui-icon-check',
					},
				} ).click( function() {
					saveCancelButtons.data( 'save' )();
				} ) );
				saveCancelButtons.append( $( document.createElement( 'button' ) ).button( {
					label: 'cancel',
					icons: {
						primary: 'ui-icon-cancel',
					},
				} ).click( function() {
					saveCancelButtons.data( 'cancel' )();
				} ) );

				$( '.infobox .wikidata-claim' ).each( function( index, item ) {
					var jItem = $( item );
					var claimId = jItem.data( 'wikidata-claim-id' );
					if ( typeof claimId !== 'string' ) {
						return;
					}
					var claim = claimsById[claimId];
					if ( typeof claim !== 'object' ) {
						return;
					}

					var editInprogress = false;

					jItem.on( 'mouseenter', function() {
						if ( !editInprogress ) {
							editButton.data( 'click', function() {
								editButton.hide();
								saveCancelButtons.hide();
								editInprogress = true;
								jItem.valueview( {
									expertStore: wikibase.experts.store,
									parserStore: wikibase.parsers.store,
									formatterStore: wikibase.formatters.getStore( new wikibase.RepoApi(), wikibase.dataTypes ),
									dataTypeId: claim.mainsnak.datatype,
									dataValueType: claim.mainsnak.datavalue.type,
								} );
								var valueView = jItem.data( 'valueview' );
								var value = dataValues.newDataValue( claim.mainsnak.datavalue.type, claim.mainsnak.datavalue.value );
								valueView.value( value );
								valueView.startEditing();
							} );
							jItem.after( editButton );
							editButton.show().position( {
								my: 'right top',
								at: 'right bottom',
								of: jItem,
							} );
							saveCancelButtons.hide();
						} else {
							saveCancelButtons.data( 'save', function() {
								editButton.hide();
								saveCancelButtons.hide();
								var valueView = jItem.data( 'valueview' );
								valueView.stopEditing();
								editInprogress = false;
								afterEdit( jItem );

								var newValue = valueView.value().toJSON();
								claim.mainsnak.datavalue.value = newValue;

								// XXX: WEF_Utils.getEntityId() is deleted
								throw new Error( 'rewrite me' );
								var updates = new WEF_Updates( WEF_Utils.getEntityId() );
								var claims = {};
								claims[claim.property] = [ claim ];
								updates.data.claims = claims;
								WEF_Utils.update( updates, function() {
									WEF_Utils.purgeAsync();
								} );
							} );
							saveCancelButtons.data( 'cancel', function() {
								editButton.hide();
								saveCancelButtons.hide();
								var valueView = jItem.data( 'valueview' );
								valueView.stopEditing();
								editInprogress = false;
								afterEdit( jItem );
							} );

							jItem.after( saveCancelButtons );
							saveCancelButtons.show().position( {
								my: 'right top',
								at: 'right bottom',
								of: jItem,
							} );
							editButton.hide();
						}
					} );
				} );

			},
			fail: function() {
				alert( i18n.errorLoadingWikidata );
			},
		} );
	} );
} );
