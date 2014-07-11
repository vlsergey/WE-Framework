var ruWikiWikidataFieldsEditors_Texts = {
	snakTypes: {
		value: 'своё значение',
		novalue: 'значение не задано',
		somevalue: 'неизвестное значение',
	},
};

/**
 * @class
 */
var RuWikiWikidataSnakValueEditor = function( dataType ) {

	if ( typeof dataType === 'undefined' ) {
		throw new Error( "DataType is not specified" );
	}

	this.elements = [];
	this.parent = null;

	this.hide = function() {
		$.each( this.elements, function( index, item ) {
			item.hide();
		} );
	};
	this.show = function() {
		$.each( this.elements, function( index, item ) {
			item.show();
		} );
	};

	this.hasValue = undefined;
	this.removeValue = undefined;

	this.getDataValue = undefined;
	this.setDataValue = undefined;

	this.getAsLabel = function() {
		return $( '<span>undefined label</span>' );
	};

	var changeF = function() {
		$( valueEditor ).change();
	};

	if ( dataType === 'string' ) {
		var input = $( '<input type="text" class="ruwiki-wikidata-string">' );
		this.elements.push( input );
		this.setDataValue = function( datavalue ) {
			input.val( datavalue.value );
		};
		this.hasValue = function() {
			return !$.isEmpty( input.val() );
		};
		this.removeValue = function() {
			input.val( '' );
		};
		this.getDataValue = function() {
			if ( !this.hasValue() ) {
				throw new Error( 'No value' );
			}
			return {
				type: 'string',
				value: input.val(),
			};
		};
		this.getAsLabel = function() {
			return $( '<span></span>' ).text( input.val() );
		};

		input.change( changeF );
		input.keyup( changeF );

	} else if ( dataType === 'url' ) {

		var decode = function( stored ) {
			var abc = 'ёйцукенгшщзхъфывапролджэячсмитьбю';
			abc = abc + abc.toUpperCase();
			var patterns = [];
			var map = {};
			for ( var i = 0; i < abc.length; i++ ) {
				var c = abc.charAt( i );
				var e = encodeURIComponent( c );
				patterns.push( e );
				map[e] = c;
			}

			patterns.push( '%20' );
			map['%20'] = '+';

			var pattern = new RegExp( patterns.join( '|' ), 'g' );
			return stored.replace( pattern, function( match ) {
				return map[match];
			} );
		};
		var encode = function( displayed ) {
			var abc = 'ёйцукенгшщзхъфывапролджэячсмитьбю';
			abc = abc + abc.toUpperCase();
			var patterns = [];
			var map = {};
			for ( var i = 0; i < abc.length; i++ ) {
				var c = abc.charAt( i );
				var e = encodeURIComponent( c );
				patterns.push( c );
				map[c] = e;
			}
			patterns.push( '\\+' );
			map['+'] = '%20';

			var pattern = new RegExp( patterns.join( '|' ), 'g' );
			return displayed.replace( pattern, function( match ) {
				return map[match];
			} );
		};

		var input = $( '<input type="url" class="ruwiki-wikidata-url">' );
		this.elements.push( input );
		this.setDataValue = function( datavalue ) {
			input.val( decode( datavalue.value ) );
		};

		this.hasValue = function() {
			return !$.isEmpty( input.val() );
		};
		this.removeValue = function() {
			input.val( '' );
		};

		this.getDataValue = function() {
			if ( !this.hasValue() ) {
				throw new Error( 'No value' );
			}

			return {
				type: 'string',
				value: encode( input.val() ),
			};
		};
		this.getAsLabel = function() {
			return $( '<span></span>' ).text( input.val() );
		};

		input.change( changeF );
		input.keyup( changeF );

	} else if ( dataType === 'wikibase-item' ) {
		var input = $( '<input type="text" class="ruwiki-wikidata-wikibase-item">' );
		valueEditor.elements.push( input );
		valueEditor.setDataValue = function( datavalue ) {
			var entityId = 'Q' + datavalue.value['numeric-id'];
			input.data( 'value-entity-id', entityId );
			input.data( 'value-entity-label', '' );
			input.val( '(' + entityId + ')' );

			ruWikiWikidataLabelsCache.getOrQueue( entityId, function( label ) {
				if ( input.data( 'value-entity-id' ) === entityId ) {
					input.data( 'value-entity-label', label );
					input.val( label + ' (' + entityId + ')' );
				}
			} );
		};

		this.hasValue = function() {
			return !$.isEmpty( input.data( 'value-entity-id' ) );
		};
		this.removeValue = function() {
			input.val( '' );
			input.data( 'value-entity-id', '' );
			input.data( 'value-entity-label', '' );
		};

		this.getDataValue = function() {
			if ( !this.hasValue() ) {
				throw new Error( 'No value' );
			}

			var datavalue = {};
			if ( typeof ( input.data( 'value-entity-id' ) ) !== 'undefined' ) {
				datavalue.value = {
					"entity-type": "item",
					"numeric-id": input.data( 'value-entity-id' ).substr( 1 ),
				};
			}
			datavalue.type = 'wikibase-entityid';
			return datavalue;
		};
		this.getAsLabel = function() {
			var entityId = input.data( 'value-entity-id' );
			if ( $.isEmpty( entityId ) ) {
				return $( '<span></span>' );
			}
			var result = $( '<span></span>' );
			result.text( '(' + entityId + ')' );
			ruWikiWikidataLabelsCache.getOrQueue( entityId, function( label ) {
				result.text( label + ' (' + entityId + ')' );
			} );
			return result;
		};

		input.autocomplete( {
			source: function( request, response ) {
				var term = request.term;
				$.ajax( {
					dataType: 'json',
					url: '//www.wikidata.org/w/api.php' //
							+ '?origin=' + encodeURIComponent( location.protocol + wgServer ) // 
							+ '&format=json' // 
							+ '&action=wbsearchentities' //
							+ '&language=' + encodeURIComponent( wgContentLanguage ) // 
							+ '&limit=15' //
							+ '&search=' + encodeURIComponent( term ),
				} ).done( function( result ) {
					var list = [];
					$.each( result.search, function( index, entity ) {
						var item = {
							label: entity.label,
							value: entity.id,
						};
						if ( typeof ( entity.description ) !== "undefined" ) {
							item.desc = entity.description;
						}
						list.push( item );
					} );
					response( list );
				} );
			},
			select: function( event, ui ) {
				var item = ui.item;
				var input = $( event.target );
				input.data( 'value-entity-id', item.value );
				input.data( 'value-entity-label', item.label );
				input.val( item.label );
				input.change();
				return false;
			},
		} );

		input.focus( function() {
			var id = input.data( 'value-entity-id' );
			var label = input.data( 'value-entity-label' );

			if ( typeof id === "undefined" || typeof label === "undefined" ) {
				input.val( '' );
				input.removeData( 'value-entity-id' );
				input.removeData( 'value-entity-label' );
			} else {
				input.val( label );
			}
		} );

		input.blur( function() {
			var id = input.data( 'value-entity-id' );
			var label = input.data( 'value-entity-label' );
			var currentVal = input.val();
			if ( currentVal === label ) {
				input.val( label + ' (' + id + ')' );
			} else {
				input.val( '' );
				input.removeData( 'value-entity-id' );
				input.removeData( 'value-entity-label' );
			}
		} );

		input.data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( '<li>' ).append( '<a><strong>' + item.label + '</strong> <span style="color: darkgray;">' + item.value + '</span><br>' + ( typeof ( item.desc ) === 'undefined' ? '' : item.desc ) + '</a>' ).data( 'item.autocomplete', item ).appendTo( ul );
		};

		input.change( changeF );
		input.keyup( changeF );

	} else {
		this.elements.push( $( '<b>Unknown type: ' + dataType + '</b>' ) );
		this.getAsLabel = function() {
			return $( '<i>Unknown type: ' + dataType + '</i>' );
		};
	}
};

var RuWikiWikidataSnakEditor = function( dataType ) {
	if ( typeof dataType === 'undefined' ) {
		throw new Error( "DataType is not specified" );
	}

	var selectSnakType = $( '<select class="ruwiki-snak-type-select" />' );
	selectSnakType.append( '<option value="value">' + ruWikiWikidataFieldsEditors_Texts.snakTypes.value + '</option>' );
	selectSnakType.append( '<option value="novalue">' + ruWikiWikidataFieldsEditors_Texts.snakTypes.novalue + '</option>' );
	selectSnakType.append( '<option value="somevalue">' + ruWikiWikidataFieldsEditors_Texts.snakTypes.somevalue + '</option>' );

	this.snakTypeMode = null;
	this.snakTypeSelect = selectSnakType;
	this.valueEditor = null;

	// JQuery parent element
	this.parent = null;
	this.hiddenBehindLabel = false;

	this.appendTo = function( parent ) {
		this.parent = parent;
		this.parent.append( selectSnakType );
		if ( this.valueEditor !== null ) {
			$.each( this.valueEditor.elements, function( index, item ) {
				parent.append( item );
			} );
		}
	};

	this.hideBehindLabel = function() {
		// assuming valueEditor is not null and parent is set
		if ( this.parent === null )
			throw new Error( "parent is not set yet to hide behind label" );
		if ( this.valueEditor === null )
			throw new Error( "valueEditor is not set yet to hide behind label" );

		var label = $( '<span></span>' );
		label.css( 'cursor', 'pointer' );

		if ( this.snakTypeMode === 'value' ) {
			label.append( this.valueEditor.getAsLabel() );
		} else {
			label.text( selectSnakType.find( 'option:selected' ).text() );
		}

		selectSnakType.before( label );
		selectSnakType.hide();
		this.valueEditor.hide();

		editor = this;
		editor.hiddenBehindLabel = true;
		label.click( function() {
			label.remove();
			selectSnakType.show();
			if ( editor.snakTypeMode === 'value' ) {
				editor.valueEditor.show();
			}
			editor.hiddenBehindLabel = false;
		} );

		return label;
	};

	this.switchToSnakType = function( snakType ) {
		if ( this.valueEditor !== null ) {
			this.valueEditor.hide();
		}
		this.elements = [];
		this.snakTypeMode = snakType;

		var _this = this;
		if ( snakType === 'value' ) {
			if ( this.valueEditor === null ) {
				this.valueEditor = new RuWikiWikidataSnakValueEditor( dataType );
				if ( this.parent !== null ) {
					var parent = this.parent;
					$.each( this.valueEditor.elements, function( index, item ) {
						parent.append( item );
					} );
				}
				$( this.valueEditor ).change( function() {
					$( _this ).change();
				} );
			}
			this.valueEditor.show();
		}

		selectSnakType.val( snakType );
		$( this ).change();
	};

	this.hasValue = function() {
		return this.valueEditor.hasValue();
	};

	this.getDataValue = function() {
		return this.valueEditor.getDataValue();
	};

	this.removeValue = function() {
		this.valueEditor.removeValue();
	};

	this.setDataValue = function( datavalue ) {
		this.valueEditor.setDataValue( datavalue );
		$( this ).change();
	};

	this.load = function( snak ) {
		this.switchToSnakType( snak.snaktype );
		if ( snak.snaktype === 'value' ) {
			this.setDataValue( snak.datavalue );
		}
	};

	this.remove = function() {
		if ( this.valueEditor !== null ) {
			$.each( this.valueEditor.elements, function( index, item ) {
				item.remove();
			} );
		}
		selectSnakType.remove();
		this.valueEditor = null;
		this.parent = null;
	};

	this.switchToSnakType( 'value' );

	var editor = this;
	selectSnakType.change( function( eventObject ) {
		var selectedValue = selectSnakType.val();
		if ( editor.snakTypeMode !== selectedValue ) {
			editor.switchToSnakType( selectedValue );
		}
	} );
};

/**
 * Returns the array of claims for specified definition from entity
 * 
 * @param definition
 *            see #ruWikiWikidataFieldsEditors_createEditor
 * @param claims
 *            Wikidata entity JSON
 * @return Array.<Claim>
 */
function ruWikiWikidataFieldsEditors_filterClaims( definition, claims ) {
	var isPropertyEditor = /^P\d+$/i.test( definition.code );
	var isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

	if ( !isPropertyEditor && !isQualifierEditor ) {
		throw new Error( "Unsupported code: " + definition.code );
	}

	/* Main property ID */
	/** @type {string} */
	var propertyId;
	/* Required property value */
	var propertyValue;

	if ( isPropertyEditor ) {
		var test = definition.code.match( /^P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = undefined;
	}
	if ( isQualifierEditor ) {
		var test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = 'Q' + test[2];
	}

	if ( typeof claims === 'undefined' || typeof claims[propertyId] === 'undefined' ) {
		return [];
	}

	var byPropertyId = claims[propertyId];

	if ( isPropertyEditor ) {
		return byPropertyId;
	}

	if ( isQualifierEditor ) {
		var result = [];
		$.each( byPropertyId, function( index, claim ) {
			if ( typeof claim === 'undefined' // 
					|| typeof claim.mainsnak === 'undefined' // 
					|| typeof claim.mainsnak.datavalue === 'undefined' // 
					|| typeof claim.mainsnak.datavalue.value === 'undefined'// 
					|| typeof claim.mainsnak.datavalue.value['entity-type'] === 'undefined'// 
					|| typeof claim.mainsnak.datavalue.value['numeric-id'] === 'undefined'// 
			)
				return;

			var entityType = claim.mainsnak.datavalue.value['entity-type'];
			var numericId = claim.mainsnak.datavalue.value['numeric-id'];

			if ( entityType === 'item' && ( 'Q' + numericId ) === propertyValue ) {
				result.push( claim );
			}
		} );
		return result;
	}

	throw new Error( "Illegal state" );
}

/**
 * Creates editor from definition. Definition includes:
 * <ul>
 * <li><tt>code</tt> -- expression like <tt>P123</tt> to edit property
 * value or expression like
 * <tt>P234[Q456]/P567<tt> to edit qualifier value under specified property with specified value
 * <li><tt>datatype</tt> -- property datatype. Currently supported:
 * <ul>
 * <li><tt>string</tt>
 * <li><tt>url</tt>
 * <li><tt>wikibase-item</tt>
 * </ul>
 * <li><tt>flag</tt> -- Flag code to show before label
 * <li><tt>label</tt> -- Wikidata code to load label from
 * <li><tt>labelPrefix</tt> -- Text to add to label (no i18n)
 * <li><tt>labelQualifier</tt> -- An array of Wikidata items to additionally qualify property label
 * <li><tt>qualifiers</tt> -- An array of Wikidata property ID that will be added to qualifiers list by default
 * <li><tt>check</tt> -- function to check value correctness
 * <li><tt>normalize</tt> -- function to normalize value (including loaded one)
 * </ul>
 * The following events (using JQuery wrapper) are supported:
 * <ul>
 * <li><tt>change</tt>
 * </ul>
 * 
 * On exit there is an editor structure:
 * <ul>
 * <li><tt>tbody</tt> -- jQuery HTML TBODY element of editor
 * <li><tt>updates( updates )</tt> -- updates special structure:
 * <ul>
 * <li><tt>data</tt> -- JSON structure to be sent to <tt>wgeditclaims</tt> to update Wikidata claim
 * <li><tt>removedClaims</tt> -- list of claims ID to be removed
 * </ul>
 * <li><tt>afterAppend( )</tt> -- method must be called after element placement
 * <li><tt>hide( )</tt> -- method to hide editor  
 * <li><tt>show( )</tt> -- method to show editor  
 * <li><tt>hideLabel( placeholderText )</tt> -- hide label (optionally replace with placeholder)  
 * <li><tt>showLabel(  )</tt> -- show original label  
 * <li><tt>load( value )</tt> -- load stored value into editor. The whole claim shall be loaded   
 * <li><tt>getDataValue( )</tt> -- return current value JSON  
 * <li><tt>setDataValue( value )</tt> -- updates current value JSON  
 * </ul>
 * @return FieldEditor
 */
function ruWikiWikidataFieldsEditors_createEditor( definition ) {

	var getLabel = function() {
		var label = $( '<label></label>' );

		var updateLabel = function() {
			var newLabel = '';

			if ( typeof ( definition.labelPrefix ) !== "undefined" ) {
				newLabel += definition.labelPrefix;
			}

			if ( typeof ( definition.label ) !== "undefined" ) {
				newLabel += ruWikiWikidataLabelsCache.get( definition.label );
			}

			if ( typeof ( definition.labelQualifier ) !== "undefined" ) {
				if ( $.isArray( definition.labelQualifier ) ) {
					newLabel += ' (';
					$.each( definition.labelQualifier, function( index, qualifier ) {
						if ( index !== 0 ) {
							newLabel += ', ';
						}
						newLabel += ruWikiWikidataLabelsCache.get( qualifier );
					} );
					newLabel += ')';
				} else {
					newLabel += ' (' + ruWikiWikidataLabelsCache.get( definition.labelQualifier ) + ')';
				}
			}

			label.text( newLabel );
		};

		if ( typeof ( definition.label ) !== "undefined" ) {
			ruWikiWikidataLabelsCache.getOrQueue( definition.label, updateLabel );
		}
		if ( typeof ( definition.labelQualifier ) !== "undefined" ) {
			if ( $.isArray( definition.labelQualifier ) ) {
				$.each( definition.labelQualifier, function( index, qualifier ) {
					ruWikiWikidataLabelsCache.getOrQueue( qualifier, updateLabel );
				} );
			} else {
				ruWikiWikidataLabelsCache.getOrQueue( definition.labelQualifier, updateLabel );
			}
		}

		updateLabel();
		return label;
	};

	var isPropertyEditor = /^P\d+$/i.test( definition.code );
	var isQualifierEditor = /^P\d+\[Q\d+\]\/P\d+$/i.test( definition.code );

	if ( !isPropertyEditor && !isQualifierEditor ) {
		throw new Error( "Unsupported code: " + definition.code );
	}

	/* Main property ID */
	var propertyId;
	/* Required property value */
	var propertyValue;
	/* Qualifier property to edit */
	var qualifierPropertyId;

	if ( isPropertyEditor ) {
		var test = definition.code.match( /^P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = undefined;
		qualifierPropertyId = undefined;
	}
	if ( isQualifierEditor ) {
		var test = definition.code.match( /^P(\d+)\[Q(\d+)\]\/P(\d+)$/i );
		propertyId = 'P' + test[1];
		propertyValue = 'Q' + test[2];
		qualifierPropertyId = 'P' + test[3];
	}

	var tbody = $( '<tbody></tbody>' );
	var row1 = $( '<tr></tr>' ).appendTo( tbody );
	var flagCell = $( '<th></th>' ).appendTo( row1 );
	var labelCell = $( '<th></th>' ).css( 'text-align', 'left' ).appendTo( row1 );
	var beforeInputCell = $( '<td></td>' ).appendTo( row1 );
	var inputCell = $( '<td></td>' ).appendTo( row1 );

	var editor = new RuWikiWikidataSnakEditor( definition.datatype );
	editor.snakTypeSelect.hide();

	/* TBODY */
	var hide = function() {
		tbody.hide();
	};
	var show = function() {
		tbody.show();
	};
	var afterAppend = function() {
		editor.appendTo( inputCell );

		// set aucomplete if defined
		if ( definition.datatype === 'string' && typeof ( definition.autocomplete ) === "object" ) {
			var input = editor.valueEditor.elements[0];
			input.autocomplete( definition.autocomplete );
			input.on( "autocompleteselect", function( event, ui ) {
				input.val( ui.item.value );
				input.change();
			} );
		}
	}

	/* Flag */
	if ( definition.flag !== "undefined" && typeof ruWikiFlagsHtml !== 'undefined' && typeof ruWikiFlagsHtml[definition.flag] !== "undefined" ) {
		flagCell.html( ruWikiFlagsHtml[definition.flag] );
	}

	/* Label */
	var labelToDisplay = getLabel( definition );
	var labelPlaceholder = $( '<label></label>' );

	labelCell.empty();
	labelCell.append( labelToDisplay );
	labelCell.append( labelPlaceholder );

	var hideLabel = function( placeholderText ) {
		if ( typeof placeholderText === 'string' ) {
			labelPlaceholder.text( placeholderText );
		}
		labelToDisplay.hide();
		labelPlaceholder.show();
	};
	var showLabel = function() {
		labelToDisplay.show();
		labelPlaceholder.hide();
	};

	var row2 = $( '<tr></tr>' ).appendTo( tbody );
	$( '<td style="padding: 0px;"></td>' ).appendTo( row2 );
	var bottomContentCell = $( '<td colspan="100" style="padding: 0px;"></td>' ).appendTo( row2 );
	var bottomContentTable = $( '<table></table>' ).appendTo( bottomContentCell );

	var result = {
		disabled: false,
		tbody: tbody,
		afterAppend: afterAppend,
		hide: hide,
		show: show,
		hideLabel: hideLabel,
		showLabel: showLabel,

		qualifiers: [],
		removedQualifiersHashes: [],
		addQualifier: function() {
		},

		definition: definition,
		'wikidata-claim': null,
		'wikidata-snak': null,

		hasValue: function() {
			return editor.hasValue();
		},
		removeValue: function() {
			editor.removeValue();
		},
		getDataValue: function() {
			return editor.getDataValue();
		},
		setDataValue: function( datavalue ) {
			editor.setDataValue( datavalue );
		},

		getSnakValue: function() {
			if ( editor.snakTypeMode === 'value' && !this.hasValue() ) {
				throw new Error( 'no value' );
			}

			var snak = {};
			snak.snaktype = editor.snakTypeMode;

			if ( isPropertyEditor ) {
				snak.property = propertyId;
			}
			if ( isQualifierEditor ) {
				snak.property = qualifierPropertyId;
				if ( this['wikidata-snak'] !== null ) {
					snak.hash = this['wikidata-snak'].hash;
				}
			}

			snak.datatype = definition.datatype;
			if ( editor.snakTypeMode === 'value' ) {
				snak.datavalue = this.getDataValue();
			}

			return snak;
		},
	};

	$( editor ).change( function() {
		$( result ).change();
	} );

	result.load = function( claim ) {

		result['wikidata-claim'] = claim;

		if ( isPropertyEditor ) {
			// load property main snak
			result['wikidata-snak'] = claim.mainsnak;
			if ( claim.mainsnak ) {
				editor.load( claim.mainsnak );
			}
		}
		if ( isQualifierEditor ) {
			/*
			 * since it's loading time, we assume there is qualifier with
			 * specified value
			 */
			var qualifiers = claim.qualifiers[qualifierPropertyId];
			if ( !$.isArray( qualifiers ) ) {
				throw new Error( 'Qualifiers «' + qualifierPropertyId + '» of ' + propertyId + '[' + propertyValue + '] not found or not an array' );
			}
			if ( qualifiers.length != 1 ) {
				throw new Error( 'Length of qualifiers «' + qualifierPropertyId + '» of ' + propertyId + '[' + propertyValue + '] is not 1 as expected' );
			}

			var qualifier = qualifiers[0];
			result['wikidata-snak'] = qualifier;
			editor.load( qualifier );
		}

		result['wikidata-old-value'] = this.hasValue() ? JSON.stringify( this.getSnakValue() ) : null;

		if ( typeof claim.qualifiers !== 'undefined' ) {
			$.each( claim.qualifiers, function( property, qualifiers ) {
				if ( isQualifierEditor && property === qualifierPropertyId ) {
					return;
				}

				$.each( qualifiers, function( index, qualifier ) {
					var qualifierHolder = result.addQualifier();
					qualifierHolder.load( qualifier );
				} );
			} );
		}
	};

	result.updates = function( updates ) {
		if ( result.disabled ) {
			return;
		}

		// util functions
		var appendToNamedMap = function( element, mapName, key, obj ) {
			if ( typeof element === 'undefined' ) {
				throw new Error( 'Illegal argument: element is undefined' );
			}
			if ( typeof element[mapName] === 'undefined' ) {
				element[mapName] = {};
			}
			if ( typeof element[mapName][key] === 'undefined' ) {
				element[mapName][key] = [];
			}
			element[mapName][key].push( obj );
		}

		// check if we have any changes
		var hasValue = editor.snakTypeMode !== 'value' || editor.hasValue();
		var newSnak = hasValue ? this.getSnakValue() : null;

		var oldClaim = result['wikidata-claim'];
		var oldSnak = result['wikidata-snak'];
		var oldSnakStr = result['wikidata-old-value'];

		if ( !hasValue ) {
			if ( oldClaim != null ) {
				updates.removedClaims.push( oldClaim.id );
			}
		} else {

			var claim;
			var needToUpdate = false;

			if ( isPropertyEditor ) {
				// do we have claim?
				if ( oldClaim === null ) {
					claim = {
						type: 'statement',
						mainsnak: newSnak,
						rank: 'normal',
					};
				} else {
					claim = {
						id: oldClaim.id,
						mainsnak: newSnak,
						rank: oldClaim.rank,
					}
				}
			}

			if ( isQualifierEditor ) {
				var claim = {};

				if ( oldClaim !== null ) {
					claim.type = oldClaim.type;
					claim.id = oldClaim.id;
					claim.mainsnak = oldClaim.mainsnak;
					claim.rank = oldClaim.rank;
				} else {
					claim.type = 'statement';
					claim.mainsnak = {
						snaktype: "value",
						property: propertyId,
						datatype: "wikibase-item",
						datavalue: {
							value: {
								"entity-type": "item",
								"numeric-id": propertyValue.substr( 1 ),
							},
							type: "wikibase-entityid",
						}
					};
					claim.rank = 'normal';
				}

				var qualifier = newSnak;
				if ( oldSnak !== null ) {
					qualifier.hash = oldSnak.hash;
				}
				appendToNamedMap( claim, 'qualifiers', qualifierPropertyId, qualifier );
			}

			needToUpdate = needToUpdate || ( JSON.stringify( newSnak ) !== oldSnakStr );

			// save qualifiers
			$.each( result.qualifiers, function( index, qualifierHolder ) {
				if ( result.editor === null ) {
					// we didn't select property type yet
					return;
				}

				var qHasValue = qualifierHolder.editor.snakTypeMode !== 'value' || qualifierHolder.editor.hasValue();
				var qNewSnak = qHasValue ? qualifierHolder.getSnakValue() : null;

				var qOldSnak = qualifierHolder['wikidata-snak'];
				var qOldSnakStr = qualifierHolder['wikidata-old-value'];

				if ( !qHasValue ) {
					// remove qualifier from table and add it hash to
					// this.removedQualifiersHashes
					qualifierHolder.onRemove();
				} else {
					// always add qualifier, otherwise it will be removed!
					appendToNamedMap( claim, 'qualifiers', qualifierHolder.property, qNewSnak );

					needToUpdate = needToUpdate || ( JSON.stringify( qNewSnak ) !== qOldSnakStr );
				}
			} );

			needToUpdate = needToUpdate || ( result.removedQualifiersHashes.length > 0 );

			if ( needToUpdate ) {
				appendToNamedMap( updates.data, 'claims', propertyId, claim );
			}
		}
	};

	/* Add qualifier button */
	if ( typeof ( definition.qualifiers ) !== 'undefined' && definition.qualifiers.length > 0 ) {
		var newButton = $( '<button type="button"></button>' );
		newButton.button( {
			icons: {
				primary: 'ui-icon-tag'
			},
			text: false,
			label: 'Add qualifier',
		} ).click( function() {
			result.addQualifier();
		} ).css( 'margin', '0 0.1em' ).find( '.ui-button-text' ).css( 'padding', '0em 0.5em' );
		beforeInputCell.append( newButton );
	}

	result.addQualifier = function() {
		var qualifierRow = $( '<tr></tr>' ).appendTo( bottomContentTable );
		var qualifierButtonsCell = $( '<td></td>' ).appendTo( qualifierRow );
		var qualifierSelect = $( '<select class="ruwiki-wikidata-qualifier"></select>' ).appendTo( $( '<td></td>' ).appendTo( qualifierRow ) );
		var qualifierEditCell = $( '<td></td>' ).appendTo( qualifierRow );

		$.each( definition.qualifiers, function( index, qualifierDefinition ) {
			var code = qualifierDefinition.code;
			var option = $( '<option value=' + code + '>' + code + '</option>' ).appendTo( qualifierSelect );
			option.text( ruWikiWikidataLabelsCache.getOrQueue( code, function( newLabel ) {
				option.text( newLabel );
			} ) );
			option.data( 'property', code );
			option.data( 'datatype', qualifierDefinition.datatype );
		} );

		// do not select the first
		qualifierSelect.prop( 'selectedIndex', -1 );

		qualifierSelect.hideBehindLabel = function() {
			var label = $( '<span></span>' );
			label.css( 'cursor', 'pointer' );
			label.css( 'font-weight', 'bold' );

			var code = this.val();
			label.text( '(' + this.val() + '): ' );
			ruWikiWikidataLabelsCache.getOrQueue( code, function( newLabel ) {
				label.text( newLabel + ': ' );
			} );

			this.before( label );
			this.hide();

			var select = this;
			label.click( function() {
				label.remove();
				select.show();
			} );
			return label;
		};

		var qualifierHolder = {
			tbody: qualifierRow,
			select: qualifierSelect,

			property: null,
			datatype: null,
			editor: null,
			'wikidata-snak': null,

			setProperty: function( property, datatype ) {
				this.property = property;
				this.datatype = datatype;

				// do we have qualifier input already?
				if ( this.editor == null ) {
					this.editor = new RuWikiWikidataSnakEditor( datatype );
					this.editor.property = property;
					this.editor.appendTo( qualifierEditCell );
				} else {
					if ( this.editor.property === property ) {
						// leave as it is
					} else {
						this.editor.remove();
						this.editor = new RuWikiWikidataSnakEditor( definition.dataType );
						this.editor.property == property;
						this.editor.appendTo( qualifierEditCell );
					}
				}
				qualifierSelect.val( property );
			},

			hasValue: function() {
				return this.editor.hasValue();
			},

			getSnakValue: function() {
				if ( this.editor.snakTypeMode === 'value' && !this.hasValue() ) {
					throw new Error( 'no value' );
				}

				var snak = {};
				if ( this['wikidata-snak'] !== null ) {
					snak.hash = this['wikidata-snak'].hash;
				}
				snak.snaktype = editor.snakTypeMode;
				snak.property = this.property;
				snak.datatype = this.datatype;
				if ( this.editor.snakTypeMode === 'value' ) {
					snak.datavalue = this.editor.getDataValue();
				}
				return snak;
			},

			load: function( qualifier ) {

				qualifierSelect.val( qualifier.property );
				var option = qualifierSelect.find( ":selected" );
				if ( option.length === 0 ) {
					var code = qualifier.property;
					var option = $( '<option value=' + code + '>' + code + '</option>' ).appendTo( qualifierSelect );
					option.text( ruWikiWikidataLabelsCache.getOrQueue( code, function( newLabel ) {
						option.text( newLabel );
					} ) );
					option.data( 'property', qualifier.property );
					option.data( 'datatype', qualifier.datatype );
					qualifierSelect.val( code );
				}

				this['wikidata-snak'] = qualifier;
				var property = qualifier.property;
				var datatype = qualifier.datatype;
				this.setProperty( property, datatype );

				// must present now
				this.editor.load( qualifier );
				// remember old value
				this['wikidata-old-value'] = this.hasValue() ? JSON.stringify( this.getSnakValue() ) : null;

				var selectLabel = qualifierSelect.hideBehindLabel();
				var editorLabel = this.editor.hideBehindLabel();
				qualifierButtonsCell.css( 'visibility', 'hidden' );

				var firstTime = true;
				qualifierRow.click( function( evt ) {
					if ( firstTime ) {
						firstTime = false;
						qualifierButtonsCell.css( 'visibility', 'inherit' );

						var target = $( evt.target );
						if ( !selectLabel.is( target ) && !$.contains( selectLabel[0], target ) ) {
							selectLabel.click();
						}
						if ( !editorLabel.is( target ) && !$.contains( editorLabel[0], target ) ) {
							editorLabel.click();
						}
					}
				} );
			}
		};
		qualifierHolder.onRemove = function() {
			var index = result.qualifiers.indexOf( qualifierHolder );
			if ( index !== -1 ) {
				result.qualifiers.splice( index, 1 );
				var snak = qualifierHolder['wikidata-snak'];
				if ( snak !== null && typeof ( snak.hash ) !== 'undefined' && snak.hash !== null ) {
					result.removedQualifiersHashes.push( snak.hash );
				}
				qualifierRow.remove();
			}
		};

		var removeButton = $( '<button type="button"></button>' );
		removeButton.button( {
			icons: {
				primary: 'ui-icon-close'
			},
			text: false,
			label: 'Remove qualifier',
		} ).click( function() {
			qualifierHolder.onRemove();
		} ).css( 'margin', '0 0.1em' ).find( '.ui-button-text' ).css( 'padding', '0em 0.5em' );
		qualifierButtonsCell.append( removeButton );

		qualifierSelect.change( function() {
			var option = qualifierSelect.find( ":selected" );
			if ( option.length > 0 ) {
				var property = option.data( 'property' );
				var datatype = option.data( 'datatype' );
				qualifierHolder.setProperty( property, datatype );
			}
		} );

		result.qualifiers.push( qualifierHolder );
		return qualifierHolder;
	};

	return result;
};