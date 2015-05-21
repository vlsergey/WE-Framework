/**
 * This JavaScript is a loader of EditionEditor from WE-Framework, works only
 * for other sites (ruwiki users should use local gadgets)
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

	mw.loader.register( 'ext.gadget.wefcore', 1432185269, [ 'jquery.ui.autocomplete', //
	'jquery.ui.dialog', //
	'jquery.ui.tabs', //
	'jquery.uls.data', //
	], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wefflags', 1432185269, undefined, undefined, 'ruwiki' );
} catch ( error ) {
	// already registered
}

mw.loader.register( 'ext.gadget.wef-EditionEditor', 1432185269, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.using( 'ext.gadget.wef-EditionEditor' );
