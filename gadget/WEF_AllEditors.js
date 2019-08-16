/**
 * This JavaScript is a loader of EditionEditor from WE-Framework, works only
 * for other sites (ruwiki users should use local gadgets)
 *
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
( function() {

	/** @const */
	var version = 1479771615;

	try {
		mw.loader.addSource( "ruwiki", "//ru.wikipedia.org/w/load.php" );
		mw.loader.register( 'ext.gadget.wefcore', version, [ 'jquery.ui.autocomplete', //
				'jquery.ui.dialog', //
				'jquery.ui.tabs', //
				'jquery.uls.data', //
				'mediawiki.ForeignApi', //
		], undefined, 'ruwiki' );
		mw.loader.register( 'ext.gadget.isbnjs', version, undefined, undefined, 'ruwiki' );
		mw.loader.register( 'ext.gadget.wefflags', version, undefined, undefined, 'ruwiki' );
	} catch ( error ) {
		// already registered
	}

	mw.loader.register( 'ext.gadget.wef-AdmUnitEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-ArticleEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-BookEditor', version, [ 'ext.gadget.isbnjs', 'ext.gadget.wefcore', 'ext.gadget.wefflags' ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-DocumentEditor', version, [ 'ext.gadget.wefcore', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-EditionEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-EntityEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-ExternalLinks', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-MovieEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-OkEditor', version, [ 'ext.gadget.wefcore' ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-PersonEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-SoftwareEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-TaxonEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );
	mw.loader.register( 'ext.gadget.wef-WorkEditor', version, [ 'ext.gadget.wefcore', 'ext.gadget.wefflags', ], undefined, 'ruwiki' );

	mw.loader.using( [ //
			'ext.gadget.wefcore', //
			'ext.gadget.isbnjs', //
			'ext.gadget.wefflags', //
			'ext.gadget.wef-AdmUnitEditor', //
			'ext.gadget.wef-ArticleEditor', //
			'ext.gadget.wef-BookEditor', //
			'ext.gadget.wef-DocumentEditor', //
			'ext.gadget.wef-EditionEditor', //
			'ext.gadget.wef-EntityEditor', //
			'ext.gadget.wef-ExternalLinks', //
			'ext.gadget.wef-MovieEditor', //
			'ext.gadget.wef-OkEditor', //
			'ext.gadget.wef-PersonEditor', //
			'ext.gadget.wef-SoftwareEditor', //
			'ext.gadget.wef-TaxonEditor', //
			'ext.gadget.wef-WorkEditor' //
	], function() {
		console.log( '[WE-F] all WE-F modules were loaded' );
	}, function() {
		console.log( '[WE-F] unable to load WE-F functions: ' );
		console.log( arguments );
	} );

} )();
