$( "span.entity-link" ).each( function( i, s ) {
	var jSpan = $( s );
	var entityId = jSpan.data( 'entity-id' );
	jSpan.after( $( document.createElement( 'a' ) ).css( {
		cursor: 'pointer',
	} ).text( ' [edit]' ).click( function() {
		window.wef_editors_registry.registry.Q56061.edit( false, entityId );
	} ) );
} );
