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

	mw.loader.register( 'ext.gadget.wefcore', 1411425177, [ 'jquery.ui.autocomplete', 'jquery.ui.dialog', 'jquery.ui.tabs' ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wefflags', 64774333, undefined, undefined, 'ruwiki' );
} catch ( error ) {
	// already registered
}

mw.loader.register( 'ext.gadget.wef-AdmUnitEditor', 1411900283, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-EditionEditor', 1411425914, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-EntityEditor', 1411422406, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-ExternalLinks', 1411425938, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-MovieEditor', 1411425965, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-PersonEditor', 1411425980, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-TaxonEditor', 1411426009, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
mw.loader.register( 'ext.gadget.wef-WorkEditor', 1411426027, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );

mw.loader.using( [ 'ext.gadget.wef-AdmUnitEditor', 'ext.gadget.wef-EditionEditor', 'ext.gadget.wef-EntityEditor', 'ext.gadget.wef-ExternalLinks', 'ext.gadget.wef-MovieEditor',
		'ext.gadget.wef-PersonEditor', 'ext.gadget.wef-TaxonEditor', 'ext.gadget.wef-WorkEditor' ] );
