/**
 * This JavaScrtipt is a loader of External Links Editor from WE-Framework,
 * works only for other sites (ruwiki users should use local gadgets)
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
try {
	mw.loader.addSource( {
		"ruwiki": {
			"loadScript": "//bits.wikimedia.org/ru.wikipedia.org/load.php",
			"apiScript": "//ru.wikipedia.org/w/api.php"
		}
	} );

	mw.loader.register( 'ext.gadget.wefcore', 1408039122, [ 'jquery.ui.autocomplete', 'jquery.ui.dialog', 'jquery.ui.datepicker', 'jquery.ui.tabs' ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wefflags', 64774333, undefined, undefined, 'ruwiki' );
} catch ( error ) {
	// already registered
}

mw.loader.register( 'ext.gadget.wef-ExternalLinks', 1408041420, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.using( 'ext.gadget.wef-ExternalLinks' );
