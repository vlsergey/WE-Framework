if ( mw.config.get( 'wgNamespaceNumber' ) === 0 && mw.config.get( 'wgAction' ) === 'view' ) {
	( function() {

		var prefixLength = "//www.wikidata.org/wiki/".length;
		var linkPrefix = '//tools.wmflabs.org/reasonator/?q=';
		var linkSuffix = '&lang=' + ( mw.config.get( 'wgUserLanguage' ) || mw.config.get( 'wgContentLanguage' ) );

		$( '#mw-content-text .extiw[href^="//www.wikidata.org/wiki/Q"]' ).each( function( index, item ) {
			var jItem = $( item );
			jItem.attr( 'href', linkPrefix + jItem.attr( 'href' ).substring( prefixLength ) + linkSuffix );
		} );

	} )();
}
