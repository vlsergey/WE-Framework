$( 'span.entity-link' ).each( ( i, s ) => {
  const jSpan = $( s );
  const entityId = jSpan.data( 'entity-id' );
  jSpan.after( $( document.createElement( 'a' ) ).css( {
    cursor: 'pointer',
  } ).text( ' [edit]' ).click( () => {
    window.wef_editors_registry.registry.Q56061.edit( false, entityId );
  } ) );
} );
