var MODULE_DOC = "{{wikidata source information module}}";

function generateSourceModule( entity ) {
	"use strict";

	var result = 'return {\n';
	result += appendClaims( entity, 'P31', 'type' );
	result += appendClaims( entity, 'P364', 'lang' );
	result += appendClaims( entity, 'P50', 'authors' );
	result += appendClaims( entity, 'P953', 'url' );
	result += appendClaims( entity, 'P1476', 'title' );
	result += appendClaims( entity, 'P1680', 'subtitle' );
	result += appendClaims( entity, 'P1433', 'publication' );
	result += appendClaims( entity, 'P393', 'edition' );
	result += appendClaims( entity, 'P98', 'editor' );
	result += appendClaims( entity, 'P291', 'place' );
	result += appendClaims( entity, 'P123', 'publisher' );
	result += appendClaims( entity, 'P577', 'date' );
	result += appendClaims( entity, 'P478', 'volume' );
	result += appendClaims( entity, 'P433', 'issue' );
	result += appendClaims( entity, 'P304', 'page' );
	result += appendClaims( entity, 'P1104', 'pages' );
	result += appendClaims( entity, 'P236', 'issn' );
	result += appendClaims( entity, 'P1065', 'archiveurl' );
	result += appendClaims( entity, 'P813', 'datecheck' );
	result += appendClaims( entity, 'P212', 'isbn13' );
	result += appendClaims( entity, 'P957', 'isbn10' );
	result += appendClaims( entity, 'P813', 'datecheck' );
	result += '}\n';
	return result;
}

function appendClaims( entity, propertyId, fieldName ) {
	"use strict";

	var hasAnything = false;
	var result = '\t' + fieldName + ' = {\n';
	if ( typeof entity.claims[propertyId] !== 'undefined' ) {
		$.each( entity.claims[propertyId], function( i, claim ) {
			if ( typeof claim.mainsnak.datavalue !== 'undefined' ) {
				var claimString = appendClaim( claim );
				if ( typeof claimString === 'string' ) {
					hasAnything = true;
					result += '\t\t' + claimString + ',\n';
				}
			}
		} );
	}
	if ( !hasAnything ) {
		return '';
	}
	result += '\t},\n';
	return result;
}

function escapeForJS( str ) {
	"use strict";

	return str.replace( "'", "\'" );
}

function appendClaim( claim ) {
	"use strict";

	if ( claim.mainsnak.datavalue.type === 'string' ) {
		return '"' + escapeForJS( claim.mainsnak.datavalue.value ) + '"';
	} else if ( claim.mainsnak.datavalue.type === 'time' ) {
		return '"' + claim.mainsnak.datavalue.value.time + '"';
	} else if ( claim.mainsnak.datavalue.type === 'wikibase-entityid' ) {
		// do we have short name?
		var label = null;
		if ( typeof claim.qualifiers !== 'undefined' // 
				&& typeof claim.qualifiers.P743 !== 'undefined' // 
				&& typeof claim.qualifiers.P743[0] !== 'undefined' //
				&& typeof claim.qualifiers.P743[0].datavalue !== 'undefined' //
				&& typeof claim.qualifiers.P743[0].datavalue.value === 'string' ) {
			label = claim.qualifiers.P743[0].datavalue.value;
		}
		if ( label === null ) {
			return "{ id = 'Q" + claim.mainsnak.datavalue.value['numeric-id'] + "' }";
		} else {
			return "{ id = 'Q" + claim.mainsnak.datavalue.value['numeric-id'] + "', label = '" + escapeForJS( label ) + "' }";
		}
	} else {
		return;
	}
}

function updateLocalSourceDescription( i18n, entityId ) {
	"use strict";

	var statusDialog = $( '<div></div>' );
	statusDialog.attr( 'title', i18n.dialogTitle );
	statusDialog.append( $( document.createElement( 'p' ) ).text( i18n.statusLoadingWikidata ) );
	statusDialog.dialog();

	$.ajax( {
		type: 'GET',
		url: WEF_Utils.getWikidataApiPrefix() + '&action=wbgetentities&ids=' + entityId,
		dataType: 'json',
		success: function( result ) {
			var entity = result.entities[entityId];
			var newModule = generateSourceModule( entity );

			var api = ( new mw.Api() );

			api.postWithEditToken( {
				action: 'edit',
				format: 'json',
				title: 'Module:Source/' + entityId.toUpperCase() + "/doc",
				summary: 'update source definition from Wikidata',
				createonly: 1,
				text: MODULE_DOC,
			}, function() {
				// ok
			}, function( text, data ) {
				// ignore
			} );

			api.postWithEditToken( {
				action: 'edit',
				format: 'json',
				title: 'Module:Source/' + entityId.toUpperCase(),
				summary: 'update source definition from Wikidata',
				text: newModule,
			}, function() {
				// ok
				WEF_Utils.purgeAsync();
			}, function( text, data ) {
				// error
				alert( 'Unable to update Module with definition: ' + text );
			} );
		},
		complete: function() {
			statusDialog.dialog( 'close' );
		},
		fail: function() {
			alert( i18n.errorLoadingWikidata );
		},
	} );
}

WEF_Sources = function() {
	// no ops
};

WEF_Sources.prototype.attachToInstancesOf = function( instanceOfEntityId, editorHtml, editorI18n ) {
	"use strict";

	var editor = new WEF_Editor( editorHtml );
	editor.localize( editorI18n );
	var originalFunction = WEF_Editor.prototype.edit;
	editor.edit = function( currentPageItem, entityId ) {
		mw.log.warn( "editor.edit called" );
		var d = originalFunction.call( this, currentPageItem, entityId );
		d.always( function() {
			updateLocalSourceDescription( editor.i18n, entityId );
		} );
		mw.log.warn( "editor.edit finished" );
		return d;
	};
	window.wef_editors_registry.registerEditor( instanceOfEntityId, editor );

	$( '.citetype_' + instanceOfEntityId ).prepend( $( document.createElement( 'a' ) ).text( '[edit] ' ).css( 'cursor', 'pointer' ).click( function() {
		var entityId = $( this ).parent().data( 'entity-id' );
		if ( !$.isEmpty( entityId ) ) {
			editor.edit( false, entityId );
		}
	} ) );

	$( '.citetype_unknown' ).prepend( $( document.createElement( 'a' ) ).text( '[' + instanceOfEntityId + '?] ' ).css( 'cursor', 'pointer' ).click( function() {
		var entityId = $( this ).parent().data( 'entity-id' );
		if ( !$.isEmpty( entityId ) ) {
			editor.edit( false, entityId );
		}
	} ) );
};

window.wef_sources = new WEF_Sources();
